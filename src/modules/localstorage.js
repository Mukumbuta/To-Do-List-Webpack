export const getLocalStorage = () => {
  let localTodos;
  if (!localStorage.getItem('todolist')) {
    localTodos = [];
  } else {
    localTodos = JSON.parse(localStorage.getItem('todolist'));
  }

  const { length } = localTodos;
  return { localTodos, length };
};

export const addLocalStorage = (addedTodo) => {
  const alltodos = getLocalStorage().localTodos;
  alltodos.push(addedTodo);
  localStorage.setItem('todolist', JSON.stringify(alltodos));
};

export const removeLocalStorage = (todoIndex) => {
  let alllocaltodos = getLocalStorage().localTodos;
  alllocaltodos = alllocaltodos.filter((todo) => todo.index !== parseInt(todoIndex, 10));

  // reset the indices of the remaining tasks after deletion
  alllocaltodos = alllocaltodos.map((task, index) => {
    const result = {
      ...task,
      index: index + 1,
    };
    return result;
  });
  localStorage.setItem('todolist', JSON.stringify(alllocaltodos));
};
