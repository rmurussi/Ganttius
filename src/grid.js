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
  draggedColumn = null;
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
    const dsp = col === 'status' ? (getTranslation(v) || v) : v;
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
  const changedTasks = []; // Para armazenar o mapeamento de IDs antigos para novos
  tasks.forEach((task, i) => {
    const oldId = task.id; // ID original antes da reindexação
    task.id = i + 1; // Atualiza IDs sequencialmente
    idMap.set(oldId, task.id); // Mapeia ID antigo para novo
    changedTasks.push({ oldId, newId: task.id }); // Adiciona ao mapeamento para predecessores
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
  updatePredecessorsAfterReorder(changedTasks); // Usa o mapeamento correto
  updateTaskHierarchy(tasks);

  // Aplica as mudanças
  projectData.project.tasks = tasks;
  projectData.project.timeline = generateTimeline(tasks);
  GridManager.renderFullGrid();
  buildGantt();

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

function updatePredecessorsAfterReorder(changedTasks) {
  const idMap = new Map(changedTasks.map(t => [t.oldId, t.newId])); // Cria um mapa para consulta rápida
  projectData.project.tasks.forEach(task => {
    if (task.predecessors && task.predecessors !== '-') {
      const predList = task.predecessors.split(/[,;]/).map(p => p.trim());
      const updatedPreds = predList.map(pred => {
        const predId = parseInt(pred);
        if (!isNaN(predId) && idMap.has(predId)) {
          return idMap.get(predId).toString(); // Substitui pelo novo ID
        }
        return pred; // Mantém se não for número ou não mudou
      });
      task.predecessors = updatedPreds.join(', ');
      // Atualiza o filtro de predecessores
      projectData.project.filters.predecessors.add(task.predecessors);
    }
  });
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


function dragTaskEnd(evt) {
  evt.currentTarget.classList.remove('opacity-50');
  draggedTaskIdx = null;
}


function showColumnConfigMenu() {
  const old = d.i('columnConfigMenu');
  if (old) old.remove();

  const mnu = d.c('div');
  mnu.id = 'columnConfigMenu';
  mnu.className = 'absolute z-10 bg-white text-gray-800 rounded shadow-lg mt-2 ml-2 text-left';

  // Adiciona a opção "Novo" no topo
  mnu.innerHTML = `
    <button class="block px-4 py-2 hover:bg-gray-100 w-full text-left" onclick="addNewColumn()">${getTranslation('new')}</button>
  `;

  // Adiciona as opções de visibilidade das colunas existentes
  mnu.innerHTML += projectData.project.columnOrder.map(col => `
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

function addNewColumn() {
  const newColId = `custom_${Date.now()}`; // ID único para a nova coluna
  const newColName = getTranslation('newColumn'); // "Nova Coluna" com tradução

  // Adiciona a nova coluna ao projectData
  projectData.project.columnOrder.splice(1, 0, newColId); // Insere após a primeira coluna (ID)
  projectData.project.columnVisibility[newColId] = true;
  projectData.project.columnNames[newColId] = newColName;

  // Adiciona o campo às tarefas existentes (valor inicial vazio)
  projectData.project.tasks.forEach(task => {
    task[newColId] = '';
  });

  updateGridHeaders();
  GridManager.renderFullGrid();
}

function toggleColumn(col, vis) {
  projectData.project.columnVisibility[col] = vis;
  updateGridHeaders();
// buildGrid();
  GridManager.renderFullGrid();
}

function renameColumn(key, elm) {
  elm.contentEditable = true;
  elm.focus();
  elm.onblur = () => {
    elm.contentEditable = false;
    const val = elm.textContent.trim();
    if (val) {
      projectData.project.columnNames[key] = val;
      getTranslation(key) = val;
      updateGridHeaders();
      const mnu = d.i('columnConfigMenu');
      if (mnu) showColumnConfigMenu();
    }
  };
  elm.onkeydown = (e) => {
    if (e.key === 'Enter') elm.blur();
  };
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

function toggleExpand(idx) {
  const tsk = projectData.project.tasks[idx];
  tsk.expanded = !tsk.expanded;
  // buildGrid();
  GridManager.renderFullGrid(); // Pode afetar várias linhas (filhos)
  buildGantt();
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
}

function updateDuration(idx, elm) {
  elm.contentEditable = false;
  let val = parseInt(elm.textContent.trim()) || 0;
  const tsk = projectData.project.tasks[idx];
  const MAX_DURATION_DAYS = 730;

  // Se a duração informada for maior que 730 dias
  if (val > MAX_DURATION_DAYS) {
    // Verificar a diferença entre data inicial e final
    if (tsk.start && tsk.end) {
      const startDate = new Date(tsk.start);
      const endDate = new Date(tsk.end);
      const diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
      
      if (diffDays < MAX_DURATION_DAYS) {
        // Se a diferença for menor que 730 dias, usa esse valor como duração
        val = Math.floor(diffDays);
        showSuccessTooltip(getTranslation("durationAdjustedToDateRange"));
      } else {
        // Caso contrário, limita a 730 dias
        val = MAX_DURATION_DAYS;
        showErrorTooltip(getTranslation("maxDurationError"));
      }
    } else {
      // Se não houver datas definidas, limita a 730 dias
      val = MAX_DURATION_DAYS;
      showErrorTooltip(getTranslation("maxDurationError"));
    }
  }
  
  tsk.duration = val;
  elm.textContent = `${val} ${getTranslation("duration")}`;

  // Recalcular a data final com base na nova duração
  if (tsk.start) {
    tsk.end = addBusinessDays(tsk.start, val);
    
    // Verificar se a distância excede 2 anos
    const startDate = new Date(tsk.start);
    const endDate = new Date(tsk.end);
    const diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (diffDays > MAX_DURATION_DAYS) {
      tsk.end = addBusinessDays(tsk.start, val); // Redefine para data inicial + duração
      showErrorTooltip(getTranslation("endDateAdjustedForDuration"));
    }
  }

  // Propagar mudanças para tarefas dependentes
  recalculateDependentTasks(idx);
  updateParentTasks();
  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  GridManager.renderFullGrid();
  buildGantt();
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
  }
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

  const MAX_DURATION_DAYS = 730; // 2 anos em dias

  // Se for alteração de 'start'
  if (fld === 'start') {
    if (tsk.predecessors && tsk.predecessors !== '-') {
      const predecessors = tsk.predecessors.split(/[,;]/).map(p => p.trim());
      let latestEndDate = null;
      predecessors.forEach(pred => {
        const predId = parseInt(pred);
        const pre = isNaN(predId)
          ? projectData.project.tasks.find(t => t.name === pred)
          : projectData.project.tasks.find(t => t.id === predId);
        if (pre) {
          const preEndDate = new Date(pre.end);
          if (!latestEndDate || preEndDate > latestEndDate) {
            latestEndDate = preEndDate;
          }
        }
      });
      if (latestEndDate && new Date(tsk.start) <= latestEndDate) {
        tsk.start = originalStart;
        alert(`A data inicial não pode ser anterior ou igual ao fim da tarefa antecessora (${latestEndDate.toISOString().split('T')[0]}).`);
        return;
      }
    }

    // Verificar se a distância entre start e end excede 2 anos
    const startDate = new Date(tsk.start);
    const endDate = new Date(tsk.end);
    const diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (diffDays > MAX_DURATION_DAYS) {
      // Ajustar a data inicial para end - duração
      tsk.start = addBusinessDays(tsk.end, -tsk.duration);
      showErrorTooltip(getTranslation("dateRangeExceedsTwoYears"));
    } else {
      // Ajustar a data final com base na duração
      tsk.end = addBusinessDays(tsk.start, tsk.duration);
    }
  }

  // Se for alteração de 'end'
  if (fld === 'end') {
    const startDate = new Date(tsk.start);
    const endDate = new Date(tsk.end);
    const diffDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    // Validação de data inicial menor que final
    if (startDate >= endDate) {
      alert(getTranslation("errorDate").replace("${task.start}", tsk.start).replace("${task.end}", tsk.end).replace("${task.name}", tsk.name));
      tsk.end = addBusinessDays(tsk.start, 1); // Garante pelo menos 1 dia útil
    } else if (diffDays > MAX_DURATION_DAYS) {
      // Se excede 2 anos, ajusta a data final para start + duração
      tsk.end = addBusinessDays(tsk.start, tsk.duration);
      showErrorTooltip(getTranslation("endDateAdjustedForDuration"));
    }

    // Recalcular tarefas dependentes em cascata
    recalculateDependentTasks(idx);
  }

  updateParentTasks();
  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  GridManager.renderFullGrid();
  buildGantt();
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


function startHideTimer(mnu, elm, org) {
  clearTimeout(colorMenuTimeout);
  colorMenuTimeout = setTimeout(() => {
    elm.className = `inline-block px-2 py-1 text-xs text-gray-800 ${org} rounded-full`;
    mnu.remove();
  }, 5000);
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
  };
  inp.onkeydown = (e) => { if (e.key === 'Enter') inp.blur(); };
  elm.innerHTML = '';
  elm.ac(inp);
  inp.focus();
}

function showStatusSelect(idx, elm) {
  const tsk = projectData.project.tasks[idx];
  const sel = d.c('select');
  sel.className = 'w-full text-xs';
  sel.innerHTML = Object.keys(projectData.project.statusColors).map(st => 
`<option value="${st}" ${tsk.status === st ? 'selected' : ''}>${getTranslation(st) || st}</option>`
).join('');

// Manipula a mudança e atualiza tudo de uma vez
  sel.onchange = () => {
    tsk.status = sel.value;
    if (!projectData.project.filters.status.has(sel.value)) {
        projectData.project.filters.status.add(sel.value); // Novo status visível por padrão
    }
    updateParentTasks();
    projectData.project.timeline = generateTimeline(projectData.project.tasks);
    GridManager.renderFullGrid();
    buildGantt();
  };

  // Substitui o conteúdo de elm pelo select
  elm.innerHTML = '';
  elm.appendChild(sel);
  sel.focus();
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
}


function getChildren(tid) {
  return projectData.project.tasks.filter(t => t.parentId === tid);
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

const GridManager = {
  tableBody: null,
  taskRows: new Map(),
  lastTasks: [],

  // Inicializa a grade
  init() {
    this.tableBody = d.i('mainTableBody');
    if (!this.tableBody) {
      // console.error("Erro: Elemento #mainTableBody não encontrado no DOM. Verifique se o HTML contém esse ID.");
      return;
    }
    d.s('h1').textContent = projectData.project.name || "Projeto sem nome";
    d.i('downloadBtn').disabled = !projectData.project.name;
    this.renderFullGrid();
  },

  // Renderiza toda a grade do zero
  renderFullGrid() {
    if (!this.tableBody) {
      // console.error("Erro: tableBody não inicializado. Chame GridManager.init() primeiro.");
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
    setTimeout(function() {
      updateGridHeaders();
    }, 300);
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
    if (col.startsWith('custom_')) {
      return `
        <td class="p-1 text-xs truncate max-w-[220px]" title="${task[col] || ''}" contenteditable="false" onblur="updateTask(${idx}, '${col}', this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="editAbleDiv(this);">${task[col] || ''}</td>
      `;
    }
    switch (col) {
      case 'actions':
        return `
                <td class="p-1 text-center max-h-[33px] min-w-[80px] max-w-[80px] text-[10px]">
                    <i class="fas fa-trash text-red-600 cursor-pointer" onclick="GridManager.deleteTask(${idx})"></i>
          ${!isEmptyName  ? `<i class="fas fa-arrow-right text-gray-600 cursor-pointer ml-1" onclick="shiftRight(${idx})"></i>` : ''}
          ${task.level > 0 ? `<i class="fas fa-arrow-left text-gray-600 cursor-pointer ml-1" onclick="shiftLeft(${idx})"></i>` : ''}
          ${idx === projectData.project.tasks.length - 1 ? `<i class="fas fa-plus text-green-600 cursor-pointer ml-1" title="${getTranslation("addTask")}" onclick="GridManager.addNewTaskRow()"></i>` : ''}
          </td>`;
      case 'percentComplete':
        return isEmptyName
        ? `<td class="p-1 text-center text-xs truncate w-[90px]" contenteditable="false" onblur="updatePercentComplete(${idx}, this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="editAbleDiv(this);"></td>`
        : (chd
          ? `<td class="p-1 text-center text-xs truncate w-[90px]" title="${task.percentComplete}%">${task.percentComplete}%</td>`
          : `<td class="p-1 text-center text-xs truncate w-[90px]" title="${task.percentComplete}%" contenteditable="false" onblur="updatePercentComplete(${idx}, this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="editAbleDiv(this); this.textContent=this.textContent.replace('%', '')">${task.percentComplete}%</td>`);
      case 'status':
        return isEmptyName
        ? `<td class="p-1 text-center text-xs truncate w-[122px]" ondblclick="showStatusSelect(${idx}, this)"></td>`
        : `<td class="p-1 text-center text-xs truncate w-[122px]" title="${getTranslation(task.status) || task.status}" ondblclick="showStatusSelect(${idx}, this)">
                  <span class="inline-block px-2 py-1 text-xs text-gray-800 ${getStatusColor(task.status)} rounded-full" onmouseenter="showColorMenu(${idx}, this)" onmouseleave="hideColorMenu()">
                      ${getTranslation(task.status) || task.status}
                  </span>
        </td>`;
      case 'name':
        return `
              <td class="p-1 text-xs truncate max-w-[200px] ${chd ? 'underline' : ''}" title="${task.name}" contenteditable="false" onblur="updateTask(${idx}, 'name', this)" ondblclick="editAbleDiv(this);" style="padding-left: ${task.level * 15}px">
          ${chd ? `<i class="fas fa-${task.expanded ? 'minus' : 'plus'} text-gray-600 cursor-pointer mr-1" onclick="toggleExpand(${idx})"></i>` : ''}${task.name}
          </td>`;
      case 'duration':
        return isEmptyName
        ? `<td class="p-1 text-xs truncate max-w-[100px]" contenteditable="false" onblur="updateDuration(${idx}, this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="editAbleDiv(this);"></td>`
        : (chd
          ? `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.duration} ${getTranslation("duration")}">${task.duration} ${getTranslation("duration")}</td>`
          : `<td class="p-1 text-xs truncate max-w-[100px]" title="${task.duration} ${getTranslation("duration")}" contenteditable="false" onblur="updateDuration(${idx}, this)" onkeydown="if(event.key === 'Enter') this.blur()" ondblclick="editAbleDiv(this); this.textContent='${task.duration}'">${task.duration} ${getTranslation("duration")}</td>`);
      case 'start':
        return isEmptyName
        ? `<td class="p-1 text-xs truncate w-[100px]" ondblclick="showDatePicker(${idx}, 'start', this)"></td>`
        : (chd
          ? `<td class="p-1 text-xs truncate w-[100px]" title="${task.start}">${task.start}</td>`
          : `<td class="p-1 text-xs truncate w-[100px]" title="${task.start}" ondblclick="showDatePicker(${idx}, 'start', this)">${task.start}</td>`);
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
  }
};