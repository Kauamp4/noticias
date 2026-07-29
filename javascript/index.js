
const btn = document.getElementById("darkMode");

function atualizarBotao() {
  btn.innerText = document.body.classList.contains("dark")
    ? "☀️ Modo Claro"
    : "🌙 Modo Escuro";
}

// carregar preferência
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

atualizarBotao();

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark")
  );

  atualizarBotao();
});
