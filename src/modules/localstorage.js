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

const removeItem = (todoIndex) => {
  let alllocaltodos = getTodos().localTodos;
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

// Edit To DO Item
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


module.exports = { getTodos, addItem, editItem, removeItem };
