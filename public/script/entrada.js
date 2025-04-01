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

    if (type === "text") {
        input.maxLength = 150;
    }

    return input;
};

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

const formatCurrency = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2).replace(".", ",");
    event.target.value = "R$ " + value;
};

const formatCurrencyForDisplay = (value) => {
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2).replace(".", ",");
    return "R$ " + value;
};

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
        { index: 4, type: 'text' }, 
        { index: 5, type: 'text' }, 
        { index: 6, type: 'file' } 
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

const saveEdits = (row, index, date) => {
    const inputs = row.querySelectorAll("input, select");

    const updatedValues = [
        formatDateTimeToDisplay(inputs[0].value),  
        inputs[1].value,  
        inputs[2].value,  
        inputs[3].value,  
        formatCurrencyForDisplay(inputs[4].value),  
        formatCurrencyForDisplay(inputs[5].value),
        inputs[6].files.length > 0 ? inputs[6].files[0].name : row.querySelectorAll("td")[6].getAttribute("data-original"),
    ];

    row.querySelectorAll("td").forEach((cell, i) => {
        if (i < 7) {
            cell.textContent = updatedValues[i] || cell.getAttribute("data-original");
        }
    });

    row.querySelector(".actions").innerHTML = `        
        <button onclick="editAgendamento(event, ${index}, '${date}')"><i class="fas fa-pencil-alt text-warning"></i></button>
        <button class="delete-btn"><i class="fas fa-trash text-danger"></i></button>
    `;

    row.querySelector(".delete-btn").addEventListener("click", (event) => deleteAgendamento(event));
};

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

const formatDateTimeToDisplay = (dateString) => {
    if (!dateString) return ""; 
    const [datePart, timePart] = dateString.split('T'); 
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year} ${timePart}`;
};


//* ----------------------------- Active e Inactive tabela ---------------------//

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tabela_ent_sai");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active"); 
        });
    });
});

// * ---------------------------- Função de modal de Entrada/sáida ----------------------//

document.addEventListener("DOMContentLoaded", function () {
    function formatCurrencyOnInput(input) {
        let value = input.value.replace(/\D/g, ""); 
        value = (parseFloat(value) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        input.value = value;
    }

    ["valorModal", "descontoModal"].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener("input", () => formatCurrencyOnInput(input));
    });
    ["valorMin", "valorMax"].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener("input", () => formatCurrencyOnInput(input));
    });
});