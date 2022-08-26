/**
 * @jest-environment jsdom
 */

import MockStorage from '../__mocks__/mockStorage.js';

import Lists from '../tasksTodo';

const list = new Lists();

function htmlList(obj) {
  const html = `<div class="todo-item">
          <div>
          <input id="${obj.id}" class="todo-check" type="checkbox" ${obj.completed} />
          <input id="${obj.id}" class="todo-edit" type="text" value="${obj.description}" />
          </div>
          <button id="${obj.id}" class="remove-btn"> <i class="fas fa-trash"></i></button>
          </div>
      `;
  return html;
}

describe('Add and deleting list items', () => {
  test('Add list item', () => {
    const bodyDummy = `
      <ul class="todo-container">
      </ul>
    `;
    document.body.insertAdjacentHTML('afterbegin', bodyDummy);
    const todoContainer = document.querySelector('.todo-container');
    let newObj = {
      id: 1,
      description: 'Test 1',
      completed: false,
      index: 1,
    };
    list.addTodo(newObj);
    todoContainer.insertAdjacentHTML('afterbegin', htmlList(newObj));
    let countTodo = todoContainer.children.length;
    expect(MockStorage.data[0]).toEqual(newObj);
    expect(countTodo).toBe(1);

    newObj = {
      id: 2,
      description: 'Test 2',
      completed: true,
      index: 2,
    };
    list.addTodo(newObj);
    todoContainer.insertAdjacentHTML('afterbegin', htmlList(newObj));
    countTodo = todoContainer.children.length;
    expect(MockStorage.data[1]).toEqual(newObj);
    expect(countTodo).toBe(2);

    newObj = {
      id: 3,
      description: 'Test 3',
      completed: false,
      index: 3,
    };
    list.addTodo(newObj);
    todoContainer.insertAdjacentHTML('afterbegin', htmlList(newObj));
    countTodo = todoContainer.children.length;
    expect(MockStorage.data[2]).toEqual(newObj);
    expect(countTodo).toBe(3);
  });

  test('Deleting item from the list', () => {
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const element = btn.parentNode;
        element.remove();
        list.removeTodo(e.target.parentNode.id);
      });
    });

    document.querySelector('button[id="2"]').click();
    list.removeTodo(2);
  });

  test('The container should only have 1 child', () => {
    const todoContainer = document.querySelector('.todo-container');
    let countTodo = todoContainer.children.length;
    expect(countTodo).toBe(2);

    document.querySelector('button[id="1"]').click();
    list.removeTodo(1);
    countTodo = todoContainer.children.length;
    expect(countTodo).toBe(1);
  });
});

export { MockStorage, list };