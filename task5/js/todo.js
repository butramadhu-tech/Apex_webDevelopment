/**
 * task5/js/todo.js
 * To-Do App Logic (CRUD, Filters, LocalStorage)
 */

document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const filters = document.querySelectorAll('.filter-btn');

    if (!todoInput || !addTodoBtn || !todoList) return; // Only run on todo page

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        
        let filteredTodos = todos;
        if (currentFilter === 'active') {
            filteredTodos = todos.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTodos = todos.filter(t => t.completed);
        }

        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''} reveal active`;
            
            const span = document.createElement('span');
            span.textContent = todo.text;
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'todo-actions';
            
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn-complete';
            completeBtn.innerHTML = '<i class="fas fa-check"></i>';
            completeBtn.onclick = () => toggleComplete(todo.id);

            const editBtn = document.createElement('button');
            editBtn.className = 'btn-edit';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.onclick = () => editTodo(todo.id);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn-delete';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.onclick = () => deleteTodo(todo.id);

            actionsDiv.append(completeBtn, editBtn, deleteBtn);
            li.append(span, actionsDiv);
            todoList.appendChild(li);
        });
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ id: Date.now(), text, completed: false });
            todoInput.value = '';
            saveTodos();
            renderTodos();
        }
    }

    function toggleComplete(id) {
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTodos();
        renderTodos();
    }

    function deleteTodo(id) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
    }

    function editTodo(id) {
        const todo = todos.find(t => t.id === id);
        const newText = prompt('Edit task:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            todo.text = newText.trim();
            saveTodos();
            renderTodos();
        }
    }

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    // Initial Render
    renderTodos();
});
