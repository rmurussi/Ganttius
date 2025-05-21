// Ajuste em buildGantt para suportar zoom
function buildGantt() {
  const gnt = d.s('.gantt-tasks');
  const wks = d.s('.gantt-weeks');
  const dys = d.s('.gantt-days');
  const map = new Map();
  const ganttScroll = d.i('ganttScroll'); // Elemento com overflow-x

  wks.innerHTML = '';
  if (zoomLevel === 'weeks') {
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
  } else {
    projectData.project.timeline.months.forEach(mth => {
      const div = d.c('div');
      div.className = 'flex-1 text-center pb-2 text-xs text-gray-800 whitespace-nowrap';
      div.style["padding-top"] = "24px";
      div.textContent = mth.label;
      wks.ac(div);
    });
    dys.innerHTML = ''; // Sem dias no modo mensal
  }

  gnt.innerHTML = '';
  projectData.project.tasks.forEach((tsk, idx) => {
    const hid = !isTaskVisible(tsk.id);
    if (hid) return;

    const timelineStart = zoomLevel === 'weeks' ? projectData.project.timeline.start : projectData.project.timeline.start;
    const timelineEnd = zoomLevel === 'weeks' ? projectData.project.timeline.end : projectData.project.timeline.end;
    const { left, width } = calculateBarPosition(tsk.start, tsk.end, timelineStart, timelineEnd);
    let prg = (width * (tsk.percentComplete / 100)).toFixed(2);
    const minWidthPercent = (10 / gnt.scrollWidth) * 100;
    prg = Math.max(parseFloat(prg), minWidthPercent);
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

  const wid = 100; // Largura fixa de cada semana/mês em pixels
  const tot = wid * (zoomLevel === 'weeks' ? projectData.project.timeline.weeks.length : projectData.project.timeline.months.length);
  wks.style.width = `${tot}px`;
  dys.style.width = `${tot}px`;
  gnt.style.width = `${tot}px`;

  if (!firstLoad) {
    firstLoad = true;
    // Ajuste do scroll para a semana atual
    setTimeout(() => {
      setLeftGantt()
    }, 100); // Pequeno delay para garantir que o DOM esteja pronto
  }

  setTimeout((m) => {
    buildArrows(m);
  }, 500, map);
}

function setLeftGantt() {
  if (zoomLevel === 'weeks') {
    const now = new Date();
    let currentWeekIndex = -1;

    // Encontra a semana atual no timeline
    projectData.project.timeline.weeks.forEach((wk, idx) => {
      const weekStart = new Date(wk.start);
      const weekEnd = new Date(wk.end);
      if (now >= weekStart && now <= weekEnd) {
        currentWeekIndex = idx;
      }
    });

    if (currentWeekIndex !== -1) {
      // Calcula a posição do scroll para centralizar a semana atual
      const weekWidth = 100; // Largura de cada semana
      const scrollPosition = currentWeekIndex * weekWidth - (ganttScroll.clientWidth / 2) + (weekWidth / 2);
      ganttScroll.scrollLeft = Math.max(0, scrollPosition); // Evita scroll negativo
    } else {
      // Se a semana atual não estiver no timeline, vai para o início
      ganttScroll.scrollLeft = 0;
    }
  } else {
    // Para o modo mensal, vai para o início por padrão
    ganttScroll.scrollLeft = 0;
  }
}

// Funções de zoom
function zoomOutGantt() {
  zoomLevel = 'months';
  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  buildGantt();
}

function zoomInGantt() {
  firstLoad = false;
  zoomLevel = 'weeks';
  projectData.project.timeline = generateTimeline(projectData.project.tasks);
  buildGantt();
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


function resetCanvas() {
  const svg = d.i('svgCanvas');
  svg.querySelectorAll('line').forEach(ln => ln.remove());
}


// Função para gerar timeline mensal
function generateMonthlyTimeline(tasks) {
  let std, end;
  if (tasks.length === 0) {
    const now = new Date();
    std = new Date(now.getFullYear(), now.getMonth(), 1);
    end = new Date(now);
  } else {
    const dts = tasks.flatMap(t => [new Date(t.start), new Date(t.end)]);
    std = new Date(Math.min(...dts));
    end = new Date(Math.max(...dts));
  }

  // Ajusta para o início do mês
  std.setDate(1);
  // Ajusta para o final do mês
  end.setMonth(end.getMonth() + 1, 0);

  // Define o número mínimo de meses com base no layout
  const minMonths = isHorizontalLayout ? 24 : 12;
  const durationMonths = Math.ceil((end - std) / (1000 * 60 * 60 * 24 * 30.44)); // Aproximação de meses
  if (durationMonths < minMonths) {
    const monthsToAdd = minMonths - durationMonths;
    const before = Math.floor(monthsToAdd / 2);
    const after = monthsToAdd - before;
    std.setMonth(std.getMonth() - before);
    end.setMonth(end.getMonth() + after);
    end.setMonth(end.getMonth() + 1, 0); // Ajusta para o final do mês
  }

  const months = [];
  let cur = new Date(std);
  while (cur <= end) {
    const mth = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    months.push({
      label: `${mth[cur.getMonth()]}/${cur.getFullYear()}`,
      start: new Date(cur).toISOString().split('T')[0],
      end: new Date(cur.getFullYear(), cur.getMonth() + 1, 0).toISOString().split('T')[0]
    });
    cur.setMonth(cur.getMonth() + 1);
  }

  return {
    start: std.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
    months: months
  };
}

// Ajuste na função generateTimeline para semanas
function generateTimeline(tasks) {
  if (zoomLevel === 'months') return generateMonthlyTimeline(tasks);

  let std, end;
  if (tasks.length === 0) {
    const now = new Date();
    std = new Date(now);
    end = new Date(now);
  } else {
    const dts = tasks.flatMap(t => [new Date(t.start), new Date(t.end)]);
    std = new Date(Math.min(...dts));
    end = new Date(Math.max(...dts));
  }

  const dur = (end - std) / (1000 * 60 * 60 * 24);
  const wks = Math.ceil(dur / 7);
  const minWeeks = isHorizontalLayout ? 24 * 4.33 : 12 * 4.33; // Aproximadamente 4.33 semanas por mês

  if (wks < minWeeks) {
    const add = Math.ceil(minWeeks - wks);
    const bef = Math.floor(add / 2);
    const aft = add - bef;
    std.setDate(std.getDate() - bef * 7);
    end.setDate(end.getDate() + aft * 7);
  }

  std.setDate(std.getDate() - (std.getDay() || 7) + 1); // Ajusta para início da semana (segunda-feira)
  end.setDate(end.getDate() + (7 - (end.getDay() || 7))); // Ajusta para fim da semana (domingo)

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
