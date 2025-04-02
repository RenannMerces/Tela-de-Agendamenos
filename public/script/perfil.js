//* ----------------------------Função hamburguer ----------------------//

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("expanded");
}

// * ------------------------ Função dropdawn/modal -----------------------//
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

//* --------------------- EDITAR PERFIL SECTION ------------------------

document.addEventListener("DOMContentLoaded", function () {
    const btnEditar = document.getElementById("editarPerfil");
    const botoesAcoes = document.getElementById("botoesAcoes");
    const inputs = document.querySelectorAll("#perfilForm input, #perfilForm select");

    function toggleModoEdicao(ativo) {
        btnEditar.classList.toggle("d-none", ativo);
        botoesAcoes.classList.toggle("d-none", !ativo);
        inputs.forEach(input => input.disabled = !ativo);
    }

    btnEditar.addEventListener("click", () => toggleModoEdicao(true));
    document.getElementById("btnSalvar").addEventListener("click", (e) => {
        e.preventDefault();
        toggleModoEdicao(false);
    });
    document.getElementById("btnCancelar").addEventListener("click", () => toggleModoEdicao(false));
});



//& -------------------- ACTIVE BUTTON -----------------------  
    document.querySelectorAll('.menu-btn').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelector('.menu-btn.active')?.classList.remove('active');
            this.classList.add('active');
        });
    });
