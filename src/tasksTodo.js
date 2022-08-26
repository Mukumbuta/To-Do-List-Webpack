import MockStorage from './__mocks__/mockStorage.js';

export default class Lists {
  constructor() {
    this.list = [];
  }

  addTodo(todo) {
    this.list.push(todo);
    MockStorage.data = this.list;
  }

  removeTodo(todoID) {
    const temp = this.list.filter((todo) => todo.id !== todoID);
    temp.forEach((todo, index) => {
      todo.index = index + 1;
    });
    this.list = temp;
    MockStorage.data = this.list;
  }
}