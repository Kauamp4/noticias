document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const body = document.body;

    const btnMenu = document.getElementById("btnMenu");
    const menu = document.getElementById("menu");

    const btnDarkMenu = document.getElementById("btnDarkMenu");
    const statusDark = document.getElementById("statusDark");

    const btnAumentarTexto = document.getElementById("btnAumentarTexto");
    const btnDiminuirTexto = document.getElementById("btnDiminuirTexto");

    const btnDestacarLinks = document.getElementById("btnDestacarLinks");
    const statusLinks = document.getElementById("statusLinks");

    const btnModoLeitura = document.getElementById("btnModoLeitura");
    const statusLeitura = document.getElementById("statusLeitura");

    const btnAtalhos = document.getElementById("btnAtalhos");

    const btnDaltonismo = document.getElementById("btnDaltonismo");
    const submenuDaltonismo = document.getElementById("submenuDaltonismo");

    const btnRestaurar = document.getElementById("btnRestaurar");

    const modalAtalhos = document.getElementById("modalAtalhos");
    const fecharModal = document.getElementById("fecharModal");

    const campoBusca = document.getElementById("campoBusca");
    const limparBusca = document.getElementById("limparBusca");

    const anoAtual = document.getElementById("anoAtual");


    /* =====================================================
       ANO DO FOOTER
    ===================================================== */

    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }


    /* =====================================================
       LOCAL STORAGE
    ===================================================== */

    const STORAGE_KEY = "technews_acessibilidade";

    let configuracoes = {
        dark: false,
        leitura: false,
        links: false,
        tamanhoTexto: 100,
        daltonismo: "normal"
    };


    function salvarConfiguracoes() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(configuracoes)
        );

    }


    function carregarConfiguracoes() {

        try {

            const dados = localStorage.getItem(STORAGE_KEY);

            if (dados) {

                const salvos = JSON.parse(dados);

                configuracoes = {
                    ...configuracoes,
                    ...salvos
                };

            }

        } catch (erro) {

            console.warn(
                "Não foi possível carregar as configurações.",
                erro
            );

        }

    }


    /* =====================================================
       MENU HAMBÚRGUER
    ===================================================== */

    function abrirMenu() {

        if (!btnMenu || !menu) return;

        btnMenu.classList.add("ativo");

        menu.classList.add("ativo");

        btnMenu.setAttribute(
            "aria-expanded",
            "true"
        );

        menu.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function fecharMenu() {

        if (!btnMenu || !menu) return;

        btnMenu.classList.remove("ativo");

        menu.classList.remove("ativo");

        btnMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        menu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    function alternarMenu() {

        if (!menu) return;

        if (menu.classList.contains("ativo")) {

            fecharMenu();

        } else {

            abrirMenu();

        }

    }


    if (btnMenu) {

        btnMenu.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                alternarMenu();

            }
        );

    }


    /* =====================================================
       FECHAR MENU AO CLICAR FORA
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!menu || !btnMenu) return;

            const clicouNoMenu =
                menu.contains(event.target);

            const clicouNoBotao =
                btnMenu.contains(event.target);

            if (
                !clicouNoMenu &&
                !clicouNoBotao
            ) {

                fecharMenu();

            }

        }
    );


    /* =====================================================
       MODO ESCURO
    ===================================================== */

    function aplicarModoEscuro() {

        body.classList.toggle(
            "modo-escuro",
            configuracoes.dark
        );

        if (statusDark) {

            statusDark.textContent =
                configuracoes.dark
                    ? "ON"
                    : "OFF";

        }

        if (btnDarkMenu) {

            btnDarkMenu.classList.toggle(
                "ativo",
                configuracoes.dark
            );

            btnDarkMenu.setAttribute(
                "aria-pressed",
                String(configuracoes.dark)
            );

        }

    }


    if (btnDarkMenu) {

        btnDarkMenu.addEventListener(
            "click",
            () => {

                configuracoes.dark =
                    !configuracoes.dark;

                aplicarModoEscuro();

                salvarConfiguracoes();

            }
        );

    }


    /* =====================================================
       TAMANHO DO TEXTO
    ===================================================== */

    function aplicarTamanhoTexto() {

        const tamanho =
            Math.max(
                80,
                Math.min(
                    130,
                    configuracoes.tamanhoTexto
                )
            );

        configuracoes.tamanhoTexto =
            tamanho;

        document.documentElement.style.setProperty(
            "--escala-texto",
            `${tamanho / 100}`
        );

        body.style.fontSize =
            `${tamanho}%`;

    }


    if (btnAumentarTexto) {

        btnAumentarTexto.addEventListener(
            "click",
            () => {

                configuracoes.tamanhoTexto += 10;

                if (
                    configuracoes.tamanhoTexto >
                    130
                ) {

                    configuracoes.tamanhoTexto =
                        130;

                }

                aplicarTamanhoTexto();

                salvarConfiguracoes();

            }
        );

    }


    if (btnDiminuirTexto) {

        btnDiminuirTexto.addEventListener(
            "click",
            () => {

                configuracoes.tamanhoTexto -= 10;

                if (
                    configuracoes.tamanhoTexto <
                    80
                ) {

                    configuracoes.tamanhoTexto =
                        80;

                }

                aplicarTamanhoTexto();

                salvarConfiguracoes();

            }
        );

    }


    /* =====================================================
       DESTACAR LINKS
    ===================================================== */

    function aplicarDestacarLinks() {

        body.classList.toggle(
            "destacar-links",
            configuracoes.links
        );

        if (statusLinks) {

            statusLinks.textContent =
                configuracoes.links
                    ? "ON"
                    : "OFF";

        }

        if (btnDestacarLinks) {

            btnDestacarLinks.classList.toggle(
                "ativo",
                configuracoes.links
            );

            btnDestacarLinks.setAttribute(
                "aria-pressed",
                String(configuracoes.links)
            );

        }

    }


    if (btnDestacarLinks) {

        btnDestacarLinks.addEventListener(
            "click",
            () => {

                configuracoes.links =
                    !configuracoes.links;

                aplicarDestacarLinks();

                salvarConfiguracoes();

            }
        );

    }


    /* =====================================================
       MODO DE LEITURA
    ===================================================== */

    function aplicarModoLeitura() {

        body.classList.toggle(
            "modo-leitura",
            configuracoes.leitura
        );

        if (statusLeitura) {

            statusLeitura.textContent =
                configuracoes.leitura
                    ? "ON"
                    : "OFF";

        }

        if (btnModoLeitura) {

            btnModoLeitura.classList.toggle(
                "ativo",
                configuracoes.leitura
            );

            btnModoLeitura.setAttribute(
                "aria-pressed",
                String(configuracoes.leitura)
            );

        }

    }


    if (btnModoLeitura) {

        btnModoLeitura.addEventListener(
            "click",
            () => {

                configuracoes.leitura =
                    !configuracoes.leitura;

                aplicarModoLeitura();

                salvarConfiguracoes();

            }
        );

    }


    /* =====================================================
       DALTONISMO
    ===================================================== */

    const tiposDaltonismo = [
        "normal",
        "protanopia",
        "deuteranopia",
        "tritanopia"
    ];


    function aplicarDaltonismo(tipo) {

        tiposDaltonismo.forEach(
            (classe) => {

                body.classList.remove(
                    `daltonismo-${classe}`
                );

            }
        );


        if (
            tiposDaltonismo.includes(tipo)
        ) {

            body.classList.add(
                `daltonismo-${tipo}`
            );

        } else {

            body.classList.add(
                "daltonismo-normal"
            );

            tipo = "normal";

        }


        configuracoes.daltonismo =
            tipo;


        if (submenuDaltonismo) {

            const botoes =
                submenuDaltonismo.querySelectorAll(
                    "button[data-daltonismo]"
                );

            botoes.forEach(
                (botao) => {

                    botao.classList.toggle(
                        "ativo",
                        botao.dataset.daltonismo === tipo
                    );

                }
            );

        }


        salvarConfiguracoes();

    }


    if (submenuDaltonismo) {

        const botoes =
            submenuDaltonismo.querySelectorAll(
                "button[data-daltonismo]"
            );


        botoes.forEach(
            (botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        aplicarDaltonismo(
                            botao.dataset.daltonismo
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       ABRIR / FECHAR SUBMENU DALTONISMO
    ===================================================== */

    if (btnDaltonismo) {

        btnDaltonismo.addEventListener(
            "click",
            () => {

                if (!submenuDaltonismo) return;

                const aberto =
                    submenuDaltonismo.classList.contains(
                        "ativo"
                    );


                submenuDaltonismo.classList.toggle(
                    "ativo"
                );


                btnDaltonismo.setAttribute(
                    "aria-expanded",
                    String(!aberto)
                );


                const seta =
                    btnDaltonismo.querySelector(
                        ".fa-chevron-right"
                    );


                if (seta) {

                    seta.style.transform =
                        !aberto
                            ? "rotate(90deg)"
                            : "rotate(0deg)";

                }

            }
        );

    }


    /* =====================================================
       MODAL DE ATALHOS
    ===================================================== */

    function abrirModalAtalhos() {

        if (!modalAtalhos) return;

        modalAtalhos.classList.add(
            "ativo"
        );

        document.body.style.overflow =
            "hidden";

        if (fecharModal) {

            setTimeout(
                () => fecharModal.focus(),
                50
            );

        }

    }


    function fecharModalAtalhos() {

        if (!modalAtalhos) return;

        modalAtalhos.classList.remove(
            "ativo"
        );

        document.body.style.overflow =
            "";

    }


    if (btnAtalhos) {

        btnAtalhos.addEventListener(
            "click",
            abrirModalAtalhos
        );

    }


    if (fecharModal) {

        fecharModal.addEventListener(
            "click",
            fecharModalAtalhos
        );

    }


    if (modalAtalhos) {

        modalAtalhos.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    modalAtalhos
                ) {

                    fecharModalAtalhos();

                }

            }
        );

    }


    /* =====================================================
       BUSCA
    ===================================================== */

    if (campoBusca) {

        campoBusca.addEventListener(
            "input",
            () => {

                if (!limparBusca) return;

                limparBusca.classList.toggle(
                    "visivel",
                    campoBusca.value.trim() !== ""
                );

            }
        );

    }


    if (limparBusca) {

        limparBusca.addEventListener(
            "click",
            () => {

                if (!campoBusca) return;

                campoBusca.value = "";

                limparBusca.classList.remove(
                    "visivel"
                );

                campoBusca.focus();

            }
        );

    }


    /* =====================================================
       TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            /* ESC */

            if (event.key === "Escape") {

                fecharMenu();

                fecharModalAtalhos();

                return;

            }


            /* ALT + H */

            if (
                event.altKey &&
                event.key.toLowerCase() === "h"
            ) {

                event.preventDefault();

                window.location.href =
                    "/index.html";

                return;

            }


            /* ALT + B */

            if (
                event.altKey &&
                event.key.toLowerCase() === "b"
            ) {

                event.preventDefault();

                if (campoBusca) {

                    campoBusca.focus();

                }

                return;

            }


            /* ALT + M */

            if (
                event.altKey &&
                event.key.toLowerCase() === "m"
            ) {

                event.preventDefault();

                alternarMenu();

                return;

            }


            /* ALT + R */

            if (
                event.altKey &&
                event.key.toLowerCase() === "r"
            ) {

                event.preventDefault();

                configuracoes.leitura =
                    !configuracoes.leitura;

                aplicarModoLeitura();

                salvarConfiguracoes();

                return;

            }


            /* ALT + + */

            if (
                event.altKey &&
                (
                    event.key === "+" ||
                    event.key === "="
                )
            ) {

                event.preventDefault();

                configuracoes.tamanhoTexto += 10;

                if (
                    configuracoes.tamanhoTexto >
                    130
                ) {

                    configuracoes.tamanhoTexto =
                        130;

                }

                aplicarTamanhoTexto();

                salvarConfiguracoes();

                return;

            }


            /* ALT + - */

            if (
                event.altKey &&
                (
                    event.key === "-" ||
                    event.key === "_"
                )
            ) {

                event.preventDefault();

                configuracoes.tamanhoTexto -= 10;

                if (
                    configuracoes.tamanhoTexto <
                    80
                ) {

                    configuracoes.tamanhoTexto =
                        80;

                }

                aplicarTamanhoTexto();

                salvarConfiguracoes();

            }

        }
    );


    /* =====================================================
       RESTAURAR CONFIGURAÇÕES
    ===================================================== */

    if (btnRestaurar) {

        btnRestaurar.addEventListener(
            "click",
            () => {

                configuracoes = {
                    dark: false,
                    leitura: false,
                    links: false,
                    tamanhoTexto: 100,
                    daltonismo: "normal"
                };


                localStorage.removeItem(
                    STORAGE_KEY
                );


                aplicarModoEscuro();

                aplicarTamanhoTexto();

                aplicarDestacarLinks();

                aplicarModoLeitura();

                aplicarDaltonismo(
                    "normal"
                );


                if (submenuDaltonismo) {

                    submenuDaltonismo.classList.remove(
                        "ativo"
                    );

                }


                if (btnDaltonismo) {

                    btnDaltonismo.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                fecharMenu();

            }
        );

    }


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    carregarConfiguracoes();

    aplicarModoEscuro();

    aplicarTamanhoTexto();

    aplicarDestacarLinks();

    aplicarModoLeitura();

    aplicarDaltonismo(
        configuracoes.daltonismo
    );

});