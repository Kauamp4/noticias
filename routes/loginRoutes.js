//Arquivo: routes/loginRoutes.js


const express = require("express");

const loginController = require("../controllers/loginController");
const Router = express.Router();

Router.post("/cadastrar", loginController.cadastrar);

Router.get("/conexao", loginController.conexao);

Router.post("/login", loginController.login);

module.exports = Router;