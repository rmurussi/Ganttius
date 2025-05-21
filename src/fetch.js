const _action = {
  "uuid": "uuid",
  "reference": "reference",
};

const bkend = {
  /*Erro de 403 no save deverá retornar o próprio UUID pois já é um refer*/
  observe: async function() {
    var hideOverlay = showProcessingOverlay();
    try {
      const httpCode = await bkend.save();
      var projectId = projectData.project.id;

      if (httpCode == 200) {
        // Fazer a requisição ao endpoint
        const response = await fetch(`${url_base}/${_action.reference}/${projectData.project.id}`, {method: 'POST',});
        const data = await response.json();

        projectId = data.uuid;
      }
      // Copiar o UUID para a área de transferência
      await navigator.clipboard.writeText(bkend.url(projectId));

      showSuccessTooltip(getTranslation('notification'));
      hideOverlay();
    } catch (error) {
        // showNotification('Erro ao copiar o link', 'error'); // Notificação de erro
        hideOverlay();
    }
  },
  new: async function() {
      var hideOverlay = showProcessingOverlay();
      try {
        const response = await fetch(`${url_base}/${_action.uuid}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        setTimeout(_=>{
          hideOverlay()
        }, 300)
        if (!response.ok) throw new Error('Falha ao obter UUID');
        const data = await response.json();
        window.location.href = bkend.url();
        return data.uuid; // Atualiza o ID do projeto com o UUID retornado
      } catch (error) {
        setTimeout(_=>{
          hideOverlay()
        }, 300)
        // console.error('Erro ao criar novo projeto:', error);
        showErrorTooltip(getTranslation('uuidError'))
      }
      return 1;
  },
  save: async function() {
    if (projectData.project.id == 1) {
      projectData.project.id = await bkend.new();
    }
    var httpCode = 200;
    var hideOverlay = showProcessingOverlay();
    try {
      const response = await fetch(`${url_base}/${projectData.project.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: projectData.project.id,
          name: projectData.project.name,
          tasks: projectData.project.tasks,
          resources: projectData.project.resources,
          columnVisibility: projectData.project.columnVisibility,
          columnOrder: projectData.project.columnOrder,
          columnNames: projectData.project.columnNames,
          statusColors: projectData.project.statusColors,
        })
      });
      setTimeout(_=>{
        hideOverlay()
      }, 300)
      httpCode = response.status;
      if (!response.ok) throw new Error('Falha ao salvar');

      showSuccessTooltip(getTranslation('saveSuccess'));

      saveToLocalStorage(httpCode);

    } catch (error) {
      if (httpCode != 403) {
        showErrorTooltip("Error.");
      }
    }
    return httpCode;
  },
  share: async function() {
    if (projectData.project.id == 1) {
      projectData.project.id = await bkend.new();
    }

    hideOverlay = showProcessingOverlay();
    const response = await fetch(`${url_base}/${projectData.project.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: projectData.project.id,
        name: projectData.project.name,
        tasks: projectData.project.tasks,
        resources: projectData.project.resources,
        columnVisibility: projectData.project.columnVisibility,
        columnOrder: projectData.project.columnOrder,
        columnNames: projectData.project.columnNames,
        statusColors: projectData.project.statusColors,
      })
    });
    setTimeout(_=>{
      hideOverlay()
    }, 300)
    if (!response.ok) throw new Error('Falha ao salvar');

    navigator.clipboard.writeText(bkend.url(projectData.project.id)).then(() => {
      showSuccessTooltip(getTranslation('shareSuccess') || "Link copiado para a área de transferência!");
    }).catch(err => {
      // console.error('Erro ao copiar URL:', err);
      showErrorTooltip(getTranslation('shareError') || "Erro ao copiar o link.");
    });
  },
  url: function(uuid) {
    const currentUrl = window.location.href.split('?')[0].split('#')[0];
    return `${currentUrl}?id=${uuid}`;
  }
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

async function loadProjectFromServer() {
  const uuidParamProject = getParameterByName("id");
  if (!uuidParamProject) {
    return;
  }
  var hideOverlay = showProcessingOverlay();
  try {
    const response = await fetch(`${url_base}/${uuidParamProject}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Falha ao carregar projeto');
    const project = await response.json();
    refAction(project.ref == true);

    if (project.tasks.length == 0) {
      project.tasks.push(
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
      );
    }
    projectData = {project: project};
    d.s('h1').textContent = projectData.project.name
    projectData.project.filters = {
      status: new Set(projectData.project.tasks.map(t => t.status)),
      resource: new Set(projectData.project.tasks.map(t => t.resource)),
      predecessors: new Set(projectData.project.tasks.map(t => t.predecessors))
    };
    projectData.project.timeline = generateTimeline(projectData.project.tasks);
    // Aqui você pode adicionar código para atualizar a UI com os dados carregados
    // console.log('Projeto carregado:', projectData);
    GridManager.renderFullGrid()
    buildGantt();
    setTimeout(_=>{
      hideOverlay()
    }, 300)
  } catch (error) {
    setTimeout(_=>{
      hideOverlay()
    }, 300)
    // console.error('Erro ao carregar projeto:', error);
    // alert(getTranslation('loadError') || "Erro ao carregar o projeto.");
    showSuccessTooltip("Error.")
  }
}