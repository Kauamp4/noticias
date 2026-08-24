/* =========================================================
   TECHNEWS
   SISTEMA DE ACESSIBILIDADE + FUNCIONALIDADES DO SITE

   CONFIGURAÇÕES SALVAS:
   - Modo escuro
   - Tamanho do texto
   - Destacar links
   - Modo de leitura
   - Daltonismo

   FUNCIONALIDADES:
   - Menu hambúrguer
   - Submenu de daltonismo
   - Modal de atalhos
   - Busca
   - Newsletter
   - Filtros de notícias
   - Atalhos de teclado
   - Ano automático do footer

   IMPORTANTE:
   Todas as páginas devem utilizar esta mesma lógica.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. ELEMENTOS PRINCIPAIS
    ===================================================== */

    const body = document.body;

    const btnMenu = document.getElementById("btnMenu");
    const menu = document.getElementById("menu");

    const btnDarkMenu =
        document.getElementById("btnDarkMenu");

    const statusDark =
        document.getElementById("statusDark");

    const btnAumentarTexto =
        document.getElementById("btnAumentarTexto");

    const btnDiminuirTexto =
        document.getElementById("btnDiminuirTexto");

    const btnDestacarLinks =
        document.getElementById("btnDestacarLinks");

    const statusLinks =
        document.getElementById("statusLinks");

    const btnModoLeitura =
        document.getElementById("btnModoLeitura");

    const statusLeitura =
        document.getElementById("statusLeitura");

    const btnAtalhos =
        document.getElementById("btnAtalhos");

    const modalAtalhos =
        document.getElementById("modalAtalhos");

    const fecharModal =
        document.getElementById("fecharModal");

    const btnDaltonismo =
        document.getElementById("btnDaltonismo");

    const submenuDaltonismo =
        document.getElementById("submenuDaltonismo");

    const btnRestaurar =
        document.getElementById("btnRestaurar");

    const campoBusca =
        document.getElementById("campoBusca");

    const limparBusca =
        document.getElementById("limparBusca");

    const anoAtual =
        document.getElementById("anoAtual");


    /* =====================================================
       2. CONFIGURAÇÕES
    ===================================================== */

    const CHAVE_CONFIGURACOES =
        "techNewsAcessibilidade";

    const CLASSES_DALTONISMO = [
        "daltonismo-protanopia",
        "daltonismo-deuteranopia",
        "daltonismo-tritanopia"
    ];

    const TIPOS_DALTONISMO = [
        "normal",
        "protanopia",
        "deuteranopia",
        "tritanopia"
    ];

    const NIVEIS_TEXTO = [
        85,
        100,
        120,
        140,
        160
    ];

    let nivelTexto = 100;


    /* =====================================================
       3. MENU HAMBÚRGUER
    ===================================================== */

    function abrirMenu() {

        if (!btnMenu || !menu) {
            return;
        }

        btnMenu.classList.add("ativo");
        menu.classList.add("ativo");

        btnMenu.setAttribute(
            "aria-expanded",
            "true"
        );

        btnMenu.setAttribute(
            "aria-label",
            "Fechar menu de acessibilidade"
        );

        menu.setAttribute(
            "aria-hidden",
            "false"
        );
    }


    function fecharMenu() {

        if (!btnMenu || !menu) {
            return;
        }

        btnMenu.classList.remove("ativo");
        menu.classList.remove("ativo");

        btnMenu.setAttribute(
            "aria-expanded",
            "false"
        );

        btnMenu.setAttribute(
            "aria-label",
            "Abrir menu de acessibilidade"
        );

        menu.setAttribute(
            "aria-hidden",
            "true"
        );


        /* Fecha submenu de daltonismo */

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
    }


    function alternarMenu() {

        if (!menu) {
            return;
        }

        if (
            menu.classList.contains("ativo")
        ) {

            fecharMenu();

        } else {

            abrirMenu();

        }
    }


    if (btnMenu) {

        btnMenu.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                alternarMenu();

            }
        );

    }


    if (menu) {

        menu.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    }


    /* =====================================================
       4. FECHAR MENU AO CLICAR FORA
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (!menu || !btnMenu) {
                return;
            }

            const clicouDentroMenu =
                menu.contains(event.target);

            const clicouBotao =
                btnMenu.contains(event.target);

            if (
                !clicouDentroMenu &&
                !clicouBotao
            ) {

                fecharMenu();

            }

        }
    );


    /* =====================================================
       5. CAMPO DE BUSCA
    ===================================================== */

    if (
        campoBusca &&
        limparBusca
    ) {

        function atualizarBotaoBusca() {

            limparBusca.classList.toggle(
                "visivel",
                campoBusca.value.trim() !== ""
            );

        }


        campoBusca.addEventListener(
            "input",
            atualizarBotaoBusca
        );


        limparBusca.addEventListener(
            "click",
            () => {

                campoBusca.value = "";

                atualizarBotaoBusca();

                campoBusca.focus();

            }
        );


        /* Estado inicial */

        atualizarBotaoBusca();

    }


    /* =====================================================
       6. MODO ESCURO
    ===================================================== */

    function atualizarDarkMode() {

        const ativo =
            body.classList.contains("dark");


        if (statusDark) {

            statusDark.textContent =
                ativo ? "ON" : "OFF";

        }


        if (btnDarkMenu) {

            btnDarkMenu.classList.toggle(
                "ativo",
                ativo
            );


            const icone =
                btnDarkMenu.querySelector("i");

            if (icone) {

                icone.className =
                    ativo
                        ? "fa-solid fa-sun"
                        : "fa-solid fa-moon";

            }


            const texto =
                btnDarkMenu.querySelector("span");

            if (texto) {

                texto.textContent =
                    ativo
                        ? "Modo Claro"
                        : "Modo Escuro";

            }

        }

    }


    if (btnDarkMenu) {

        btnDarkMenu.addEventListener(
            "click",
            () => {

                body.classList.toggle("dark");

                atualizarStatus();

                salvarConfiguracoes();

            }
        );

    }


    /* =====================================================
       7. TAMANHO DO TEXTO
    ===================================================== */

    function aplicarNivelTexto(nivel) {

        /*
         * Garante que o nível fique
         * entre 85% e 160%.
         */

        nivel = Math.max(
            85,
            Math.min(160, Number(nivel) || 100)
        );


        /*
         * Encontra o nível disponível mais próximo.
         */

        nivel = NIVEIS_TEXTO.reduce(
            (maisProximo, valor) => {

                return Math.abs(valor - nivel) <
                    Math.abs(maisProximo - nivel)
                    ? valor
                    : maisProximo;

            },
            100
        );


        nivelTexto = nivel;


        /*
         * Remove classes anteriores.
         */

        body.classList.remove(
            "texto-85",
            "texto-100",
            "texto-120",
            "texto-140",
            "texto-160"
        );


        /*
         * Adiciona classe atual.
         */

        body.classList.add(
            `texto-${nivelTexto}`
        );


        /*
         * Seleciona elementos com texto.
         */

        const elementos =
            document.querySelectorAll(
                "body *:not(script):not(style):not(svg):not(path)"
            );


        elementos.forEach(elemento => {

            const possuiTextoDireto =
                Array.from(
                    elemento.childNodes
                ).some(
                    node =>
                        node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim().length > 0
                );


            if (!possuiTextoDireto) {
                return;
            }


            /*
             * Salva tamanho original
             * apenas uma vez.
             */

            if (
                !elemento.dataset.fontSizeOriginal
            ) {

                const tamanhoAtual =
                    parseFloat(
                        window.getComputedStyle(
                            elemento
                        ).fontSize
                    );


                if (
                    !Number.isNaN(
                        tamanhoAtual
                    )
                ) {

                    elemento.dataset.fontSizeOriginal =
                        tamanhoAtual;

                }

            }


            const original =
                parseFloat(
                    elemento.dataset.fontSizeOriginal
                );


            if (Number.isNaN(original)) {
                return;
            }


            const novoTamanho =
                original *
                (nivelTexto / 100);


            elemento.style.fontSize =
                `${novoTamanho}px`;

        });

    }


    function aumentarTexto() {

        const indice =
            NIVEIS_TEXTO.indexOf(
                nivelTexto
            );


        if (
            indice <
            NIVEIS_TEXTO.length - 1
        ) {

            aplicarNivelTexto(
                NIVEIS_TEXTO[indice + 1]
            );

        }


        atualizarStatus();

        salvarConfiguracoes();

    }


    function diminuirTexto() {

        const indice =
            NIVEIS_TEXTO.indexOf(
                nivelTexto
            );


        if (indice > 0) {

            aplicarNivelTexto(
                NIVEIS_TEXTO[indice - 1]
            );

        }


        atualizarStatus();

        salvarConfiguracoes();

    }


    if (btnAumentarTexto) {

        btnAumentarTexto.addEventListener(
            "click",
            aumentarTexto
        );

    }


    if (btnDiminuirTexto) {

        btnDiminuirTexto.addEventListener(
            "click",
            diminuirTexto
        );

    }


    /* =====================================================
       8. ATUALIZAÇÃO GERAL DO STATUS
    ===================================================== */

    function atualizarStatus() {

        const escuro =
            body.classList.contains("dark");

        const links =
            body.classList.contains(
                "destacar-links"
            );

        const leitura =
            body.classList.contains(
                "modo-leitura"
            );


        if (statusDark) {

            statusDark.textContent =
                escuro ? "ON" : "OFF";

        }


        if (statusLinks) {

            statusLinks.textContent =
                links ? "ON" : "OFF";

        }


        if (statusLeitura) {

            statusLeitura.textContent =
                leitura ? "ON" : "OFF";

        }


        if (btnDarkMenu) {

            btnDarkMenu.classList.toggle(
                "ativo",
                escuro
            );

        }


        if (btnDestacarLinks) {

            btnDestacarLinks.classList.toggle(
                "ativo",
                links
            );

        }


        if (btnModoLeitura) {

            btnModoLeitura.classList.toggle(
                "ativo",
                leitura
            );

        }


        if (btnAumentarTexto) {

            const status =
                btnAumentarTexto.querySelector(
                    ".status"
                );

            if (status) {

                status.textContent =
                    nivelTexto >= 160
                        ? "MAX"
                        : "A+";

            }

        }


        if (btnDiminuirTexto) {

            const status =
                btnDiminuirTexto.querySelector(
                    ".status"
                );

            if (status) {

                status.textContent =
                    nivelTexto <= 85
                        ? "MIN"
                        : "A−";

            }

        }


        atualizarDarkMode();

    }


    /* =====================================================
       9. SALVAR CONFIGURAÇÕES
    ===================================================== */

    function salvarConfiguracoes() {

        let daltonismo = "normal";


        if (
            body.classList.contains(
                "daltonismo-protanopia"
            )
        ) {

            daltonismo = "protanopia";

        }

        else if (
            body.classList.contains(
                "daltonismo-deuteranopia"
            )
        ) {

            daltonismo = "deuteranopia";

        }

        else if (
            body.classList.contains(
                "daltonismo-tritanopia"
            )
        ) {

            daltonismo = "tritanopia";

        }


        const configuracoes = {

            dark:
                body.classList.contains(
                    "dark"
                ),

            texto:
                nivelTexto,

            links:
                body.classList.contains(
                    "destacar-links"
                ),

            leitura:
                body.classList.contains(
                    "modo-leitura"
                ),

            daltonismo:
                daltonismo

        };


        try {

            localStorage.setItem(
                CHAVE_CONFIGURACOES,
                JSON.stringify(
                    configuracoes
                )
            );

        }

        catch (erro) {

            console.warn(
                "Não foi possível salvar as configurações.",
                erro
            );

        }

    }


    /* =====================================================
       10. CARREGAR CONFIGURAÇÕES
    ===================================================== */

    function carregarConfiguracoes() {

        try {

            const dadosSalvos =
                localStorage.getItem(
                    CHAVE_CONFIGURACOES
                );


            if (!dadosSalvos) {

                body.classList.remove(
                    "dark",
                    "destacar-links",
                    "modo-leitura",
                    ...CLASSES_DALTONISMO
                );


                aplicarNivelTexto(100);

                aplicarDaltonismo("normal");

                atualizarStatus();

                return;

            }


            const dados =
                JSON.parse(
                    dadosSalvos
                );


            body.classList.toggle(
                "dark",
                Boolean(dados.dark)
            );


            body.classList.toggle(
                "destacar-links",
                Boolean(dados.links)
            );


            body.classList.toggle(
                "modo-leitura",
                Boolean(dados.leitura)
            );


            aplicarNivelTexto(
                Number(dados.texto) || 100
            );


            aplicarDaltonismo(
                dados.daltonismo || "normal"
            );


            atualizarStatus();

        }

        catch (erro) {

            console.warn(
                "Não foi possível carregar as configurações.",
                erro
            );


            body.classList.remove(
                "dark",
                "destacar-links",
                "modo-leitura",
                ...CLASSES_DALTONISMO
            );


            aplicarNivelTexto(100);

            aplicarDaltonismo("normal");

            atualizarStatus();

        }

    }


    /* =====================================================
       11. DESTACAR LINKS
    ===================================================== */

    if (btnDestacarLinks) {

        btnDestacarLinks.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "destacar-links"
                );

                atualizarStatus();

                salvarConfiguracoes();

            }
        );

    }


    /* =====================================================
       12. MODO DE LEITURA
    ===================================================== */

    if (btnModoLeitura) {

        btnModoLeitura.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "modo-leitura"
                );

                atualizarStatus();

                salvarConfiguracoes();

            }
        );

    }


    /* =====================================================
       13. DALTONISMO
    ===================================================== */

    function aplicarDaltonismo(tipo) {

        if (
            !TIPOS_DALTONISMO.includes(
                tipo
            )
        ) {

            tipo = "normal";

        }


        body.classList.remove(
            ...CLASSES_DALTONISMO
        );


        if (tipo !== "normal") {

            body.classList.add(
                `daltonismo-${tipo}`
            );

        }


        if (!submenuDaltonismo) {
            return;
        }


        submenuDaltonismo
            .querySelectorAll(
                "[data-daltonismo]"
            )
            .forEach(botao => {

                const ativo =
                    botao.dataset.daltonismo ===
                    tipo;


                botao.classList.toggle(
                    "ativo",
                    ativo
                );


                botao.setAttribute(
                    "aria-pressed",
                    String(ativo)
                );

            });

    }


    if (
        btnDaltonismo &&
        submenuDaltonismo
    ) {

        btnDaltonismo.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const aberto =
                    submenuDaltonismo.classList.toggle(
                        "ativo"
                    );


                btnDaltonismo.setAttribute(
                    "aria-expanded",
                    String(aberto)
                );

            }
        );

    }


    const botoesDaltonismo =
        document.querySelectorAll(
            "[data-daltonismo]"
        );


    botoesDaltonismo.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const tipo =
                        botao.dataset.daltonismo;


                    aplicarDaltonismo(
                        tipo
                    );


                    salvarConfiguracoes();

                }
            );

        }
    );


    /* =====================================================
       14. MODAL DE ATALHOS
    ===================================================== */

    function abrirAtalhos() {

        if (!modalAtalhos) {
            return;
        }


        fecharMenu();


        modalAtalhos.classList.add(
            "ativo"
        );


        if (fecharModal) {

            fecharModal.focus();

        }

    }


    function fecharAtalhos() {

        if (!modalAtalhos) {
            return;
        }


        modalAtalhos.classList.remove(
            "ativo"
        );


        if (btnMenu) {

            btnMenu.focus();

        }

    }


    if (btnAtalhos) {

        btnAtalhos.addEventListener(
            "click",
            abrirAtalhos
        );

    }


    if (fecharModal) {

        fecharModal.addEventListener(
            "click",
            fecharAtalhos
        );

    }


    if (modalAtalhos) {

        modalAtalhos.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modalAtalhos
                ) {

                    fecharAtalhos();

                }

            }
        );

    }


    /* =====================================================
       15. NEWSLETTER
    ===================================================== */

    const formNewsletter =
        document.querySelector(
            ".form-newsletter"
        );


    if (formNewsletter) {

        formNewsletter.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "emailNewsletter"
                    );


                if (
                    !email ||
                    !email.value.trim()
                ) {

                    return;

                }


                alert(
                    "Obrigado! Seu e-mail foi cadastrado na newsletter."
                );


                email.value = "";

            }
        );

    }


    /* =====================================================
       16. FILTROS DE NOTÍCIAS
    ===================================================== */

    const filtros =
        document.querySelectorAll(
            ".filtro"
        );


    filtros.forEach(
        filtro => {

            filtro.addEventListener(
                "click",
                () => {

                    filtros.forEach(
                        item => {

                            item.classList.remove(
                                "ativo"
                            );

                        }
                    );


                    filtro.classList.add(
                        "ativo"
                    );

                }
            );

        }
    );


    /* =====================================================
       17. ATALHOS DE TECLADO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /*
             * ESC
             */

            if (
                event.key === "Escape"
            ) {

                fecharMenu();

                if (
                    modalAtalhos &&
                    modalAtalhos.classList.contains(
                        "ativo"
                    )
                ) {

                    fecharAtalhos();

                }

                return;

            }


            /*
             * Ignora atalhos quando CTRL,
             * SHIFT ou META estiverem pressionados.
             */

            if (
                !event.altKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.metaKey
            ) {

                return;

            }


            const tecla =
                event.key.toLowerCase();


            /*
             * ALT + M
             * Menu
             */

            if (
                tecla === "m"
            ) {

                event.preventDefault();

                alternarMenu();

                return;

            }


            /*
             * ALT + B
             * Busca
             */

            if (
                tecla === "b"
            ) {

                event.preventDefault();

                if (campoBusca) {

                    campoBusca.focus();

                }

                return;

            }


            /*
             * ALT + H
             * Home
             */

            if (
                tecla === "h"
            ) {

                event.preventDefault();

                window.location.href =
                    "index.html";

                return;

            }


            /*
             * ALT + R
             * Modo de leitura
             */

            if (
                tecla === "r"
            ) {

                event.preventDefault();

                if (btnModoLeitura) {

                    btnModoLeitura.click();

                }

                return;

            }


            /*
             * ALT + +
             * Aumentar texto
             */

            if (
                event.key === "+" ||
                event.key === "="
            ) {

                event.preventDefault();

                aumentarTexto();

                return;

            }


            /*
             * ALT + -
             * Diminuir texto
             */

            if (
                event.key === "-" ||
                event.key === "_"
            ) {

                event.preventDefault();

                diminuirTexto();

            }

        }
    );


    /* =====================================================
       18. RESTAURAR CONFIGURAÇÕES
    ===================================================== */

    if (btnRestaurar) {

        btnRestaurar.addEventListener(
            "click",
            () => {

                /*
                 * Remove modos.
                 */

                body.classList.remove(
                    "dark",
                    "destacar-links",
                    "modo-leitura",
                    ...CLASSES_DALTONISMO
                );


                /*
                 * Remove tamanhos personalizados.
                 */

                document
                    .querySelectorAll(
                        "[data-font-size-original]"
                    )
                    .forEach(
                        elemento => {

                            elemento.style.fontSize =
                                "";

                            delete elemento.dataset
                                .fontSizeOriginal;

                        }
                    );


                /*
                 * Volta ao tamanho normal.
                 */

                aplicarNivelTexto(100);


                /*
                 * Daltonismo normal.
                 */

                aplicarDaltonismo(
                    "normal"
                );


                /*
                 * Fecha submenu.
                 */

                if (
                    submenuDaltonismo
                ) {

                    submenuDaltonismo.classList.remove(
                        "ativo"
                    );

                }


                if (
                    btnDaltonismo
                ) {

                    btnDaltonismo.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                /*
                 * Atualiza interface.
                 */

                atualizarStatus();


                /*
                 * Salva o estado restaurado.
                 */

                salvarConfiguracoes();


                /*
                 * Fecha menu.
                 */

                fecharMenu();

            }
        );

    }


    /* =====================================================
       19. FOOTER
    ===================================================== */

    if (anoAtual) {

        anoAtual.textContent =
            new Date().getFullYear();

    }


    /*
     * Links internos do footer.
     */

    const linksInternos =
        document.querySelectorAll(
            '.footer a[href^="#"]'
        );


    linksInternos.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const destino =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !destino ||
                        destino === "#"
                    ) {

                        return;

                    }


                    const elemento =
                        document.querySelector(
                            destino
                        );


                    if (!elemento) {

                        return;

                    }


                    event.preventDefault();


                    elemento.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


    /* =====================================================
       20. ANIMAÇÃO DOS ÍCONES SOCIAIS
    ===================================================== */

    const redesSociais =
        document.querySelectorAll(
            ".footer-social a"
        );


    redesSociais.forEach(
        rede => {

            rede.addEventListener(
                "mouseenter",
                () => {

                    rede.style.zIndex = "5";

                }
            );


            rede.addEventListener(
                "mouseleave",
                () => {

                    rede.style.zIndex = "";

                }
            );

        }
    );


    /* =====================================================
       21. INICIALIZAÇÃO
    ===================================================== */

    carregarConfiguracoes();

});
