const API_PERFIL = "http://localhost:3000/perfil";

async function carregarPerfil() {

    const token = localStorage.getItem("token");

    const data = await response.json();

    console.log("DADOS RECEBIDOS DO BACKEND:", data);
    // Usuário não está logado
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(API_PERFIL, {
            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Erro ao carregar perfil"
            );
        }

        // Nome
        document.getElementById("nomeUsuario").textContent =
            data.nome;

        // Email
        document.getElementById("emailUsuario").textContent =
            data.email;

        // Foto
        if (data.foto) {
            document.getElementById("fotoUsuario").src =
                data.foto;
        }

    } catch (error) {

        console.error(error);
        alert(error.message);

    }
}

carregarPerfil();
