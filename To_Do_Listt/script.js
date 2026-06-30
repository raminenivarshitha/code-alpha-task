const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");
const filters = document.querySelectorAll(".filter");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// -------------------- Theme --------------------

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

// -------------------- Save --------------------

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// -------------------- Render --------------------

function renderTasks() {

    taskList.innerHTML = "";

    let filtered = tasks.filter(task => {

        if (currentFilter === "active")
            return !task.completed;

        if (currentFilter === "completed")
            return task.completed;

        return true;

    });

    filtered.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed)
            li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button class="edit">
                    ✏️
                </button>

                <button class="delete">
                    🗑️
                </button>

            </div>
        `;

        // Complete Task
        li.querySelector("span").addEventListener("click", () => {

            task.completed = !task.completed;

            saveTasks();

            renderTasks();

        });

        // Edit Task
        li.querySelector(".edit").addEventListener("click", () => {

            const updated = prompt("Edit Task", task.text);

            if (updated !== null && updated.trim() !== "") {

                task.text = updated.trim();

                saveTasks();

                renderTasks();

            }

        });

        // Delete Task
        li.querySelector(".delete").addEventListener("click", () => {

            const realIndex = tasks.indexOf(task);

            tasks.splice(realIndex, 1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(li);

    });

    const remaining = tasks.filter(task => !task.completed).length;

    taskCount.textContent = `${remaining} Task${remaining !== 1 ? "s" : ""} Left`;

}

// -------------------- Add Task --------------------

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({

        text,

        completed: false

    });

    taskInput.value = "";

    saveTasks();

    renderTasks();

}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {

    if (e.key === "Enter")
        addTask();

});

// -------------------- Filters --------------------

filters.forEach(btn => {

    btn.addEventListener("click", () => {

        filters.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        renderTasks();

    });

});

// -------------------- Clear Completed --------------------

clearCompleted.addEventListener("click", () => {

    tasks = tasks.filter(task => !task.completed);

    saveTasks();

    renderTasks();

});

// -------------------- Initial Load --------------------

renderTasks();