// QUERY SELECTORS
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let allBtn = document.querySelector(".all-btn");
let completedBtn = document.querySelector(".completed-btn");
let uncompletedBtn = document.querySelector(".uncompleted-btn");

let arrayOfTasks = [];

// FUNCTIONS
function addTaskToArray(taskText) {
  //Task Data
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  arrayOfTasks.push(task); // Push Task to Array of Tasks
  displayTasks();
  addTasksToLocalStorage();
}

function displayTasks() {
  //Empty Tasks Div
  tasksDiv.innerHTML = "";

  //Looping on Array of Tasks
  // arrayOfTasks.forEach((task) => {
  //   let div = document.createElement("div");
  //   div.className = "task";
  //   if (task.completed) {
  //     div.className = "task done";
  //   }
  //   div.setAttribute("data-id", task.id);
  //   div.appendChild(document.createTextNode(task.title));
  //   let span = document.createElement("span");
  //   span.className = "del";
  //   span.appendChild(document.createTextNode("Delete"));
  //   div.appendChild(span);
  //   tasksDiv.appendChild(div);
  // });

  let tempString = arrayOfTasks
    .map((task) =>
      task.completed
        ? `
     <div class="task done" data-id= "${task.id}">
      ${task.title}
      <span class="del btn-hover">Delete</span>
     </div>
    `
        : `
     <div class="task" data-id= "${task.id}">
      ${task.title}
      <span class="del btn-hover">Delete</span>
      
     </div>
    `
    )
    .join("");

  tasksDiv.innerHTML = tempString;
}

// <button class='del' value='${task.id}'>
//   Delete
// </button>;

function addTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    arrayOfTasks.push(...tasks);
    displayTasks();
    addTasksToLocalStorage();
  }
}

//Click on task element
tasksDiv.addEventListener("click", (e) => {
  //Delete Button
  if (e.target.classList.contains("del")) {
    //Remove Element from page
    e.target.parentElement.remove();

    //Remove Element From LocalStorage

    //displayTasks();
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
  }

  //Toggle Done Class
  if (e.target.classList.contains("task")) {
    toggleTaskFromLocalStorage(e.target.getAttribute("data-id"));

    e.target.classList.toggle("done");
  }
});

function deleteTaskFromLocalStorage(id) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != Number(id));
  //displayTasks();
  addTasksToLocalStorage();
}

function toggleTaskFromLocalStorage(id) {
  //console.log(id);
  for (let i = 0; i < arrayOfTasks.length; i++) {
    //console.log(task.id);
    if (arrayOfTasks[i].id == id) {
      arrayOfTasks[i].completed = !arrayOfTasks[i].completed;
    }
  }
  displayTasks();

  addTasksToLocalStorage();
}

function displayCompletedTasks() {
  //Empty Tasks Div
  tasksDiv.innerHTML = "";

  let tempString = arrayOfTasks
    .map((task) =>
      task.completed
        ? `
     <div class="task done" data-id= "${task.id}">
      ${task.title}
      <span class="del btn-hover">Delete</span>
     </div>
    `
        : ``
    )
    .join("");

  tasksDiv.innerHTML = tempString;
}

function displayUncompletedTasks() {
  //Empty Tasks Div
  tasksDiv.innerHTML = "";

  let tempString = arrayOfTasks
    .map((task) =>
      task.completed
        ? ``
        : `<div class="task" data-id= "${task.id}">
      ${task.title}
      <span class="del btn-hover">Delete</span>
     </div>`
    )
    .join("");

  tasksDiv.innerHTML = tempString;
}
// EVENT LISTENERS
submit.addEventListener("click", function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Tast To Array Of Tasks
    input.value = ""; //Emptying The Input Field
  }
});

window.addEventListener("DOMContentLoaded", getDataFromStorage);

// tasksDiv.addEventListener("click", (e) => {
//   if (e.target.matches(".del")) {
//     deleteTaskFromArray(Number(e.target.value));
//   }
// });

completedBtn.addEventListener("click", displayCompletedTasks);
uncompletedBtn.addEventListener("click", displayUncompletedTasks);
allBtn.addEventListener("click", displayTasks);
