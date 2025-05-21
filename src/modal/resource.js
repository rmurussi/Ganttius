function getResourceIcon(nam) {
  if (!nam || nam === '-') return '';
  const res = projectData.project.resources.find(r => r.name === nam);
  if (!res) return 'fas fa-user';
  switch (res.level) {
  case 'Jr': return 'fas fa-user-graduate';
  case 'Pl': return 'fas fa-user-tie';
  case 'Sr': return 'fas fa-user-astronaut';
  default: return 'fas fa-user';
  }
}

function showResourceSelect(idx, elm) {
  const sel = d.c('select');
  sel.className = 'w-full text-xs';
  sel.innerHTML = '<option value="-">-</option>' + 
  projectData.project.resources.map(r => `<option value="${r.name}"><i class="${getResourceIcon(r.name)} mr-1"></i>${r.name}</option>`).join('');
  sel.onblur = () => {
    const val = sel.value;
    projectData.project.tasks[idx].resource = val;
    projectData.project.filters.resource.add(val);
    elm.innerHTML = val === '-' ? '-' : `<i class="${getResourceIcon(val)} mr-1"></i>${val}`;
    GridManager.update([idx]);
    buildGantt();
  };
  elm.innerHTML = '';
  elm.ac(sel);
  sel.focus();
}

function registerMissingResources() {
  const existingResources = new Set(projectData.project.resources.map(r => r.name));
  let maxId = Math.max(...projectData.project.resources.map(r => r.id), 0);

  projectData.project.tasks.forEach(tsk => {
    if (tsk.resource && tsk.resource !== '-' && !existingResources.has(tsk.resource)) {
      maxId++;
      projectData.project.resources.push({
        id: maxId,
        name: tsk.resource,
        level: "Jr"
      });
      existingResources.add(tsk.resource);
    }
  });
}

function buildUsersModal() {
  const bdy = d.i('usersTableBody');
  if (!bdy) return;

  // Garante que todos os recursos das tarefas estejam registrados
  registerMissingResources();

  bdy.innerHTML = '';
  projectData.project.resources.forEach((res, idx) => {
    const row = d.c('tr');
    row.innerHTML = `
          <td class="p-1 text-center relative">
              <button class="levelBtn p-1" data-index="${idx}"><i class="${getResourceIcon(res.name)}"></i></button>
              <div class="levelMenu hidden absolute z-10 bg-white text-gray-800 rounded shadow-lg">
                  <button class="block px-4 py-2 hover:bg-gray-100" data-level="Jr"><i class="fas fa-user-graduate"></i> Jr</button>
                  <button class="block px-4 py-2 hover:bg-gray-100" data-level="Pl"><i class="fas fa-user-tie"></i> Pl</button>
                  <button class="block px-4 py-2 hover:bg-gray-100" data-level="Sr"><i class="fas fa-user-astronaut"></i> Sr</button>
              </div>
          </td>
          <td class="p-1 text-xs truncate max-w-[200px]" title="${res.name}" 
              contenteditable="false" onblur="updateResource(${idx}, this)" 
              onkeydown="if(event.key === 'Enter') this.blur()" 
              ondblclick="this.contentEditable=true">${res.name}</td>
    `;
    bdy.ac(row);
  });

  const edr = d.c('tr');
  edr.innerHTML = `
      <td class="p-1 text-center relative">
          <button class="levelBtn p-1" data-level="Jr"><i class="fas fa-user-graduate"></i></button>
          <div class="levelMenu hidden absolute z-10 bg-white text-gray-800 rounded shadow-lg">
              <button class="block px-4 py-2 hover:bg-gray-100" data-level="Jr"><i class="fas fa-user-graduate"></i> Jr</button>
              <button class="block px-4 py-2 hover:bg-gray-100" data-level="Pl"><i class="fas fa-user-tie"></i> Pl</button>
              <button class="block px-4 py-2 hover:bg-gray-100" data-level="Sr"><i class="fas fa-user-astronaut"></i> Sr</button>
          </div>
      </td>
      <td class="p-1"><input class="w-full text-xs" placeholder="${translations[currentLang].resources}" onblur="saveNewResource(this)"></td>
  `;
  bdy.ac(edr);

  const hed = d.s('#usersModal thead tr');
  if (hed) {
    hed.innerHTML = `
          <th class="p-2 text-center">${translations[currentLang].id}</th>
          <th class="p-2 text-left">${translations[currentLang].name}</th>
    `;
  }

  d.q('.levelBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mnu = btn.nextElementSibling;
      mnu.classList.toggle('hidden');
    });
  });

  d.q('.levelMenu button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lvb = btn.closest('tr').qs('.levelBtn');
      const idx = lvb.dataset.index;
      const lvl = btn.dataset.level;
      if (idx !== undefined) {
        updateResourceLevel(idx, lvl);
      } else {
        lvb.innerHTML = `<i class="${btn.qs('i').className}"></i>`;
        lvb.dataset.level = lvl;
      }
      btn.closest('.levelMenu').ca('hidden');
    });
  });
}

function updateResource(idx, elm) {
  elm.contentEditable = false;
  projectData.project.resources[idx].name = elm.textContent.trim() || `Recurso ${idx + 1}`;
  buildGrid();
  buildUsersModal();
}

function updateResourceLevel(idx, lvl) {
  projectData.project.resources[idx].level = lvl;
  buildUsersModal();
  updateResourceColumnInGrid();
}

function saveNewResource(inp) {
  if (!inp || typeof inp.value === 'undefined') return;

  const val = inp.value.trim();
  const btn = inp.closest('tr').qs('.levelBtn');
  const lvl = btn ? btn.dataset.level : 'Jr';

  if (val) {
    const res = {
      id: projectData.project.resources.length + 1,
      name: val,
      level: lvl
    };
    projectData.project.resources.push(res);

    if (!projectData.project.filters.resource.has(val)) {
      projectData.project.filters.resource.add(val);
    }

    buildUsersModal();
    updateResourceColumnInGrid();
  }
}

function updateResourceColumnInGrid() {
  const bdy = d.i('mainTableBody');
  if (!bdy) return;

  projectData.project.tasks.forEach((tsk, idx) => {
    if (isTaskVisible(tsk.id)) {
      GridManager.updateRow(idx);
    }
  });
}