const UsuarioModel = require("./usuario");
const VacinasModel = require("./vacinas");
const RegistroModel = require("./registro")

//importa o arquivo database/index.js
const database = require("../database");

//Criando chave estrangeira
UsuarioModel.hasMany(RegistroModel, {
  foreignKey: {
    name: "idusuario",
    allowNull: false,
  },
  sourceKey: "idusuario",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true, //usado para forçar o cascade no onDelete
});
RegistroModel.belongsTo(UsuarioModel, {
  foreignKey: "idusuario",
  targetKey: "idusuario",
});

//Criando chave estrangeira
VacinasModel.hasMany(RegistroModel, {
  foreignKey: {
    name: "idvacina",
    allowNull: false,
  },
  sourceKey: "idvacina",
  onDelete: "cascade",
  onUpdate: "cascade",
  hooks: true, //usado para forçar o cascade no onDelete
});
RegistroModel.belongsTo(VacinasModel, {
  foreignKey: "idvacina",
  targetKey: "idvacina",
});
//cria as tabelas no SGBD se elas não existirem
database.sync();

module.exports = {
  VacinasModel,
  UsuarioModel,
  RegistroModel,
};