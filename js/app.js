const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const taskContainer = document.getElementById("tasks")

document.addEventListener("DOMContentLoaded",loadTasks)


taskForm.addEventListener("submit", function(event){
    event.preventDefault();
    const taskText = taskInput.value

    if (taskText !== "") {
        addTask(taskText)
        saveTask(taskText)
        taskInput.value = ""
    }
})

function addTask(taskText) {
    const taskItem = document.createElement("li")
    taskItem.textContent = taskText

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Eliminar"
    deleteButton.addEventListener("click", function(){
        taskContainer.removeChild(taskItem)
        deleteTask(taskText)
    })

    const editButton = document.createElement("button")
    editButton.textContent = "Editar"
    editButton.addEventListener("click" , function(){
        const newText = prompt("Edita tu tarea:", taskText)
        if (newText !== null && newText !== ""){
            taskItem.firstChild.textContent = newText
            updateTask(taskText, newText)
        }
    })

    taskItem.appendChild(editButton)
    taskItem.appendChild(deleteButton)
    taskContainer.appendChild(taskItem)

}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.push(taskText)
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.forEach(taskText => addTask(taskText))
}

function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks = tasks.filter(task => task !== taskText)
    localStorage.setItem("tasks",JSON.stringify(tasks))
}

function updateTask(oldText, newText){
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    const taskIndex = tasks.indexOf(oldText)
    if (taskIndex !== -1) {
        tasks[taskIndex] = newText
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}