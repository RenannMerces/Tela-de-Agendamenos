//* --------------Função hamburguer ----------------------//

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("expanded");
}

// * ------------- Função dropdawn/modal -----------------//
document.addEventListener("DOMContentLoaded", function () {
    const transactionBtn = document.getElementById("transaction-btn") || document.querySelector(".transaction-btn");
    const transactionModal = document.getElementById("transaction-modal") || document.querySelector(".transaction-mini-modal");

    function toggleModal(event) {
        event.preventDefault();

        if (transactionModal.classList.contains("show")) {
            transactionModal.classList.remove("show");
            setTimeout(() => (transactionModal.style.display = "none"), 200);
            transactionBtn.classList.remove("open");
        } else {
            transactionModal.style.display = "block";
            setTimeout(() => transactionModal.classList.add("show"), 10);
            transactionBtn.classList.add("open");
        }
    }

    if (transactionBtn && transactionModal) {
        transactionBtn.addEventListener("click", toggleModal);
    }
    
    document.addEventListener("click", function (event) {
        if (
            transactionModal &&
            transactionBtn &&
            !event.target.closest("#transaction-modal") &&
            !event.target.closest("#transaction-btn") &&
            !event.target.closest(".transaction-mini-modal")
        ) {
            transactionModal.classList.remove("show");
            setTimeout(() => (transactionModal.style.display = "none"), 200);
            transactionBtn.classList.remove("open");
        }
    });

    // ---- MINI MENU MOBILE ----
    const mobileMenuBtn = document.querySelector(".transaction-btn");
    const mobileMenu = document.querySelector(".transaction-mini-modal");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", function (event) {
            event.preventDefault();
            mobileMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove("show");
            }
        });
    }
});

//* ------ Truncate (aparecer o nome do coiso ao passar o mouse)-----------------//

document.addEventListener("DOMContentLoaded", function() {
    function aplicarTooltip() {
        document.querySelectorAll(".truncate").forEach(function(element) {
            element.removeAttribute("title");
            if (element.offsetWidth < element.scrollWidth) {
                element.setAttribute("title", element.textContent.trim());
            }
        });
    }
    aplicarTooltip();
    window.addEventListener("resize", aplicarTooltip);
});

//* ----------------- Botões de ação tabela -----------------//

document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.querySelector(".custom-table tbody");

    if (!tabela) return;

    const iconesAcoes = `
        <td class="actions">
            <i class="fas fa-pencil-alt text-warning"></i>
            <i class="fas fa-trash text-danger"></i>
            <i class="fas fa-dollar-sign text-success"></i>
            <i class="fas fa-file-alt text-primary"></i>
        </td>
    `;

    const adicionarAcoes = (linha) => {
        if (!linha.querySelector(".actions")) linha.insertAdjacentHTML("beforeend", iconesAcoes);
    };

    tabela.querySelectorAll("tr").forEach(adicionarAcoes);

    new MutationObserver((mutacoes) => {
        mutacoes.forEach((mutacao) => {
            mutacao.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.tagName === "TR") adicionarAcoes(node);
            });
        });
    }).observe(tabela, { childList: true });
});
