document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.menu a');
    const mainContent = document.getElementById('content');

    // Função para carregar conteúdo e subir ao topo
    function loadContent(url, pushState = true) {
        const absoluteUrl = new URL(url, location.origin); // Converte para URL absoluta
        fetch(absoluteUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar a página: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                mainContent.innerHTML = data;
                attachLinkEvents(); // Reatribui eventos aos novos links

                // Scroll para o topo da página
                window.scrollTo(0, 0);

                // Atualiza o histórico se necessário
                if (pushState) {
                    history.pushState({ page: absoluteUrl.href }, '', absoluteUrl.href);
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Função para reatribuir eventos de clique a links dinâmicos
    function attachLinkEvents() {
        const newLinks = mainContent.querySelectorAll('a[data-content]');
        newLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Exceção para links externos e mailto:
                if (href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'))) {
                    console.log(`Externo ou mailto: ${href}`);
                    return; // Permite que o link seja aberto normalmente
                }

                e.preventDefault();
                const targetPage = this.getAttribute('data-content');
                loadContent(targetPage); // Carrega o novo conteúdo
            });
        });
    }

    // Event listener para os links do menu
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Exceção para links externos e mailto:
            if (href && (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'))) {
                console.log(`Externo ou mailto: ${href}`);
                return; // Permite que o link seja aberto normalmente
            }

            e.preventDefault();
            const targetPage = this.getAttribute('data-content');

            // Remove a classe ativa de todos os links
            links.forEach(link => link.classList.remove('active'));

            // Adiciona a classe ativa ao link clicado
            this.classList.add('active');

            // Carrega o conteúdo da página correspondente
            loadContent(targetPage);
        });
    });

    // Ouve eventos de alteração do histórico para lidar com "Voltar" e "Avançar"
    window.addEventListener('popstate', function (event) {
        if (event.state && event.state.page) {
            loadContent(event.state.page, false); // Carrega a página sem atualizar o histórico
        }
    });
});
