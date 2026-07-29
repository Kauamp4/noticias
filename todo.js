const express = require("express")
const cors = require("cors")
require("./config/db")
const tarefasRoutes = require('./routes/todoRoutes')
const loginRoutes = require('./routes/loginRoutes')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000

// Cria uma rota GET para o caminho "/"
app.get("/", (req, res) => {
  res.status(200).send("Bem-vindo à API TECHNEWS ")
})

// Rota de Tarefas
app.use('/tarefas', tarefasRoutes)


// Rota de Login e Cadastro
app.use('/', loginRoutes)
//app.use('/register', loginRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})


