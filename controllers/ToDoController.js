const ToDo = require("../models/ToDo");

// Listar todas as tarefas
exports.getAll = async (req, res) => {
  try {
    const tarefas = await ToDo.find();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar tarefas" });
  }
};

// Buscar tarefa por ID
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await ToDo.findById(id);
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar tarefa" });
  }
};

// Criar nova tarefa
exports.create = async (req, res) => {
  const { descricao } = req.body;
  if (!descricao) {
    return res.status(400).json({ erro: "Descrição é obrigatória" });
  }
  try {
    const novaTarefa = new ToDo({ descricao });
    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar tarefa" });
  }
};

// Atualizar tarefa
exports.update = async (req, res) => {
  const { id } = req.params;
  const { descricao } = req.body;

  if (!descricao) {
    return res.status(400).json({ erro: "Descrição é obrigatória" });
  }

  try {
    const tarefa = await ToDo.findByIdAndUpdate(
      id,
      { descricao },
      { new: true }
    );

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar tarefa" });
  }
};

// Deletar tarefa
exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await ToDo.findByIdAndDelete(id);

    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover tarefa" });
  }
};