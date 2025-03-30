const url_base = "https://squid-app-33v59.ondigitalocean.app";

let projectData = {
 "project": {
   "id": "1",
   "name": "Diagramma Ganttius",
   "tasks": [
     {
       "id": 1,
       "name": "Planejamento Inicial",
       "duration": 98,
       "status": "inProgress",
       "resource": "João",
       "parentId": null,
       "predecessors": "-",
       "start": "2025-03-26",
       "end": "2025-05-04",
       "percentComplete": 9,
       "level": 0,
       "expanded": true
     },
     {
       "id": 2,
       "name": "Análise de Requisitos",
       "duration": 8,
       "status": "inProgress",
       "resource": "Maria",
       "parentId": 1,
       "predecessors": "",
       "start": "2025-03-26",
       "end": "2025-04-02",
       "percentComplete": 60,
       "level": 1,
       "expanded": true
     },
     {
       "id": 3,
       "name": "Design de Interface",
       "duration": 12,
       "status": "notStarted",
       "resource": "Pedro",
       "parentId": 1,
       "predecessors": "2",
       "start": "2025-04-03",
       "end": "2025-04-14",
       "percentComplete": 0,
       "level": 1,
       "expanded": true
     },
     {
       "id": 4,
       "name": "Desenvolvimento Frontend",
       "duration": 4,
       "status": "notStarted",
       "resource": "Ana",
       "parentId": 1,
       "predecessors": "3",
       "start": "2025-04-22",
       "end": "2025-04-25",
       "percentComplete": 0,
       "level": 1,
       "expanded": true
     },
     {
       "id": 5,
       "name": "Testes Unitários",
       "duration": 7,
       "status": "notStarted",
       "resource": "Carlos",
       "parentId": 1,
       "predecessors": "-",
       "start": "2025-04-15",
       "end": "2025-04-21",
       "percentComplete": 0,
       "level": 1,
       "expanded": true
     },
     {
       "id": 6,
       "name": "Revisão de Código",
       "duration": 4,
       "status": "notStarted",
       "resource": "Mariana",
       "parentId": 1,
       "predecessors": "4",
       "start": "2025-04-22",
       "end": "2025-04-25",
       "percentComplete": 0,
       "level": 1,
       "expanded": true
     },
     {
       "id": 7,
       "name": "Deploy Inicial",
       "duration": 3,
       "status": "notStarted",
       "resource": "Lucas",
       "parentId": 1,
       "predecessors": "6",
       "start": "2025-04-26",
       "end": "2025-04-28",
       "percentComplete": 0,
       "level": 1,
       "expanded": true
     },
     {
       "id": 8,
       "name": "Validação Final",
       "duration": 60,
       "status": "notStarted",
       "resource": "João",
       "parentId": 1,
       "predecessors": "7",
       "start": "2025-04-29",
       "end": "2025-07-04",
       "percentComplete": 0,
       "level": 1,
       "expanded": true
     }
   ],
   "resources": [
     {"id": 1, "name": "Recurso 1", "level": "Junior"},
     {"id": 2, "name": "Recurso 2", "level": "Pleno"},
     {"id": 3, "name": "Recurso 3", "level": "Senior"}
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
     "actions": "...",
     "percentComplete": "% Completo",
     "status": "Status",
     "name": "Nome",
     "duration": "Duração",
     "start": "Início",
     "end": "Fim",
     "resource": "Recurso",
     "predecessors": "Antecessores"
   },
   "statusColors": {
     "notStarted": "bg-gray-300",
     "inProgress": "bg-teal-300",
     "completed": "bg-blue-400",
     "inPlanning": "bg-gray-300",
     "inTesting": "bg-blue-200",
     "delayed": "bg-purple-400",
     "onHold": "bg-yellow-200",
     "closed": "bg-green-400",
     "budgeting": "bg-green-200",
     "inReview": "bg-blue-200",
     "canceled": "bg-red-300",
     "postponed": "bg-purple-200",
     "w8": "bg-purple-300"
   }
 }
};

Element.prototype.ac = function (child) { this.appendChild(child); };
Array.prototype.io = function (el) { return this.indexOf(el); };
Element.prototype.ca = function (cls) { this.classList.add(cls); };
Element.prototype.sa = function (attr, val) { this.setAttribute(attr, val); };
Document.prototype.qs = Element.prototype.qs = function (sel) { return this.querySelector(sel); };

const gstatus = [
 "close",
 "newTask",
 "notStarted",
 "inProgress",
 "completed",
 "inPlanning",
 "inTesting",
 "delayed",
 "onHold",
 "closed",
 "budgeting",
 "inReview",
 "canceled",
 "postponed",
 "w8",
];

const translations = {
 "pt-BR": {
   "id": "#",
   "name": "Nome",
   "resources": "Recursos",
   "close": "Fechar",
   "newTask": "Nova Tarefa",
   "notStarted": "Não iniciado",
   "inProgress": "Em execução",
   "completed": "Concluído",
   "inPlanning": "Em Planejamento",
   "inTesting": "Em Testes",
   "delayed": "Em Atraso",
   "onHold": "Suspenso",
   "closed": "Encerrado",
   "budgeting": "Orçamento",
   "inReview": "Revisão",
   "canceled": "Cancelado",
   "postponed": "Adiado",
   "w8": "Aguardando Cliente",
   "actions": "...",
   "percentComplete": "% Completo",
   "status": "Status",
   "duration": "dias",
   "start": "Início",
   "end": "Fim",
   "resource": "Recurso",
   "predecessors": "Antecessores",
   "projects": "Projetos",
   "newProject": "Novo Projeto",
   "confirmNewProject": "Deseja iniciar um novo projeto? Todas as alterações atuais serão perdidas.",
   "confirmDeleteProject": "Deseja excluir este projeto do armazenamento local?",
   "errorDate": "Erro: A data de início (${task.start}) deve ser anterior à data de fim (${task.end}) para a tarefa \"${task.name}\".",
   "errorJson": "Erro ao carregar o arquivo JSON: ",
   "syncingWithServer": "Sincronizando com o servidor. Aguarde",
   "syncSuccess": "Sincronizado com sucesso!",
   "syncError": "Erro ao sincronizar. Tente novamente.",
   "uuidError": "Erro ao conectar com o servidor para obter UUID",
   "shareSuccess": "Link copiado para a área de transferência!",
   "shareError": "Erro ao copiar o link.",
   "loadError": "Erro ao carregar o projeto.",
   "saving": "Salvando...",
   "saveSuccess": "Salvo com sucesso!",
   "saveError": "Erro ao salvar."
 },
 "en": {
   "resources": "Resources",
   "close": "Close",
   "newTask": "New Task",
   "notStarted": "Not Started",
   "inProgress": "In Progress",
   "completed": "Completed",
   "inPlanning": "Planning",
   "inTesting": "Testing",
   "delayed": "Delayed",
   "onHold": "On Hold",
   "closed": "Closed",
   "budgeting": "Budgeting",
   "inReview": "In Review",
   "canceled": "Canceled",
   "postponed": "Postponed",
   "w8": "Waiting for Client",
   "id": "#",
   "actions": "...",
   "percentComplete": "% Complete",
   "status": "Status",
   "name": "Name",
   "duration": "days",
   "start": "Start",
   "end": "End",
   "resource": "Resource",
   "predecessors": "Predecessors",
   "projects": "Projects",
   "newProject": "New Project",
   "confirmNewProject": "Do you want to start a new project? All current changes will be lost.",
   "confirmDeleteProject": "Do you want to delete this project from local storage?",
   "errorDate": "Error: The start date (${task.start}) must be earlier than the end date (${task.end}) for the task \"${task.name}\".",
   "errorJson": "Error loading JSON file: ",
   "syncingWithServer": "Syncing with server. Please wait",
   "syncSuccess": "Synced successfully!",
   "syncError": "Error syncing. Please try again.",
   "uuidError": "Error connecting to server to get UUID",
   "shareSuccess": "Link copied to clipboard!",
   "shareError": "Error copying the link.",
   "loadError": "Error loading the project.",
   "saving": "Saving...",
   "saveSuccess": "Saved successfully!",
   "saveError": "Error saving."
 },
 "es": {
   "resources": "Recursos",
   "close": "Cerrar",
   "newTask": "Nueva Tarea",
   "notStarted": "No Iniciado",
   "inProgress": "En Progreso",
   "completed": "Completado",
   "inPlanning": "En Planificación",
   "inTesting": "En Pruebas",
   "delayed": "Retrasado",
   "onHold": "En Pausa",
   "closed": "Cerrado",
   "budgeting": "Presupuesto",
   "inReview": "Revisión",
   "canceled": "Cancelado",
   "postponed": "Pospuesto",
   "w8": "Esperando al Cliente",
   "id": "#",
   "actions": "...",
   "percentComplete": "% Completado",
   "status": "Estado",
   "name": "Nombre",
   "duration": "días",
   "start": "Inicio",
   "end": "Fin",
   "resource": "Recurso",
   "predecessors": "Predecesores",
   "projects": "Proyectos",
   "newProject": "Nuevo Proyecto",
   "confirmNewProject": "¿Desea iniciar un nuevo proyecto? Todos los cambios actuales se perderán.",
   "confirmDeleteProject": "¿Desea eliminar este proyecto del almacenamiento local?",
   "errorDate": "Error: La fecha de inicio (${task.start}) debe ser anterior a la fecha de fin (${task.end}) para la tarea \"${task.name}\".",
   "errorJson": "Error al cargar el archivo JSON: ",
   "syncingWithServer": "Sincronizando con el servidor. Espere",
   "syncSuccess": "¡Sincronizado con éxito!",
   "syncError": "Error al sincronizar. Intente de nuevo.",
   "uuidError": "Error al conectar con el servidor para obtener UUID",
   "shareSuccess": "¡Enlace copiado al portapapeles!",
   "shareError": "Error al copiar el enlace.",
   "loadError": "Error al cargar el proyecto.",
   "saving": "Guardando...",
   "saveSuccess": "¡Guardado con éxito!",
   "saveError": "Error al guardar."
 }
};

const d = {
  i: (id) => document.getElementById(id),
  c: (el) => document.createElement(el),
  q: (qr) => document.querySelectorAll(qr),
  s: (sl) => document.qs(sl),
  e: (ev, fn) => document.addEventListener(ev, fn),
  r: (ev, fn) => document.removeEventListener(ev, fn),
  ns: (ns, el) => document.createElementNS(ns, el)
};

let currentLang = navigator.language || "pt-BR";

let draggedTaskIdx = null; // Índice da tarefa sendo arrastada
let draggedTaskIndex = null;
let draggedColumn = null;
let isHorizontalLayout = false;
let colorMenuTimeout;
let hideTimeout;
let fontSize = 1;

const _url_ = "https://the-gantt.onrender.com/";
const _action = {
  "uuid": "uuid",
  "save": "save",
  "project": "project/",
};

