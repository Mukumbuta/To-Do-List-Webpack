export const getLocalStorage = () => {
    let localTodos;
    if(!localStorage.getItem('todolist')) {
        localTodos = [];
    } else {
        localTodos = JSON.parse(localStorage.getItem('todolist'));   
    }

    const length = localTodos.length;
    return {localTodos, length};
};

export const addLocalStorage = (addedTodo) => {
    const alltodos = getLocalStorage().localTodos;
    alltodos.push(addedTodo);
    localStorage.setItem('todolist', JSON.stringify(alltodos));
};

export const removeLocalStorage = (todoIndex) => {
    const alllocaltodos = getLocalStorage().localTodos;
    const filteredTodos = alllocaltodos.filter((todo) => todo.index !== parseInt(todoIndex, 10));
    localStorage.setItem('todolist', JSON.stringify(filteredTodos));
}; 