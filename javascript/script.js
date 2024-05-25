document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.menu a');
    const mainContent = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se o link deve ser aberto em uma nova aba
            if (this.getAttribute('target') === '_blank') {
                return;
            }

            e.preventDefault();
            const targetPage = this.getAttribute('data-content');

            // Remove a classe ativa de todos os links
            links.forEach(link => link.classList.remove('active'));

            // Adiciona a classe ativa ao link clicado
            this.classList.add('active');

            fetch(targetPage)
                .then(response => response.text())
                .then(data => {
                    mainContent.innerHTML = data;
                })
                .catch(error => console.error('Error loading page:', error));
        });
    });
});
