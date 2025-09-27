const express = require("express")
const router = express.Router();
const { verificarToken } = require("../middleware/authMiddleware");
const tareaController = require ("../controllers/tareaControllers");
const { autorizarRoles } = require("../middleware/rolMiddleware");

router.get("/tareas",verificarToken,tareaController.getTareas);
router.delete("/tareas/:id",verificarToken,autorizarRoles('admin'),tareaController.deleteTarea)
router.post("/tareas", verificarToken, tareaController.createTarea);

module.exports = router;
