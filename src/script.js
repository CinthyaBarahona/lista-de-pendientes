// Obtener los elementos del DOM
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');
const clearBtn = document.querySelector('#clear');
const searchInput = document.querySelector('#search');

// Crear un arreglo para almacenar los pendientes
let todos = [];

// Función para mostrar la lista de pendientes
function mostrarTodos(filteredTodos = null) {
    // Vaciar la lista antes de volver a renderizar
    list.innerHTML = '';

    // Usar los pendientes filtrados o todos los pendientes si no hay filtros
    const todosParaMostrar = filteredTodos || todos;

    // Recorrer los pendientes y agregarlos a la lista
    todosParaMostrar.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${todo}</span>
                    <button class="btn btn-danger delete" data-index="${index}">Borrar</button>
                    <button class="btn btn-primary edit" data-index="${index}">Editar</button>`;
        list.appendChild(li);
    });
}

// Función para agregar un pendiente
function agregarTodo() {
    const todo = input.value.trim();

    // Validar que el pendiente no esté vacío ni repetido
    if (todo === '') {
        alert('Ingresa un pendiente válido, no se permite texto vacío');
        return;
    }
    if (todos.includes(todo)) {
        alert('Este pendiente ya está en la lista');
        return;
    }

    // Agregar el pendiente al arreglo y mostrar la lista
    todos.push(todo);
    mostrarTodos();

    // Limpiar el input
    input.value = '';

    // Guardar los pendientes en localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Función para borrar un pendiente
function borrarTodo(index) {
    // Mostrar una confirmación antes de borrar
    if (confirm('¿Estás seguro de que quieres borrar este pendiente?')) {
        todos.splice(index, 1);
        mostrarTodos();

        // Guardar los pendientes en localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// Función para borrar todos los pendientes
function borrarTodos() {
    // Mostrar una confirmación antes de borrar
    if (confirm('¿Estás seguro de que quieres borrar todos los pendientes?')) {
        todos = [];
        mostrarTodos();

        // Borrar los pendientes de localStorage
        localStorage.removeItem('todos');
    }
}

// Función para buscar un pendiente
function buscarTodos() {
    const buscarText = searchInput.value.trim().toLowerCase();
    const filteredTodos = todos.filter(todo => todo.toLowerCase().includes(buscarText));
    mostrarTodos(filteredTodos);
}

// Función para editar un pendiente
function editarTodo() {
    const li = this.parentNode;
    const span = li.querySelector('span');
    const btn = li.querySelector('button');
    const index = btn.dataset.index;
    const todo = prompt('Edita el pendiente', todos[index]);

    // Validar que el pendiente no esté vacío ni repetido
    if (todo === '') {
        alert('Ingresa un pendiente válido');
        return;
    }
    if (todos.includes(todo)) {
        alert('Este pendiente ya está en la lista');
        return;
    }

    todos[index] = todo;
    span.textContent = todo;

    // Guardar los pendientes en localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Eventos
form.addEventListener('submit', e => {
    e.preventDefault();
    agregarTodo();
});

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        const index = e.target.dataset.index;
        borrarTodo(index);
    }
    if (e.target.classList.contains('edit')) {
        editarTodo.call(e.target);
    }
});

clearBtn.addEventListener('click', borrarTodos);

searchInput.addEventListener('input', buscarTodos);

// Inicializar la lista de pendientes al cargar la página
(function () {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        mostrarTodos();
    }
})();
