// Variável para controlar o nível de zoom
let zoomLevel = 'weeks'; // 'weeks' (padrão) ou 'months'

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
   "statusColors": status_colors
 }
};

let currentLang = navigator.language || "pt-BR";
let draggedTaskIdx = null; // Índice da tarefa sendo arrastada
let draggedTaskIndex = null;
let draggedColumn = null;
let isHorizontalLayout = false;
let colorMenuTimeout;
let hideTimeout;
let fontSize = 1;
let firstLoad = false;
