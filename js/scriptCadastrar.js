function cadastrarUsuario() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;


  fetch("http://localhost:3000/cadastrar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }
      return response.json();
    })
    .then(data => {
      alert("Usuário cadastrado com sucesso! Veja confirmação no seu e-mail.");

      emaildeRegistro();
      userList();
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Erro ao cadastrar o usuário ou conexão com a API.");
    });
}

function emaildeRegistro() {
  const email = document.getElementById("email").value;
  alert("E-mail de registro: " + email);
}

// Função para testar a conexão com a API
function testeConexao() {
  fetch("http://localhost:3000/conexao")
    .then(response => response.json())
    .then(data => {
      alert(data.msg);
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Erro de conexão com a API.");
    });
}

// Função para listar usuários externos
function userList() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
      data.forEach(usuario => {
        console.log("Nome:", usuario.name, "Email:", usuario.email);
      });
    })
    .catch(err => console.error("Erro:", err));
}