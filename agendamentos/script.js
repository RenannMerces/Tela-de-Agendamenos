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

//! --------------------Side Direita Mobile ------------------
document.addEventListener("DOMContentLoaded", function () {
    const aside = document.querySelector(".custom-aside");
    const toggleButton = document.getElementById("toggleAside");

    toggleButton.addEventListener("click", function () {
        aside.classList.toggle("show");  // Adiciona ou remove a classe 'show'
    });

    function checkScreenSize() {
        if (window.innerWidth <= 900) {
            aside.classList.remove("show"); // Certifique-se de esconder o aside quando a tela for pequena
        } else {
            aside.classList.add("show"); // Mostra o aside em telas maiores
        }
    }

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});

// * ------------------------- FILTRO ---------------------------

document.getElementById('aplicarFiltro').addEventListener('click', function() {
    const tipoProcedimento = document.getElementById('tipoProcedimento').value;
    const horario = document.getElementById('horario').value;
    const status = document.getElementById('status').value;

    const selectedDate = formatDate(new Date()); // Data selecionada no calendário
    updateAgendamentos(selectedDate, tipoProcedimento, horario, status);

    var myModal = bootstrap.Modal.getInstance(document.getElementById('filtroModal'));
    myModal.hide();
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

    // Simulando dados de agendamentos com múltiplos profissionais no mesmo dia
    const agendamentos = {
        "08/03/2025": {
            "Dr. João da Silva": [
                { horario: "16:00", duracao: "15 min", procedimento: "Exame", paciente: "Pedro Lima", status: "Pendente", payments_id: 10 }
            ],
            "Dr. Carlos": [
                { horario: "16:00", duracao: "15 min", procedimento: "Exame", paciente: "Pedro Lima", status: "Pendente", payments_id: 10 }
            ],
            "Dr. Matheus": [
                { horario: "16:00", duracao: "15 min", procedimento: "Exame", paciente: "Pedro Lima", status: "Pendente", payments_id: 10 }
            ],
            "Dr. José": [
                { horario: "16:00", duracao: "15 min", procedimento: "Exame", paciente: "Pedro Lima", status: "Pendente", payments_id: 10 }
            ],
            "Dr. João da Silva": [
                { horario: "16:00", duracao: "15 min", procedimento: "Exame", paciente: "Pedro Lima", status: "Pendente", payments_id: 10 }
            ]
        },
        "26/03/2025": {
            "Dra. Maria Oliveira": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Paulo", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Marcos", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Junio", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Lima", status: "Confirmado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Erick", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Jerfeson", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
            "Dra. Ana": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Paulo", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Marcos", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Junio", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Lima", status: "Confirmado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Erick", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Jerfeson", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
            "Dr. Paulo": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Paulo", status: "Realizado", payments_id: 10 },
                 { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
            "Dra. Julia": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Paulo", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Marcos", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Junio", status: "Pendente", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Lima", status: "Confirmado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Erick", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Jerfeson", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Realizado", payments_id: 10 },
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
            "Dr. Marcos": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                 { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
            "Dr. Jose": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                 { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
            "Dr. Junio": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                 { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
            "Dr. Carlos": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                 { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
            "Dr. Matheus": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Julia", status: "Pendente", payments_id: 10 },
                 { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Pendente", payments_id: 10 }
            ],
        }, 
        "27/03/2025": {
            "Dr. Marcio": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Confirmado", payments_id: 10 }
            ]
        },
        "25/03/2025": {
            "Dr. Junio": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Confirmado", payments_id: 10 }
            ]
        },
        "22/03/2025": {
            "Dra. Elizabeth": [
                { horario: "14:00", duracao: "45 min", procedimento: "Consulta", paciente: "Ana Souza", status: "Confirmado", payments_id: 10 }
            ]
        }
    };
    
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

    const updateAgendamentos = (date) => {
        accordionContainer.innerHTML = ""; 
    
        if (agendamentos[date]) {
            const accordion = document.createElement("div");
            accordion.classList.add("accordion", "custom-accordion");
            accordion.id = "accordionAgendamentos";
    
            let index = 0;
    
            Object.entries(agendamentos[date]).forEach(([profissionalNome, agendas]) => {
                const accordionItem = document.createElement("div");
                accordionItem.classList.add("accordion-item");
    
                accordionItem.innerHTML = `
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#profissional${index}">
                            <span class="truncate">${profissionalNome}</span>
                        </button>
                    </h2>
                    <div id="profissional${index}" class="accordion-collapse collapse" data-bs-parent="#accordionAgendamentos">
                        <div class="accordion-body">
                            <div class="table-container">
                                <table class="table custom-table">
                                    <thead>
                                        <tr>
                                            <th>Hora</th>
                                            <th>Duração</th>
                                            <th>Data</th>
                                            <th>Procedimento</th>
                                            <th>Paciente</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${agendas.map((agenda, agendaIndex) => `
                                            <tr>
                                                <td>${agenda.horario}</td>
                                                <td>${agenda.duracao}</td>
                                                <td>${date}</td>
                                                <td class="truncate2">${agenda.procedimento}</td>
                                                <td class="truncate2">${agenda.paciente}</td>
                                                <td>
                                                    <span class="badge ${getStatusBadgeClass(agenda.status)}">${agenda.status}</span>
                                                </td>
                                                <td class="actions">
                                                    <button onclick="editAgendamento(event, ${agendaIndex}, '${date}')">
                                                        <i class="fas fa-pencil-alt text-warning" title="Editar"></i>
                                                    </button>
                                                    <button onclick="deleteAgendamento(event)">
                                                        <i class="fas fa-trash text-danger" title="Excluir"></i>
                                                    </button>
                                                    <button>
                                                        <i class="fas fa-dollar-sign text-success" title="Pagamento"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
    
                accordion.appendChild(accordionItem);
                index++;
            });
    
            accordionContainer.appendChild(accordion);
        } else {
            accordionContainer.innerHTML = "<p class='text-center mt-3'>Nenhum agendamento para esta data.</p>";
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


//&  -------------------------------- Função de editar/excluir iten da tabela -------------------------------
// Função auxiliar para criar um campo de input
const createInputField = (type, value) => {
    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.classList.add("form-control");
    return input;
};

// Função auxiliar para criar um select com opções
const createSelectField = (options, selectedValue) => {
    const select = document.createElement("select");
    options.forEach(optionValue => {
        const option = document.createElement("option");
        option.value = option.textContent = optionValue;
        if (optionValue === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    select.classList.add("form-control");
    return select;
};

// Função que permite editar os campos do agendamento
const editAgendamento = (event, index, date) => {
    const row = event.target.closest("tr");
    const cells = row.querySelectorAll("td");

    const duracaoOptions = ["15 min", "30 min", "45 min", "60 min"];

    const inputConfig = [
        { index: 0, type: 'time' }, 
        { index: 1, type: 'select', options: duracaoOptions }, 
        { index: 2, type: 'date' },
        { index: 3, type: 'select', options: ["Consulta", "Exame", "Cirurgia", "Tratamento"] }, 
        { index: 4, type: 'text' }, 
        { index: 5, type: 'select', options: ["Pendente", "Confirmado", "Realizado"] } 
    ];

    inputConfig.forEach(config => {
        const cell = cells[config.index];
        const currentText = cell.textContent.trim();
        cell.setAttribute("data-original", currentText);

        let input;
        if (config.type === 'time') {
            input = createInputField('time', currentText);
        } else if (config.type === 'date') {
            input = createInputField('date', formatDateToInput(currentText));
        } else if (config.type === 'select') {
            input = createSelectField(config.options, currentText);
        } else {
            input = createInputField(config.type, currentText);
        }

        cell.innerHTML = "";  
        cell.appendChild(input);  
    });

    const actionsCell = row.querySelector(".actions");
    actionsCell.innerHTML = `
        <button class="save-btn"><i class="fas fa-check text-success"></i></button>
        <button class="cancel-btn"><i class="fas fa-times text-danger"></i></button>
    `;

    row.querySelector(".save-btn").addEventListener("click", () => saveEdits(row, index, date));
    row.querySelector(".cancel-btn").addEventListener("click", () => cancelEdits(row));
};

// Função de excluir agendamento
const deleteAgendamento = (event) => {
    const confirmation = confirm("Tem certeza que deseja excluir este agendamento?");
    if (confirmation) {
        const row = event.target.closest("tr"); // Obtém a linha do item da tabela
        row.remove(); // Remove a linha da tabela
    }
};

const saveEdits = (row, index, date) => {
    const inputs = row.querySelectorAll("input, select");

    const updatedValues = [
        inputs[0].value, 
        inputs[1].value,  
        formatDateToDisplay(inputs[2].value),  
        inputs[3].value,  
        inputs[4].value,  
        inputs[5].value   
    ];

    row.querySelectorAll("td").forEach((cell, i) => {
        if (i < 6) { 
            if (i === 2) { 
                cell.textContent = updatedValues[i] || cell.getAttribute("data-original"); 
            } else if (i === 5) { 
                cell.innerHTML = `<span class="badge ${getStatusBadgeClass(updatedValues[i])}">${updatedValues[i]}</span>`; 
            } else {
                cell.textContent = updatedValues[i] || cell.getAttribute("data-original");
            }
        }
    });

    row.querySelector(".actions").innerHTML = `
        <button onclick="editAgendamento(event, ${index}, '${date}')"><i class="fas fa-pencil-alt text-warning"></i></button>
        <button class="delete-btn"><i class="fas fa-trash text-danger"></i></button>
        <button><i class="fas fa-dollar-sign text-success"></i></button>
    `;

    row.querySelector(".delete-btn").addEventListener("click", (event) => deleteAgendamento(event));
};
    
const getStatusBadgeClass = (status) => {
    switch(status) {
        case "Pendente":
            return "bg-warning text-dark";   
        case "Confirmado":
            return "bg-info text-white";
        default:
            return "bg-secondary text-dark"; 
        case "Realizado":
            return "bg-success text-light";
    }
};  

// Função para cancelar a edição
const cancelEdits = (row) => {
    const cells = row.querySelectorAll("td");

    // Reverte os valores para os originais armazenados
    cells.forEach((cell, index) => {
        const originalValue = cell.getAttribute("data-original");
        if (originalValue !== null) {
            if (index === 5) { // Se for a célula do status
                cell.innerHTML = `<span class="badge ${getStatusBadgeClass(originalValue)}">${originalValue}</span>`;
            } else {
                cell.textContent = originalValue;
            }
        }
    });

    // Restaura os botões de ação originais
    row.querySelector(".actions").innerHTML = `
        <button onclick="editAgendamento(event, 0, '')">
            <i class="fas fa-pencil-alt text-warning" title="Editar"></i>
        </button>
        <button class="delete-btn">
            <i class="fas fa-trash text-danger" title="Excluir"></i>
        </button>
        <button>
            <i class="fas fa-dollar-sign text-success" title="Pagamento"></i>
        </button>
    `;

    // Reatribui o evento ao botão de exclusão
    row.querySelector(".delete-btn").addEventListener("click", (event) => deleteAgendamento(event));
};



const formatDateToInput = (dateString) => {
    if (!dateString) return ""; 
    const parts = dateString.split('/');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
};

const formatDateToDisplay = (dateString) => {
    if (!dateString) return ""; 
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

// * ---------------------------- Função de modal de pagamento ----------------------//
// function payment($agendamentos.payments_id)

document.addEventListener("click", function (event) {
    if (event.target.closest(".fa-dollar-sign")) {
      var modal = new bootstrap.Modal(document.getElementById("entradaModal"));
      modal.show();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const valorInput = document.getElementById("valor");

    valorInput.addEventListener("input", function (event) {
      let value = event.target.value.replace(/\D/g, ""); // Remove tudo que não for número
      value = value.padStart(3, "0"); // Garante que sempre tenha pelo menos "00" centavos

      // Formata o valor como moeda brasileira
      let formattedValue = (parseFloat(value) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      event.target.value = formattedValue;
    });
  });

//  * ----------------------- TOAST --------------------------- //

function initToast() {
    const showToastBtn = document.getElementById('showToastBtn');
    const paymentToastElement = document.getElementById('paymentToast');
    
    // Verifica se ambos os elementos existem
    if (showToastBtn && paymentToastElement) {
      const paymentToast = new bootstrap.Toast(paymentToastElement);

      // Adiciona o evento de clique para mostrar o toast
      showToastBtn.addEventListener('click', () => paymentToast.show());
    }
  }

  document.addEventListener('DOMContentLoaded', initToast);