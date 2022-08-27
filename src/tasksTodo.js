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
    const tasktoRemove = this.list.filter((todo) => todo.id !== todoID);
    tasktoRemove.forEach((todo, index) => {
      todo.index = index + 1;
    });
    this.list = tasktoRemove;
    MockStorage.data = this.list;
  }
  editTodo(todoId, taskDesc) {
    this.list = this.list.map((todo) => {
      if (todo.id === Number(todoId)) {
        return { ...todo, description: taskDesc };
      }
      return todo;
    });
    MockStorage.data = this.list;
  }
  completeTodo(todoId, status) {
    const checkedTask = this.list.findIndex((element) => element.id === Number(todoId));
    this.list[checkedTask].completed = status;
    MockStorage.data = this.list;
  }
  clearCompletedTodos() {
    this.list = this.list.filter((todo) => !todo.completed);
    this.list.forEach((todo, index) => {
      todo.index = index + 1;
    });
    MockStorage.data = this.list;
  }
}