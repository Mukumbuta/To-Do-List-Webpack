// import _ from 'lodash';
import './style.css';
import { add, handleUI, remove } from './modules/UI.js';
import { getLocalStorage, addLocalStorage } from './modules/localstorage.js'
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
    let complete = false;
    const todoList = getLocalStorage();
    let index = todoList.length + 1;
    if(description === '') {
      const error = document.getElementById('error');
      error.textContent = 'Task description cannot be empty!';
      setTimeout(() => {
        error.textContent = '';
      }, 2000)
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
})
