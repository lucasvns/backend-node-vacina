const express = require("express");
const router = require("./routes");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}...`);
});

app.use('/atv1', router);

app.use( (req, res) => {
    res.status(400).json({error:['URL desconhecida']});
});