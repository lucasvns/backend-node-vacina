const Sequelize = require("sequelize");
const database = require("../database");

const Vacinas = database.define(
    "vacinas",
    {
        idvacina: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nomevacina: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Nome de vacina já cadastrado no sistema",
            }
        },
    },
    {freezeTableName: true // Model tableName will be the same as the model name
    }
);
module.exports = Vacinas;
