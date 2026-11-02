var budgetForm = document.getElementById("budgetForm");
var typeInput = document.getElementById("type");
var amountInput = document.getElementById("amount");
var categoryInput = document.getElementById("category");
var balance = document.getElementById("balance");
var income = document.getElementById("income");
var expenses = document.getElementById("expenses");
var transactionList = document.getElementById("transactionList");


var transactions = [];

// Add Transaction

budgetForm.onsubmit = function(event) {
    event.preventDefault();
    var type = typeInput.value;
    var amount = Number(amountInput.value);
    var category = categoryInput.value;

    if (amount > 0 && category !== "") {
        var transaction = {
            type: type,
            amount: amount,
            category: category
        };

        // Add Object to Array
        transactions.push(transaction);
        updateTotals();
        showTransactions();
        budgetForm.reset();
    } else {
        alert("Enter valid details");
    }
};


// Calculate Total Income, Expenses and Balance

function updateTotals() {
    var totalIncome = 0;
    var totalExpenses = 0;

    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].type === "income") {
            totalIncome = totalIncome + transactions[i].amount;
        } else {
            totalExpenses = totalExpenses + transactions[i].amount;
        }
    }

    var totalBalance = totalIncome - totalExpenses;
    balance.innerText = "Rs. " + totalBalance;
    income.innerText = "Rs. " + totalIncome;
    expenses.innerText = "Rs. " + totalExpenses;

}


// Show Transaction History

function showTransactions() {
    transactionList.innerHTML = "";

    for (var i = 0; i < transactions.length; i++) {
        var row = document.createElement("tr");
        var category = document.createElement("td");
        category.innerText = transactions[i].category;
        var type = document.createElement("td");
        type.innerText = transactions[i].type;
        var amount = document.createElement("td");

        if (transactions[i].type === "income") {
            amount.innerText = "+ Rs. " + transactions[i].amount;
        } else {
            amount.innerText = "- Rs. " + transactions[i].amount;
        }

        row.appendChild(category);
        row.appendChild(type);
        row.appendChild(amount);
        transactionList.appendChild(row);

    }

}


updateTotals();
showTransactions();
