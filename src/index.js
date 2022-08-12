// import _ from 'lodash';
import './style.css';
import refresh from './images/refresh.svg';
import enter from './images/enter-12.svg';
import dots from './images/three-dots.svg';

const dataBase = [
  {
    description: 'Take my daughter to school',
    completed: true,
    index: 1,
  },
  {
    description: 'Join Morning Call Session',
    completed: true,
    index: 1,
  },
  {
    description: 'Join my coding partner',
    completed: true,
    index: 1,
  },
  {
    description: 'Pick up my daughter from school',
    completed: false,
    index: 1,
  },
];

function renderUI() {
  const container = document.getElementById('to-do-container');
  dataBase.forEach((todoObj) => {
    const todo = document.createElement('li');
    todo.classList.add('list-item');

    // Configure button
    // let completeBtn = document.createElement('input');
    // completeBtn.type = 'button';
    // completeBtn.value = 'Clear all completed';

    todo.innerHTML = `<div class="list">
                        <div>
                          <input type="checkbox" id="enter-todo">
                          <label for="enter-todo">
                            ${todoObj.description}
                          </label>
                        </div>
                        <div class="image">
                        <img src="${dots}" alt="three dots">
                        </div>
                      </div>`;

    container.appendChild(todo);
    return container;
  });

  // Add logic for rendering image here
  const refreshImageCont = document.querySelector('.refresh-icon');
  const enterImageCont = document.querySelector('.inputt');

  const myIcon = new Image();
  myIcon.src = refresh;

  refreshImageCont.appendChild(myIcon);

  const enterIcon = new Image();
  enterIcon.src = enter;
  enterImageCont.appendChild(enterIcon);
}

document.body.appendChild(renderUI());