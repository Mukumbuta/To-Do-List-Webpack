const { addItem } = require('./src/modules/localstorage');

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

global.localStorage = localStorageMock;

test('addLocalStorage function should set item to localStorage', () => {
  const todo = {
    description: 'Read a book',
    complete: false,
    index: 1,
  };

  addItem(todo);
  expect(global.localStorage.setItem).toHaveBeenCalled();
  expect(global.localStorage.setItem).toHaveBeenCalledWith('todolist', JSON.stringify([todo]));
});