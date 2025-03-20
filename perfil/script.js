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

//& --------------------- MENU DE BOTÕES -----------------------

document.getElementById("btnEditarPerfil").addEventListener("click", function() {
    document.getElementById("formEditarPerfil").classList.toggle("d-none");
});

document.getElementById("btnCancelar").addEventListener("click", function() {
    document.getElementById("formEditarPerfil").classList.add("d-none");
});


//* --------------------- EDITAR PERFIL SECTION ------------------------

document.addEventListener("DOMContentLoaded", function () {
    const campos = {
        cpf: document.getElementById("cpf"),
        email: document.getElementById("email"),
        telefone1: document.getElementById("telefone"),
        telefone2: document.getElementById("telefone2"),
    };
    const salvarBtn = document.querySelector(".btn-success");

    // Função para formatar entrada de texto conforme máscara
    function formatarCampo(input, mascara) {
        input.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, ""); // Remove não numéricos
            this.value = mascara(valor);
        });
    }

    // Máscara CPF
    function mascaraCPF(valor) {
        return valor.slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    // Máscara Telefone (formato (00) 00000-0000)
    function mascaraTelefone(valor) {
        return valor.slice(0, 11)
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    }

    // Aplicando máscaras
    formatarCampo(campos.cpf, mascaraCPF);
    formatarCampo(campos.telefone1, mascaraTelefone);
    formatarCampo(campos.telefone2, mascaraTelefone);

    // Validação de e-mail (Gmail, Hotmail e e-mails gerais)
    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
        return regex.test(email);
    }

    // Validação geral antes de salvar
    salvarBtn.addEventListener("click", function (event) {
        let erros = [];

        if (campos.cpf.value.replace(/\D/g, "").length !== 11) {
            erros.push("CPF inválido!");
        }
        if (!validarEmail(campos.email.value)) {
            erros.push("E-mail inválido! Use Gmail, Hotmail ou um domínio válido.");
        }
        if (campos.telefone1.value.replace(/\D/g, "").length < 10) {
            erros.push("Telefone 1 inválido!");
        }
        if (campos.telefone2.value.replace(/\D/g, "").length < 10) {
            erros.push("Telefone 2 inválido!");
        }

        if (erros.length) {
            alert(erros.join("\n"));
            event.preventDefault();
        }
    });
});