window.addEventListener('load', function () {
  loadProjectFromServer();
  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  projectData.project.filters = {
    status: new Set(projectData.project.tasks.map(t => t.status)),
    resource: new Set(projectData.project.tasks.map(t => t.resource)),
    predecessors: new Set(projectData.project.tasks.map(t => t.predecessors))
  };
    // Inicializa o GridManager primeiro
  GridManager.init();


  d.i('downloadBtn').addEventListener('click', () => {
    const dat = { project: { ...projectData.project } };
    delete dat.project.columnNames;
    const str = JSON.stringify(dat, null, 2);
    const blb = new Blob([str], { type: 'application/json' });
    const url = URL.createObjectURL(blb);
    const lnk = d.c('a');
    lnk.href = url;
    lnk.download = `${projectData.project.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')}.json`;
    lnk.click();
    URL.revokeObjectURL(url);
  });

  d.i('uploadInput').addEventListener('change', (evt) => {
    const fle = evt.target.files[0];
    if (fle) {
      const rdr = new FileReader();
      rdr.onload = (e) => {
        try {
          const old = currentLang;
          projectData = JSON.parse(e.target.result);
          if (!projectData.project) projectData.project = {};
          if (!projectData.project.tasks) projectData.project.tasks = [];
          if (!projectData.project.resources) {
            projectData.project.resources = [
              {"id": 1, "name": "Recurso 1", "level": "Junior"},
              {"id": 2, "name": "Recurso 2", "level": "Pleno"},
              {"id": 3, "name": "Recurso 3", "level": "Senior"}
            ];
          }
          if (!projectData.project.columnVisibility) {
            projectData.project.columnVisibility = {
              actions: true,
              percentComplete: true,
              status: true,
              name: true,
              duration: true,
              start: true,
              end: true,
              resource: true,
              predecessors: true
            };
          }
          if (!projectData.project.columnOrder) {
            projectData.project.columnOrder = ["actions", "percentComplete", "status", "name", "duration", "start", "end", "resource", "predecessors"];
          }
          if (!projectData.project.columnNames) {
            projectData.project.columnNames = {
              actions: translations[old].actions,
              percentComplete: translations[old].percentComplete,
              status: translations[old].status,
              name: translations[old].name,
              duration: translations[old].duration,
              start: translations[old].start,
              end: translations[old].end,
              resource: translations[old].resource,
              predecessors: translations[old].predecessors
            };
          }
          if (!projectData.project.statusColors) {
            projectData.project.statusColors = {
              "notStarted": "bg-gray-300",
              "inProgress": "bg-teal-300",
              "completed": "bg-blue-400"
            };
          }

          projectData.project.tasks.forEach(tsk => {
            tsk.resource = tsk.resource || '-';
            tsk.predecessors = tsk.predecessors || '-';
            tsk.level = tsk.level || 0;
            tsk.expanded = tsk.expanded !== undefined ? tsk.expanded : true;
            tsk.parentId = tsk.parentId || null;

            const key = Object.keys(translations[old]).find(k => 
              translations[old][k].toLowerCase() === tsk.status.toLowerCase()
              ) || tsk.status;
            tsk.status = key;

            if (!projectData.project.statusColors[tsk.status]) {
              projectData.project.statusColors[tsk.status] = 'bg-gray-500';
            }
          });

                    // Cadastrar recursos ausentes
          registerMissingResources();

                    // Atualizar filtros com os recursos do projeto
          projectData.project.filters = {
            status: new Set(projectData.project.tasks.map(t => t.status)),
            resource: new Set(projectData.project.tasks.map(t => t.resource)),
            predecessors: new Set(projectData.project.tasks.map(t => t.predecessors))
          };

          projectData.project.timeline = generateTimeline(projectData.project.tasks);
          updateParentTasks();
          updateGridHeaders();
                    // buildGrid();
          GridManager.renderFullGrid();
          buildGantt();
          buildUsersModal();
          currentLang = old;
          updateLanguage(currentLang);
        } catch (err) {
          alert(translations[currentLang].errorJson + err.message);
        }
      };
      rdr.readAsText(fle);
      evt.target.value = '';
    }
  });

  d.i('shareBtn').addEventListener('click', () => {
    const currentUrl = window.location.href.split('?')[0].split('#')[0]; // Remove query e hash
    const shareUrl = `${currentUrl}?id=${projectData.project.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(translations[currentLang].shareSuccess || "Link copiado para a área de transferência!");
    }).catch(err => {
      console.error('Erro ao copiar URL:', err);
      alert(translations[currentLang].shareError || "Erro ao copiar o link.");
    });
  });

  /*
  d.i('syncBtn').addEventListener('click', async () => {

      const header = d.s('header');
      header.classList.add('blur-sm', 'relative');
      const syncMessage = d.c('div');
      syncMessage.className = 'absolute inset-0 flex items-center justify-center text-white text-lg';
      syncMessage.textContent = translations[currentLang].syncingWithServer;
      header.appendChild(syncMessage);

      let uuid = projectData.project.id;

      // 1. Verifica se o ID é numérico ou UUID
      const isNumeric = /^\d+$/.test(uuid);

      // 2. Se for numérico, requisita um UUID
      if (isNumeric) {
          try {

              const response = await fetch(_url_ + _action.uuid, {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json'},
                  // mode: 'no-cors', // Desativa CORS
              });
              console.warn("response", response)
              if (!response.ok) throw new Error('Falha ao obter UUID');
              uuid = await response.text();
              projectData.project.id = uuid;
          } catch (error) {
              console.error('Erro ao obter UUID:', error);
              alert(translations[currentLang].uuidError);
              return;
          }
      }

      try {
          const response = await fetch(_url_ + _action.save, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              mode: 'no-cors', // Desativa CORS
              body: JSON.stringify(projectData)
          });

          if (!response.ok) throw new Error('Falha ao salvar na nuvem');

          // 5. Remove o efeito quando concluído
          header.classList.remove('blur-sm');
          syncMessage.remove();

          // Feedback de sucesso
          const successMessage = d.c('div');
          successMessage.className = 'absolute inset-0 flex items-center justify-center text-green-300 text-lg';
          successMessage.textContent = translations[currentLang].syncSuccess;
          header.appendChild(successMessage);
          setTimeout(() => successMessage.remove(), 2000);

          // Atualiza o localStorage com o novo UUID se aplicável
          saveToLocalStorage();
      } catch (error) {
          console.error('Erro ao sincronizar:', error);
          header.classList.remove('blur-sm');
          syncMessage.textContent = translations[currentLang].syncError;
          setTimeout(() => syncMessage.remove(), 2000);
      }
  });*/

  d.i('usersBtn').addEventListener('click', () => {
    buildUsersModal();
    d.i('usersModal').showModal();
    document.body.ca('bg-opacity-50', 'bg-gray-500');
  });

  d.i('usersModal').addEventListener('close', () => {
    document.body.classList.remove('bg-opacity-50', 'bg-gray-500');
  });

  d.i('fontIncrease').addEventListener('click', () => {
    if (fontSize < 3) {
      fontSize += 0.5;
      document.body.style.fontSize = `${fontSize}rem`;
    }
  });

  d.i('fontDecrease').addEventListener('click', () => {
    if (fontSize > 0.5) {
      fontSize -= 0.5;
      document.body.style.fontSize = `${fontSize}rem`;
    }
  });

  d.i('languageBtn').addEventListener('click', () => {
    const mnu = d.i('languageMenu');
    mnu.classList.toggle('hidden');
  });

  d.i('saveBtn').addEventListener('click', async () => {
    const header = d.s('header');

    header.classList.add('blur-sm', 'relative');
    const saveMessage = d.c('div');
    saveMessage.className = 'absolute inset-0 flex items-center justify-center text-white text-lg';
    saveMessage.textContent = translations[currentLang].saving || "Salvando...";
    header.appendChild(saveMessage);

    if (projectData.project.id == 1) {
      try {
        const response = await fetch(`${url_base}/uuid`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Falha ao obter UUID');
        const data = await response.json();
        projectData.project.id = data.uuid; // Atualiza o ID do projeto com o UUID retornado
      } catch (error) {
        console.error('Erro ao criar novo projeto:', error);
        alert(translations[currentLang].uuidError);
      }
    }

    try {
      const response = await fetch(`${url_base}/${projectData.project.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData.project)
      });

      if (!response.ok) throw new Error('Falha ao salvar');

      header.classList.remove('blur-sm');
      saveMessage.remove();

      const successMessage = d.c('div');
      successMessage.className = 'absolute inset-0 flex items-center justify-center text-green-300 text-lg';
      successMessage.textContent = translations[currentLang].saveSuccess || "Salvo com sucesso!";
      header.appendChild(successMessage);
      setTimeout(() => successMessage.remove(), 2000);

      saveToLocalStorage();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      header.classList.remove('blur-sm');
      saveMessage.textContent = translations[currentLang].saveError || "Erro ao salvar.";
      setTimeout(() => saveMessage.remove(), 2000);
    }
  });

  d.q('#languageMenu button').forEach(btn => {
    btn.addEventListener('click', () => {
      updateLanguage(btn.dataset.lang);
      d.i('languageMenu').ca('hidden');
    });
  });

  d.e('click', function clk(e) {
    const sbr = d.i('sidebar');
    const btn = d.i('sidebarBtn');
    if (!sbr.contains(e.target) && e.target !== btn && !sbr.classList.contains('-translate-x-full')) {
      sbr.ca('-translate-x-full');
      d.r('click', clk);
    }
  });

  updateLanguage(currentLang);
    // buildGrid();
  GridManager.init();
  buildGantt();

  const grd = d.i('gridScroll');
  const gnt = d.i('ganttScroll');
  grd.addEventListener('scroll', () => {
    gnt.scrollTop = grd.scrollTop;
    gnt.scrollLeft = grd.scrollLeft;
  });
  gnt.addEventListener('scroll', () => {
    grd.scrollTop = gnt.scrollTop;
    grd.scrollLeft = gnt.scrollLeft;

    resetCanvas();
    setTimeout(() => {
      buildGantt()
        }, 50); // Pequeno delay para garantir que o scroll tenha sido aplicado
  });

  window.addEventListener("resize", () => {
    if (window.devicePixelRatio === 1) {
      buildGantt();
    } else {
      resetCanvas();
    }
  });

  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  projectData.project.filters = {
    status: new Set(projectData.project.tasks.map(t => t.status)),
    resource: new Set(projectData.project.tasks.map(t => t.resource)),
    predecessors: new Set(projectData.project.tasks.map(t => t.predecessors))
  };
});

