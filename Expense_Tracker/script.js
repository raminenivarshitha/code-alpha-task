const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");

const filters = document.querySelectorAll(".filter");

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

let currentFilter = "all";

// ---------------- SAVE ----------------

function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// ---------------- UPDATE SUMMARY ----------------

function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(item => {

        if(item.type === "income")
            totalIncome += item.amount;
        else
            totalExpense += item.amount;

    });

    income.textContent =
        `₹${totalIncome.toFixed(2)}`;

    expense.textContent =
        `₹${totalExpense.toFixed(2)}`;

    balance.textContent =
        `₹${(totalIncome-totalExpense).toFixed(2)}`;

}

// ---------------- RENDER ----------------

function renderTransactions(){

    transactionList.innerHTML = "";

    let filtered = transactions.filter(item=>{

        if(currentFilter==="income")
            return item.type==="income";

        if(currentFilter==="expense")
            return item.type==="expense";

        return true;

    });

    filtered.forEach(item=>{

        const li=document.createElement("li");

        li.className=`transaction ${item.type}-item`;

        li.innerHTML=`

        <div class="info">

            <h4>${item.text}</h4>

            <span>${item.type.toUpperCase()}</span>

        </div>

        <div class="right">

            <span class="amount">

            ${item.type==="income" ? "+" : "-"}₹${item.amount}

            </span>

            <button class="delete">

                <i class="fa-solid fa-trash"></i>

            </button>

        </div>

        `;

        li.querySelector(".delete").addEventListener("click",()=>{

            transactions=transactions.filter(t=>t.id!==item.id);

            saveData();

            renderTransactions();

            updateSummary();

        });

        transactionList.appendChild(li);

    });

}

// ---------------- ADD ----------------

function addTransaction(){

    const desc=text.value.trim();

    const amt=parseFloat(amount.value);

    if(desc==="" || isNaN(amt) || amt<=0){

        alert("Please enter valid details.");

        return;

    }

    transactions.push({

        id:Date.now(),

        text:desc,

        amount:amt,

        type:type.value

    });

    saveData();

    renderTransactions();

    updateSummary();

    text.value="";

    amount.value="";

    text.focus();

}

addBtn.addEventListener("click",addTransaction);

amount.addEventListener("keypress",(e)=>{

    if(e.key==="Enter")

        addTransaction();

});

// ---------------- FILTER ----------------

filters.forEach(btn=>{

    btn.addEventListener("click",()=>{

        filters.forEach(b=>b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter=btn.dataset.filter;

        renderTransactions();

    });

});

// ---------------- INITIAL ----------------

renderTransactions();

updateSummary();