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
        addTaskToDom(taskText);  // Añade la tarea al DOM
        saveTaskToLocalStorage(taskText); // Guarda la tarea en el almacenamiento local
        taskInput.value = ""; // Limpia el campo de entrada
    }
}

function addTaskToDom(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;
    taskItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    // Botón de editar
    const editButton = createButton("Editar", () => editTask(taskItem, taskText), "btn btn-sm btn-outline-secondary mr-2");
    // Botón de eliminar
    const deleteButton = createButton("Eliminar", () => removeTask(taskItem, taskText), "btn btn-sm btn-outline-danger");

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskContainer.appendChild(taskItem);
}

function createButton(text, onClick, className = "") {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = className; // Añade las clases CSS de Bootstrap
    button.addEventListener("click", onClick);
    return button;
}

function editTask(taskItem, oldText) {
    const newText = prompt("Edita tu tarea:", oldText);
    if (newText && newText.trim()) {
        taskItem.firstChild.textContent = newText; // Cambia el texto de la tarea
        updateTaskInLocalStorage(oldText, newText); // Actualiza el texto en el almacenamiento local
    }
}

function removeTask(taskItem, taskText) {
    taskContainer.removeChild(taskItem); // Elimina la tarea del DOM
    deleteTaskFromLocalStorage(taskText); // Elimina la tarea del almacenamiento local
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
        tasks[taskIndex] = newText; // Reemplaza la tarea antigua con la nueva
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
