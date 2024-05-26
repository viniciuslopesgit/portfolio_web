document.addEventListener("DOMContentLoaded", function() {
    // Desativar a seleção de texto na página
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none"; // Para navegadores baseados no WebKit
    document.body.style.msUserSelect = "none"; // Para navegadores baseados no Trident/Edge

    // Desativar o clique com o botão direito na página
    document.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });

    const images = [
        "../imgs/installation_views/no_outro_dia/viniciuslopes_no_outro_dia_installationview_1.jpg",
        "../imgs/installation_views/no_outro_dia/viniciuslopes_no_outro_dia_installationview_2.jpg",
        "../imgs/installation_views/no_outro_dia/viniciuslopes_no_outro_dia_installationview_3.jpg",
        "../imgs/installation_views/no_outro_dia/viniciuslopes_no_outro_dia_installationview_4.jpg",
        "../imgs/installation_views/no_outro_dia/viniciuslopes_no_outro_dia_installationview_4a.jpg",
        "../imgs/installation_views/no_outro_dia/viniciuslopes_no_outro_dia_installationview_5.jpg",
        "../imgs/installation_views/no_outro_dia/viniciuslopes_no_outro_dia_installationview_6.jpg",
        "../imgs/installation_views/no_outro_dia/viniciuslopes_no_outro_dia_installationview_7.jpg"
    ];

    let currentImageIndex = 0;
    const currentImgElement = document.getElementById("current-img");

    // Função para exibir a imagem atual
    function showCurrentImage() {
        currentImgElement.src = images[currentImageIndex];
    }

    // Event listener para avançar para a próxima imagem
    currentImgElement.addEventListener("click", function(event) {
        const x = event.clientX;
        const imgWidth = currentImgElement.offsetWidth;
        if (x > imgWidth / 2) {
            nextImage();
        } else {
            prevImage();
        }
    });

    // Função para avançar para a próxima imagem
    function nextImage() {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        showCurrentImage();
    }

    // Função para voltar para a imagem anterior
    function prevImage() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }
        showCurrentImage();
    }

    // Event listeners para os botões "prev" e "next"
    document.getElementById("next-btn").addEventListener("click", nextImage);
    document.getElementById("prev-btn").addEventListener("click", prevImage);
    document.getElementById("next-btn-mobile").addEventListener("click", nextImage);
    document.getElementById("prev-btn-mobile").addEventListener("click", prevImage);

    // Função para lidar com erros de carregamento da imagem
    function handleImageError() {
        console.error("Erro ao carregar a imagem:", images[currentImageIndex]);
    }

    // Event listener para teclas do teclado
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowRight") {
            nextImage();
        } else if (event.key === "ArrowLeft") {
            prevImage();
        }
    });

    // Variáveis para rastrear o gesto de "swipe"
    let touchStartX = 0;
    let touchEndX = 0;

    // Event listeners para gestos de toque
    currentImgElement.addEventListener("touchstart", function(event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    currentImgElement.addEventListener("touchend", function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    // Função para lidar com gestos de "swipe"
    function handleSwipeGesture() {
        if (touchEndX < touchStartX) {
            nextImage();
        } else if (touchEndX > touchStartX) {
            prevImage();
        }
    }

    // Exibir a primeira imagem ao carregar a página
    showCurrentImage();
});
