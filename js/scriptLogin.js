const API_LOGIN = "http://localhost:3000/login";


function loginUsuario() {

  const email =
    document.getElementById("email").value;

  const senha =
    document.getElementById("senha").value;


  fetch(API_LOGIN, {

    method: "POST",

    headers: {

      "Content-Type": "application/json"

    },

    body: JSON.stringify({

      email: email,

      senha: senha

    })

  })


    .then(async response => {

      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Erro no login"
        );

      }


      // ==================================
      // SALVA TOKEN
      // ==================================

      localStorage.setItem(
        "token",
        data.token
      );


      // ==================================
      // SALVA DADOS DO USUÁRIO
      // ==================================

      localStorage.setItem(

        "usuario",

        JSON.stringify(data.usuario)

      );


      alert(
        "Login realizado com sucesso!"
      );



      // VAI PARA HOME


      window.location.href =
        "perfil.html";

    })


    .catch(error => {

      console.error(error);

      alert(error.message);

    });

}