const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const pendingCounter = document.getElementById('pendingCounter');
const completedCounter = document.getElementById('completedCounter');
const totalTasks = document.getElementById('totalTasks');
const togglePending = document.getElementById('togglePending');
const toggleCompleted = document.getElementById('toggleCompleted');
const toggleAll = document.getElementById('toggleAll');
let taskId = 0;

// Initially disable toggle buttons
togglePending.disabled = true;
toggleCompleted.disabled = true;
toggleAll.disabled = true;

addBtn.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const todoItem = createTodoItem(todoText);
        todoList.appendChild(todoItem);
        updateCounters();
        todoInput.value = '';

        // Enable toggle buttons once todo list is created
        togglePending.style.pointerEvents = 'auto';
        toggleCompleted.style.pointerEvents = 'auto';
        toggleAll.style.pointerEvents = 'auto';

        // Preselect "All" button
        toggleAll.classList.add('selected');
        togglePending.classList.remove('selected');
        toggleCompleted.classList.remove('selected');
        toggleVisibility('all');
    }
});


togglePending.addEventListener('click', () => {
    togglePending.classList.add('selected');
    toggleCompleted.classList.remove('selected');
    toggleAll.classList.remove('selected');
    toggleVisibility('pending');
});

toggleCompleted.addEventListener('click', () => {
    toggleCompleted.classList.add('selected');
    togglePending.classList.remove('selected');
    toggleAll.classList.remove('selected');
    toggleVisibility('completed');
});

toggleAll.addEventListener('click', () => {
    toggleAll.classList.add('selected');
    togglePending.classList.remove('selected');
    toggleCompleted.classList.remove('selected');
    toggleVisibility('all');
});

function createTodoItem(text) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.dataset.id = ++taskId;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        todoItem.classList.toggle('checked');
        updateCounters();
    });

    const todoText = document.createElement('span');
    todoText.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        todoItem.remove();
        updateCounters();
    });

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteBtn);

    return todoItem;
}

function toggleVisibility(type) {
    const allTasks = document.querySelectorAll('.todo-item');
    const pendingTasks = document.querySelectorAll('.todo-item:not(.checked)');
    const completedTasks = document.querySelectorAll('.todo-item.checked');

    switch (type) {
        case 'pending':
            toggleElements(allTasks, pendingTasks);
            break;
        case 'completed':
            toggleElements(allTasks, completedTasks);
            break;
        case 'all':
            allTasks.forEach(task => (task.style.display = 'flex'));
            break;
    }

    updateCounters();
}

function toggleElements(allTasks, tasksToDisplay) {
    const tasksToDisplayArray = Array.from(tasksToDisplay);
    allTasks.forEach(task => {
        if (tasksToDisplayArray.includes(task)) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

function updateCounters() {
    const total = document.querySelectorAll('.todo-item').length;
    const pending = document.querySelectorAll('.todo-item:not(.checked)').length;
    const completed = total - pending;

    pendingCounter.textContent = `(${pending})`;
    completedCounter.textContent = `(${completed})`;
    totalTasks.textContent = `(${total})`;
}
