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
// Função para trocar entre seções e manter o botão ativo
function mostrarSection(botaoAtivo, sectionAtiva) {
    // Oculta todas as seções
    document.getElementById("formEditarPerfil").classList.add("d-none");
    document.getElementById("formInfoProf").classList.add("d-none");
    document.getElementById("formAgendamento").classList.add("d-none");

    // Remove a classe "active" de todos os botões
    document.querySelectorAll(".menu-btn").forEach(btn => {
        btn.classList.remove("btn-primary", "active");
        btn.classList.add("btn-secondary");
    });

    // Exibe a seção correspondente
    document.getElementById(sectionAtiva).classList.remove("d-none");

    // Ativa o botão correto
    botaoAtivo.classList.remove("btn-secondary");
    botaoAtivo.classList.add("btn-primary", "active");
}

    document.getElementById("btnEditarPerfil").addEventListener("click", function() {
        mostrarSection(this, "formEditarPerfil");
    });

    document.getElementById("btnInfoPrincipal").addEventListener("click", function() {
        mostrarSection(this, "formInfoProf");
    });

    document.getElementById("btnAgendamento").addEventListener("click", function() {
        mostrarSection(this, "formAgendamento");
    });

    // Garante que "Informação Principal" esteja ativo por padrão
    document.addEventListener("DOMContentLoaded", function() {
        mostrarSection(document.getElementById("btnInfoPrincipal"), "formInfoProf");
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

//& -------------------------------------------------------------- CALENDÁRIO ----------------------------------------------------------- //

document.addEventListener("DOMContentLoaded", () => {
    const calendarDays = document.getElementById("calendarDays");
    const currentMonthYear = document.getElementById("currentMonthYear");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const accordionContainer = document.querySelector(".accordion-container");

    let currentDate = new Date();
    let selectedDate = new Date(); // Sempre começa no dia atual
    const today = new Date();
    
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

    // Renderiza o calendário
    const renderCalendar = () => {
        calendarDays.innerHTML = "";
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        currentMonthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

        // Adiciona os nomes dos dias da semana
        daysOfWeek.forEach(day => {
            const dayName = document.createElement("div");
            dayName.textContent = day;
            dayName.classList.add("day-name");
            calendarDays.appendChild(dayName);
        });

        // Preenche os dias em branco antes do início do mês
        [...Array(firstDay)].forEach(() => calendarDays.appendChild(document.createElement("div")));

        // Adiciona os dias do mês
        [...Array(lastDate)].forEach((_, i) => {
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
            const formattedDate = formatDate(dayDate);
            const dayElement = document.createElement("div");
            dayElement.textContent = i + 1;

            // Marca o dia de hoje
            if (isToday(dayDate)) dayElement.classList.add("today");

            // Marca o dia selecionado
            if (isSameDay(selectedDate, dayDate)) dayElement.classList.add("selected-day");

            // Marca o mês atual
            if (isCurrentMonth(dayDate)) dayElement.classList.add("current-month");

            // Adiciona evento de clique para atualizar os agendamentos
            dayElement.addEventListener("click", () => {
                selectedDate = dayDate;
                renderCalendar();
                updateAgendamentos(formattedDate);
            });

            calendarDays.appendChild(dayElement);
        });

        // Atualiza os agendamentos do dia atual ao iniciar
        if (!selectedDate || isToday(selectedDate)) {
            selectedDate = new Date();
            updateAgendamentos(formatDate(selectedDate));
        }
    };

    // Formata a data para o padrão dd/mm/yyyy
    const formatDate = (date) => {
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Verifica se a data fornecida é o dia de hoje
    const isToday = (date) => date.toDateString() === today.toDateString();

    // Verifica se duas datas são o mesmo dia
    const isSameDay = (date1, date2) => date1.toDateString() === date2.toDateString();

    // Verifica se a data pertence ao mês atual
    const isCurrentMonth = (date) => date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();

    // Navega para o mês anterior
    prevMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    // Navega para o próximo mês
    nextMonthBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Inicializa o calendário já mostrando os agendamentos do dia atual
    renderCalendar();
});
