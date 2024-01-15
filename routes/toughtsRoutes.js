const express = require("express");
const router = express.Router();
const ToughtController = require("../controllers/ToughtController");

// import check auth middleware
const checkAuth = require("../helpers/auth").checkAuth;

router.get("/add", checkAuth, ToughtController.createTought);
router.post("/add", checkAuth, ToughtController.createToughtSave);
router.post("/remove", checkAuth, ToughtController.removeTought);
router.get("/edit/:id", checkAuth, ToughtController.updateTought);
router.post("/edit", checkAuth, ToughtController.updateToughtPost);
router.get("/dashboard", checkAuth, ToughtController.dashboard);
router.get("/", ToughtController.showToughts);

module.exports = router;


// Este código está criando um conjunto de rotas para um aplicativo web Express.js relacionadas a operações em "pensamentos" . Cada rota é associada a uma função específica no controlador ToughtController, e a autenticação do usuário é verificada usando o middleware checkAuth antes de permitir o acesso a essas rotas.