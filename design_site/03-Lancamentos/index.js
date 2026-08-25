 /* =========================================================
           TECHNEWS
           SISTEMA DE ACESSIBILIDADE
           
           Este sistema mantém as configurações do usuário entre
           as diferentes páginas do site através do localStorage.
    
           CONFIGURAÇÕES SALVAS:
           - Modo escuro
           - Tamanho do texto
           - Destacar links
           - Modo de leitura
           - Daltonismo
    
           IMPORTANTE:
           Todas as páginas devem utilizar esta mesma lógica.
        ========================================================= */


        /* =========================================================
           1. ELEMENTOS PRINCIPAIS DO HTML
        ========================================================= */

        const body = document.body;

        const btnMenu = document.getElementById("btnMenu");
        const menu = document.getElementById("menu");

        const btnDarkMenu = document.getElementById("btnDarkMenu");
        const statusDark = document.getElementById("statusDark");

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

        const btnDaltonismo =
            document.getElementById("btnDaltonismo");

        const submenuDaltonismo =
            document.getElementById("submenuDaltonismo");

        const btnRestaurar =
            document.getElementById("btnRestaurar");

        const modalAtalhos =
            document.getElementById("modalAtalhos");

        const fecharModal =
            document.getElementById("fecharModal");

        const campoBusca =
            document.getElementById("campoBusca");

        const limparBusca =
            document.getElementById("limparBusca");


        /* =========================================================
           2. CONFIGURAÇÕES DO SISTEMA
        ========================================================= */

        /*
         * Classes utilizadas para os modos de daltonismo.
         */
        const CLASSES_DALTONISMO = [
            "daltonismo-protanopia",
            "daltonismo-deuteranopia",
            "daltonismo-tritanopia"
        ];


        /*
         * Tipos disponíveis de daltonismo.
         */
        const TIPOS_DALTONISMO = [
            "normal",
            "protanopia",
            "deuteranopia",
            "tritanopia"
        ];


        /*
         * Níveis disponíveis para o tamanho do texto.
         *
         * 85%  = diminuir
         * 100% = normal
         * 120% = aumentar
         * 140% = aumentar bastante
         * 160% = máximo
         */
        const NIVEIS_TEXTO = [
            85,
            100,
            120,
            140,
            160
        ];


        /*
         * Nível atual do texto.
         */
        let nivelTexto = 100;


        /*
         * Nome usado para salvar as configurações.
         *
         * NÃO ALTERE este nome entre as páginas.
         */
        const CHAVE_CONFIGURACOES =
            "techNewsAcessibilidade";


        /* =========================================================
           3. MENU HAMBÚRGUER
        ========================================================= */

        /*
         * Abre ou fecha o menu.
         */
        function abrirMenu() {

            const aberto =
                !menu.classList.contains("ativo");


            menu.classList.toggle(
                "ativo",
                aberto
            );


            btnMenu.classList.toggle(
                "ativo",
                aberto
            );


            btnMenu.setAttribute(
                "aria-expanded",
                String(aberto)
            );


            btnMenu.setAttribute(
                "aria-label",
                aberto
                    ? "Fechar menu de acessibilidade"
                    : "Abrir menu de acessibilidade"
            );


            menu.setAttribute(
                "aria-hidden",
                String(!aberto)
            );
        }


        /*
         * Fecha o menu.
         */
        function fecharMenu() {

            menu.classList.remove("ativo");

            btnMenu.classList.remove("ativo");

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
        }


        /*
         * Clique no botão hambúrguer.
         */
        btnMenu.addEventListener("click", event => {

            event.stopPropagation();

            abrirMenu();

        });


        /*
         * Impede que um clique dentro do menu
         * feche o próprio menu.
         */
        menu.addEventListener("click", event => {

            event.stopPropagation();

        });


        /*
         * Clique fora do menu fecha o menu.
         */
        document.addEventListener("click", event => {

            if (
                !menu.contains(event.target) &&
                !btnMenu.contains(event.target)
            ) {

                fecharMenu();

            }

        });


        /* =========================================================
           4. CAMPO DE BUSCA
        ========================================================= */

        /*
         * Mostra o botão X quando o usuário digita.
         */
        campoBusca.addEventListener("input", () => {

            limparBusca.classList.toggle(
                "visivel",
                campoBusca.value.length > 0
            );

        });


        /*
         * Limpa a busca.
         */
        limparBusca.addEventListener("click", () => {

            campoBusca.value = "";

            limparBusca.classList.remove(
                "visivel"
            );

            campoBusca.focus();

        });


        /* =========================================================
           5. MODO ESCURO
        ========================================================= */

        btnDarkMenu.addEventListener("click", () => {

            body.classList.toggle("dark");

            atualizarStatus();

            salvarConfiguracoes();

        });


        /* =========================================================
           6. TAMANHO DO TEXTO
        ========================================================= */

        /*
         * Aplica o tamanho escolhido pelo usuário.
         *
         * IMPORTANTE:
         * O tamanho original de cada elemento é salvo
         * somente uma vez.
         *
         * Dessa forma:
         *
         * 100% → 120%
         * 120% → 140%
         * 140% → 160%
         *
         * não causa crescimento infinito.
         */
        function aplicarNivelTexto(nivel) {

            /*
             * Garante que o valor fique entre 85 e 160.
             */
            nivel = Math.max(
                85,
                Math.min(160, nivel)
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


            /*
             * Atualiza a variável global.
             */
            nivelTexto = nivel;


            /*
             * Remove classes antigas.
             */
            body.classList.remove(
                "texto-85",
                "texto-100",
                "texto-120",
                "texto-140",
                "texto-160"
            );


            /*
             * Adiciona a classe correspondente.
             */
            body.classList.add(
                `texto-${nivelTexto}`
            );


            /* =====================================================
               APLICAÇÃO DIRETA DO TAMANHO
            ===================================================== */

            /*
             * Seleciona elementos que possuem texto.
             *
             * Script, style, svg e path são ignorados.
             */
            const elementos =
                document.querySelectorAll(
                    "body *:not(script):not(style):not(svg):not(path)"
                );


            elementos.forEach(elemento => {

                /*
                 * Verifica se existe texto diretamente
                 * dentro do elemento.
                 */
                const possuiTextoDireto =
                    Array.from(
                        elemento.childNodes
                    ).some(
                        node =>
                            node.nodeType === Node.TEXT_NODE &&
                            node.textContent.trim().length > 0
                    );


                /*
                 * Se não possui texto diretamente,
                 * não altera o elemento.
                 */
                if (!possuiTextoDireto) {
                    return;
                }


                /*
                 * Salva o tamanho original somente uma vez.
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


                    if (!Number.isNaN(tamanhoAtual)) {

                        elemento.dataset.fontSizeOriginal =
                            tamanhoAtual;

                    }

                }


                /*
                 * Recupera o tamanho original.
                 */
                const original =
                    parseFloat(
                        elemento.dataset.fontSizeOriginal
                    );


                /*
                 * Se não for possível encontrar
                 * o tamanho original, ignora.
                 */
                if (Number.isNaN(original)) {
                    return;
                }


                /*
                 * Calcula o novo tamanho.
                 */
                const novoTamanho =
                    original *
                    (nivelTexto / 100);


                /*
                 * Aplica o novo tamanho.
                 */
                elemento.style.fontSize =
                    `${novoTamanho}px`;

            });

        }


        /*
         * Aumentar texto.
         */
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


        /*
         * Diminuir texto.
         */
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


        /*
         * Eventos dos botões.
         */
        btnAumentarTexto.addEventListener(
            "click",
            aumentarTexto
        );


        btnDiminuirTexto.addEventListener(
            "click",
            diminuirTexto
        );


        /* =========================================================
           7. ATUALIZAR STATUS DO MENU
        ========================================================= */

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


            /*
             * Status ON/OFF.
             */
            statusDark.textContent =
                escuro ? "ON" : "OFF";


            statusLinks.textContent =
                links ? "ON" : "OFF";


            statusLeitura.textContent =
                leitura ? "ON" : "OFF";


            /*
             * Marca os botões como ativos.
             */
            btnDarkMenu.classList.toggle(
                "ativo",
                escuro
            );


            btnDestacarLinks.classList.toggle(
                "ativo",
                links
            );


            btnModoLeitura.classList.toggle(
                "ativo",
                leitura
            );


            /*
             * Ícone do modo escuro.
             */
            btnDarkMenu.querySelector(
                "i"
            ).className =
                escuro
                    ? "fa-solid fa-sun"
                    : "fa-solid fa-moon";


            /*
             * Texto do botão.
             */
            btnDarkMenu.querySelector(
                "span"
            ).textContent =
                escuro
                    ? "Modo Claro"
                    : "Modo Escuro";


            /*
             * Status do aumento.
             */
            btnAumentarTexto.querySelector(
                ".status"
            ).textContent =
                nivelTexto >= 160
                    ? "MAX"
                    : "A+";


            /*
             * Status da diminuição.
             */
            btnDiminuirTexto.querySelector(
                ".status"
            ).textContent =
                nivelTexto <= 85
                    ? "MIN"
                    : "A−";

        }


        /* =========================================================
           8. SALVAR CONFIGURAÇÕES
           
           Tudo fica armazenado no navegador.
           
           Quando o usuário trocar de página, a outra página
           poderá recuperar exatamente estas configurações.
        ========================================================= */

        function salvarConfiguracoes() {

            /*
             * Descobre qual modo de daltonismo está ativo.
             */
            let daltonismo = "normal";


            if (
                body.classList.contains(
                    "daltonismo-protanopia"
                )
            ) {

                daltonismo = "protanopia";

            }


            if (
                body.classList.contains(
                    "daltonismo-deuteranopia"
                )
            ) {

                daltonismo = "deuteranopia";

            }


            if (
                body.classList.contains(
                    "daltonismo-tritanopia"
                )
            ) {

                daltonismo = "tritanopia";

            }


            /*
             * Monta o objeto que será salvo.
             */
            const configuracoes = {

                /*
                 * Modo escuro.
                 */
                dark:
                    body.classList.contains(
                        "dark"
                    ),


                /*
                 * Tamanho do texto.
                 */
                texto:
                    nivelTexto,


                /*
                 * Destacar links.
                 */
                links:
                    body.classList.contains(
                        "destacar-links"
                    ),


                /*
                 * Modo de leitura.
                 */
                leitura:
                    body.classList.contains(
                        "modo-leitura"
                    ),


                /*
                 * Daltonismo.
                 */
                daltonismo:
                    daltonismo

            };


            /*
             * Salva no navegador.
             */
            try {

                localStorage.setItem(
                    CHAVE_CONFIGURACOES,
                    JSON.stringify(
                        configuracoes
                    )
                );

            } catch (erro) {

                console.warn(
                    "Não foi possível salvar as configurações.",
                    erro
                );

            }

        }


        /* =========================================================
           9. CARREGAR CONFIGURAÇÕES
           
           ESTA FUNÇÃO É EXECUTADA TODA VEZ QUE A PÁGINA ABRE.
    
           Portanto:
    
           Games → Tendências
    
           Tendências lê o localStorage e aplica as mesmas
           configurações automaticamente.
        ========================================================= */

        function carregarConfiguracoes() {

            try {

                /*
                 * Busca as configurações salvas.
                 */
                const dadosSalvos =
                    localStorage.getItem(
                        CHAVE_CONFIGURACOES
                    );


                /*
                 * Se não houver configuração salva,
                 * usa os valores padrão.
                 */
                if (!dadosSalvos) {

                    body.classList.remove(
                        "dark",
                        "destacar-links",
                        "modo-leitura",
                        ...CLASSES_DALTONISMO
                    );


                    aplicarNivelTexto(100);


                    aplicarDaltonismo(
                        "normal"
                    );


                    atualizarStatus();


                    return;

                }


                /*
                 * Converte o JSON para objeto.
                 */
                const dados =
                    JSON.parse(
                        dadosSalvos
                    );


                /* =================================================
                   MODO ESCURO
                ================================================= */

                body.classList.toggle(
                    "dark",
                    Boolean(dados.dark)
                );


                /* =================================================
                   DESTACAR LINKS
                ================================================= */

                body.classList.toggle(
                    "destacar-links",
                    Boolean(dados.links)
                );


                /* =================================================
                   MODO DE LEITURA
                ================================================= */

                body.classList.toggle(
                    "modo-leitura",
                    Boolean(dados.leitura)
                );


                /* =================================================
                   TAMANHO DO TEXTO
                ================================================= */

                aplicarNivelTexto(
                    Number(dados.texto) || 100
                );


                /* =================================================
                   DALTONISMO
                ================================================= */

                aplicarDaltonismo(
                    dados.daltonismo || "normal"
                );


                /* =================================================
                   ATUALIZA O MENU
                ================================================= */

                atualizarStatus();

            } catch (erro) {

                /*
                 * Se houver algum erro no localStorage,
                 * volta para o padrão.
                 */
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


                aplicarDaltonismo(
                    "normal"
                );


                atualizarStatus();

            }

        }


        /* =========================================================
           10. DESTACAR LINKS
        ========================================================= */

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


        /* =========================================================
           11. MODO DE LEITURA
        ========================================================= */

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


        /* =========================================================
           12. DALTONISMO
        ========================================================= */

        function aplicarDaltonismo(tipo) {

            /*
             * Verifica se o tipo existe.
             */
            if (
                !TIPOS_DALTONISMO.includes(
                    tipo
                )
            ) {

                tipo = "normal";

            }


            /*
             * Remove todos os filtros anteriores.
             */
            body.classList.remove(
                ...CLASSES_DALTONISMO
            );


            /*
             * Aplica o filtro escolhido.
             */
            if (tipo !== "normal") {

                body.classList.add(
                    `daltonismo-${tipo}`
                );

            }


            /*
             * Atualiza os botões do submenu.
             */
            submenuDaltonismo
                .querySelectorAll("button")
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


        /*
         * Abre/fecha submenu de daltonismo.
         */
        btnDaltonismo.addEventListener(
            "click",
            () => {

                const aberto =
                    !submenuDaltonismo.classList.contains(
                        "ativo"
                    );


                submenuDaltonismo.classList.toggle(
                    "ativo",
                    aberto
                );


                btnDaltonismo.setAttribute(
                    "aria-expanded",
                    String(aberto)
                );

            }
        );


        /*
         * Seleção do tipo de daltonismo.
         */
        submenuDaltonismo
            .querySelectorAll("button")
            .forEach(botao => {

                botao.addEventListener(
                    "click",
                    () => {

                        aplicarDaltonismo(
                            botao.dataset.daltonismo
                        );


                        /*
                         * Salva imediatamente.
                         */
                        salvarConfiguracoes();

                    }
                );

            });


        /* =========================================================
           13. RESTAURAR CONFIGURAÇÕES
           
           Coloca absolutamente tudo no padrão.
        ========================================================= */

        btnRestaurar.addEventListener(
            "click",
            () => {

                /*
                 * Remove os modos ativos.
                 */
                body.classList.remove(
                    "dark",
                    "destacar-links",
                    "modo-leitura",
                    ...CLASSES_DALTONISMO
                );


                /*
                 * Remove os tamanhos personalizados.
                 */
                document
                    .querySelectorAll(
                        "[data-font-size-original]"
                    )
                    .forEach(elemento => {

                        elemento.style.fontSize = "";

                        delete elemento.dataset
                            .fontSizeOriginal;

                    });


                /*
                 * Volta para 100%.
                 */
                aplicarNivelTexto(100);


                /*
                 * Volta para daltonismo normal.
                 */
                aplicarDaltonismo(
                    "normal"
                );


                /*
                 * Fecha submenu.
                 */
                submenuDaltonismo.classList.remove(
                    "ativo"
                );


                btnDaltonismo.setAttribute(
                    "aria-expanded",
                    "false"
                );


                /*
                 * Atualiza o menu.
                 */
                atualizarStatus();


                /*
                 * IMPORTANTE:
                 *
                 * Salva o estado restaurado.
                 *
                 * Assim, quando o usuário mudar de página,
                 * a outra página também ficará restaurada.
                 */
                salvarConfiguracoes();

            }
        );


        /* =========================================================
           14. MODAL DE ATALHOS
        ========================================================= */

        /*
         * Abre modal.
         */
        function abrirAtalhos() {

            fecharMenu();

            modalAtalhos.classList.add(
                "ativo"
            );

            fecharModal.focus();

        }


        /*
         * Fecha modal.
         */
        function fecharAtalhos() {

            modalAtalhos.classList.remove(
                "ativo"
            );

            btnMenu.focus();

        }


        /*
         * Botão de atalhos.
         */
        btnAtalhos.addEventListener(
            "click",
            abrirAtalhos
        );


        /*
         * Botão X do modal.
         */
        fecharModal.addEventListener(
            "click",
            fecharAtalhos
        );


        /*
         * Clique fora do conteúdo fecha modal.
         */
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


        /* =========================================================
           15. ATALHOS DE TECLADO
        ========================================================= */

        document.addEventListener(
            "keydown",
            event => {

                /* ================================================
                   ESC
                ================================================ */

                if (
                    event.key === "Escape"
                ) {

                    fecharMenu();


                    if (
                        modalAtalhos.classList.contains(
                            "ativo"
                        )
                    ) {

                        fecharAtalhos();

                    }

                }


                /*
                 * Os atalhos abaixo usam ALT.
                 */
                if (
                    event.altKey &&
                    !event.ctrlKey &&
                    !event.shiftKey
                ) {

                    const tecla =
                        event.key.toLowerCase();


                    /* ============================================
                       ALT + H
                       Ir para Home
                    ============================================ */

                    if (
                        tecla === "h"
                    ) {

                        event.preventDefault();

                        window.location.href =
                            "index.html";

                    }


                    /* ============================================
                       ALT + B
                       Focar busca
                    ============================================ */

                    if (
                        tecla === "b"
                    ) {

                        event.preventDefault();

                        campoBusca.focus();

                    }


                    /* ============================================
                       ALT + M
                       Abrir/fechar menu
                    ============================================ */

                    if (
                        tecla === "m"
                    ) {

                        event.preventDefault();

                        abrirMenu();

                    }


                    /* ============================================
                       ALT + +
                       Aumentar texto
                    ============================================ */

                    if (
                        event.key === "+" ||
                        event.key === "="
                    ) {

                        event.preventDefault();

                        aumentarTexto();

                    }


                    /* ============================================
                       ALT + -
                       Diminuir texto
                    ============================================ */

                    if (
                        event.key === "-" ||
                        event.key === "_"
                    ) {

                        event.preventDefault();

                        diminuirTexto();

                    }


                    /* ============================================
                       ALT + R
                       Modo de leitura
                    ============================================ */

                    if (
                        tecla === "r"
                    ) {

                        event.preventDefault();


                        body.classList.toggle(
                            "modo-leitura"
                        );


                        atualizarStatus();


                        salvarConfiguracoes();

                    }

                }

            }
        );


        /* =========================================================
           16. FOOTER
        ========================================================= */

        document.addEventListener(
            "DOMContentLoaded",
            () => {

                /* =================================================
                   ANO AUTOMÁTICO
                ================================================= */

                const anoAtual =
                    document.getElementById(
                        "anoAtual"
                    );


                if (anoAtual) {

                    anoAtual.textContent =
                        new Date().getFullYear();

                }


                /* =================================================
                   LINKS INTERNOS DO FOOTER
                ================================================= */

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


                                elemento.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",

                                        block:
                                            "start"
                                    }
                                );

                            }
                        );

                    }
                );


                /* =================================================
                   ANIMAÇÃO DOS ÍCONES SOCIAIS
                ================================================= */

                const redesSociais =
                    document.querySelectorAll(
                        ".footer-social a"
                    );


                redesSociais.forEach(
                    rede => {

                        rede.addEventListener(
                            "mouseenter",
                            () => {

                                rede.style.zIndex =
                                    "5";

                            }
                        );


                        rede.addEventListener(
                            "mouseleave",
                            () => {

                                rede.style.zIndex =
                                    "";

                            }
                        );

                    }
                );

            }
        );


        /* =========================================================
           17. INICIALIZAÇÃO
           
           ESTA LINHA É MUITO IMPORTANTE.
           
           Toda vez que uma nova página abrir, ela recuperará
           automaticamente as configurações salvas anteriormente.
        ========================================================= */

        carregarConfiguracoes();