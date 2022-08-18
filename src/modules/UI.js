import refresh from '../assets/refresh.svg';
import enter from '../assets/enter-12.svg';
import deleteIcon from '../assets/delete-524.svg';
import dots from '../assets/three-dots.svg';
import { getLocalStorage, removeLocalStorage } from './localstorage.js';

export const handleUI = () => {
// Add logic for rendering image here
  const refreshImageCont = document.querySelector('.refresh-icon');
  const enterImageCont = document.querySelector('.inputt');

  const myIcon = new Image();
  myIcon.src = refresh;
  myIcon.id = 'refreshIcon';

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
                            <input type="checkbox" class="entertodo" id="${todoObj.index}">
                            <label for="enter-todo">
                              ${todoObj.description}
                            </label>
                          </div>
                          <div class="image">
                            <img src="${dots}" class="edit" id="${todoObj.index}" alt="three-dots icon">
                            <img src="${deleteIcon}" class="remove" id="${todoObj.index}" alt="dust-bin icon">
                          </div>
                        </div>`;

    container.appendChild(todo);
    return container;
  });
};

export const remove = (todoID) => {
  removeLocalStorage(todoID);
};