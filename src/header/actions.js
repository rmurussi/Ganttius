function updateLanguage(lng) {
  const old = currentLang;
  currentLang = lng;
  d.s('#languageBtn').textContent = lng === 'pt-BR' ? 'BR' : lng === 'en' ? 'EN' : 'ES';
  d.s('#usersModal h2').textContent = translations[lng].resources;
  d.s('#usersModal th:first-child').textContent = translations[currentLang].id;
  d.q('#usersModal th')[1].textContent = translations[currentLang].name;
  d.s('#usersModal button').textContent = translations[lng].close;
  d.s('#sidebarTitle').textContent = translations[lng].projects;

  Object.keys(projectData.project.columnNames).forEach(key => {
    if (projectData.project.columnNames[key] === translations[old][key]) {
      projectData.project.columnNames[key] = translations[lng][key];
    }
  });

  updateGridHeaders();
  GridManager.renderFullGrid();
  buildGantt();
  buildUsersModal();
}

function toggleLayout() {
  firstLoad = false;
  isHorizontalLayout = !isHorizontalLayout;
  d.i('layoutBtn').innerHTML = `<i class="fas fa-${isHorizontalLayout ? 'bars' : 'columns'}"></i>`;

  const grd = d.i('gridTask');
  const gnt = d.i('graphGantt');

  if (isHorizontalLayout) {
    d.s('.flex.h-full').className = 'flex flex-col h-full';
    grd.className = 'w-full p-6 mt-3 bg-white shadow-md rounded-l-lg';
    gnt.className = 'relative w-full mt-3 px-6 pb-6 bg-white shadow-md border-l border-gray-50';
  } else {
    d.s('.flex.flex-col.h-full').className = 'flex h-full';
    grd.className = 'w-1/2 p-6 mt-3 bg-white shadow-md rounded-l-lg';
    gnt.className = 'relative w-1/2 mt-3 px-6 pb-6 bg-white shadow-md border-l border-gray-50';
  }

  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  GridManager.renderFullGrid();
  buildGantt();
}

function toggleSidebar() {
  const sbr = d.i('sidebar');
  const btn = d.i('sidebarBtn');
  sbr.classList.toggle('-translate-x-full');

  if (!sbr.classList.contains('-translate-x-full')) {
    buildProjectList();
    d.r('click', closeSidebarHandler);
    setTimeout(() => {
      d.e('click', closeSidebarHandler);
    }, 0);
  } else {
    d.r('click', closeSidebarHandler);
  }
}

function closeSidebarHandler(evt) {
  const sbr = d.i('sidebar');
  const btn = d.i('sidebarBtn');
  if (!sbr.contains(evt.target) && evt.target !== btn && !sbr.classList.contains('-translate-x-full')) {
    sbr.ca('-translate-x-full');
    d.r('click', closeSidebarHandler);
  }
}

async function newProject() {
  var id = await bkend.new();

  if (confirm(translations[currentLang].confirmNewProject)) {
    const now = new Date().toISOString().split('T')[0];
    projectData = {
      "project": {
        "id": id,
        "name": translations[currentLang].newProject,
        "tasks": [],
        "resources": [
          {"id": 1, "name": "Recurso 1", "level": "Jr"},
          {"id": 2, "name": "Recurso 2", "level": "Pl"},
          {"id": 3, "name": "Recurso 3", "level": "Sr"}
        ],
        "columnVisibility": {
          "actions": true,
          "percentComplete": true,
          "status": true,
          "name": true,
          "duration": true,
          "start": true,
          "end": true,
          "resource": true,
          "predecessors": true
        },
        "columnOrder": ["actions", "percentComplete", "status", "name", "duration", "start", "end", "resource", "predecessors"],
        "columnNames": {
          "actions": translations[currentLang].actions,
          "percentComplete": translations[currentLang].percentComplete,
          "status": translations[currentLang].status,
          "name": translations[currentLang].name,
          "duration": translations[currentLang].duration,
          "start": translations[currentLang].start,
          "end": translations[currentLang].end,
          "resource": translations[currentLang].resource,
          "predecessors": translations[currentLang].predecessors
        },
        "statusColors": {
          "notStarted": "bg-gray-300",
          "inProgress": "bg-teal-300",
          "completed": "bg-blue-400"
        },
        "filters": {
          status: new Set(),
          resource: new Set(),
          predecessors: new Set()
        }
      }
    };
    projectData.project.timeline = generateTimeline(projectData.project.tasks);
    updateGridHeaders();
    // buildGrid();
    GridManager.renderFullGrid();
    buildGantt();
    buildUsersModal();

    GridManager.addNewTaskRow();
  }
}

function updateProjectName(elm) {
  elm.contentEditable = false;
  projectData.project.name = elm.textContent.trim() || "Projeto sem nome";
  GridManager.init();
}

