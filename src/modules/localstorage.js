const getTodos = () => {
  let localTodos;
  if (!localStorage.getItem('todolist')) {
    localTodos = [];
  } else {
    localTodos = JSON.parse(localStorage.getItem('todolist'));
  }

  const { length } = localTodos;
  return { localTodos, length };
};

const addItem = (addedTodo) => {
  const alltodos = getTodos().localTodos;
  alltodos.push(addedTodo);
  localStorage.setItem('todolist', JSON.stringify(alltodos));
};

const removeItem = (todoIndex, btn) => {
  let alllocaltodos = getTodos().localTodos;
  alllocaltodos = alllocaltodos.filter((todo) => todo.index !== parseInt(todoIndex, 10));

  alllocaltodos = alllocaltodos.map((task, index) => {
    const result = {
      ...task,
      index: index + 1,
    };
    return result;
  });
  localStorage.setItem('todolist', JSON.stringify(alllocaltodos));
  btn.parentElement.parentElement.remove();
};

const editItem = (id) => {
  const inputBox = document.getElementById('enter-todo');
  const localToDos = getTodos().localTodos;
  const edited = localToDos.filter((todo) => todo.index === parseInt(id, 10));
  inputBox.value = edited[0].description;

  // Save the changed to the edited to do item
  inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      edited.description = inputBox.value;
      inputBox.value = '';
      localToDos[id - 1].description = edited.description;
      localStorage.setItem('todolist', JSON.stringify(localToDos));
    }
  });
};

export {
  getTodos, addItem, editItem, removeItem,
};
