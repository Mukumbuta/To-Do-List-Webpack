// import _ from 'lodash';
import './style.css';

import { renderUI, handleUI } from './modules/UI.js';
import {
  getTodos, addItem, editItem, removeItem,
} from './modules/localstorage.js';
import List from './modules/constructor.js';

handleUI();
renderUI();

// Handle DOM events
// Add task to list
const editBtn = document.querySelectorAll('.edit');
const removeBtn = document.querySelectorAll('.remove');
const enterTodo = document.getElementById('enter-todo');
enterTodo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    // e.preventDefault();
    const description = document.getElementById('enter-todo').value;
    const complete = false;
    const todoList = getTodos();
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
      addItem(newTodo);
    }
  }
});

// Remove task from list
removeBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const btnID = e.target.id;
    removeItem(btnID, btn);
    window.location.reload();
  });
});

// Store checked status in localStorage
/* eslint-disable no-plusplus */
const boxes = document.getElementsByClassName('entertodo').length;
export default function statusManager(id, editbutton, deletebutton) {
  for (let i = 1; i <= boxes; i++) {
    const checkbox = document.getElementById(String(i));
    localStorage.setItem(`checkbox${String(i)}`, checkbox.checked);

    const gettodos = getTodos().localTodos;
    const completedTasks = gettodos.filter((task) => task.index === parseInt(id, 10));
    completedTasks[0].complete = true;
    gettodos[id - 1].complete = completedTasks[0].complete;
    localStorage.setItem('todolist', JSON.stringify(gettodos));

    editbutton.classList.add('active');
    deletebutton.classList.add('active');
  }
}

// Render checkbox status to UI
for (let i = 1; i <= boxes; i++) {
  const gettodos = getTodos().localTodos;
  if (gettodos[i - 1].complete === true) {
    const checked = JSON.parse(localStorage.getItem(`checkbox${String(i)}`));
    document.getElementById(String(i)).checked = checked;
  }
}

// Listens to changes on the Checkboxes
window.addEventListener('change', (e) => {
  const { id } = e.target;
  const targetElement = e.target;
  const parent = targetElement.parentElement;
  const editDeleteDiv = parent.nextElementSibling;
  const { children } = editDeleteDiv;
  const editbutton = children[0];
  const deletebutton = children[1];

  const labelElement = targetElement.nextElementSibling;

  labelElement.classList.add('active');
  statusManager(id, editbutton, deletebutton);
});

// Clear everything from the  on refresh icon click
const ul = document.getElementById('to-do-container');
const refresh = document.getElementById('refreshIcon');
refresh.addEventListener('click', () => {
  ul.classList.add('active');
  localStorage.clear();
  window.location.reload();
});

// Delete all completed tasks
const deleteAllChecked = document.getElementById('complete');
deleteAllChecked.addEventListener('click', () => {
  const getTasks = getTodos().localTodos;
  let incompleteTodos = getTasks.filter((task) => task.complete !== true);
  // reset the indices of the remaining tasks after deletion
  incompleteTodos = incompleteTodos.map((task, index) => {
    const result = {
      ...task,
      index: index + 1,
    };
    return result;
  });
  localStorage.setItem('todolist', JSON.stringify(incompleteTodos));
  window.location.reload();
});

// Event: Edit To Do Item
editBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const { id } = e.target;
    editItem(id);
  });
});
