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
        const resultadoBusca = document.getElementById("resultadoBusca");
        const cards = Array.from(document.querySelectorAll("[data-category]"));
        const newsletterForm = document.getElementById("newsletterForm");

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

        const NIVEIS_TEXTO = [85, 100, 120, 140, 160];
        let nivelTexto = 100;

        function normalizarTexto(texto) {
            return String(texto || "")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim();
        }

        function classeTexto() {
            return `texto-${nivelTexto}`;
        }

        function aplicarNivelTexto(nivel) {
            nivel = Math.max(85, Math.min(160, nivel));
            nivel = NIVEIS_TEXTO.reduce((maisProximo, valor) =>
                Math.abs(valor - nivel) < Math.abs(maisProximo - nivel) ? valor : maisProximo, 100);
            nivelTexto = nivel;
            body.classList.remove("texto-85", "texto-100", "texto-120", "texto-140", "texto-160");
            body.classList.add(classeTexto());
        }

        function salvarConfiguracoes() {
            const configuracoes = {
                dark: body.classList.contains("dark"),
                texto: nivelTexto,
                links: body.classList.contains("destacar-links"),
                leitura: body.classList.contains("modo-leitura"),
                daltonismo: CLASSES_DALTONISMO.find(classe => body.classList.contains(classe))?.replace("daltonismo-", "") || "normal"
            };
            try {
                localStorage.setItem("techNewsAcessibilidade", JSON.stringify(configuracoes));
            } catch (erro) {
                console.warn("Não foi possível salvar as configurações.", erro);
            }
        }

        function atualizarStatus() {
            const escuro = body.classList.contains("dark");
            const links = body.classList.contains("destacar-links");
            const leitura = body.classList.contains("modo-leitura");

            statusDark.textContent = escuro ? "ON" : "OFF";
            statusLinks.textContent = links ? "ON" : "OFF";
            statusLeitura.textContent = leitura ? "ON" : "OFF";

            btnDarkMenu.classList.toggle("ativo", escuro);
            btnDestacarLinks.classList.toggle("ativo", links);
            btnModoLeitura.classList.toggle("ativo", leitura);

            btnDarkMenu.querySelector("i").className = escuro ? "fa-solid fa-sun" : "fa-solid fa-moon";
            btnDarkMenu.querySelector("span").textContent = escuro ? "Modo Claro" : "Modo Escuro";

            btnAumentarTexto.classList.toggle("ativo", nivelTexto >= 120);
            btnDiminuirTexto.classList.toggle("ativo", nivelTexto <= 85);

            btnAumentarTexto.querySelector(".status").textContent = nivelTexto >= 160 ? "MAX" : "A+";
            btnDiminuirTexto.querySelector(".status").textContent = nivelTexto <= 85 ? "MIN" : "A−";
        }

        function aplicarDaltonismo(tipo, salvar = true) {
            if (!TIPOS_DALTONISMO.includes(tipo)) {
                tipo = "normal";
            }

            body.classList.remove(...CLASSES_DALTONISMO);

            if (tipo !== "normal") {
                body.classList.add(`daltonismo-${tipo}`);
            }

            submenuDaltonismo.querySelectorAll("button").forEach(botao => {
                const ativo = botao.dataset.daltonismo === tipo;
                botao.classList.toggle("ativo", ativo);
                botao.setAttribute("aria-pressed", String(ativo));
            });

            if (salvar) {
                salvarConfiguracoes();
            }
        }

        function carregarConfiguracoes() {
            try {
                const armazenamento = localStorage.getItem("techNewsAcessibilidade");
                if (!armazenamento) {
                    aplicarNivelTexto(100);
                    aplicarDaltonismo("normal", false);
                    atualizarStatus();
                    return;
                }

                const dados = JSON.parse(armazenamento);

                body.classList.toggle("dark", Boolean(dados.dark));
                body.classList.toggle("destacar-links", Boolean(dados.links));
                body.classList.toggle("modo-leitura", Boolean(dados.leitura));

                aplicarNivelTexto(Number(dados.texto) || 100);
                aplicarDaltonismo(dados.daltonismo || "normal", false);
                atualizarStatus();
            } catch (erro) {
                console.warn("Não foi possível carregar as configurações.", erro);
                body.classList.remove("dark", "destacar-links", "modo-leitura", ...CLASSES_DALTONISMO);
                aplicarNivelTexto(100);
                aplicarDaltonismo("normal", false);
                atualizarStatus();
            }
        }

        function abrirMenu() {
            const aberto = !menu.classList.contains("ativo");

            menu.classList.toggle("ativo", aberto);
            btnMenu.classList.toggle("ativo", aberto);

            btnMenu.setAttribute("aria-expanded", String(aberto));
            btnMenu.setAttribute("aria-label", aberto ? "Fechar menu de acessibilidade" : "Abrir menu de acessibilidade");
            menu.setAttribute("aria-hidden", String(!aberto));
        }

        function fecharMenu() {
            menu.classList.remove("ativo");
            btnMenu.classList.remove("ativo");
            btnMenu.setAttribute("aria-expanded", "false");
            btnMenu.setAttribute("aria-label", "Abrir menu de acessibilidade");
            menu.setAttribute("aria-hidden", "true");
        }

        function realizarBusca() {
            const termo = normalizarTexto(campoBusca.value);
            let encontrados = 0;

            cards.forEach(card => {
                const texto = normalizarTexto([
                    card.innerText,
                    card.dataset.search,
                    card.dataset.category
                ].join(" "));

                const corresponde = termo === "" || texto.includes(termo);
                card.classList.toggle("oculto", !corresponde);

                if (corresponde) {
                    encontrados++;
                }
            });

            limparBusca.classList.toggle("visivel", termo.length > 0);

            if (termo !== "") {
                resultadoBusca.classList.add("visivel");
                resultadoBusca.innerHTML = encontrados === 0
                    ? `<strong>Nenhuma notícia encontrada.</strong><br>Tente buscar por <strong>IA</strong>, <strong>hardware</strong>, <strong>games</strong>, <strong>mobile</strong> ou <strong>segurança</strong>.`
                    : `${encontrados} conteúdo(s) encontrado(s) para "${campoBusca.value}".`;
            } else {
                resultadoBusca.classList.remove("visivel");
                resultadoBusca.textContent = "";
            }
        }

        function aumentarTexto() {
            const indice = NIVEIS_TEXTO.indexOf(nivelTexto);
            if (indice < NIVEIS_TEXTO.length - 1) {
                aplicarNivelTexto(NIVEIS_TEXTO[indice + 1]);
            }
            atualizarStatus();
            salvarConfiguracoes();
        }

        function diminuirTexto() {
            const indice = NIVEIS_TEXTO.indexOf(nivelTexto);
            if (indice > 0) {
                aplicarNivelTexto(NIVEIS_TEXTO[indice - 1]);
            }
            atualizarStatus();
            salvarConfiguracoes();
        }

        function restaurarConfiguracoes() {
            body.classList.remove("dark", "destacar-links", "modo-leitura", ...CLASSES_DALTONISMO);
            aplicarNivelTexto(100);
            aplicarDaltonismo("normal", false);
            submenuDaltonismo.classList.remove("ativo");
            btnDaltonismo.setAttribute("aria-expanded", "false");
            atualizarStatus();
            salvarConfiguracoes();
        }

        function abrirAtalhos() {
            fecharMenu();
            modalAtalhos.classList.add("ativo");
            fecharModal.focus();
        }

        function fecharAtalhos() {
            modalAtalhos.classList.remove("ativo");
            btnMenu.focus();
        }

        btnMenu.addEventListener("click", event => {
            event.stopPropagation();
            abrirMenu();
        });

        menu.addEventListener("click", event => event.stopPropagation());

        document.addEventListener("click", event => {
            if (!menu.contains(event.target) && !btnMenu.contains(event.target)) {
                fecharMenu();
            }
        });

        btnDarkMenu.addEventListener("click", () => {
            body.classList.toggle("dark");
            atualizarStatus();
            salvarConfiguracoes();
        });

        btnAumentarTexto.addEventListener("click", aumentarTexto);
        btnDiminuirTexto.addEventListener("click", diminuirTexto);

        btnDestacarLinks.addEventListener("click", () => {
            body.classList.toggle("destacar-links");
            atualizarStatus();
            salvarConfiguracoes();
        });

        btnModoLeitura.addEventListener("click", () => {
            body.classList.toggle("modo-leitura");
            atualizarStatus();
            salvarConfiguracoes();
        });

        btnAtalhos.addEventListener("click", abrirAtalhos);

        btnDaltonismo.addEventListener("click", () => {
            const aberto = !submenuDaltonismo.classList.contains("ativo");
            submenuDaltonismo.classList.toggle("ativo", aberto);
            btnDaltonismo.setAttribute("aria-expanded", String(aberto));
        });

        submenuDaltonismo.querySelectorAll("button").forEach(botao => {
            botao.addEventListener("click", () => {
                aplicarDaltonismo(botao.dataset.daltonismo);
            });
        });

        btnRestaurar.addEventListener("click", restaurarConfiguracoes);
        fecharModal.addEventListener("click", fecharAtalhos);

        modalAtalhos.addEventListener("click", event => {
            if (event.target === modalAtalhos) {
                fecharAtalhos();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                fecharMenu();

                if (modalAtalhos.classList.contains("ativo")) {
                    fecharAtalhos();
                }
            }

            if (event.altKey && !event.ctrlKey && !event.shiftKey) {
                const tecla = event.key.toLowerCase();

                if (tecla === "h") {
                    event.preventDefault();
                    window.location.href = "index.html";
                }

                if (tecla === "b") {
                    event.preventDefault();
                    campoBusca.focus();
                }

                if (tecla === "m") {
                    event.preventDefault();
                    abrirMenu();
                }

                if (event.key === "+" || event.key === "=") {
                    event.preventDefault();
                    aumentarTexto();
                }

                if (event.key === "-" || event.key === "_") {
                    event.preventDefault();
                    diminuirTexto();
                }

                if (tecla === "r") {
                    event.preventDefault();
                    body.classList.toggle("modo-leitura");
                    atualizarStatus();
                    salvarConfiguracoes();
                }
            }
        });

        campoBusca.addEventListener("input", realizarBusca);

        limparBusca.addEventListener("click", () => {
            campoBusca.value = "";
            realizarBusca();
            campoBusca.focus();
        });

        document.querySelectorAll(".ler-mais").forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault();
                alert("A página completa desta notícia será adicionada em breve.");
            });
        });

        newsletterForm.addEventListener("submit", event => {
            event.preventDefault();

            const email = newsletterForm.querySelector("input").value.trim();

            if (!email) {
                return;
            }

            alert("Cadastro realizado com sucesso!");
            newsletterForm.reset();
        });

        carregarConfiguracoes();
        realizarBusca();
