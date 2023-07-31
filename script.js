const ul = document.querySelector("ul");
const li = undefined;
const main = document.querySelector("main");
let items = undefined;
let checkbox = undefined;
const addButton = document.querySelector("#askTask");
const confirmButton = document.querySelector("#addTask");
const title = document.querySelector("h1");
const inputNewItem = document.querySelector("#inputNewItem");
const modale = document.querySelector("aside");
const errorMsg = document.querySelector("#error");

confirmButton.addEventListener("click", handleAddNewTask);
addButton.addEventListener("click", handleNewTask);

let tasks = [
  {
    id: 1,
    task: "Arroser les plantes",
    isDone: false,
  },
  {
    id: 2,
    task: "Sortir le chien",
    isDone: false,
  },
  {
    id: 3,
    task: "Tondre la pelouse",
    isDone: false,
  },
];

createList();

function createList() {
  for (const iterator of tasks) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const span = document.createElement("span");
    span.textContent = "Supprimer";
    span.classList.add("delete");
    label.for = iterator.id;
    label.textContent = iterator.task;
    li.classList.add("items");
    li.id = iterator.id;
    input.type = "checkbox";
    input.className = "checkbox";
    li.appendChild(div);
    li.appendChild(span);
    div.appendChild(input);
    div.appendChild(label);
    ul.prepend(li);
  }
  items = document.querySelectorAll(".items");
  checkbox = document.getElementsByClassName("checkbox");
  checkbox[0].addEventListener("click", () => alert("hey"));
  console.log(checkbox);
  addListener();
}

function addListener() {
  items.forEach((element) => {
    element.addEventListener("mouseover", handleShow);
    element.addEventListener("mouseout", handleHide);
  });
}

function handleShow(e) {
  const deleteBtnToDisplay = e.currentTarget.childNodes;
  deleteBtnToDisplay[1].classList.add("displayDelete");
  deleteBtnToDisplay[1].addEventListener("click", handleDelete);
}

function handleHide(e) {
  const deleteBtn = e.currentTarget.childNodes;
  deleteBtn[1].classList.remove("displayDelete");
}

function handleDelete(e) {
  const taskToRemove = e.currentTarget.parentNode;

  const itemToRemoveFromArray = taskToRemove.id;
  const newArray = tasks.filter((ele) => ele.id != itemToRemoveFromArray);
  taskToRemove.remove();
  tasks = newArray;
}

function handleNewTask() {
  modale.style.display = "flex";
}

function handleAddNewTask() {
  /*Suppression des éléments de la liste avant de la recréer */
  deleteChilds();

  let itemToAdd = {};

  if (inputNewItem.value != "") {
    errorMsg.style.display = "none";
    itemToAdd.task = inputNewItem.value;
    itemToAdd.id = "5"; /* Dynamiser l'affichage de l'id */
    tasks.unshift(itemToAdd);
    modale.style.display = "none";
    inputNewItem.value = "";
    createList();
  } else {
    errorMsg.style.display = "block";
    createList();
  }
}

function deleteChilds() {
  items = document.querySelectorAll(".items");
  items.forEach((element) => {
    element.remove();
  });
}

function handleChecked() {
  alert("hey");
}

/*TODO 
- supprimer => delete from array => OK
- coché => rayé la task et passé isDone à true
- croix de fermeture sur modale
- ajout des task via modale => OK

*/
