const inputTodoBox = document.body.querySelector(".input-todo-box");

const todoListContainer = document.body.querySelector(".todo-list-container");
todoListContainer.querySelectorAll(".todo-list").forEach(todo => todo.remove());

function enterTodoName() {
    return inputTodoBox.value.trim()
}

//Create Todo List

/* function removeTodo() {
    const closeIcons = document.body.querySelectorAll(".close-icon");
    closeIcons.forEach(function(closeIcon) {
        closeIcon.addEventListener("click", function() {
            const closeTodoList = closeIcon.closest(".todo-list");
            if (closeTodoList) {
                closeTodoList.remove();
            }
        });
    });
}

removeTodo(); */

/* Attach the event listener to the container once
const todoListContainer = document.body.querySelector(".todo-list-container"); */

//Remove Todo List
todoListContainer.addEventListener("click", function(e) {
    // Check if the clicked element is a close icon
    if (e.target.classList.contains("close-icon")) {
        const todoItem = e.target.closest(".todo-list");
        if (todoItem) {
            todoItem.remove(); // Completely removes it from the DOM
        }
    }
});

function listAmount() {
    const totalTodoLists = todoListContainer.querySelectorAll(".todo-list").length;
    const displayTotal = document.querySelector('.no-of-items');
    
    if (displayTotal) {
        displayTotal.textContent = totalTodoLists;
    }
}
//listAmount()

function createTodo() {
    const inputTodo = enterTodoName();

    if (inputTodo === "") {
        return;
    }

    const todoList = document.createElement("div");
    todoList.classList.add("todo-list", "all");
    todoList.setAttribute("draggable", "true");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox-icon");

    checkBox.addEventListener("change", function() {
        todoList.classList.toggle("completed", checkBox.checked);
    });

    todoList.addEventListener("click", function(e) {
        if (!e.target.classList.contains("close-icon") && e.target !== checkBox) {
            checkBox.checked = !checkBox.checked;
            todoList.classList.toggle("completed", checkBox.checked);
        }
    })
    
    const todoText = document.createElement("p");
    todoText.textContent = inputTodo;
    todoText.classList.add("todo-Item");

    const closeIcon = document.createElement("img");
    closeIcon.src = "images/icon-cross.svg";
    closeIcon.classList.add("close-icon");

    todoList.appendChild(checkBox);
    todoList.appendChild(todoText);
    todoList.appendChild(closeIcon);

    todoListContainer.appendChild(todoList);

    const footer = todoListContainer.querySelector(".input-container-footer");
    todoListContainer.insertBefore(todoList, footer)

    inputTodoBox.value = "";

    //Properly uncheck the top input checkbox if it exists 
    const topCheckbox = document.querySelector(".create-todo");
    if (topCheckbox) {
        topCheckbox.checked = false;
    }
}

const createTodoBtn = document.querySelector(".create-todo");
createTodoBtn.addEventListener("click", function () {
    createTodo();
});

inputTodoBox.addEventListener("keypress", function(e) {
    const createTodoBtn = document.querySelector(".create-todo");
    if (e.key === "Enter") {
        createTodo();
        
        if (createTodoBtn) {
            createTodoBtn.checked = false;
        }
    }
})

const observer = new MutationObserver(function() {
    listAmount();
});

observer.observe(todoListContainer, {
    childList: true
    //subtree: true
});

listAmount()

const allFilterBtn = document.getElementById("all");
const activeFilterBtn = document.getElementById("active");
const completedFilterBtn = document.getElementById("completed");

function filterAllLists() {
    allFilterBtn.classList.add("active");
    activeFilterBtn.classList.remove("active");
    completedFilterBtn.classList.remove("active");

    const currentTodos = todoListContainer.querySelectorAll(".todo-list");
    currentTodos.forEach(function(todo) {
        todo.style.display = "flex";
    });
}

const activeTodos = todoListContainer.querySelectorAll(".todo-list.active")

