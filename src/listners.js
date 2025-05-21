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


  d.i('downloadBtnMobile').addEventListener('click', () => {
    d.i('downloadBtn').click();
  });
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
              {"id": 1, "name": "Recurso 1", "level": "Jr"},
              {"id": 2, "name": "Recurso 2", "level": "Pl"},
              {"id": 3, "name": "Recurso 3", "level": "Sr"}
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
              actions: getTranslation("actions", old),
              percentComplete: getTranslation("percentComplete", old),
              status: getTranslation("status", old),
              name: getTranslation("name", old),
              duration: getTranslation("duration", old),
              start: getTranslation("start", old),
              end: getTranslation("end", old),
              resource: getTranslation("resource", old),
              predecessors: getTranslation("predecessors", old)
            };
          }
          if (!projectData.project.statusColors) {
            projectData.project.statusColors = statusColors;
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
          showErrorTooltip(getTranslation("errorJson") + err.message)
        }
      };
      rdr.readAsText(fle);
      evt.target.value = '';
    }
  });

  d.i('shareBtnMobile').addEventListener('click', async () => {
    d.i('shareBtn').click();
  });

  d.i('shareBtn').addEventListener('click', async () => {
    bkend.share();
  });

  d.i('observeBtnMobile').addEventListener('click', () => {
    d.i('observeBtn').click();
  });
  d.i('observeBtn').addEventListener('click', () => {
    bkend.observe();
  });

  d.i('usersBtnMobile').addEventListener('click', () => {
    d.i('usersBtn').click();
  });
  d.i('usersBtn').addEventListener('click', () => {
    buildUsersModal();
    d.i('usersModal').showModal();
    document.body.ca('bg-opacity-50', 'bg-gray-500');
  });

  d.i('usersModal').addEventListener('close', () => {
    document.body.classList.remove('bg-opacity-50', 'bg-gray-500');
  });

  d.i('languageBtn').addEventListener('click', () => {
    const mnu = d.i('languageMenu');
    mnu.classList.toggle('hidden');
  });

  d.i('saveBtnMobile').addEventListener('click', async () => {
    bkend.save();
  });
  d.i('saveBtn').addEventListener('click', async () => {
    bkend.save();
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
  // grd.addEventListener('scroll', () => {
  //   gnt.scrollTop = grd.scrollTop;
  //   gnt.scrollLeft = grd.scrollLeft;
  // });
  gnt.addEventListener('scroll', () => {
    // grd.scrollTop = gnt.scrollTop;
    // grd.scrollLeft = gnt.scrollLeft;

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

  document.getElementById('leftMenuBtn').addEventListener('click', function () {
      const leftDropdown = document.getElementById('leftDropdown');
      leftDropdown.classList.toggle('hidden');
  });

  document.getElementById('rightMenuBtn').addEventListener('click', function () {
      const rightDropdown = document.getElementById('rightDropdown');
      rightDropdown.classList.toggle('hidden');
  });

  // Fechar os dropdowns ao clicar fora deles
  document.addEventListener('click', function (event) {
      const leftBtn = document.getElementById('leftMenuBtn');
      const rightBtn = document.getElementById('rightMenuBtn');
      const leftDropdown = document.getElementById('leftDropdown');
      const rightDropdown = document.getElementById('rightDropdown');

      if (!leftBtn.contains(event.target) && !leftDropdown.contains(event.target)) {
          leftDropdown.classList.add('hidden');
      }
      if (!rightBtn.contains(event.target) && !rightDropdown.contains(event.target)) {
          rightDropdown.classList.add('hidden');
      }
  });

  if (window.innerWidth < 800) {
    toggleLayout()
  }


  const ganttScroll = d.i('ganttScroll');
  const controls = d.i('ganttControls');

  ganttScroll.addEventListener('mouseenter', () => {
    controls.classList.remove('opacity-0');
    controls.classList.add('opacity-100');
  });
  ganttScroll.addEventListener('mouseleave', () => {
    controls.classList.remove('opacity-100');
    controls.classList.add('opacity-0');
  });
  controls.addEventListener('mouseenter', () => {
    controls.classList.remove('opacity-0');
    controls.classList.add('opacity-100');
  });
  controls.addEventListener('mouseleave', () => {
    controls.classList.remove('opacity-100');
    controls.classList.add('opacity-0');
  });

  d.i('zoomOutBtn').addEventListener('click', zoomOutGantt);
  d.i('zoomInBtn').addEventListener('click', zoomInGantt);

});