async function loadProjectFromServer() {
  const uuidParamProject = getParameterByName(id);
  if (!uuidParamProject) {
    return;
  }
  try {
    const response = await fetch(`${url_base}/${uuidParamProject}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Falha ao carregar projeto');
    const project = await response.json();
    projectData = project; // Substitui os dados locais pelo projeto carregado
    saveToLocalStorage(); // Salva no localStorage
    // Aqui você pode adicionar código para atualizar a UI com os dados carregados
    console.log('Projeto carregado:', projectData);
    GridManager.renderFullGrid()
    buildGantt();
  } catch (error) {
    console.error('Erro ao carregar projeto:', error);
    alert(translations[currentLang].loadError || "Erro ao carregar o projeto.");
  }
}

function showColorMenu(idx, elm) {
  if (elm.parentElement.dataset.editing) return;

  const old = d.i('colorMenu');
  if (old) old.remove();

  clearTimeout(hideTimeout);

  const mnu = d.c('div');
  mnu.id = 'colorMenu';
  mnu.className = 'absolute z-20 bg-white rounded shadow-lg p-2 flex space-x-2';
  mnu.dataset.index = idx;

  const rct = elm.getBoundingClientRect();
  const hgt = rct.height;
  mnu.style.top = `${rct.top + window.scrollY - hgt - 5}px`;
  mnu.style.left = `${rct.left + window.scrollX}px`;

  const clr = [
    { name: 'Amarelo', class: 'bg-yellow-200' },
    { name: 'Verde', class: 'bg-green-200' },
    { name: 'Azul', class: 'bg-blue-200' },
    { name: 'Vermelho', class: 'bg-red-200' },
    { name: 'Rosa', class: 'bg-pink-200' },
    { name: 'Cinza', class: 'bg-gray-200' },
    { name: 'Branco', class: 'bg-white border border-gray-300' },
    { name: 'Violeta', class: 'bg-purple-200' }
  ];

  const org = getStatusColor(projectData.project.tasks[idx].status);

  clr.forEach(col => {
    const dot = d.c('div');
    dot.className = `w-4 h-4 rounded-full cursor-pointer ${col.class}`;
    dot.onmouseenter = () => {
      elm.className = `inline-block px-2 py-1 text-xs text-gray-800 ${col.class} rounded-full`;
      clearTimeout(colorMenuTimeout);
      clearTimeout(hideTimeout);
    };
    dot.onclick = () => {
      updateStatusColor(idx, col.class);
      mnu.remove();
      clearTimeout(colorMenuTimeout);
      clearTimeout(hideTimeout);
    };
    dot.onmouseleave = () => {
      elm.className = `inline-block px-2 py-1 text-xs text-gray-800 ${org} rounded-full`;
      startHideTimer(mnu, elm, org);
    };
    mnu.ac(dot);
  });

  document.body.ac(mnu);
  startHideTimer(mnu, elm, org);

  mnu.onmouseenter = () => {
    clearTimeout(colorMenuTimeout);
    clearTimeout(hideTimeout);
  };

  mnu.onmouseleave = () => {
    elm.className = `inline-block px-2 py-1 text-xs text-gray-800 ${org} rounded-full`;
    hideColorMenu();
  };
}

function startHideTimer(mnu, elm, org) {
  clearTimeout(colorMenuTimeout);
  colorMenuTimeout = setTimeout(() => {
    elm.className = `inline-block px-2 py-1 text-xs text-gray-800 ${org} rounded-full`;
    mnu.remove();
  }, 5000);
}

function hideColorMenu() {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    const mnu = d.i('colorMenu');
    if (mnu) {
      const idx = mnu.dataset.index;
      const elm = d.s(`#mainTableBody tr[data-task-id="${idx}"] td span`);
      if (elm) {
        const org = getStatusColor(projectData.project.tasks[idx].status);
        elm.className = `inline-block px-2 py-1 text-xs text-gray-800 ${org} rounded-full`;
      }
      mnu.remove();
    }
    clearTimeout(colorMenuTimeout);
  }, 100);
}

function dragColumnStart(evt, col) {
  draggedColumn = col;
  evt.dataTransfer.setData('text/plain', col);
}

function dragColumnOver(evt) {
  evt.preventDefault();
}

function dropColumn(evt, tgt) {
  evt.preventDefault();
  const ord = [...projectData.project.columnOrder];
  const frm = ord.io(draggedColumn);
  const to = ord.io(tgt);
  ord.splice(frm, 1);
  ord.splice(to, 0, draggedColumn);
  projectData.project.columnOrder = ord;
  updateGridHeaders();
// buildGrid();
  GridManager.renderFullGrid();
  saveToLocalStorage();
  draggedColumn = null;
}

function toggleLayout() {
  isHorizontalLayout = !isHorizontalLayout;
  d.i('layoutBtn').innerHTML = `<i class="fas fa-${isHorizontalLayout ? 'bars' : 'columns'}"></i>`;

  const grd = d.i('gridTask');
  const gnt = d.i('graphGantt');

  if (isHorizontalLayout) {
    d.s('.flex.h-full').className = 'flex flex-col h-full';
    grd.className = 'w-full p-6 mt-3 bg-white shadow-md rounded-l-lg';
    gnt.className = 'w-full mt-3 px-6 pb-6 bg-white shadow-md border-l border-gray-50';
  } else {
    d.s('.flex.flex-col.h-full').className = 'flex h-full';
    grd.className = 'w-1/2 p-6 mt-3 bg-white shadow-md rounded-l-lg';
    gnt.className = 'w-1/2 mt-3 px-6 pb-6 bg-white shadow-md border-l border-gray-50';
  }

  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  GridManager.renderFullGrid();
  buildGantt();
  saveToLocalStorage();
}

function showFilterMenu(col, elm) {
  const old = d.i('filterMenu');
  if (old) old.remove();

  const mnu = d.c('div');
  mnu.id = 'filterMenu';
  mnu.dataset.column = col;
  mnu.className = 'absolute z-10 bg-white text-gray-800 rounded shadow-lg text-xs';
  const rct = elm.getBoundingClientRect();
  mnu.style.left = `${rct.left + window.scrollX}px`;
  mnu.style.top = `${rct.bottom + window.scrollY}px`;

  const val = new Set(projectData.project.tasks.map(tsk => tsk[col])); // Lista os recursos das tarefas
  if (projectData.project.filters[col].size === 0) {
    val.forEach(v => projectData.project.filters[col].add(v));
  }

  val.forEach(v => {
    const dsp = col === 'status' ? (translations[currentLang][v] || v) : v;
    const lbl = d.c('label');
    lbl.className = 'block px-4 py-2';
    lbl.innerHTML = `
          <input type="checkbox" ${projectData.project.filters[col].has(v) ? 'checked' : ''} onchange="toggleFilter('${col}', '${v}', this.checked)"> ${dsp}
    `;
    mnu.ac(lbl);
  });

  document.body.ac(mnu);

  d.e('click', function clk(e) {
    if (!mnu.contains(e.target) && e.target !== elm) {
      mnu.remove();
      d.r('click', clk);
    }
  });
}

function toggleFilter(col, val, chk) {
  if (chk) {
    projectData.project.filters[col].add(val);
  } else {
    projectData.project.filters[col].delete(val);
  }
  // buildGrid();
  GridManager.update();
  buildGantt();
  saveToLocalStorage();
}

function isTaskVisible(tid) {
  const tsk = projectData.project.tasks.find(t => t.id === tid);
  if (!tsk) return false;

  // Verifica se a tarefa passa nos filtros
  const passesFilters = (
    (projectData.project.filters.status.size === 0 || projectData.project.filters.status.has(tsk.status)) &&
    (projectData.project.filters.resource.size === 0 || tsk.resource === '-' || projectData.project.filters.resource.has(tsk.resource)) &&
    (projectData.project.filters.predecessors.size === 0 || projectData.project.filters.predecessors.has(tsk.predecessors))
    );

  // Se é uma tarefa raiz (nível 0 ou sem pai)
  if (tsk.level === 0 || tsk.parentId === null) {
      // Se o pai não passa nos filtros (ex.: recurso desmarcado), ele e todos os filhos são escondidos
    if (!passesFilters) {
      return false;
    }
      // Se passa nos filtros, é visível independentemente dos filhos
    return true;
  }

  // Se é uma subtarefa, depende do pai
  const prt = projectData.project.tasks.find(t => t.id === tsk.parentId);
  if (!prt || !prt.expanded) return false;

  // A subtarefa é visível apenas se o pai for visível e ela passar nos filtros
  const parentVisible = isTaskVisible(prt.id);
  if (!parentVisible) return false;

  return passesFilters;
}

