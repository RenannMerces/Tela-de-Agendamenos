document.addEventListener("DOMContentLoaded", function() {
    const modalAviso = document.getElementById("myModal");
    const modalCadastro = document.getElementById("modalPrincipal");

    // Exibe o modal de aviso ao clicar no botão "Cancelar"
    document.getElementById("cancelBtn").addEventListener("click", function() {
        modalAviso.style.display = "flex"; 
    });

    // Fecha o modal de aviso ao clicar no botão "Não, voltar"
    document.getElementById("closeModalBtn").addEventListener("click", function() {
        modalAviso.style.display = "none"; 
    });

    // Ao clicar em "Sim", fecha ambos os modais
    document.getElementById("confirmBtn").addEventListener("click", function() {
        modalAviso.style.display = "none"; 
        modalCadastro.style.display = "none"; 
    });
});

// Formatação de campos (CPF, telefone, CEP, data)
function isNumber(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function formatCPF(input) {
    input.value = input.value.replace(/\D/g, '')
                             .replace(/(\d{3})(\d)/, '$1.$2')
                             .replace(/(\d{3})(\d)/, '$1.$2')
                             .replace(/(\d{3})(\d{2})$/, '$1-$2');
}

function formatPhone(input) {
    input.value = input.value.replace(/\D/g, '')
                             .replace(/(\d{2})(\d)/, '($1) $2')
                             .replace(/(\d{5})(\d)/, '$1-$2')
                             .replace(/-(\d{4})$/, '-$1');
}

function formatCEP(input) {
    input.value = input.value.replace(/\D/g, '')
                             .replace(/(\d{5})(\d)/, '$1-$2');
}

function formatDate(input) {
    input.value = input.value.replace(/\D/g, '')
                             .replace(/(\d{2})(\d)/, '$1/$2')
                             .replace(/(\d{2})(\d{4})$/, '$1/$2');
}

// Modal de cadastro
const modalCadastro = document.getElementById("modalPrincipal");
const btnAbrirCadastro = document.getElementById("openModalBtn");
const btnFecharCadastro = document.getElementsByClassName("close")[0];

btnAbrirCadastro.onclick = function() {
    modalCadastro.style.display = "block";
}

btnFecharCadastro.onclick = function() {
    modalCadastro.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalCadastro) {
        modalCadastro.style.display = "none";
    }
}
