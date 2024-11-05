const taskForm = document.getElementById("task-form")
const taskInput = document.getElementById("task-input")
const taskContainer = document.getElementById("tasks")

document.addEventListener("DOMContentLoaded",loadTasks)


taskForm.addEventListener("submit", function(event){
    event.preventDefault();
    const taskText = taskInput.value

    if (taskText !== "") {
        addTask(taskText)
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
    })

    taskItem.appendChild(deleteButton)
    taskContainer.appendChild(taskItem)

}

function saveTask() {
    let tasks = JSON.parse
}