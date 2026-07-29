function menu() {
    const menu = document.getElementById("menu");
    // Verifica se o menu está visível (display igual a "block")
    if (menu.style.display === "block") {
        // Se estiver visível, esconde o menu
        menu.style.display = "none";

     } else {
    // Se estiver escondido, mostra o menu
    menu.style.display = "block";
  }

}