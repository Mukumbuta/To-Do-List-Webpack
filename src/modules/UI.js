import refresh from '../assets/refresh.svg';
import enter from '../assets/enter-12.svg';
import deleteIcon from '../assets/delete-524.svg';
import { getLocalStorage, removeLocalStorage } from './localstorage.js';


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
} 

export const add = () => {
    const list = getLocalStorage().localTodos;
    const container = document.getElementById('to-do-container');
    list.forEach((todoObj) => {
      const todo = document.createElement('li');
      todo.classList.add('list-item');
  
      todo.innerHTML = `<div class="list">
                          <div>
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
}

export const remove = (todoID) => {
    removeLocalStorage(todoID);
}