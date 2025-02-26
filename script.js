//* --------------Função hamburguer ----------------------//

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("expanded");
}

// * ------------- Função dropdawn/modal -----------------//
function toggleModal(event) {
    event.preventDefault();
    let modal = document.getElementById("transaction-modal");
    let button = document.getElementById("transaction-btn");

    // Alterna a visibilidade do mini modal com animação
    if (modal.classList.contains("show")) {
        modal.classList.remove("show");
        setTimeout(() => (modal.style.display = "none"), 200); // Aguarda fade-out
        button.classList.remove("open");
    } else {
        modal.style.display = "block";
        setTimeout(() => modal.classList.add("show"), 10); // Aguarda antes de exibir
        button.classList.add("open");
    }
}

// Fechar o modal ao clicar fora
document.addEventListener("click", function (event) {
    let modal = document.getElementById("transaction-modal");
    let button = document.getElementById("transaction-btn");

    if (!event.target.closest("#transaction-modal") && !event.target.closest("#transaction-btn")) {
        modal.classList.remove("show");
        setTimeout(() => (modal.style.display = "none"), 200);
        button.classList.remove("open");
    }
});
