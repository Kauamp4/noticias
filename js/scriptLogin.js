const API_LOGIN = 'http://localhost:3000/login'

// Função Login

function loginUsuario() {

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      senha
    })
  })
    .then(async response => {

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro no login");
      }

      alert("Login realizado com sucesso!");

      // redirecionar para página principal
      window.location.href = "/Home/index.html";

    })
    .catch(error => {

      console.error(error);
      alert(error.message);

    });
}