function filterActiveLists() {
    allFilterBtn.classList.remove("active");
    activeFilterBtn.classList.add("active");
    completedFilterBtn.classList.remove("active");

    const currentTodos = todoListContainer.querySelectorAll(".todo-list");
    currentTodos.forEach(function(todo) {
        if (todo.classList.contains("completed")) {
            todo.style.display = "none";
        }  else {
            todo.style.display= "flex"
        }
    });
}

function filterCompletedLists() {
    allFilterBtn.classList.remove("active");
    activeFilterBtn.classList.remove("active");
    completedFilterBtn.classList.add("active");

    const currentTodos = todoListContainer.querySelectorAll(".todo-list");
    currentTodos.forEach(function(todo) {
        if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
        }  else {
            todo.style.display= "none"
        }
    });
}

allFilterBtn.addEventListener("click", filterAllLists);
activeFilterBtn.addEventListener("click", filterActiveLists);
completedFilterBtn.addEventListener("click", filterCompletedLists);

const clearCompletedListsBtn = document.getElementById("clear-completed");

function clearCompletedLists() {
    const currentTodos = todoListContainer.querySelectorAll(".todo-list");
    currentTodos.forEach(function (todo) {
        if (todo.classList.contains("completed")) {
            todo.remove()
        }
    })
}

clearCompletedListsBtn.addEventListener("click", clearCompletedLists);

//Change list status

function changeListStatus() {
    const currentTodos = todoListContainer.querySelectorAll(".todo-list");
    currentTodos.forEach(function (todo) {
        const innerBox = todo.querySelector(".checkbox-icon");
        if (!todo.classList.contains("completed")) {
            todo.classList.add("completed");
            // Also check the inner checkbox element if it exists
            
            if (innerBox) innerBox.checked = true;
        } else{
            todo.classList.remove("completed")
            if(innerBox) innerBox.checked = false;
        }
    })
}

const checkAllBtn = document.querySelector(".checkbox");
if (checkAllBtn) {
    checkAllBtn.addEventListener("click", changeListStatus);
}

//Drag an Drop to Re-Order
let draggedItem = null;

//1. When Dragging Starts
function dragStart(e) {
    if (e.target.classList.contains("todo-list")) {
        draggedItem = e.target;
        setTimeout(() => draggedItem.classList.add("dragging"), 0);
    }
}

function dragEnd(e) {
    if (e.target.classList.contains("todo-list")) {
        e.target.classList.remove("dragging");
        draggedItem = null;
    } 
}

function dragOver(e) {
    e.preventDefault();

    const footer = todoListContainer.querySelector(".input-container-footer");
    const afterElement = getDragAfterElement(todoListContainer, e.clientY);

    if (draggedItem) {
        if (afterElement == null) {
            todoListContainer.insertBefore(draggedItem, footer);
        } else {
            todoListContainer.insertBefore(draggedItem, afterElement);
        }
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".todo-list:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

todoListContainer.addEventListener("dragstart", dragStart);
todoListContainer.addEventListener("dragend", dragEnd);
todoListContainer.addEventListener("dragover", dragOver);

const themeIcon = document.body.querySelector(".toggle-theme-icon");
const themeBg = document.body.querySelector(".bg-image");

function switchTheme() {
    document.body.classList.toggle("dark-mode");

    const isMobile = window.innerWidth <= 768;

    if (document.body.classList.contains("dark-mode")) {    
        themeIcon.src = "images/icon-sun.svg";
        themeBg.src = isMobile ? "images/bg-mobile-dark.jpg" : "images/bg-desktop-dark.jpg";
        themeIcon.alt = "Switch to light mode";
    } else {
        themeIcon.src = "images/icon-moon.svg";
        themeBg.src = isMobile ? "images/bg-mobile-light.jpg" : "images/bg-desktop-light.jpg";
        themeIcon.alt = "Switch to dark mode";
    }
}

if (themeIcon) {
    themeIcon.addEventListener("click", switchTheme)
}