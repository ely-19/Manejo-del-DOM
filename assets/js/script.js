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
  let items = []; 

 
  function updateTareasCount() {
    cuentaTareas.textContent = `Total productos: ${totalTareas}`;
    cuentaTareasRealizadas.textContent = `Productos listos: ${tareasRealizadas}`;
  }

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
      items = items.filter(item => item.id !== itemId); 
    });

    li.appendChild(itemIdSpan);
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    
    items.push({ id: itemId, element: li });

   
    if (items.length > 4) {
      li.classList.add('hidden');
    }

    itemsList.appendChild(li);
    updateTareasCount();
  }


  addItemBtn.addEventListener('click', () => {
    const itemText = newItemInput.value.trim();
    if (itemText) {
      createItem(itemText);
      newItemInput.value = ''; a
    }
  });


  newItemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const itemText = newItemInput.value.trim();
      if (itemText) {
        createItem(itemText);
        newItemInput.value = ''; 
      }
    }
  });

 
  showAllBtn.addEventListener('click', () => {
    items.forEach(item => {
      item.element.classList.remove('hidden'); 
    });
    showAllBtn.style.display = 'none'; 
    hideAllBtn.style.display = 'inline-block'; 
  });

  
  hideAllBtn.addEventListener('click', () => {
    items.slice(4).forEach(item => {
      item.element.classList.add('hidden'); 
    });
    hideAllBtn.style.display = 'none'; 
    showAllBtn.style.display = 'inline-block'; 
  });
});
