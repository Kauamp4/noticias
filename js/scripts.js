// Função de boas vindas
const API_INICIO = "http://localhost:3000/";

//alert("Bem-vindo à API Tarefas - Exemplo Simples");

// Função para adicionar tarefas
const API = "http://localhost:3000/tarefas";

// Exemplo de inclusão (POST)
function adicionarTarefa() {
  const descricao = document.getElementById("descricao").value;
  
  if (!descricao) {
    alert("Por favor, digite uma descrição.");
    return;
  }
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ descricao }),
  })
  .then(response => {
    if (response.ok) {
      alert("Tarefa adicionada com sucesso!");
      document.getElementById("descricao").value = ""; // Limpa o input
    } else {
      alert("Erro ao adicionar a tarefa.");
    }
  })
  .catch(error => {
    console.error("Erro:", error);
    alert("Erro de conexão com a API.");
  });
}

// Exemplo de exclusão (DELETE) - coloque um id válido manualmente
function excluirTarefa() {
  const id = prompt("Digite o ID da tarefa para excluir:");
  if (id) {
    fetch(API + "/" + id, { method: "DELETE" })
      .then(() => alert("Comando de exclusão enviado!"))
      .catch(error => console.error("Erro:", error));
  }
}

// Função para listar as tarefas
function listarTarefas() {
  fetch(API)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const tarefasParaExibir = data.map(tarefa => `  ${tarefa._id} -- ${tarefa.descricao} `).join('<br><br>');
    document.getElementById("tarefas").innerHTML = tarefasParaExibir;
  })
  .catch(error => {
    console.error("Erro:", error);
    alert("Erro de conexão com a API.");
  });
}

function limparLista() {
  document.getElementById("tarefas").innerHTML = "";
}

function testeConexao() {
  fetch(API_INICIO)
  alert("Teste de Conexão Ok!! - Bem-vindo à API Tarefas."); 
}