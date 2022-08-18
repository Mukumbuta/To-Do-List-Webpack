// import _ from 'lodash';
import './style.css';
import {
  add, handleUI, remove,
} from './modules/UI.js';
import { getLocalStorage, addLocalStorage, editLocalStorage } from './modules/localstorage.js';
import List from './modules/constructor.js';

handleUI();
add();

// Handle DOM events
// Add task to list
const enterTodo = document.getElementById('enter-todo');
enterTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    // e.preventDefault();
    const description = document.getElementById('enter-todo').value;
    const complete = false;
    const todoList = getLocalStorage();
    const index = todoList.length + 1;
    if (description === '') {
      const error = document.getElementById('error');
      error.textContent = 'Task description cannot be empty!';
      setTimeout(() => {
        error.textContent = '';
      }, 2000);
    } else {
      const newTodo = new List(description, complete, index);
      window.location.reload();
      addLocalStorage(newTodo);
    }
  }
});

// Remove task from list
const removeBtn = document.querySelectorAll('.remove');
// console.log(removeBtn)
removeBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const btnID = e.target.id;
    remove(btnID);
    btn.parentElement.parentElement.remove();
    window.location.reload();
  });
});

/* eslint-disable no-plusplus */
const boxes = document.getElementsByClassName('entertodo').length;
function save() {
  for (let i = 1; i <= boxes; i++) {
    const checkbox = document.getElementById(String(i));
    localStorage.setItem(`checkbox${String(i)}`, checkbox.checked);
  }
}

// Loading checkbox status
for (let i = 1; i <= boxes; i++) {
  const checked = JSON.parse(localStorage.getItem(`checkbox${String(i)}`));
  document.getElementById(String(i)).checked = checked;
}

window.addEventListener('change', save);

// Clear everything from the  on refresh icon click
const ul = document.getElementById('to-do-container');
const refresh = document.getElementById('refreshIcon');
refresh.addEventListener('click', () => {
  ul.classList.add('active');
  localStorage.clear();
  window.location.reload();
});

const completeAllChecked = document.getElementById('complete');
completeAllChecked.addEventListener('click', () => {
  const getTasks = getLocalStorage().localTodos;
  const unChecked = getTasks.filter((task) => task.checked !== true);

  localStorage.setItem('todolist', JSON.stringify(unChecked));
});

// Event: Edit To Do Item
const editBtn = document.querySelectorAll('.edit');
editBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const { id } = e.target;
    editLocalStorage(id);
  });
});
