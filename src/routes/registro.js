const router = require("express").Router();
const {RegistroController} = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { create, updateregistro, list, deleteRegistro } = new RegistroController();

router.use(authMiddleware);

// curl -X POST -d "" http://localhost:1234/atv1/registro/registro-create
router.post("/registro-create", create);

// curl -X PUT -d "" http://localhost:1234/atv1/registro/registro-update
router.put("/registro-update", updateregistro);

// curl -X GET -d "" http://localhost:1234/atv1/registro/registro-list
router.get("/registro-list", list);

router.delete("/registro-delete", deleteRegistro);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida com o usuário']});
})

module.exports = router;