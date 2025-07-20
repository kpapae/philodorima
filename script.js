document.addEventListener("DOMContentLoaded", function() {
    const tipForm = document.getElementById("input-form");
    const tipsList = document.getElementById("tips-list");
    const totalAmount = document.getElementById("total-amount");


    var tips = [];
    var editingId = null;

    tipForm.addEventListener("submit", function(e) {
        e.preventDefault();

        var amount = parseFloat(document.getElementById("tip-amount").value);
        var date = document.getElementById("tip-date").value;
        var comment = document.getElementById("tip-comment").value;

        if (editingId) {
            var tipIndex = tips.findIndex(function(tip) { return tip.id === editingId; });
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
            var tip = {
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

    tipsList.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-btn")) {
            var id = parseInt(e.target.dataset.id);
            tips = tips.filter(function(tip) { return tip.id !== id; });
            displayTips(tips);
            updateTotalAmount();
        }

        if (e.target.classList.contains("edit-btn")) {
            var id = parseInt(e.target.dataset.id);
            var tip = tips.find(function(tip) { return tip.id === id; });

            document.getElementById("tip-amount").value = tip.amount;
            document.getElementById("tip-date").value = tip.date;
            document.getElementById("tip-comment").value = tip.comment;

            editingId = id;
        }
    });

    function displayTips(tips) {
        tipsList.innerHTML = "";
        tips.forEach(function(tip) {
            var row = document.createElement("tr");

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
        var total = tips.reduce(function(sum, tip) { return sum + tip.amount; }, 0);
        totalAmount.textContent = total.toFixed(2);
    };

    var savedTips = localStorage.getItem("tipsData");
    if (savedTips) {
        tips = JSON.parse(savedTips);
        displayTips(tips);
        updateTotalAmount();
    }

});