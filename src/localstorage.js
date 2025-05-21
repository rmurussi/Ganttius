async function saveToLocalStorage(httpCode) {
  if (httpCode != 200) {
    return false;
  }

  const dat = { project: { ...projectData.project } };
  if (projectData.project.id == 1) {
    dat.project.id = await bkend.new();
    projectData.project.id = dat.project.id;
  }

  delete dat.project.columnNames;
  const str = JSON.stringify(dat);
  const siz = new Blob([str]).size;
  const max = 5 * 1024 * 1024;

  if (siz < max) {
    const key = `project_${projectData.project.id}`;
    localStorage.setItem(key, str);
  } else {
    // console.warn('Tamanho do projeto excede 5MB, não salvo no localStorage.');
  }
}

function buildProjectList() {
  const lst = d.i('projectList');
  lst.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('project_')) {
      const dat = localStorage.getItem(key);
      const prj = JSON.parse(dat).project;
      const li = d.c('li');
      li.className = 'flex justify-between items-center py-2 border-b';
      li.innerHTML = `
            <span class="cursor-pointer" onclick="loadProject('${key}')">${prj.name}</span>
            <button class="text-red-600" onclick="deleteProject('${key}')"><i class="fas fa-trash"></i></button>
      `;
      lst.ac(li);
    }
  }
}

function loadProject(key) {
  const old = currentLang;
  projectData = JSON.parse(localStorage.getItem(key));
  if (!projectData.project.id) {
    projectData.project.id = key.split('_')[1];
  }
  if (!projectData.project.columnOrder) {
    projectData.project.columnOrder = ["actions", "percentComplete", "status", "name", "duration", "start", "end", "resource", "predecessors"];
  }
  if (!projectData.project.columnNames) {
    projectData.project.columnNames = {
      actions: getTranslation('actions',old),
      percentComplete: getTranslation('percentComplete',old),
      status: getTranslation('status',old),
      name: getTranslation('name',old),
      duration: getTranslation('duration',old),
      start: getTranslation('start',old),
      end: getTranslation('end',old),
      resource: getTranslation('resource',old),
      predecessors: getTranslation('predecessors',old)
    };
  }

// Cadastrar recursos ausentes
  registerMissingResources();

// Atualizar filtros com os recursos do projeto
  projectData.project.filters = {
    status: new Set(projectData.project.tasks.map(t => t.status)),
    resource: new Set(projectData.project.tasks.map(t => t.resource)),
    predecessors: new Set(projectData.project.tasks.map(t => t.predecessors))
  };

  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  updateGridHeaders();
// buildGrid();
  GridManager.renderFullGrid();
  buildGantt();
  buildUsersModal();
  currentLang = old;
  updateLanguage(currentLang);
  toggleSidebar();
}

function deleteProject(key) {
  if (confirm(getTranslation("confirmDeleteProject"))) {
    localStorage.removeItem(key);
    buildProjectList();
  }
}