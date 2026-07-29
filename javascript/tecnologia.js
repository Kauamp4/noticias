function voltarHome() {
    window.location.href = "/index.html";
    window.scrollTo({
        top: 0,
        behavior: "smooth"

    });
}

function scrollCarousel(valor) {
    document.getElementById("carousel").scrollLeft += valor;
}

// TABS
document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-text").forEach(t => t.style.display = "none");

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).style.display = "block";
    });
});

// ✅ DARK MODE PERFEITO
const btn = document.getElementById("darkMode");

function atualizarBotao() {
    btn.innerText = document.body.classList.contains("dark")
        ? "☀️ Modo Claro"
        : "🌙 Modo Escuro";
}

// carregar
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

// aplicar texto
atualizarBotao();

// clique
btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );

    atualizarBotao();
});