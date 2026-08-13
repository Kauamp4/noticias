async function cadastrarUsuario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  // Regex: 8 a 12 caracteres, pelo menos 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial
  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+])[A-Za-z\d@$!%*?&#+]{8,12}$/;

  // Validação do formato da senha
  if (!regexSenha.test(senha)) {
    alert(
      "A senha deve conter:\n\n" +
      "• Entre 8 e 12 caracteres\n" +
      "• Pelo menos 1 letra maiúscula (A-Z)\n" +
      "• Pelo menos 1 letra minúscula (a-z)\n" +
      "• Pelo menos 1 número (0-9)\n" +
      "• Pelo menos 1 caractere especial (@#$!%*?&+)"
    );
    return;
  }

  // Validação da confirmação de senha
  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await response.json();

    if (!response.ok) {
      // Exibe a mensagem retornada pelo servidor (ex: "E-mail já cadastrado") ou uma mensagem padrão
      throw new Error(data.message || data.erro || "Erro ao cadastrar usuário.");
    }

    alert("Usuário cadastrado com sucesso!");

    // Limpar campos após o sucesso
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirmarSenha").value = "";

  } catch (error) {
    console.error("Erro na requisição:", error);
    alert(error.message || "Erro ao se conectar com a API.");
  }
}

// Função para testar exibição do email no alerta
function emaildeRegistro() {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    alert("Por favor, digite um e-mail.");
    return;
  }
  alert("E-mail de registro: " + email);
}

// Teste de conexão com o servidor Node.js
async function testeConexao() {
  try {
    const response = await fetch("http://localhost:3000/conexao");
    const data = await response.json();
    alert(data.msg || "Conexão estabelecida!");
  } catch (error) {
    console.error("Erro de conexão:", error);
    alert("Erro ao conectar com a API local.");
  }
}

// Consumo de API externa para testes
async function userList() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    data.forEach(usuario => {
      console.log(`Nome: ${usuario.name} | Email: ${usuario.email}`);
    });
  } catch (error) {
    console.error("Erro ao carregar lista de usuários:", error);
  }
}