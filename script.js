"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const todoListData = localStorage.getItem("todoList")
    ? JSON.parse(localStorage.getItem("todoList"))
    : {
        todoItems: [],
        completedItems: [],
      };

  const btnAdd = document.querySelector("#add"),
    todoList = document.querySelector("#todo"),
    completedList = document.querySelector("#completed"),
    btnEven = document.querySelector("#even"),
    btnOdd = document.querySelector("#odd"),
    btnReset = document.querySelector("#reset"),
    btnFirst = document.querySelector("#first"),
    btnLast = document.querySelector("#last");

  uploadTodoList();

  btnAdd.addEventListener("click", () => {
    const inputValue = document.querySelector("#item").value;
    // console.log(inputValue);
    if (!inputValue) {
      alert("You need enter an activity!");
    } else {
      addActivityToTodoList(inputValue);
    }
  });

  btnEven.addEventListener("click", () => {
    const item = document.querySelectorAll("li");
    item.forEach((item, i) => {
      item.classList.remove("blue");
      if (i % 2 == 1) {
        item.classList.add("blue");
      }
    });
  });

  btnOdd.addEventListener("click", () => {
    const item = document.querySelectorAll("li");
    item.forEach((item, i) => {
      item.classList.remove("blue");
      if (i % 2 == 0) {
        item.classList.add("blue");
      }
    });
  });

  btnReset.addEventListener("click", () => {
    const item = document.querySelectorAll("li");
    item.forEach((item, i) => {
      item.classList.remove("blue");
    });
  });

  todoList.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.matches("button.complete")) {
      // console.log("complete!");
      const completeBtns = todoList.querySelectorAll(".complete");
      // console.log(completeBtns);
      completeBtns.forEach((item, i) => {
        if (target == completeBtns[i]) {
          completeActivity(i, todoList);
        }
      });
    }
    if (target && target.matches("button.remove")) {
      // console.log("delete!");
      const removeBtns = todoList.querySelectorAll(".remove");
      // console.log(removeBtns);
      removeBtns.forEach((item, i) => {
        if (target == removeBtns[i]) {
          removeActivity(i, todoList);
        }
      });
    }
  });

  completedList.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.matches("button.remove")) {
      // console.log("delete!");
      const removeBtns = completedList.querySelectorAll(".remove");
      // console.log(removeBtns);
      removeBtns.forEach((item, i) => {
        if (target == removeBtns[i]) {
          removeActivity(i, completedList);
        }
      });
    }
  });

  btnFirst.addEventListener("click", () => {
    removeActivity(0, todoList);
  });

  btnLast.addEventListener("click", () => {
    const index = todoListData.todoItems.length - 1;
    removeActivity(index, todoList);
  });

  function addActivityToTodoList(activityName) {
    addTodoActivityOnPage(activityName);
    document.querySelector("#item").value = "";
    todoListData.todoItems.push(activityName);
    updateLocalStorage();
  }

  function addTodoActivityOnPage(activityName) {
    const activityElement = addActivityToList(activityName);
    todoList.prepend(activityElement);
  }

  function addActivityToCompletedList(activityName) {
    addCompletedActivityOnPage(activityName);
    todoListData.completedItems.push(activityName);
    updateLocalStorage();
  }

  function addCompletedActivityOnPage(activityName) {
    const activityElement = addActivityToList(activityName);
    completedList.append(activityElement);
  }

  function addActivityToList(activityName) {
    const activity = document.createElement("li");
    const btns = document.createElement("div");
    btns.classList.add("interactBtns");
    btns.innerHTML =
      "<button class='complete'>done</button><button class='remove'>del</button>";
    activity.textContent = activityName;
    activity.append(btns);
    return activity;
  }

  function updateLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todoListData));
  }

  function uploadTodoList() {
    if (!todoListData.todoItems.length && !todoListData.completedItems.length) {
      return;
    }

    for (let i = 0; i < todoListData.todoItems.length; i++) {
      addTodoActivityOnPage(todoListData.todoItems[i]);
    }

    for (let i = 0; i < todoListData.completedItems.length; i++) {
      addCompletedActivityOnPage(todoListData.completedItems[i]);
    }
  }

  function removeActivity(index, container) {
    // console.log("Yes, index ", index);
    const activityItem = container.querySelectorAll("li");
    activityItem[index].remove();
    if (container == todoList) {
      todoListData.todoItems.splice(-(index + 1), 1);
      updateLocalStorage();
      // console.log(todoListData);
    } else if (container == completedList) {
      todoListData.completedItems.splice(-(index + 1), 1);
      updateLocalStorage();
      // console.log(todoListData);
    }
  }

  function completeActivity(index, container) {
    // console.log("Yes, index ", index);
    const activityName = todoListData.todoItems.at(-(index + 1));
    // console.log(activityName);
    removeActivity(index, container);
    addActivityToCompletedList(activityName);
  }
});
