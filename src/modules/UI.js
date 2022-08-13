import refresh from '../assets/refresh.svg';
import enter from '../assets/enter-12.svg';
import deleteIcon from '../assets/delete-524.svg';
import { getLocalStorage, removeLocalStorage } from './localstorage.js';
import { update } from 'lodash';

export const handleUI = () => {
  // Add logic for rendering image here
  const refreshImageCont = document.querySelector('.refresh-icon');
  const enterImageCont = document.querySelector('.inputt');

  const myIcon = new Image();
  myIcon.src = refresh;

  refreshImageCont.appendChild(myIcon);

  const enterIcon = new Image();
  enterIcon.src = enter;
  enterIcon.id = 'enter';
  enterImageCont.appendChild(enterIcon);
};

export const add = () => {
  const list = getLocalStorage().localTodos;
  const container = document.getElementById('to-do-container');
  list.forEach((todoObj) => {
    const todo = document.createElement('li');
    todo.classList.add('list-item');

    todo.innerHTML = `<div class="list">
                          <div class="task">
                            <input type="checkbox" id="enter-todo">
                            <label for="enter-todo">
                              ${todoObj.description}
                            </label>
                          </div>
                          <div class="image">
                            <img src="${deleteIcon}" class="remove" id="${todoObj.index}" alt="three dots">
                          </div>
                        </div>`;

    container.appendChild(todo);
    return container;
  });
};

// function saveItem(e) {
//   let itemInput = document.getElementById('enter-todo');
//   let inputValue = e.target.value;
//   if(e.target.value.length > 0 && (e.type === 'click')) {
//     itemInput.textContent = e.target.value;
//     e.target.parentNode.prepend(itemInput);
//     e.target.remove();
//   }
// }

// export const updateUI = (e) => {
//   let item = e.target.innerHTML;
//   let itemInput = document.getElementById('enter-todo');
//   itemInput.value = item;
//   itemInput.addEventListener('click', saveItem);
//   itemInput.select();
// }

export const remove = (todoID) => {
  removeLocalStorage(todoID);
};