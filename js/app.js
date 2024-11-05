const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskContainer = document.getElementById("tasks");

// Cargar las tareas almacenadas al iniciar la página
document.addEventListener("DOMContentLoaded", loadStoredTasks);

taskForm.addEventListener("submit", handleTaskSubmit);

// Maneja el envío del formulario para agregar una nueva tarea
function handleTaskSubmit(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTaskToDom(taskText);
        saveTaskToLocalStorage(taskText);
        taskInput.value = ""; // Limpia el campo de entrada
    }
}

function addTaskToDom(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const editButton = createButton("Editar", () => editTask(taskItem, taskText));
    const deleteButton = createButton("Eliminar", () => removeTask(taskItem, taskText));

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskContainer.appendChild(taskItem);
}

function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

function editTask(taskItem, oldText) {
    const newText = prompt("Edita tu tarea:", oldText);
    if (newText && newText.trim()) {
        taskItem.firstChild.textContent = newText; // Corrige la referencia al texto de la tarea
        updateTaskInLocalStorage(oldText, newText);
    }
}

function removeTask(taskItem, taskText) {
    taskContainer.removeChild(taskItem);
    deleteTaskFromLocalStorage(taskText);
}

function saveTaskToLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadStoredTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(addTaskToDom);
}

function updateTaskInLocalStorage(oldText, newText) {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.indexOf(oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function deleteTaskFromLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}
