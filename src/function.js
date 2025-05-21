function refAction(in_ref) {
  if (in_ref) {
    d.i("observeBtn").classList.add("hidden");
    d.i("shareBtn").classList.add("hidden");
    d.i("saveBtn").classList.add("hidden");
    d.i("usersBtn").classList.add("hidden");
    d.i("observeBtnMobile").classList.add("hidden");
    d.i("shareBtnMobile").classList.add("hidden");
    d.i("saveBtnMobile").classList.add("hidden");
    d.i("usersBtnMobile").classList.add("hidden");
    d.s("header").classList.add("bg-cyan-600");
    d.s("header").classList.remove("bg-indigo-600");
  }
  else {
    d.s("header").classList.remove("bg-cyan-600");
    d.s("header").classList.add("bg-indigo-600");
    d.i("shareBtn").classList.remove("hidden");
    d.i("saveBtn").classList.remove("hidden");
    d.i("usersBtn").classList.remove("hidden");
    d.i("observeBtnMobile").classList.remove("hidden");
    d.i("shareBtnMobile").classList.remove("hidden");
    d.i("saveBtnMobile").classList.remove("hidden");
    d.i("usersBtnMobile").classList.remove("hidden");
    d.i("observeBtn").classList.remove("hidden");
  }
}

//??
// function showPredecessorSelect(idx, elm) {
//   const sel = d.c('select');
//   sel.className = 'w-full text-xs';
//   sel.innerHTML = '<option value="-">-</option>' + 
//   projectData.project.tasks.map(t => `<option value="${t.name}">${t.name.slice(0, 20)}</option>`).join('');
//   sel.value = elm.textContent;
//   sel.onchange = () => {
//     const val = sel.value;
//     projectData.project.tasks[idx].predecessors = val;
//     projectData.project.filters.predecessors.add(val);
//     elm.textContent = val;
//     updateTaskDates(idx);
//     updateParentTasks();
//     projectData.project.timeline = generateTimeline(projectData.project.tasks);
//     buildGrid();
//     buildGantt();
//   };
//   sel.onblur = () => elm.textContent = sel.value;
//   elm.innerHTML = '';
//   elm.ac(sel);
//   sel.focus();
// }

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


function createNotification(message, type) {
    // Criar o elemento do tooltip
    const tooltip = document.createElement('div');

    // Estilo base com condicional para tipo (success ou error)
    const baseStyle = 'flex items-center p-4 text-sm shadow-lg animate-fade-in transition-all duration-300';
    const typeStyle = type === 'success'
        ? 'text-green-800 bg-green-50'
        : 'text-red-800 bg-red-50';
    const iconStyle = type === 'success'
        ? 'fas fa-check-circle text-green-500 mr-2'
        : 'fas fa-exclamation-circle text-red-500 mr-2';

        tooltip.className = `${baseStyle} ${typeStyle}`;

    // Adicionar conteúdo
    tooltip.innerHTML = `
        <i class="${iconStyle}"></i>
        <span>${message}</span>
    `;

    // Container para as notificações
    const notificationContainer = document.getElementById('notification-container');
    // Adicionar ao container como primeiro elemento
    notificationContainer.insertBefore(tooltip, notificationContainer.firstChild);

    // Remover após 3 segundos e ajustar posição dos restantes
    setTimeout(() => {
        tooltip.classList.remove('animate-fade-in');
        tooltip.classList.add('animate-fade-out');
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 3000);
}

function showSuccessTooltip(message) {
    createNotification(message, 'success');
}

function showErrorTooltip(message) {
    createNotification(message, 'error');
}

// Função para criar e gerenciar o overlay de processamento
function showProcessingOverlay(message = getTranslation("processing")) {
  // Verificar se já existe um overlay
  let overlay = document.getElementById('processing-overlay');

  // Se não existe, criar
  if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'processing-overlay';
      overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300';

      // Conteúdo do overlay
      overlay.innerHTML = `
          <div class="flex items-center p-6 bg-white shadow-xl">
              <i class="fas fa-spinner fa-spin text-blue-500 text-2xl mr-3"></i>
              <span class="text-gray-800 text-lg font-medium" id="processing-message">${message}</span>
          </div>
      `;

      // Adicionar ao body
      document.body.appendChild(overlay);

      // Garantir que comece invisível e faça fade in
      setTimeout(() => {
          overlay.classList.add('opacity-100');
      }, 10);
  } else {
      // Atualizar mensagem se overlay já existe
      document.getElementById('processing-message').textContent = message;
  }

  // Aplicar estilo ao conteúdo da página
  const pageContent = document.getElementById('page-content');
  if (pageContent) {
      pageContent.classList.add('pointer-events-none', 'opacity-50');
  }

  // Função para remover o overlay
  function removeOverlay() {
      if (overlay) {
          overlay.classList.remove('opacity-100');
          setTimeout(() => {
              overlay.remove();
              if (pageContent) {
                  pageContent.classList.remove('pointer-events-none', 'opacity-50');
              }
          }, 300);
      }
  }

  // Retornar função para remover o overlay quando necessário
  return removeOverlay;
}

function editAbleDiv(e) {
  e.querySelector("i") && e.querySelector("i").remove();
  e.removeAttribute("style");
  e.contentEditable = true;
  e.classList.add("pl-4");

  // Cria um range que seleciona todo o conteúdo
  const range = document.createRange();
  range.selectNodeContents(e);

  // Obtém a seleção atual e aplica o range
  const selecao = window.getSelection();
  selecao.removeAllRanges();
  selecao.addRange(range);

  e.focus();
}