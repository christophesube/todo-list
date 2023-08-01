const ul = document.querySelector("ul");
const li = undefined;
const main = document.querySelector("main");
let items;
let checkbox;
let label;
const addButton = document.querySelector("#askTask");
const confirmButton = document.querySelector("#addTask");
const title = document.querySelector("h1");
const inputNewItem = document.querySelector("#inputNewItem");
const modale = document.querySelector("aside");
const errorMsg = document.querySelector("#error");
const addByFieldButton = document.querySelector("#defaultTask");
const closeBtn = document.querySelector("img");

confirmButton.addEventListener("click", handleAddNewTask);
addButton.addEventListener("click", handleNewTask);
addByFieldButton.addEventListener("click", handleNewTask);
closeBtn.addEventListener("click", handleClose);

let tasks = [];

/* Create the list from the content include in the tasks array */
function createList() {
  for (const iterator of tasks) {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const input = document.createElement("input");
    label = document.createElement("label");
    const span = document.createElement("span");
    span.textContent = "Delete";
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
  -addListener();
}

function addListener() {
  items.forEach((element) => {
    element.addEventListener("mouseover", handleShow);
    element.addEventListener("mouseout", handleHide);
  });

  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", handleChecked);
    checkbox = document.getElementsByClassName("checkbox");
  }
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
  taskToRemove.remove(); /* Delete the element from DOM */
  tasks = newArray; /* And copy elements filtered in the array */
}

function handleNewTask() {
  addButton.style.display = "none";
  modale.style.display = "flex";
}

function handleAddNewTask() {
  /* Clean all Element before recreate it. Need to do something cleaner*/
  deleteChilds();

  let itemToAdd = {};

  if (inputNewItem.value != "") {
    errorMsg.style.display = "none";
    itemToAdd.task = inputNewItem.value;
    itemToAdd.id =
      /* Generate a random id from string + random number  */
      inputNewItem.value.substring(0, 3).toLowerCase() +
      Math.ceil(Math.random() * 100);
    tasks.unshift(itemToAdd);
    modale.style.display = "none";
    addButton.style.display = "block";
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

function handleChecked(e) {
  const itemContent = e.currentTarget.nextSibling;
  itemContent.classList.toggle("contentChecked");
}

function handleClose() {
  addButton.style.display = "block";
  modale.style.display = "none";
}
