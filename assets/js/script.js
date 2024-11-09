document.addEventListener("DOMContentLoaded", () => {
  const addItemBtn = document.getElementById('addItemBtn');
  const newItemInput = document.getElementById('newItemInput');
  const itemsList = document.getElementById('itemsList');
  const cuentaTareas = document.querySelector("#cuenta-tareas");
  const cuentaTareasRealizadas = document.querySelector("#cuenta-tareas-realizadas");
  const showAllBtn = document.getElementById('showAllBtn');
  const hideAllBtn = document.getElementById('hideAllBtn');

  let itemIdCounter = 0;
  let totalTareas = 0;
  let tareasRealizadas = 0;
  let items = []; // Array para almacenar todos los productos agregados

  // Función para actualizar el contador de tareas
  function updateTareasCount() {
    cuentaTareas.textContent = `Total productos: ${totalTareas}`;
    cuentaTareasRealizadas.textContent = `Productos listos: ${tareasRealizadas}`;
  }

  // Función para crear un nuevo producto
  function createItem(itemText) {
    const itemId = itemIdCounter;
    itemIdCounter++;
    totalTareas++;

    const li = document.createElement('li');
    const itemIdSpan = document.createElement('span');
    itemIdSpan.id = 'itemId';
    itemIdSpan.textContent = itemId;

    const span = document.createElement('span');
    span.textContent = itemText;

    // Botón de completar con ícono de "check_circle"
    const completeBtn = document.createElement('button');
    completeBtn.className = 'completeBtn';
    completeBtn.innerHTML = '<span class="material-icons">check_circle</span>';
    completeBtn.addEventListener('click', () => {
      li.classList.toggle('completed');
      if (li.classList.contains('completed')) {
        tareasRealizadas++;
      } else {
        tareasRealizadas--;
      }
      updateTareasCount();
    });

    // Botón de eliminar con ícono de "delete"
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerHTML = '<span class="material-icons">delete</span>';
    deleteBtn.addEventListener('click', () => {
      li.remove();
      totalTareas--;
      if (li.classList.contains('completed')) {
        tareasRealizadas--;
      }
      updateTareasCount();
      items = items.filter(item => item.id !== itemId); // Remover de la lista interna
    });

    li.appendChild(itemIdSpan);
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    // Añadir el nuevo item a la lista interna de items
    items.push({ id: itemId, element: li });

    // Mostrar solo los primeros 4 productos
    if (items.length > 4) {
      li.classList.add('hidden');
    }

    itemsList.appendChild(li);
    updateTareasCount();
  }

  // Evento de clic en el botón "Añadir producto"
  addItemBtn.addEventListener('click', () => {
    const itemText = newItemInput.value.trim();
    if (itemText) {
      createItem(itemText);
      newItemInput.value = ''; // Limpiar el campo de entrada
    }
  });

  // Evento para añadir un producto al presionar "Enter"
  newItemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const itemText = newItemInput.value.trim();
      if (itemText) {
        createItem(itemText);
        newItemInput.value = ''; // Limpiar el campo de entrada
      }
    }
  });

  // Evento para mostrar todos los productos
  showAllBtn.addEventListener('click', () => {
    items.forEach(item => {
      item.element.classList.remove('hidden'); // Mostrar todos los productos
    });
    showAllBtn.style.display = 'none'; // Ocultar el botón "Mostrar todos"
    hideAllBtn.style.display = 'inline-block'; // Mostrar el botón "Ocultar productos"
  });

  // Evento para ocultar productos y mostrar el botón "Mostrar todos"
  hideAllBtn.addEventListener('click', () => {
    items.slice(4).forEach(item => {
      item.element.classList.add('hidden'); // Ocultar productos adicionales
    });
    hideAllBtn.style.display = 'none'; // Ocultar el botón "Ocultar productos"
    showAllBtn.style.display = 'inline-block'; // Mostrar el botón "Mostrar todos"
  });
});
