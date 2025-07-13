document.addEventListener("DOMContentLoaded", () => {
    const tipForm = document.getElementById("input-form");
    const tipsList = document.getElementById("tips-list");
    const totalAmount = document.getElementById("total-amount");


let tips = [];
let editingId = null;

tipForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("tip-amount").value);
    const date = document.getElementById("tip-date").value;
    const comment = document.getElementById("tip-comment").value;

    if (editingId) {
        const tipIndex = tips.findIndex(tip => tip.id === editingId);
        if (tipIndex !== -1) {
            tips[tipIndex] = {
                id: editingId,
                amount: amount,
                date: date,
                comment: comment
            };
        }
        editingId = null;
    } else {
        const tip = {
            id: Date.now(),
            amount: amount,
            date: date,
            comment: comment
        };
        tips.push(tip);
    }

    displayTips(tips);
    updateTotalAmount();
    tipForm.reset();
});

tipsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = parseInt(e.target.dataset.id);
        tips = tips.filter(tip => tip.id !== id);
        displayTips(tips);
        updateTotalAmount();
    }

    if (e.target.classList.contains("edit-btn")) {
        const id = parseInt(e.target.dataset.id);
        const tip = tips.find(tip => tip.id === id);

        document.getElementById("tip-amount").value = tip.amount;
        document.getElementById("tip-date").value = tip.date;
        document.getElementById("tip-comment").value = tip.comment;

        editingId = id;
    }
});

function displayTips(tips) {
    tipsList.innerHTML = "";
    tips.forEach(tip => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${tip.amount.toFixed(2)}</td>
            <td>${tip.date}</td>
            <td>${tip.comment}</td>
            <td>
                    <button class="edit-btn" data-id="${tip.id}">Edit</button>
                    <button class="delete-btn" data-id="${tip.id}">Delete</button>
                </td>
                `;

        tipsList.appendChild(row);
    });

    localStorage.setItem("tipsData", JSON.stringify(tips));

};

function updateTotalAmount() {
        const total = tips.reduce((sum, tip) => sum + tip.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    };

    const savedTips = localStorage.getItem("tipsData");
if (savedTips) {
    tips = JSON.parse(savedTips);
    displayTips(tips);
    updateTotalAmount();
}

});