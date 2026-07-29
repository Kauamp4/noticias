const express = require("express")
const todoController = require("../controllers/todoController")
const router = express.Router()

// Listar todas as tarefas
router.get("/", todoController.getAll)

// Buscar tarefa por ID
router.get("/:id", todoController.getById)

// Criar nova tarefa (sem validação)
router.post("/", todoController.create)

// Atualizar tarefa (sem validação)
router.put("/:id", todoController.update)

// Deletar tarefa
router.delete("/:id", todoController.remove)

module.exports = router