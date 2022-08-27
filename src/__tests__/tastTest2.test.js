/**
 * @jest-environment jsdom
 */
import { list, MockStorage } from './taskTest.test.js';

const clearAll = `
        <div class="remove">
            <a class="removebutton">Clear All</a>
        </div>
`;
describe('CRUD Operations', () => {
  document.body.insertAdjacentHTML('beforeend', clearAll);
  test('Todo list description should change from `Test 3` to `List 3`', () => {
    const listcont = document.querySelector('.todo-container');
    const descrValue = listcont.querySelector('.todo-edit');
    expect(descrValue.value).toMatch('Test 3');
    const newTaskDesc = 'List 3';
    descrValue.value = newTaskDesc;
    list.editTodo(descrValue.id, newTaskDesc);

    expect(MockStorage.data[0].description).toMatch(newTaskDesc);
    expect(descrValue.value).toMatch('List 3');
  });
  test('Change completed status from false to true', () => {
    const listcont = document.querySelector('.todo-container');
    const taskCheck = listcont.querySelector('.todo-check');
    expect(taskCheck.checked).toBeFalsy();
    taskCheck.checked = true;
    list.completeTodo(taskCheck.id, taskCheck.checked);
    expect(MockStorage.data[0].completed).toBeTruthy();
    expect(taskCheck.checked).toBeTruthy();
  });
  test('Should clear all completed tasks', () => {
    const removeBtn = document.querySelector('.removebutton');
    removeBtn.addEventListener('click', list.clearCompletedTodos());
    removeBtn.click();
    expect(MockStorage.data.length).toBe(0);
  });
});