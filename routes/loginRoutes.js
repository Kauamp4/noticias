//Arquivo: routes/loginRoutes.js


const express = require("express");

const loginController = require("../controllers/loginController");
const authMiddleware = require("../middlewares/authMiddleware");
const Router = express.Router();

Router.post("/cadastrar", loginController.cadastrar);

Router.get("/conexao", loginController.conexao);

Router.post("/login", loginController.login);

Router.get("/perfil", authMiddleware, loginController.perfil);

module.exports = Router;