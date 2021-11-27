const router = require("express").Router();
const {VacinasController} = require("../controllers");
const { authMiddleware } = require("../middlewares");
const { create, list, deletevacina, updatevacina } = new VacinasController();

router.use(authMiddleware);
// curl -X POST -d "nomevacina=Pfizer" http://localhost:1234/atv1/vacinas/create-vacina
router.post("/create-vacina", create);

// curl -X POST -d "idvacina=1&nomevacina=Pfizer" http://localhost:1234/atv1/vacinas/delete-vacina
router.delete("/delete-vacina", deletevacina);

// curl -X POST -d "nomevacina=Pfizer" http://localhost:1234/atv1/vacinas/update-vacina
router.put("/update-vacina", updatevacina);

// curl -X GET -d "nomevacina=Pfizer" http://localhost:1234/atv1/vacinas/lista-vacina
router.get("/lista-vacina", list);

module.exports = router;