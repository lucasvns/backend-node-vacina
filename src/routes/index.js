const router = require("express").Router();

const usuarioRoute = require("./usuario");
const vacinasRoute = require("./vacinas");
const registroRoute = require("./registro");

router.use("/usuario", usuarioRoute);
router.use("/vacinas", vacinasRoute);
router.use("/registro", registroRoute);

router.use( (req, res) => {
    res.status(400).json({error:['Operação desconhecida']});
})

module.exports = router;