document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.menu a');
    const mainContent = document.getElementById('content');

    // Função para carregar conteúdo
    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
            })
            .catch(error => console.error('Error loading page:', error));
    }

    // Simular clique no link "news" ao carregar a página
    const newsLink = document.getElementById('installation-link');
    newsLink.classList.add('active'); // Adiciona a classe 'active' ao link "news"
    loadContent(newsLink.getAttribute('data-content')); // Carrega o conteúdo da página "news.html"

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
