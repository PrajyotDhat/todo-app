
const api = {
    getTodos: function() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        return todos;
    },
    addTodo: function(todo) {
        const todos = api.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    },
    updateTodo: function(index, updatedTodo) {
        const todos = api.getTodos();
        todos[index] = updatedTodo;
        localStorage.setItem('todos', JSON.stringify(todos));
    },
    deleteTodo: function(index) {
        const todos = api.getTodos();
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    function renderTodos() {
        const todos = api.getTodos();
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.classList.add('list')
            li.textContent = todo;
            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.classList.add('update');
            updateBtn.addEventListener('click', () => {
                const updatedTodo = prompt('Update the task', todo);
                if (updatedTodo) {
                    api.updateTodo(index, updatedTodo);
                    renderTodos();
                }
            });
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete');
            deleteBtn.addEventListener('click', () => {
                api.deleteTodo(index);
                renderTodos();
            });
            li.appendChild(updateBtn);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const todo = input.value.trim();
        if (todo) {
            api.addTodo(todo);
            input.value = '';
            renderTodos();
        }
    });

    renderTodos();
});