const { VacinasModel } = require("../models");
const { Token } = require("../utils");
const { getToken } = require("../middlewares");

class VacinasController {
    async create(req, res) {
      const token = await getToken(req);
    
      if(token.perfil != 'admin'){
        return res
        .status(400)
        .json({ error: ["Você não tem permisão para essa solicitação"] });
      }
      
      let { nomevacina } = req.body;
      nomevacina = (nomevacina || "").toString().trim();

      if (nomevacina === "") {
        return res
        .status(400)
        .json({ error: ["Forneça o nome da vacina para a realização do cadastro"] });
        }
      
    return await VacinasModel.create({ nomevacina })
      .then(async (create) => {
        const { idvacina, nomevacina} = create.get();
        return res.status(200).json({ idvacina, nomevacina});
      })
      .catch((err) => {
        try {
          return res.status(400).json({
            error: err.errors.map((item) => item.message),
            type: "validation",
          });
        } catch (e) {
          return res.status(400).json({ error: [e.message] });
        }
      });
    }

    async list(req, res) {
      const token = await getToken(req);
      if (!token || !token.idusuario) {
        return res.status(401).json({ error: ["Efetue o login para continuar"] });
      }
  
      let { limit, offset } = req.body;
      return await VacinasModel.findAndCountAll({
        attributes: ["idvacina", "nomevacina", "createdAt", "updatedAt"],
        order: [["nomevacina", "ASC"]],
        offset,
        limit,
      })
        .then((vacinas) => {
          return res.status(200).json({
            vacinas: vacinas.rows.map((item) => item.get()),
            //count: vacinas.count,

          });
        })
        .catch((e) => {
          return res.status(400).json({ error: [e.message] });
        });
    }

    async updatevacina(req,res){
      const token = await getToken(req)
      if (!token || !token.idusuario) {
        return res.status(401).json({ error: ["Efetue o login para continuar"] });
      }
      
      if(token.perfil != 'admin'){
        return res
        .status(400)
        .json({ error: ["Você não tem permisão para essa solicitação"] });
      }

      const resposta = "Atualização realizada com sucesso!";
      let {idvacina , nomevacina} = req.body;
  
        if (nomevacina === "") {
          return res
            .status(400)
            .json({ error: ["Forneça o nome da vacina para realizar a atualização."] });
      } 

      
      return await VacinasModel.findOne({where:{ idvacina }})
      .then(async (vacina) =>{
        console.log(vacina.nomevacina)
        console.log(VacinasModel.idvacina)
        if (vacina.nomevacina == VacinasModel.nomevacina){
          return res
          .status(400)
          .json({ error: ["O novo nome não pode ser igual ao anterior."] });
        }
        if (vacina){
          await vacina.update({nomevacina});
          return res.status(200).json({
            nomevacina, resposta
          });
        }
      })
      .catch((err) => {
        try {
          return res.status(400).json({
            error: err.errors.map((item) => item.message),
            type: "validation",
          });
        } catch (e) {
          return res.status(400).json({ error: [e.message] });
        }
      });

    }

    async deletevacina(req, res) {
      const token = await getToken(req);
      if (!token || !token.idusuario) {
        return res.status(401).json({ error: ["Efetue o login para continuar"] });
      }

      if(token.perfil != 'admin'){
        return res
        .status(400)
        .json({ error: ["Você não tem permisão para essa solicitação"] });
      }
      
      const resposta = "Vacina deletada com sucesso!";
      let { idvacina, nomevacina } = req.body;
      idvacina = (idvacina || "").toString().replace(/[^\d]+/g, "");
      nomevacina = (nomevacina || "").toString().trim();

      if (idvacina === "") {
        return res
          .status(400)
          .json({ error: ["Forneça a identificação da vacina"] });
      }
  
      return await VacinasModel.destroy({ where: { idvacina, nomevacina } })
        .then(async (Dvacina) => {
          if (Dvacina) {
            return res.status(200).json({ idvacina, nomevacina, resposta });
          }
        })
        .catch((err) => {
          try {
            return res.status(400).json({
              error: err.errors.map((item) => item.message),
              type: "validation",
            });
          } catch (e) {
            return res.status(400).json({ error: [e.message] });
          }
        });
      
    }

}
module.exports = VacinasController;