async function newProject() {
  var id = Date.now();
  try {
    const response = await fetch(`${url_base}/uuid`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Falha ao obter UUID');
    const data = await response.json();
    id = data.uuid; // Atualiza o ID do projeto com o UUID retornado
    saveToLocalStorage(); // Salva no localStorage
    // Outras inicializações do projeto, se houver
  } catch (error) {
    console.error('Erro ao criar novo projeto:', error);
    alert(translations[currentLang].uuidError);
  }

  if (confirm(translations[currentLang].confirmNewProject)) {

    projectData = {
      "project": {
        "id": id,
        "name": translations[currentLang].newProject,
        "tasks": [],
        "resources": [
          {"id": 1, "name": "Recurso 1", "level": "Junior"},
          {"id": 2, "name": "Recurso 2", "level": "Pleno"},
          {"id": 3, "name": "Recurso 3", "level": "Senior"}
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
    saveToLocalStorage();
  }
}

async function saveToLocalStorage() {
  const dat = { project: { ...projectData.project } };
  if (dat.project.id == 1) {
    const response = await fetch(`${url_base}/uuid`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Falha ao obter UUID');
    const data = await response.json();
    dat.project.id = data.uuid;
  }
  delete dat.project.columnNames;
  const str = JSON.stringify(dat);
  const siz = new Blob([str]).size;
  const max = 5 * 1024 * 1024;

  if (siz < max) {
    const key = `project_${projectData.project.id}`;
    localStorage.setItem(key, str);
  } else {
    console.warn('Tamanho do projeto excede 5MB, não salvo no localStorage.');
  }
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
      actions: translations[old].actions,
      percentComplete: translations[old].percentComplete,
      status: translations[old].status,
      name: translations[old].name,
      duration: translations[old].duration,
      start: translations[old].start,
      end: translations[old].end,
      resource: translations[old].resource,
      predecessors: translations[old].predecessors
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
  if (confirm(translations[currentLang].confirmDeleteProject)) {
    localStorage.removeItem(key);
    buildProjectList();
  }
}

function generateTimeline(tsk) {
  let std, end;
  if (tsk.length === 0) {
    const now = new Date();
    std = new Date(now);
    end = new Date(now);
  } else {
    const dts = tsk.flatMap(t => [new Date(t.start), new Date(t.end)]);
    const min = new Date(Math.min(...dts));
    const max = new Date(Math.max(...dts));
    std = new Date(min);
    end = new Date(max);
  }

  const dur = (end - std) / (1000 * 60 * 60 * 24);
  const wks = Math.ceil(dur / 7);
  const min = isHorizontalLayout ? 20 : 9;

  if (wks < min) {
    const add = min - wks;
    const bef = Math.floor(add / 2);
    const aft = add - bef;
    std.setDate(std.getDate() - bef * 7);
    end.setDate(end.getDate() + aft * 7);
  }

  std.setDate(std.getDate() - (std.getDay() || 7) + 1);
  end.setDate(end.getDate() + (7 - (end.getDay() || 7)));

  const arr = [];
  let cur = new Date(std);
  while (cur <= end) {
    const wst = new Date(cur);
    const wed = new Date(cur);
    wed.setDate(wed.getDate() + 6);
    const mth = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const lbl = `${mth[wst.getMonth()]} ${wst.getDate()}~${wed.getDate()}`;
    arr.push({
      label: lbl,
      start: wst.toISOString().split('T')[0],
      end: wed.toISOString().split('T')[0]
    });
    cur.setDate(cur.getDate() + 7);
  }

  return {
    start: std.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
    weeks: arr,
    daysOfWeek: ["S", "T", "Q", "Q", "S", "S", "D"]
  };
}

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
// buildGrid();
  buildGantt();
  buildUsersModal();
}

function showPredecessorInput(idx, elm) {
  const tsk = projectData.project.tasks[idx];
  const inp = d.c('input');
  inp.className = 'w-full text-xs';
  inp.value = tsk.predecessors || '-';
  inp.onblur = () => {
    const val = inp.value.trim();
    tsk.predecessors = val === '' ? '-' : val;
    projectData.project.filters.predecessors.add(val); // Adiciona ao filtro
    elm.textContent = tsk.predecessors;
    updateTaskDates(idx);
    updateParentTasks();
    projectData.project.timeline = generateTimeline(projectData.project.tasks);
    // buildGrid();
    GridManager.update([idx]);
    buildGantt(); // Já chama buildArrows internamente
    saveToLocalStorage();
  };
  inp.onkeydown = (e) => { if (e.key === 'Enter') inp.blur(); };
  elm.innerHTML = '';
  elm.ac(inp);
  inp.focus();
}

function updateGridHeaders() {
  const hed = d.s('#gridTask tr');
  hed.innerHTML = '<th class="p-2 text-center rounded-tl-lg"><i class="fas fa-cog cursor-pointer" onclick="showColumnConfigMenu()"></i></th>';
  projectData.project.columnOrder.forEach(col => {
    if (projectData.project.columnVisibility[col]) {
      hed.innerHTML += `
            <th class="p-2 ${col === 'name' ? 'text-left min-w-[250px] max-w-[300px]' : 'text-center'} truncate" 
                draggable="true" 
                ondragstart="dragColumnStart(event, '${col}')" 
                ondragover="dragColumnOver(event)" 
                ondrop="dropColumn(event, '${col}')" 
                ondblclick="renameColumn('${col}', this)">
        ${projectData.project.columnNames[col]}${['status', 'resource', 'predecessors'].includes(col) ? ` <i class="fas fa-filter cursor-pointer" onclick="showFilterMenu('${col}', this)"></i>` : ''}
            </th>
      `;
    }
  });
}

function showStatusSelect(idx, elm) {
  const tsk = projectData.project.tasks[idx];
  const sel = d.c('select');
  sel.className = 'w-full text-xs';
  sel.innerHTML = Object.keys(projectData.project.statusColors).map(st => 
`<option value="${st}" ${tsk.status === st ? 'selected' : ''}>${translations[currentLang][st] || st}</option>`
).join('');

// Manipula a mudança e atualiza tudo de uma vez
  sel.onchange = () => {
    tsk.status = sel.value;
    if (!projectData.project.filters.status.has(sel.value)) {
        projectData.project.filters.status.add(sel.value); // Novo status visível por padrão
      }
      updateParentTasks();
      projectData.project.timeline = generateTimeline(projectData.project.tasks);
    // buildGrid(); // Recria a grid com o novo status
      GridManager.renderFullGrid();
      buildGantt();
      saveToLocalStorage();
    };

// Substitui o conteúdo de elm pelo select
    elm.innerHTML = '';
    elm.appendChild(sel);
    sel.focus();
  }



  const GridManager = {
    tableBody: null,
    taskRows: new Map(),
    lastTasks: [],

// Inicializa a grade
    init() {
      this.tableBody = d.i('mainTableBody');
      if (!this.tableBody) {
        console.error("Erro: Elemento #mainTableBody não encontrado no DOM. Verifique se o HTML contém esse ID.");
        return;
      }
      d.s('h1').textContent = projectData.project.name || "Projeto sem nome";
      d.i('downloadBtn').disabled = !projectData.project.name;
      this.renderFullGrid();
    },

// Renderiza toda a grade do zero
    renderFullGrid() {
      if (!this.tableBody) {
        console.error("Erro: tableBody não inicializado. Chame GridManager.init() primeiro.");
        return;
      }
      this.tableBody.innerHTML = '';
      this.taskRows.clear();
      projectData.project.tasks.forEach((task, idx) => {
        if (!isTaskVisible(task.id)) return;
        const row = this.createTaskRow(task, idx);
        this.tableBody.appendChild(row);
        this.taskRows.set(idx, row);
      });
      this.lastTasks = [...projectData.project.tasks];
    },

// Cria uma linha DOM para uma tarefa
    createTaskRow(task, idx) {
      const row = d.c('tr');
      row.className = 'border-b border-gray-200 hover:bg-gray-100 h-5 align-middle max-h-[33px] h-[33px]';
      row.dataset.taskId = idx;
      row.draggable = true;
      this.attachRowEvents(row, idx);
      this.updateRowContent(row, task, idx);
      return row;
    },

// Atualiza o conteúdo de uma linha existente
    updateRowContent(row, task, idx) {
      const isEmptyName = task.name === "";
      const chd = getChildren(task.id).length > 0;

      let html = `<td class="p-1 text-center text-xs truncate max-w-[50px] max-h-[33px]" title="${task.id}">${task.id}</td>`;

      projectData.project.columnOrder.forEach(col => {
        if (projectData.project.columnVisibility[col]) {
            // html += this.getColumnHtml(col, task, idx, isEmptyName, chd);
          const k = this.getColumnHtml(col, task, idx, isEmptyName, chd);
          html += k;
        }
      });
      row.innerHTML = html;
    },

// Gera o HTML para uma coluna específica
    getColumnHtml(col, task, idx, isEmptyName, chd) {
      switch (col) {
      case 'actions':
        return `
                <td class="p-1 text-center max-h-[33px] min-w-[80px] max-w-[80px] text-[10px]">
                    <i class="fas fa-trash text-red-600 cursor-pointer" onclick="GridManager.deleteTask(${idx})"></i>
          ${!isEmptyName  ? `<i class="fas fa-arrow-right text-gray-600 cursor-pointer ml-1" onclick="shiftRight(${idx})"></i>` : ''}
          ${task.level > 0 ? `<i class="fas fa-arrow-left text-gray-600 cursor-pointer ml-1" onclick="shiftLeft(${idx})"></i>` : ''}
          ${idx === projectData.project.tasks.length - 1 ? `<i class="fas fa-plus text-green-600 cursor-pointer ml-1" title="${translations[currentLang].addTask}" onclick="GridManager.addNewTaskRow()"></i>` : ''}
          </td>`;
        case 'percentComplete':
          return isEmptyName
          ? `<td class="p-1 text-center text-xs truncate max-w-[100px]" contenteditable="false" onblur="updatePercentComplete(${idx}, this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="this.contentEditable=true"></td>`
          : (chd
            ? `<td class="p-1 text-center text-xs truncate max-w-[100px]" title="${task.percentComplete}%">${task.percentComplete}%</td>`
            : `<td class="p-1 text-center text-xs truncate max-w-[100px]" title="${task.percentComplete}%" contenteditable="false" onblur="updatePercentComplete(${idx}, this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="this.contentEditable=true; this.textContent=this.textContent.replace('%', '')">${task.percentComplete}%</td>`);
        case 'status':
          return isEmptyName
          ? `<td class="p-1 text-center text-xs truncate max-w-[100px]" ondblclick="showStatusSelect(${idx}, this)"></td>`
          : `<td class="p-1 text-center text-xs truncate max-w-[100px]" title="${translations[currentLang][task.status] || task.status}" ondblclick="showStatusSelect(${idx}, this)">
                    <span class="inline-block px-2 py-1 text-xs text-gray-800 ${getStatusColor(task.status)} rounded-full" onmouseenter="showColorMenu(${idx}, this)" onmouseleave="hideColorMenu()">
                        ${translations[currentLang][task.status] || task.status}
                    </span>
          </td>`;
        case 'name':
          return `
                <td class="p-1 text-xs truncate max-w-[200px] ${chd ? 'underline' : ''}" title="${task.name}" contenteditable="false" onblur="updateTask(${idx}, 'name', this)" ondblclick="this.contentEditable=true" style="padding-left: ${task.level * 15}px">
            ${chd ? `<i class="fas fa-${task.expanded ? 'minus' : 'plus'} text-gray-600 cursor-pointer mr-1" onclick="toggleExpand(${idx})"></i>` : ''}${task.name}
            </td>`;
          case 'duration':
            return isEmptyName
            ? `<td class="p-1 text-xs truncate max-w-[100px]" contenteditable="false" onblur="updateDuration(${idx}, this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="this.contentEditable=true"></td>`
            : (chd
              ? `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.duration} ${translations[currentLang].duration.toLowerCase()}">${task.duration} ${translations[currentLang].duration.toLowerCase()}</td>`
              : `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.duration} ${translations[currentLang].duration.toLowerCase()}" contenteditable="false" onblur="updateDuration(${idx}, this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="this.contentEditable=true; this.textContent='${task.duration}'">${task.duration} ${translations[currentLang].duration.toLowerCase()}</td>`);
          case 'start':
            return isEmptyName
            ? `<td class="p-1 text-xs truncate max-w-[100px]" ondblclick="showDatePicker(${idx}, 'start', this)"></td>`
            : (chd
              ? `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.start}">${task.start}</td>`
              : `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.start}" ondblclick="showDatePicker(${idx}, 'start', this)">${task.start}</td>`);
          case 'end':
            return isEmptyName
            ? `<td class="p-1 text-xs truncate max-w-[100px]" ondblclick="showDatePicker(${idx}, 'end', this)"></td>`
            : (chd
              ? `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.end}">${task.end}</td>`
              : `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.end}" ondblclick="showDatePicker(${idx}, 'end', this)">${task.end}</td>`);
          case 'resource':
            return isEmptyName
            ? `<td class="p-1 text-xs truncate max-w-[100px]" ondblclick="showResourceSelect(${idx}, this)"></td>`
            : `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.resource || '-'}" ondblclick="showResourceSelect(${idx}, this)">
            ${task.resource && task.resource !== '-' ? `<i class="${getResourceIcon(task.resource)} mr-1"></i>${task.resource}` : '-'}
            </td>`;
          case 'predecessors':
            return isEmptyName
            ? `<td class="p-1 text-xs truncate max-w-[100px]" ondblclick="showPredecessorInput(${idx}, this)"></td>`
            : `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.predecessors || '-'}" ondblclick="showPredecessorInput(${idx}, this)" onmouseenter="highlightPredecessorRows(${idx})" onmouseleave="unhighlightPredecessorRows(${idx})">
                    ${task.predecessors && task.predecessors !== '-' ? task.predecessors : '-'}
            </td>`;
          default:
            return `<td class="p-1 text-xs truncate max-w-[100px]">${task[col] || '-'}</td>`;
          }
        },

// Atualiza apenas uma linha específica
        updateRow(idx) {
          const task = projectData.project.tasks[idx];
          if (!isTaskVisible(task.id)) {
            this.removeRow(idx);
            return;
          }
          let row = this.taskRows.get(idx);
          if (!row) {
            row = this.createTaskRow(task, idx);
            this.insertRowAtPosition(row, idx);
            this.taskRows.set(idx, row);
          } else {
            this.updateRowContent(row, task, idx);
          }
        },

// Insere uma linha na posição correta
        insertRowAtPosition(row, idx) {
          let inserted = false;
          const visibleTasks = projectData.project.tasks.filter(t => isTaskVisible(t.id));
          const visibleIdx = visibleTasks.indexOf(projectData.project.tasks[idx]);
          if (visibleIdx === -1) return;

          const children = Array.from(this.tableBody.children);
          if (visibleIdx < children.length) {
            this.tableBody.insertBefore(row, children[visibleIdx]);
            inserted = true;
          }
          if (!inserted) this.tableBody.appendChild(row);
        },

// Remove uma linha
        removeRow(idx) {
          const row = this.taskRows.get(idx);
          if (row) {
            row.remove();
            this.taskRows.delete(idx);
          }
        },

// Adiciona uma nova tarefa
        addNewTaskRow() {
          const newId = projectData.project.tasks.length + 1;
          const defaultDate = projectData.project.tasks.length > 0 
          ? projectData.project.tasks[projectData.project.tasks.length - 1].end || new Date().toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];

          const newTask = {
            id: newId,
            name: "",
            duration: 0,
            status: "notStarted",
            resource: "-",
            predecessors: "-",
            start: defaultDate,
            end: defaultDate,
            percentComplete: 0,
            level: 0,
            parentId: null,
            expanded: true
          };
          projectData.project.tasks.push(newTask);
          const status = newTask.status || "";
          if (!projectData.project.filters.status.has(status)) {
            projectData.project.filters.status.add(status);
          }
          this.updateRow(projectData.project.tasks.length - 1);
          projectData.project.timeline = generateTimeline(projectData.project.tasks);
          buildGantt();
          saveToLocalStorage();
        },

// Vincula eventos a uma linha
        attachRowEvents(row, idx) {
          row.addEventListener('dragstart', (evt) => dragTaskStart(evt, idx));
          row.addEventListener('dragover', dragTaskOver);
          row.addEventListener('drop', (evt) => dropTask(evt, idx));
          row.addEventListener('dragend', dragTaskEnd);
          row.addEventListener('mouseenter', () => highlightGanttRow(idx));
          row.addEventListener('mouseleave', () => unhighlightGanttRow(idx));
        },

// Atualiza a grade incrementalmente com base em mudanças
        update(changedIndices = []) {
          if (changedIndices.length === 0 || changedIndices.length > projectData.project.tasks.length / 2) {
        this.renderFullGrid(); // Se muitas mudanças ou nenhuma especificada, recria tudo
      } else {
        changedIndices.forEach(idx => this.updateRow(idx));
      }
    },

// Remove uma tarefa e atualiza a grade
    deleteTask(idx) {
      const task = projectData.project.tasks[idx];
      projectData.project.tasks = projectData.project.tasks.filter(t => t.id !== task.id && t.parentId !== task.id);
      this.removeRow(idx);
    // Reindexar as tarefas restantes
      projectData.project.tasks.forEach((t, i) => {
        if (this.taskRows.has(i)) {
          this.taskRows.get(i).dataset.taskId = i;
          this.updateRow(i);
        }
      });
      projectData.project.timeline = generateTimeline(projectData.project.tasks);
      buildGantt();
      saveToLocalStorage();
    }
  };

  function highlightPredecessorRows(idx) {
    const tsk = projectData.project.tasks[idx];
    if (!tsk.predecessors || tsk.predecessors === '-') return;

    const predecessors = tsk.predecessors.split(/[,;]/).map(p => p.trim());
    predecessors.forEach(pred => {
      const predId = parseInt(pred);
      const preTask = isNaN(predId) 
      ? projectData.project.tasks.find(t => t.name === pred)
      : projectData.project.tasks.find(t => t.id === predId);
      if (preTask) {
        const preIdx = projectData.project.tasks.indexOf(preTask);
        highlightGridRow(preIdx); // Linha na grade
        highlightGanttRow(preIdx, 1); // Barra no Gantt (corpo da tarefa)
        highlightArrow(preIdx, idx); // Seta do predecessor para a tarefa
      }
    });
  }

  function unhighlightArrow(fromIdx, toIdx) {
    const svg = d.i('svgCanvas');
    const arrows = svg.querySelectorAll('line');
    arrows.forEach(arrow => {
      const from = parseInt(arrow.dataset.from);
      const to = parseInt(arrow.dataset.to);
      if (from === fromIdx && to === toIdx) {
        arrow.style="stroke-width:1";
      }
    });
  }

  function highlightArrow(fromIdx, toIdx) {
    const svg = document.getElementById('svgCanvas');
    const arrows = svg.querySelectorAll('line');
    let found = false;
    arrows.forEach(arrow => {
      const from = parseInt(arrow.getAttribute('data-from'));
      const to = parseInt(arrow.getAttribute('data-to'));
      if (from === fromIdx && to === toIdx) {
        arrow.style="stroke-width:1.3";
        found = true;
      }
    });

    if (!found) {
    // console.log(`Nenhuma seta encontrada para fromIdx: ${fromIdx}, toIdx: ${toIdx}`);
    }
  }

  function unhighlightPredecessorRows(idx) {
    const tsk = projectData.project.tasks[idx];
    if (!tsk.predecessors || tsk.predecessors === '-') return;

    const predecessors = tsk.predecessors.split(/[,;]/).map(p => p.trim());
    predecessors.forEach(pred => {
      const predId = parseInt(pred);
      const preTask = isNaN(predId) 
      ? projectData.project.tasks.find(t => t.name === pred) 
      : projectData.project.tasks.find(t => t.id === predId);
      if (preTask) {
        const preIdx = projectData.project.tasks.indexOf(preTask);
        unhighlightGridRow(preIdx);
        unhighlightGanttRow(preIdx);
        unhighlightArrow(preIdx, idx);
      }
    });
  }

  function resetCanvas() {
    const svg = d.i('svgCanvas');
    svg.querySelectorAll('line').forEach(ln => ln.remove());
  }

  function buildGantt() {
    const gnt = d.s('.gantt-tasks');
    const wks = d.s('.gantt-weeks');
    const dys = d.s('.gantt-days');
    const map = new Map();

    wks.innerHTML = '';
    projectData.project.timeline.weeks.forEach(wk => {
      const div = d.c('div');
      div.className = 'flex-1 text-center pb-2 text-xs text-gray-800 whitespace-nowrap';
      div.textContent = wk.label;
      wks.ac(div);
    });

    dys.innerHTML = '';
    projectData.project.timeline.weeks.forEach(() => {
      const wkd = d.c('div');
      wkd.className = 'flex flex-1';
      projectData.project.timeline.daysOfWeek.forEach((day, idx) => {
        const div = d.c('div');
        div.className = `flex-1 text-center py-1 text-xs text-gray-700 ${
          ['S', 'T', 'Q', 'Q', 'S'].includes(day) && idx < 5 ? 'bg-gray-200' : 'text-opacity-30'
        }`;
        div.textContent = day;
        wkd.ac(div);
      });
      dys.ac(wkd);
    });

    gnt.innerHTML = '';
    projectData.project.tasks.forEach((tsk, idx) => {
      const hid = !isTaskVisible(tsk.id);
      if (hid) return;

      const { left, width } = calculateBarPosition(tsk.start, tsk.end, projectData.project.timeline.start, projectData.project.timeline.end);
      let prg = (width * (tsk.percentComplete / 100)).toFixed(2);
    // Garantir tamanho mínimo de 10px para a barra de progresso (convertido para percentual)
    const minWidthPercent = (10 / gnt.scrollWidth) * 100; // 10px em relação à largura total do Gantt
    prg = Math.max(parseFloat(prg), minWidthPercent); // Aplica o tamanho mínimo
    const mid = parseInt(left) + (parseFloat(prg) / 2);

    const div = d.c('div');
    div.className = 'flex items-center h-[33px] group border-b border-gray-200 opacity-70';
    div.dataset.taskId = idx;
    div.innerHTML = `
        <div class="relative h-4 w-full rounded-full">
            <div class="absolute h-4 w-full border border-gray-300 rounded-full" 
                style="left: ${left}%; width: ${width}%;"></div>
            <div class="absolute h-4 ${getStatusColor(tsk.status)} rounded-full" 
                style="left: ${left}%; width: ${prg}%;"></div>
            <div class="absolute text-xs text-teal-800 hidden group-hover:block" 
                style="left: ${mid}%; top: -1rem; transform: translateX(-50%);">
                ${tsk.percentComplete}%
            </div>
        </div>
    `;
    gnt.ac(div);
    map.set(idx, div);

    div.addEventListener('mouseenter', () => {
      highlightGanttRow(idx);
      highlightGridRow(idx);
    });
    div.addEventListener('mouseleave', () => {
      unhighlightGanttRow(idx);
      unhighlightGridRow(idx);
    });
  });

    const wid = 100;
    const tot = wid * projectData.project.timeline.weeks.length;
    wks.style.width = `${tot}px`;
    dys.style.width = `${tot}px`;
    gnt.style.width = `${tot}px`;

    setTimeout((m) => {
      buildArrows(m);
    }, 500, map);
  }

  function buildArrows(map) {
    const gnt = document.querySelector('.gantt-tasks');
    const wks = document.querySelector('.gantt-weeks');
    const dys = document.querySelector('.gantt-days');
    const svg = document.getElementById('svgCanvas');
    resetCanvas();
    const hgt = wks.getBoundingClientRect().height + dys.getBoundingClientRect().height + gnt.getBoundingClientRect().height;
    svg.setAttribute('width', gnt.scrollWidth);
    svg.setAttribute('height', hgt);
    projectData.project.tasks.forEach((tsk, idx) => {
      if (!isTaskVisible(tsk.id) || !tsk.predecessors || tsk.predecessors === '-') return;
      const predecessors = tsk.predecessors.split(/[,;]/).map(p => p.trim());
      predecessors.forEach(pred => {
        const predId = parseInt(pred);
        const pre = isNaN(predId) 
        ? projectData.project.tasks.find(t => t.name === pred) 
        : projectData.project.tasks.find(t => t.id === predId);
        if (pre) {
          const pid = projectData.project.tasks.indexOf(pre);
          const pel = map.get(pid);
          const cel = map.get(idx);
          if (pel && cel) {
            const ar_line = drawLineLShapeFromEdges(pel.childNodes[1].childNodes[3], cel.childNodes[1].childNodes[3]);
            if (ar_line) {
              for( var ob of ar_line) {
                ob.setAttribute('data-from', pid);
                ob.setAttribute('data-to', idx);
              }
            } else {
            }
          }
        }
      });
    });
  }

  function getElementEdge(elm) {
    const rct = elm.getBoundingClientRect();
    const scr = d.i('ganttScroll');
    const sct = scr.getBoundingClientRect();
const scrollX = scr.scrollLeft; // Captura o scroll horizontal
return {
    xLeft: rct.left - sct.left + scrollX, // Considera o scroll horizontal
    yTop: rct.top - sct.top,
    xRight: rct.right - sct.left + scrollX, // Considera o scroll horizontal
    yBottom: rct.bottom - sct.top
  };
}

function drawLineLShapeFromEdges(e1, e2) {
  const svg = d.i('svgCanvas');
  const ed1 = getElementEdge(e1);
  const ed2 = getElementEdge(e2);

  const stx = ed1.xRight;
  const sty = ed1.yTop + (ed1.yBottom - ed1.yTop) / 2;
  let enx = ed2.xLeft;
  let eny = ed2.yTop + (ed2.yBottom - ed2.yTop) / 2;

  const lft = ed1.xRight <= ed2.xLeft;
  const abv = ed1.yBottom <= ed2.yTop;
  const dst = ed2.xLeft - ed1.xRight;

  if (lft && dst >= 1 && dst <= 100) {
    enx += (ed2.xRight - ed2.xLeft) / 2;

    if (sty < eny) {
      eny = ed2.yTop - 15;
    }
    else {
      eny = ed2.yTop + 28;
    }

    const hln = d.ns('http://www.w3.org/2000/svg', 'line');
    hln.sa('x1', stx);
    hln.sa('y1', sty);
    hln.sa('x2', enx);
    hln.sa('y2', sty);
    hln.ca('line');
    svg.ac(hln);

    const vln = d.ns('http://www.w3.org/2000/svg', 'line');
    vln.sa('x1', enx);
    vln.sa('y1', sty);
    vln.sa('x2', enx);
    vln.sa('y2', eny);
    vln.ca('line');
    vln.sa('marker-end', 'url(#arrow)');
    svg.ac(vln);

    return [hln, vln]
  } else if (lft && abv && dst > 5) {
    const hln = d.ns('http://www.w3.org/2000/svg', 'line');
    hln.sa('x1', stx);
    hln.sa('y1', sty);
    hln.sa('x2', enx - 18);
    hln.sa('y2', sty);
    hln.ca('line');
    svg.ac(hln);

    const vln = d.ns('http://www.w3.org/2000/svg', 'line');
    vln.sa('x1', enx - 18);
    vln.sa('y1', sty);
    vln.sa('x2', enx - 18);
    vln.sa('y2', eny);
    vln.ca('line');
    svg.ac(vln);

    const fln = d.ns('http://www.w3.org/2000/svg', 'line');
    fln.sa('x1', enx - 18);
    fln.sa('y1', eny);
    fln.sa('x2', enx - 14);
    fln.sa('y2', eny);
    fln.ca('line');
    fln.sa('marker-end', 'url(#arrow)');
    svg.ac(fln);

    return [hln, vln, fln]
  } else if (lft && !abv) {
    const hln = d.ns('http://www.w3.org/2000/svg', 'line');
    hln.sa('x1', stx);
    hln.sa('y1', sty);
    hln.sa('x2', enx - 18);
    hln.sa('y2', sty);
    hln.ca('line');
    svg.ac(hln);

    const vln = d.ns('http://www.w3.org/2000/svg', 'line');
    vln.sa('x1', enx - 18);
    vln.sa('y1', sty);
    vln.sa('x2', enx - 18);
    vln.sa('y2', eny);
    vln.ca('line');
    svg.ac(vln);

    const fln = d.ns('http://www.w3.org/2000/svg', 'line');
    fln.sa('x1', enx - 18);
    fln.sa('y1', eny);
    fln.sa('x2', enx - 15);
    fln.sa('y2', eny);
    fln.ca('line');
    fln.sa('marker-end', 'url(#arrow)');
    svg.ac(fln);

    return [hln, vln, fln]
  } else {
    const l1x = stx;
    const l1y = sty;
    const l2x = lft ? stx + (ed2.xRight - ed2.xLeft) / 2 : stx + 10;
    const l2y = sty;

    const hl1 = d.ns('http://www.w3.org/2000/svg', 'line');
    hl1.sa('x1', l1x);
    hl1.sa('y1', l1y);
    hl1.sa('x2', l2x);
    hl1.sa('y2', l2y);
    hl1.ca('line');
    svg.ac(hl1);

    const vl1 = d.ns('http://www.w3.org/2000/svg', 'line');
    vl1.sa('x1', l2x);
    vl1.sa('y1', l2y);
    vl1.sa('x2', l2x);
    vl1.sa('y2', ed1.yBottom + 5);
    vl1.ca('line');
    svg.ac(vl1);

    const hl2 = d.ns('http://www.w3.org/2000/svg', 'line');
    hl2.sa('x1', l2x);
    hl2.sa('y1', ed1.yBottom + 5);
    hl2.sa('x2', enx - 18);
    hl2.sa('y2', ed1.yBottom + 5);
    hl2.ca('line');
    svg.ac(hl2);

    const vl2 = d.ns('http://www.w3.org/2000/svg', 'line');
    vl2.sa('x1', enx - 18);
    vl2.sa('y1', ed1.yBottom + 5);
    vl2.sa('x2', enx - 18);
    vl2.sa('y2', eny);
    vl2.ca('line');
    svg.ac(vl2);

    const hl3 = d.ns('http://www.w3.org/2000/svg', 'line');
    hl3.sa('x1', enx - 18);
    hl3.sa('y1', eny);
    hl3.sa('x2', enx - 3);
    hl3.sa('y2', eny);
    hl3.ca('line');
    svg.ac(hl3);

    const fln = d.ns('http://www.w3.org/2000/svg', 'line');
    fln.sa('x1', enx - 18);
    fln.sa('y1', eny);
    fln.sa('x2', enx - 14);
    fln.sa('y2', eny);
    fln.ca('line');
    fln.sa('marker-end', 'url(#arrow)');
    svg.ac(fln);

    return [hl1, vl1, hl2, vl2, hl3, fln];
  }
}

function renderizeArrowGantt() {
  const svg = d.i('svgCanvas');
  const map = new Map();
  svg.querySelectorAll('line').forEach(ln => ln.remove());

  projectData.project.tasks.forEach((tsk, idx) => {
    map.set(idx, tsk);
  });

  projectData.project.tasks.forEach((tsk, idx) => {
    if (tsk.isFiltered || !tsk.predecessors || tsk.predecessors === '-') return;
    const pre = projectData.project.tasks.find(t => t.name === tsk.predecessors);
    if (pre) {
      const pid = projectData.project.tasks.io(pre);
      const pel = map.get(pid);
      const cel = map.get(idx);
      if (pel && cel) {
        setTimeout((p, c) => {
          drawLineLShapeFromEdges(p.childNodes[1].childNodes[3], c.childNodes[1].childNodes[3]);
        }, 50, pel, cel);
      }
    }
  });
}

function calculateBarPosition(st, en, tst, ten) {
  const std = new Date(st);
  const end = new Date(en);
  const tsd = new Date(tst);
  const ted = new Date(ten);

  const tot = (ted - tsd) / (1000 * 60 * 60 * 24);
  const lft = ((std - tsd) / (1000 * 60 * 60 * 24)) / tot * 100;
  const wid = ((end - std) / (1000 * 60 * 60 * 24)) / tot * 100;

  return { left: lft.toFixed(2), width: wid.toFixed(2) };
}

function shiftRight(idx) {
  const tsk = projectData.project.tasks[idx];
  tsk.level++;
  for (let i = idx - 1; i >= 0; i--) {
    if (projectData.project.tasks[i].level < tsk.level) {
      tsk.parentId = projectData.project.tasks[i].id;
      break;
    }
  }
  updateParentTasks();
  projectData.project.timeline = generateTimeline(projectData.project.tasks);
// buildGrid();
  GridManager.renderFullGrid();
  buildGantt();
  saveToLocalStorage();
}

function shiftLeft(idx) {
  const tasks = [...projectData.project.tasks];
  const tsk = tasks[idx];
  if (tsk.level <= 0) return; // Não move se já está no nível 0

  const children = getChildren(tsk.id); // Pega os filhos do item
  const group = [tsk, ...children]; // Grupo: item + filhos
  const groupIndices = [idx, ...children.map(child => tasks.indexOf(child))].sort((a, b) => b - a);

  // Remove o grupo da posição atual (do fim para o início)
  groupIndices.forEach(i => tasks.splice(i, 1));

  // Reduz o nível do item principal
  tsk.level--;
  const oldParentId = tsk.parentId;

  // Ajusta o parentId: herda o avô ou vira raiz
  const parentTask = tasks.find(t => t.id === oldParentId);
  tsk.parentId = parentTask ? parentTask.parentId : null;

  // Move o grupo para o fim da lista
  tasks.push(...group);

  // Reindexa as tarefas
  tasks.forEach((task, i) => {
      task.id = i + 1; // Atualiza IDs sequencialmente
    });

  // Garante que os filhos mantenham a relação com o pai
  children.forEach(child => {
      child.parentId = tsk.id; // Mantém o pai como o item movido
      child.level = tsk.level + 1; // Ajusta o nível dos filhos
    });

  // Atualiza predecessores e hierarquia
  updatePredecessorsAfterReorder(tasks.map((t, i) => ({ oldId: t.id - i - 1 + t.id, newId: t.id })));
  updateTaskHierarchy(tasks);
  updateParentTasks();

  // Aplica as mudanças
  projectData.project.tasks = tasks;
  projectData.project.timeline = generateTimeline(tasks);
  GridManager.renderFullGrid();
  buildGantt();
  saveToLocalStorage();
}

function toggleExpand(idx) {
  const tsk = projectData.project.tasks[idx];
  tsk.expanded = !tsk.expanded;
  // buildGrid();
  GridManager.renderFullGrid(); // Pode afetar várias linhas (filhos)
  buildGantt();
  saveToLocalStorage();
}

function updateProjectName(elm) {
  elm.contentEditable = false;
  projectData.project.name = elm.textContent.trim() || "Projeto sem nome";
  GridManager.init();
  saveToLocalStorage();
}

function updatePercentComplete(idx, elm) {
  elm.contentEditable = false;
  const val = parseInt(elm.textContent.trim());
  const tsk = projectData.project.tasks[idx];
  const org = tsk.status;
  tsk.percentComplete = isNaN(val) ? 0 : val;
  elm.textContent = `${tsk.percentComplete}%`;

  const flt = {
    status: new Set(projectData.project.filters.status),
    resource: new Set(projectData.project.filters.resource),
    predecessors: new Set(projectData.project.filters.predecessors)
  };

  updateParentTasks();
  tsk.status = org;

  projectData.project.filters.status = flt.status;
  projectData.project.filters.resource = flt.resource;
  projectData.project.filters.predecessors = flt.predecessors;

  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  // buildGrid();
  GridManager.update([idx]);
  buildGantt();
  saveToLocalStorage();
}

function updateDuration(idx, elm) {
  elm.contentEditable = false;
  const val = parseInt(elm.textContent.trim()) || 0;
  const tsk = projectData.project.tasks[idx];
  tsk.duration = val;
  elm.textContent = `${val} ${translations[currentLang].duration.toLowerCase()}`;

  // Recalcular a data final da tarefa atual com base na nova duração
  if (tsk.start) {
    tsk.end = addBusinessDays(tsk.start, val);
  }

  // Propagar mudanças para tarefas dependentes em cascata
  recalculateDependentTasks(idx);

  updateParentTasks();
  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  // buildGrid();
  GridManager.renderFullGrid();
  buildGantt();
  saveToLocalStorage();
}

function updateTask(idx, fld, elm) {
  elm.contentEditable = false;
  const val = elm.textContent.trim();
  if (fld !== 'status') { // Ignora status, pois é tratado por showStatusSelect
    projectData.project.tasks[idx][fld] = val;
    if (fld === 'resource') projectData.project.filters.resource.add(val);
    else if (fld === 'predecessors') projectData.project.filters.predecessors.add(val);
    if (fld === 'name' && val !== "") {
          // Se o nome foi preenchido, atualiza a linha inteira para exibir os campos
      GridManager.updateRow(idx);
    }
    updateTaskDates(idx);
    updateParentTasks();
    projectData.project.timeline = generateTimeline(projectData.project.tasks);
      // buildGrid();
    GridManager.renderFullGrid();
    buildGantt();
    saveToLocalStorage();
  }
}

function showPredecessorSelect(idx, elm) {
  const sel = d.c('select');
  sel.className = 'w-full text-xs';
  sel.innerHTML = '<option value="-">-</option>' + 
  projectData.project.tasks.map(t => `<option value="${t.name}">${t.name.slice(0, 20)}</option>`).join('');
  sel.value = elm.textContent;
  sel.onchange = () => {
    const val = sel.value;
    projectData.project.tasks[idx].predecessors = val;
    projectData.project.filters.predecessors.add(val);
    elm.textContent = val;
    updateTaskDates(idx);
    updateParentTasks();
    projectData.project.timeline = generateTimeline(projectData.project.tasks);
    buildGrid();
    buildGantt();
    saveToLocalStorage();
  };
  sel.onblur = () => elm.textContent = sel.value;
  elm.innerHTML = '';
  elm.ac(sel);
  sel.focus();
}

function getResourceIcon(nam) {
  if (!nam || nam === '-') return '';
  const res = projectData.project.resources.find(r => r.name === nam);
  if (!res) return 'fas fa-user';
  switch (res.level) {
  case 'Junior': return 'fas fa-user-graduate';
  case 'Pleno': return 'fas fa-user-tie';
  case 'Senior': return 'fas fa-user-astronaut';
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
    saveToLocalStorage();
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
        level: "Junior"
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
                  <button class="block px-4 py-2 hover:bg-gray-100" data-level="Junior"><i class="fas fa-user-graduate"></i> Junior</button>
                  <button class="block px-4 py-2 hover:bg-gray-100" data-level="Pleno"><i class="fas fa-user-tie"></i> Pleno</button>
                  <button class="block px-4 py-2 hover:bg-gray-100" data-level="Senior"><i class="fas fa-user-astronaut"></i> Senior</button>
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
          <button class="levelBtn p-1" data-level="Junior"><i class="fas fa-user-graduate"></i></button>
          <div class="levelMenu hidden absolute z-10 bg-white text-gray-800 rounded shadow-lg">
              <button class="block px-4 py-2 hover:bg-gray-100" data-level="Junior"><i class="fas fa-user-graduate"></i> Junior</button>
              <button class="block px-4 py-2 hover:bg-gray-100" data-level="Pleno"><i class="fas fa-user-tie"></i> Pleno</button>
              <button class="block px-4 py-2 hover:bg-gray-100" data-level="Senior"><i class="fas fa-user-astronaut"></i> Senior</button>
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
  saveToLocalStorage();
}

function updateResourceLevel(idx, lvl) {
  projectData.project.resources[idx].level = lvl;
  buildUsersModal();
  updateResourceColumnInGrid();
  saveToLocalStorage();
}

function saveNewResource(inp) {
  if (!inp || typeof inp.value === 'undefined') return;

  const val = inp.value.trim();
  const btn = inp.closest('tr').qs('.levelBtn');
  const lvl = btn ? btn.dataset.level : 'Junior';

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
    saveToLocalStorage();
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

function updateTaskDates(idx) {
  const tsk = projectData.project.tasks[idx];
  let adjusted = false;

  if (tsk.predecessors && tsk.predecessors !== '-') {
    const predecessors = tsk.predecessors.split(/[,;]/).map(p => p.trim());
    let latestEndDate = null;

    predecessors.forEach(pred => {
      const predId = parseInt(pred);
      const pre = isNaN(predId) 
              ? projectData.project.tasks.find(t => t.name === pred) // Suporte a nomes
              : projectData.project.tasks.find(t => t.id === predId); // Busca por ID
              if (pre) {
                const preEndDate = new Date(pre.end);
                if (!latestEndDate || preEndDate > latestEndDate) {
                  latestEndDate = preEndDate;
                }
              }
            });

    if (latestEndDate) {
      const newStart = new Date(latestEndDate);
      newStart.setDate(newStart.getDate() + 1);
      tsk.start = newStart.toISOString().split('T')[0];
      tsk.end = addBusinessDays(tsk.start, tsk.duration);
      adjusted = true;
    }
  }

  const startDate = new Date(tsk.start);
  const endDate = new Date(tsk.end);
  if (startDate >= endDate) {
    tsk.end = addBusinessDays(tsk.start, Math.max(1, tsk.duration));
    adjusted = true;
  }

  if (adjusted) {
    recalculateDependentTasks(idx);
  }
}

function updateDate(idx, fld, inp) {
  const val = new Date(inp.value);
  const tsk = projectData.project.tasks[idx];
  const originalStart = tsk.start; // Guarda a data inicial original
  tsk[fld] = isNaN(val.getTime()) ? new Date().toISOString().split('T')[0] : inp.value;

  // Se for alteração de 'start'
  if (fld === 'start') {
    if (tsk.predecessors && tsk.predecessors !== '-') {
      const pre = projectData.project.tasks.find(t => t.name === tsk.predecessors);
      if (pre && new Date(tsk.start) < new Date(pre.end)) {
              // Não permite data inicial anterior ao fim do antecessor
        tsk.start = originalStart;
        alert(`A data inicial não pode ser anterior ao fim da tarefa antecessora "${pre.name}" (${pre.end}).`);
        return;
      }
    }
      // Se a data inicial é válida, ajusta a data final com base na duração
    tsk.end = addBusinessDays(tsk.start, tsk.duration);
  }

  // Se for alteração de 'end'
  if (fld === 'end') {
      // Validação de data inicial menor que final
    const std = new Date(tsk.start);
    const end = new Date(tsk.end);
    if (std >= end) {
      alert(translations[currentLang].errorDate.replace("${task.start}", tsk.start).replace("${task.end}", tsk.end).replace("${task.name}", tsk.name));
          tsk.end = addBusinessDays(tsk.start, 1); // Garante pelo menos 1 dia útil
        }

      // Recalcular tarefas dependentes em cascata
        recalculateDependentTasks(idx);
      }

      updateParentTasks();
      projectData.project.timeline = generateTimeline(projectData.project.tasks);
  // buildGrid();
      GridManager.renderFullGrid();
      buildGantt();
      saveToLocalStorage();
    }

    function recalculateDependentTasks(idx) {
      const tsk = projectData.project.tasks[idx];
  let nextStart = tsk.end; // Data inicial para a próxima tarefa será o fim da atual

  // Encontrar todas as tarefas que dependem desta em cascata
  const dependents = projectData.project.tasks.filter(t => t.predecessors == tsk.id);
  dependents.forEach(dep => {
    const depIdx = projectData.project.tasks.indexOf(dep);
      // Atualiza a data inicial da tarefa dependente
    dep.start = nextStart;
      // Recalcula a data final com base na duração
    dep.end = addBusinessDays(dep.start, dep.duration);
      // Propaga a mudança para as próximas tarefas dependentes
    recalculateDependentTasks(depIdx);
      // Atualiza a próxima data inicial para a próxima iteração
    nextStart = dep.end;
  });
}

function updateParentTasks() {
  // Atualiza os percentuais e datas dos pais com base nos filhos
  let changesMade;
  do {
    changesMade = false;
    projectData.project.tasks.forEach((tsk, idx) => {
      const chd = getChildren(tsk.id);
      if (chd.length > 0) {
        const oldPercent = tsk.percentComplete;
        const tot = chd.reduce((sum, c) => sum + c.percentComplete, 0);
              tsk.percentComplete = Math.round(tot / chd.length); // Média dos percentuais dos filhos

              const dts = chd.flatMap(c => [new Date(c.start), new Date(c.end)]);
              tsk.start = new Date(Math.min(...dts)).toISOString().split('T')[0];
              tsk.end = new Date(Math.max(...dts)).toISOString().split('T')[0];

              const dys = chd.reduce((sum, c) => sum + (parseInt(c.duration) || 0), 0);
              tsk.duration = dys;

              if (oldPercent !== tsk.percentComplete) {
                  changesMade = true; // Marca que houve mudança para propagar para cima
                }
              }
            });
  } while (changesMade); // Repete até que não haja mais mudanças nos percentuais

  // Propaga o status "inProgress" para cima na hierarquia
  projectData.project.tasks.forEach((tsk, idx) => {
    if (tsk.status === "inProgress") {
      let currentTask = tsk;
      while (currentTask.parentId !== null) {
        const parent = projectData.project.tasks.find(t => t.id === currentTask.parentId);
        if (parent && parent.status !== "completed") {
          parent.status = "inProgress";
          currentTask = parent;
        } else {
          break;
        }
      }
    }
  });

  // Propaga o status "completed" para cima na hierarquia
  do {
    changesMade = false;
    projectData.project.tasks.forEach((tsk, idx) => {
      const chd = getChildren(tsk.id);
      if (chd.length > 0) {
        const allCompleted = chd.every(child => child.status === "completed");
        if (allCompleted && tsk.status !== "completed") {
          tsk.status = "completed";
          changesMade = true;
        }
      }
    });
  } while (changesMade);

  // Ajusta o status dos pais que não estão "completed" nem "inProgress"
  projectData.project.tasks.forEach((tsk, idx) => {
    const chd = getChildren(tsk.id);
    if (chd.length > 0) {
      const allCompleted = chd.every(child => child.status === "completed");
      const someInProgress = chd.some(child => child.status === "inProgress");
      if (allCompleted && tsk.status !== "completed") {
        tsk.status = "completed";
      } else if (someInProgress && tsk.status !== "completed") {
        tsk.status = "inProgress";
      } else if (!allCompleted && !someInProgress && tsk.status !== "completed") {
        tsk.status = "notStarted";
      }
    }
  });

  GridManager.renderFullGrid()
}

function getChildren(tid) {
  return projectData.project.tasks.filter(t => t.parentId === tid);
}

function highlightGanttRow(idx, inBlack = false) {
  const row = d.s(`.gantt-tasks div[data-task-id="${idx}"]`);
  if (row) {
    if (inBlack!= false)
      row.ca('bg-gray-300');
    else
      row.ca('bg-gray-200');
      // row.qs('div').classList.remove('opacity-60');
    row.qs('div').ca('opacity-100');
  }
}

function unhighlightGanttRow(idx) {
  const row = d.s(`.gantt-tasks div[data-task-id="${idx}"]`);
  if (row) {
    row.classList.remove('bg-gray-200', 'bg-gray-300');
      // row.qs('div').ca('opacity-60');
    row.qs('div').classList.remove('opacity-100');
  }
}

function highlightGridRow(idx) {
  const row = d.s(`#mainTableBody tr[data-task-id="${idx}"]`);
  if (row) row.ca('bg-gray-200');
}

function unhighlightGridRow(idx) {
  const row = d.s(`#mainTableBody tr[data-task-id="${idx}"]`);
  if (row) row.classList.remove('bg-gray-200');
}

function dragTaskStart(evt, idx) {
  draggedTaskIdx = idx;
  evt.dataTransfer.setData('text/plain', idx); // Necessário para drag-and-drop funcionar
  evt.currentTarget.classList.add('opacity-50'); // Efeito visual durante o arrasto
}

function dragTaskOver(evt) {
  evt.preventDefault(); // Permite o drop
}

function dropTask(evt, targetIdx) {
  evt.preventDefault();
  if (draggedTaskIdx === null || draggedTaskIdx === targetIdx) return;

  const tasks = [...projectData.project.tasks];
  const draggedTask = tasks[draggedTaskIdx]; // Item arrastado
  const targetTask = tasks[targetIdx]; // Item alvo (irmão)
  const draggedChildren = getChildren(draggedTask.id); // Filhos do item arrastado
  const draggedGroup = [draggedTask, ...draggedChildren]; // Grupo: dragged + seus filhos
  const draggedIndices = [draggedTaskIdx, ...draggedChildren.map(child => tasks.indexOf(child))].sort((a, b) => b - a);

  // Remove o grupo da posição original
  draggedIndices.forEach(idx => tasks.splice(idx, 1));

  // Ajusta o índice alvo considerando as remoções
  let adjustedTargetIdx = targetIdx;
  if (draggedTaskIdx < targetIdx) adjustedTargetIdx -= draggedGroup.length - 1;

  // Verifica se têm o mesmo parentId
  if (draggedTask.parentId === targetTask.parentId) {
    // Insere o grupo ACIMA do alvo
    draggedTask.level = targetTask.level; // Mantém o mesmo nível
    tasks.splice(adjustedTargetIdx, 0, ...draggedGroup);
  } else {
    // Comportamento padrão: insere ABAIXO do alvo
    draggedTask.parentId = targetTask.parentId; // Herda o pai do alvo
    draggedTask.level = targetTask.level; // Mesmo nível do alvo
    tasks.splice(adjustedTargetIdx + 1, 0, ...draggedGroup);
  }

  // Reindexa as tarefas e cria um mapeamento de IDs antigos para novos
  const idMap = new Map();
  tasks.forEach((task, i) => {
    const oldId = task.id;
    task.id = i + 1; // Atualiza IDs sequencialmente
    idMap.set(oldId, task.id); // Mapeia ID antigo para novo
  });

  // Atualiza os parentIds de todas as tarefas com base no mapeamento
  tasks.forEach(task => {
    if (task.parentId !== null && idMap.has(task.parentId)) {
        task.parentId = idMap.get(task.parentId); // Ajusta para o novo ID do pai
      }
    });

  // Garante que os filhos do draggedTask mantenham a relação correta
  draggedChildren.forEach(child => {
    child.parentId = draggedTask.id; // Mantém relação com o pai arrastado
    child.level = draggedTask.level + 1; // Ajusta nível do filho
  });

  // Atualiza predecessores e hierarquia
  updatePredecessorsAfterReorder(tasks.map((t, i) => ({ oldId: t.id - i - 1 + t.id, newId: t.id })));
  updateTaskHierarchy(tasks);

  // Aplica as mudanças
  projectData.project.tasks = tasks;
  projectData.project.timeline = generateTimeline(tasks);
  GridManager.renderFullGrid();
  buildGantt();
  saveToLocalStorage();

  // Destaca as linhas envolvidas
  const draggedRow = GridManager.taskRows.get(tasks.indexOf(draggedTask));
  const targetRow = GridManager.taskRows.get(tasks.indexOf(targetTask));
  if (draggedRow && targetRow) {
    draggedRow.classList.add('bg-gray-100');
    targetRow.classList.add('bg-gray-100');
    setTimeout(() => {
      draggedRow.classList.remove('bg-gray-100');
      targetRow.classList.remove('bg-gray-100');
    }, 3000);
  }

  draggedTaskIdx = null;
}

// Função auxiliar para reindexar tarefas
function reindexTasks(tasks) {
  const changedTasks = [];
  tasks.forEach((task, i) => {
    const oldId = task.id;
    task.id = i + 1;
    if (oldId !== task.id) changedTasks.push({ oldId, newId: task.id });
  });
  return changedTasks;
}

function dragTaskEnd(evt) {
  evt.currentTarget.classList.remove('opacity-50');
  draggedTaskIdx = null;
}

function updateTaskHierarchy(tasks) {
// Reatribuir parentIds com base na nova ordem
  tasks.forEach((task, idx) => {
    if (task.parentId !== null) {
      const parentIdx = tasks.findIndex(t => t.id === task.parentId);
      if (parentIdx === -1 || parentIdx >= idx) {
            // Se o pai não for encontrado antes da tarefa, ajusta o nível e remove o parentId
        task.level = 0;
        task.parentId = null;
      }
    }
  });

// Recalcular níveis com base na posição relativa
  let currentLevel = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].parentId === null) {
      tasks[i].level = 0;
      currentLevel = 0;
    } else {
      const parentIdx = tasks.findIndex(t => t.id === tasks[i].parentId);
      if (parentIdx !== -1) {
        tasks[i].level = tasks[parentIdx].level + 1;
      }
    }
  }
}

function updatePredecessorsAfterReorder(changedTasks) {
  projectData.project.tasks.forEach(task => {
    if (task.predecessors && task.predecessors !== '-') {
      const predList = task.predecessors.split(/[,;]/).map(p => p.trim());
      const updatedPreds = predList.map(pred => {
        const predId = parseInt(pred);
        if (!isNaN(predId)) {
                // Verifica se o predecessor está entre as tarefas que mudaram de ID
          const changed = changedTasks.find(t => t.oldId === predId);
          return changed ? changed.newId.toString() : pred;
        }
            return pred; // Mantém se não for número ou não mudou
          });
      task.predecessors = updatedPreds.join(', ');
        // Atualiza o filtro de antecessores
      projectData.project.filters.predecessors.add(task.predecessors);
    }
  });
}


function showDatePicker(idx, fld, elm) {
  const inp = d.c('input');
  inp.type = 'date';
  inp.value = projectData.project.tasks[idx][fld];
  inp.className = 'w-full text-xs';
  inp.onblur = () => {
    updateDate(idx, fld, inp);
    elm.innerHTML = projectData.project.tasks[idx][fld];
  };
  inp.onkeydown = (e) => { if (e.key === 'Enter') inp.blur(); };
  elm.innerHTML = '';
  elm.ac(inp);
  inp.focus();
}

function showColumnConfigMenu() {
  const old = d.i('columnConfigMenu');
  if (old) old.remove();

  const mnu = d.c('div');
  mnu.id = 'columnConfigMenu';
  mnu.className = 'absolute z-10 bg-white text-gray-800 rounded shadow-lg mt-2 ml-2 text-left';
  mnu.innerHTML = projectData.project.columnOrder.map(col => `
    <label class="block px-4 py-2"><input type="checkbox" ${projectData.project.columnVisibility[col] ? 'checked' : ''} onchange="toggleColumn('${col}', this.checked)"> ${projectData.project.columnNames[col]}</label>
  `).join('');
  d.s('#gridTask table thead th:first-child').ac(mnu);

  d.e('click', function clk(e) {
    if (!mnu.contains(e.target) && e.target !== d.s('.fa-cog')) {
      mnu.remove();
      d.r('click', clk);
    }
  });
}

function toggleColumn(col, vis) {
  projectData.project.columnVisibility[col] = vis;
  updateGridHeaders();
// buildGrid();
  GridManager.renderFullGrid();
  saveToLocalStorage();
}

function renameColumn(key, elm) {
  elm.contentEditable = true;
  elm.focus();
  elm.onblur = () => {
    elm.contentEditable = false;
    const val = elm.textContent.trim();
    if (val) {
      projectData.project.columnNames[key] = val;
      translations[currentLang][key] = val;
      updateGridHeaders();
      saveToLocalStorage();
      const mnu = d.i('columnConfigMenu');
      if (mnu) showColumnConfigMenu();
    }
  };
  elm.onkeydown = (e) => {
    if (e.key === 'Enter') elm.blur();
  };
}

function getStatusColor(key) {
  return projectData.project.statusColors[key] || 'bg-gray-500';
}

function updateStatusColor(idx, clr) {
  const sts = projectData.project.tasks[idx].status;
  projectData.project.statusColors[sts] = clr;
// buildGrid();
// GridManager.update([idx]);
  GridManager.renderFullGrid();

  buildGantt();
  saveToLocalStorage();
}

function addBusinessDays(stDt, days) {
  let crDt = new Date(stDt);
  let rnmDys = days;

  while (rnmDys > 0) {
    crDt.setDate(crDt.getDate() + 1);
    if (crDt.getDay() !== 0 && crDt.getDay() !== 6) {
      rnmDys--;
    }
  }

  return crDt.toISOString().split('T')[0];
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
        level: "Junior"
      });
      existingResources.add(tsk.resource);
    }
  });
}

function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
