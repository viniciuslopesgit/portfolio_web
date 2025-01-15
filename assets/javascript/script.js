document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.menu a');
    const mainContent = document.getElementById('content');

    // Função para carregar conteúdo
    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                attachLinkEvents(); // Reatribui eventos aos novos links
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Função para reatribuir eventos de clique a links dinâmicos
    function attachLinkEvents() {
        const newLinks = mainContent.querySelectorAll('a[data-content]');
        newLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetPage = this.getAttribute('data-content');
                loadContent(targetPage); // Carrega o novo conteúdo
            });
        });
    }

    // Event listener para os links do menu
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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
});
