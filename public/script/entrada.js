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

//& -------------------------------------------------------------- TABELA ----------------------------------------------------------- //
const createInputField = (type, value) => {
    const input = document.createElement("input");
    input.type = type;
    input.classList.add("form-control");

    if (type === "datetime-local") {
        input.value = value || new Date().toISOString().slice(0, 16);
    } else if (type === "text" && value.includes("R$")) {
        input.value = value.replace("R$ ", "").replace(",", ".");
        input.addEventListener("input", formatCurrency);
    } else {
        input.value = value;
    }

    // Adiciona a restrição de caracteres no campo de descrição
    if (type === "text") {
        input.maxLength = 150;
    }

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


// Formatação de moeda ao digitar (estilo Nubank)
const formatCurrency = (event) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    value = (Number(value) / 100).toFixed(2).replace(".", ",");
    event.target.value = "R$ " + value;
};

// Função para formatar a moeda para exibição
const formatCurrencyForDisplay = (value) => {
    value = value.replace(/\D/g, ""); // Remove tudo que não for número
    value = (Number(value) / 100).toFixed(2).replace(".", ",");
    return "R$ " + value;
};

// Função para editar os itens da tabela
const editAgendamento = (event, index, date) => {
    const row = event.target.closest("tr");
    const cells = row.querySelectorAll("td");

    const paymentMethods = ["Dinheiro", "Cartão", "Pix", "Transferência"];
    const entryTypes = ["Consulta", "Exame", "Cirurgia", "Tratamento"];

    const inputConfig = [
        { index: 0, type: 'datetime-local' }, 
        { index: 1, type: 'select', options: entryTypes }, 
        { index: 2, type: 'text' }, 
        { index: 3, type: 'select', options: paymentMethods }, 
        { index: 4, type: 'text' }, // Usando 'text' para poder formatar como moeda
        { index: 5, type: 'file' } 
    ];

    inputConfig.forEach(config => {
        const cell = cells[config.index];
        const currentText = cell.textContent.trim();
        
        if (!cell.hasAttribute("data-original")) {
            cell.setAttribute("data-original", currentText);
        }

        let input;
        if (config.type === 'datetime-local') {
            input = createInputField('datetime-local', formatDateTimeToInput(currentText));
        } else if (config.type === 'select') {
            input = createSelectField(config.options, currentText);
        } else if (config.type === 'file') {
            input = createInputField('file', '');
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

// Função para excluir um item da tabela
const deleteAgendamento = (event) => {
    const confirmation = confirm("Tem certeza que deseja excluir este item?");
    if (confirmation) {
        const row = event.target.closest("tr");
        row.remove();
    }
};

// Função para salvar as edições
const saveEdits = (row, index, date) => {
    const inputs = row.querySelectorAll("input, select");

    // Reformatando o valor com R$ para o campo de moeda
    const updatedValues = [
        formatDateTimeToDisplay(inputs[0].value),  
        inputs[1].value,  
        inputs[2].value,  
        inputs[3].value,  
        formatCurrencyForDisplay(inputs[4].value),  // Chama a função de formatação de moeda
        inputs[5].files.length > 0 ? inputs[5].files[0].name : row.querySelectorAll("td")[5].getAttribute("data-original")
    ];

    row.querySelectorAll("td").forEach((cell, i) => {
        if (i < 6) {
            cell.textContent = updatedValues[i] || cell.getAttribute("data-original");
        }
    });

    row.querySelector(".actions").innerHTML = `        
        <button onclick="editAgendamento(event, ${index}, '${date}')"><i class="fas fa-pencil-alt text-warning"></i></button>
        <button class="delete-btn"><i class="fas fa-trash text-danger"></i></button>
    `;

    row.querySelector(".delete-btn").addEventListener("click", (event) => deleteAgendamento(event));
};

// Função para cancelar edições
const cancelEdits = (row) => {
    const cells = row.querySelectorAll("td");

    cells.forEach((cell, index) => {
        const originalValue = cell.getAttribute("data-original");
        if (originalValue !== null) {
            cell.textContent = originalValue;
        }
    });

    row.querySelector(".actions").innerHTML = `
        <button onclick="editAgendamento(event, 0, '')">
            <i class="fas fa-pencil-alt text-warning" title="Editar"></i>
        </button>
        <button class="delete-btn">
            <i class="fas fa-trash text-danger" title="Excluir"></i>
        </button>
    `;

    row.querySelector(".delete-btn").addEventListener("click", (event) => deleteAgendamento(event));
};

// Função para formatar a data para o input
const formatDateTimeToInput = (dateString) => {
    if (!dateString) return ""; 
    const parts = dateString.split(' '); 
    if (parts.length === 2) {
        const [datePart, timePart] = parts;
        const [day, month, year] = datePart.split('/');
        return `${year}-${month}-${day}T${timePart}`;
    }
    return dateString;
};

// Função para formatar a data para exibição
const formatDateTimeToDisplay = (dateString) => {
    if (!dateString) return ""; 
    const [datePart, timePart] = dateString.split('T'); 
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year} ${timePart}`;
};

//* ----------------------------- Active e Inactive tabela ---------------------//

document.addEventListener("DOMContentLoaded", function () { 
    // Inicializa a tabela de entrada como visível
    toggleTable("tabelaEntrada");

    // Função para alternar entre as tabelas
    function toggleTable(tableId) {
        const btns = document.querySelectorAll(".tabela_ent_sai"); // Seleciona ambos os botões
        btns.forEach(btn => btn.classList.remove("active")); // Remove a classe "active" de ambos os botões

        // Alterna a visibilidade das tabelas
        document.getElementById('tabelaEntrada').style.display = tableId === 'tabelaEntrada' ? 'block' : 'none';
        document.getElementById('tabelaSaida').style.display = tableId === 'tabelaSaida' ? 'block' : 'none';

        // Adiciona a classe "active" ao botão clicado
        const activeBtn = Array.from(btns).find(btn => btn.title.toLowerCase() === tableId.replace('tabela', '').toLowerCase());
        activeBtn.classList.add("active");
    }
});


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
