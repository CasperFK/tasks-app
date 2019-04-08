const listNewTasks = document.getElementById('listTasks'); //secja select do zrobienia
const listDoneTasks = document.getElementById('doneTasks'); //sekcja select ukończone
const listDeleteTasks = document.getElementById('deleteTasks'); // sekcja select usunięte
const sectionNewTasks = document.getElementsByClassName('sectionNewTasks');
const sectionDoneTasks = document.getElementsByClassName('sectionDoneTasks');
const sectionDeleteTasks = document.getElementsByClassName('sectionDeleteTasks');
const buttonAddNewTask = document.getElementById('listenClickNewTask1'); // buton dodaj nowe zadanie
const moreInformationSection = document.querySelector('.moreInformation'); // sekcja moreInformation (panel który wyświetla informacje wybranego zadania)
const editMoreInformationSection = document.querySelector('.editMoreInformation');  // sekcja editMoreInformation (panel który wyświetla formularz do edycji wybranego zadania)
const buttonEditInformation = document.querySelector('#editTask'); // button do edycji bieżacego zadania
const formEditTask = document.querySelector('#moreInformationTask'); // formularz edycji szczegółowych informacji o zadaniu
const optionWhoShowPanelWithMoreInformationAboutSelectTask = document.getElementsByClassName('showMoreInformationAboutThisTask');
const optionWhoShowPanelWithEditorSelectTask = document.getElementsByClassName('showPanelWhoEditThisTask');
const showSectionNewTasks = document.getElementsByClassName('chooseOptionSectionNew');
const showSectionDoneTasks = document.getElementsByClassName('chooseOptionSectionDone');
const showSectionDeleteTasks = document.getElementsByClassName('chooseOptionSectionDelete');
const buttonExitShowMoreInformation = document.getElementById('exitShowMoreInformation');

let selectTask = null; //wybrne bieżace zadanie
let selectTaskID = null; //bieżace id zadania
let table = null; // tablica zadań
let flagaSaveEditTask = false;
// typePanel="sectionNewTasks" || typePanel="sectionDoneTasks" || typePanel="sectionDeleteTasks"
let openPanel = 'sectionNewTasks'; // sectionNewTasks || sectionDoneTasks || sectionDeleteTasks

let searchID = null;
let iteratorTaskID = 1;
let taskID = "";

// funkcja tworzący nowy obiekt json oraz dodający go do tablicy
const createNewTaskObject = (id, nameTask, timeCreateTask, timeEndTask, taskStatus,  description, autor, tel, wwww, mail,) => {
    	let JSONtask = `{
			"task-id": "${id}",
			"name-task": "${nameTask}",
			"time-create-task": "${timeCreateTask}",
			"time-end-task": "${timeEndTask}",
			"task-status": "${taskStatus}",
			"description": "${description}",
			"autor": "${autor}",
			"tel": "${tel}",
			"www": "${wwww}",
			"mail": "${mail}"
		}`;
    table.push([id, JSON.parse(JSONtask)]);
};

//funckja wyszukująca objekt w tablicy
const searchChooseObjectInTable = (taskID) => {
  table.forEach((e, id) => {
      if (e[0] === taskID) {
          searchID = id;
          return searchID;
      }
  })
};

// funckja strzałkowa do wyczyszczenia inputa "Wprowadż zadanie"
const clearAddTask = () => {
    document.getElementById('inputValueTask').value = "";
};

document.getElementById('clearAddTask').addEventListener("click", clearAddTask, false);

// funkcja strzałkowa tworzy nowe zadanie oraz dodaje je do listy "Do zrobienia"
const addNTask = () => {
    function  generatorTaskID (iteratorTaskID) {
        let title = "task-";
        taskID = title + iteratorTaskID;
        return iteratorTaskID;
    }

	generatorTaskID(iteratorTaskID);
	iteratorTaskID = iteratorTaskID + 1;
     // generujemy datę nowego zadania
// konwertujemy datę to aplikacji
    const timeAddTask = new Date(),
        timeGetAddTask = +timeAddTask.getDate() + '-' + 0 + (timeAddTask.getMonth() + 1) + '-' + timeAddTask.getFullYear(),
        valueInputAddNewTask = document.getElementById('inputValueTask').value; // pobieramy nazwe nowego zadania z inputa

    if (table !== null) {
		if (valueInputAddNewTask !== '') { //sprawdzamy czy input nowego zadania nie jest pusty
			createNewTaskObject( taskID, valueInputAddNewTask, timeGetAddTask, '', 'open', '', '', '', '', ''); // tworzenie nowego zadania
			listNewTasks.innerHTML += '<option id="' + taskID + '">' + valueInputAddNewTask + '</option>'; // dodanie nowego zadania do listy nowych zadań do zrobienia
		} else alert('Najpierw podaj nazwe zadania!')
	} else {
		table = [];
		if (valueInputAddNewTask !== '') { //sprawdzamy czy input nowego zadania nie jest pusty
			createNewTaskObject( taskID, valueInputAddNewTask, timeGetAddTask, '', 'open', '', '', '', '', ''); // tworzenie nowego zadania
			listNewTasks.innerHTML += '<option id="' + taskID + '">' + valueInputAddNewTask + '</option>'; // dodanie nowego zadania do listy nowych zadań do zrobienia
		} else alert('Najpierw podaj nazwe zadania!');
	}
};

buttonAddNewTask.addEventListener('click', addNTask, false);

const selectTaskInSections = (e) => {
  selectTask = e.target;
  selectTaskID = e.target.id;
};

listNewTasks.addEventListener('click', selectTaskInSections, false);
listDoneTasks.addEventListener('click', selectTaskInSections, false);
listDeleteTasks.addEventListener('click', selectTaskInSections, false);

const moveSelectTask = (taskSelectID, cel, taskStatus) => {
    if (selectTaskID !== null) {
        const x = document.getElementById(taskSelectID);
        const y = x.value;

        if (y !== '') {
            searchChooseObjectInTable(x.id);
            cel.innerHTML += "<option id=" + x.id + ">" + y + "</option>";
            const xz = (taskStatus) => {
                table[searchID][1]["task-status"] = taskStatus;
            };
            xz(taskStatus);
            //dodać dymek w aplikacji o przeniesionym zadaniu
            selectTaskID = null;
        } else alert('Najpierw wybierz zadanie!');
        x.remove(x.selectedIndex);
    }else alert('Najpierw wybierz zadanie!');
};

const doneFunTask = () => moveSelectTask(selectTaskID, listDoneTasks, 'close');
const deleteFunTask = () => moveSelectTask(selectTaskID, listDeleteTasks, 'delete');

const newFunTask2 = () => moveSelectTask(selectTaskID, listNewTasks, 'open');
const deleteFunTask2 = () => moveSelectTask(selectTaskID, listDeleteTasks, 'delete');

const newFunTask3 = () => moveSelectTask(selectTaskID, listNewTasks, 'open');
const doneFunTask3 = () => moveSelectTask(selectTaskID, listDoneTasks, 'close');

document.getElementById('clearAddTask').addEventListener("click", clearAddTask, false);
document.getElementById('listenClickNewTask1').addEventListener("click", addNTask, false);

document.getElementById('listenClickDoneTask1').addEventListener("click",doneFunTask, false );
document.getElementById('listenClickDeleteTask1').addEventListener("click",deleteFunTask, false );

document.getElementById('listenClickNewTask2').addEventListener("click", newFunTask2, false);
document.getElementById('listenClickDeleteTask2').addEventListener("click",deleteFunTask2, false );

document.getElementById('listenClickNewTask3').addEventListener("click", newFunTask3, false);
document.getElementById('listenClickDoneTask3').addEventListener("click",doneFunTask3, false );



// sectionNewTasks || sectionDoneTasks || sectionDeleteTasks
const showChoosePanel = (e) => {
    editMoreInformationSection.style.display = 'none';
    moreInformationSection.style.display = 'none';
    const choose = e.target.getAttribute('typepanel');
    const changeView = (chooseButton) => {
        const beforePanelDisplay = document.querySelector('.'+openPanel);
        beforePanelDisplay.style.display = 'none';
        const afterPanelDisplay = document.querySelector('.'+chooseButton);
        afterPanelDisplay.style.display = 'block';
        openPanel = chooseButton;
        return openPanel;
    };
    if (openPanel !== choose) {
        if (choose === 'sectionNewTasks') {
            changeView(choose);
        }
        else if (choose === 'sectionDoneTasks') {
            changeView(choose);
        }
        else if (choose === 'sectionDeleteTasks') {
            changeView(choose);
        }
    } else {
        alert("Już masz otwarty ten panel!");
    }
};

showSectionNewTasks[0].addEventListener('click', showChoosePanel, false);
showSectionDoneTasks[0].addEventListener('click', showChoosePanel, false);
showSectionDeleteTasks[0].addEventListener('click', showChoosePanel, false);
showSectionNewTasks[1].addEventListener('click', showChoosePanel, false);
showSectionDoneTasks[1].addEventListener('click', showChoosePanel, false);
showSectionDeleteTasks[1].addEventListener('click', showChoosePanel, false);
showSectionNewTasks[2].addEventListener('click', showChoosePanel, false);
showSectionDoneTasks[2].addEventListener('click', showChoosePanel, false);
showSectionDeleteTasks[2].addEventListener('click', showChoosePanel, false);

//---------------------------------------------------------------------------------------------------------------
const wyswietlSzczegolyLubEdytuj = (e) => { //wyświetla panel ze szczegółami o wybranym zadaniu lub panel o edycji wybranego zadania
    // flagbutton="moreInfo" || flagbutton="editInfo" || flagbutton="buttonEditInfoInMoreInfo" || flagbutton="showMoreInfoInEditInfo"
    let flagButton = null;
    if (flagSubmitButton === null){
        if (flagaSaveEditTask === false ){
            flagButton = e.target.getAttribute('flagbutton');
        } else {
            flagButton = e.target.getAttribute('flagbutton');
            flagaSaveEditTask = false;
        }
    }
    else {
        flagButton = flagSubmitButton.getAttribute('flagbutton');
        flagSubmitButton = null;
    }

    if (selectTaskID !== null) {
        const x = document.getElementById(selectTaskID);
        searchChooseObjectInTable(x.id);
        if (flagButton === 'moreInfo') {
            moreInformationSection.style.display = 'block'; // =>
            editMoreInformationSection.style.display = 'none';
            sectionNewTasks[0].style.display = 'none';
            sectionDoneTasks[0].style.display = 'none';
            sectionDeleteTasks[0].style.display = 'none';
            document.getElementById('taskTitle').innerHTML = table[searchID][1]["name-task"];
            document.getElementById('timeAddTask').innerHTML = table[searchID][1]["time-create-task"];
            document.getElementById('timeCompleteTask').innerHTML = table[searchID][1]["time-end-task"];
            document.getElementById('taskStatus').innerHTML = table[searchID][1]["task-status"];
            document.getElementById('moreInfoAboutTask').innerHTML = table[searchID][1]["description"];
            document.getElementById('taskAutor').innerHTML = table[searchID][1]["autor"];
            document.getElementById('taskTel').innerHTML = table[searchID][1]["tel"];
            document.getElementById('taskLink').innerHTML = table[searchID][1]["www"];
            document.getElementById('taskMail').innerHTML = table[searchID][1]["mail"];
        }
        else if (flagButton === 'editInfo'){
            moreInformationSection.style.display = 'none';
            editMoreInformationSection.style.display = 'block'; // =>
            document.getElementById('showEdiTaskTitle').innerHTML = table[searchID][1]["name-task"];
            sectionNewTasks[0].style.display = 'none';
            sectionDoneTasks[0].style.display = 'none';
            sectionDeleteTasks[0].style.display = 'none';
        }
        else alert("Coś nie tak!");
    }else alert('Najpierw wybierz zadanie!');
};

buttonEditInformation.addEventListener('click', wyswietlSzczegolyLubEdytuj, false);

optionWhoShowPanelWithEditorSelectTask[0].addEventListener('click', wyswietlSzczegolyLubEdytuj, false);
optionWhoShowPanelWithMoreInformationAboutSelectTask[0].addEventListener('click', wyswietlSzczegolyLubEdytuj, false);
optionWhoShowPanelWithEditorSelectTask[1].addEventListener('click', wyswietlSzczegolyLubEdytuj, false);
optionWhoShowPanelWithMoreInformationAboutSelectTask[1].addEventListener('click', wyswietlSzczegolyLubEdytuj, false);
optionWhoShowPanelWithEditorSelectTask[2].addEventListener('click', wyswietlSzczegolyLubEdytuj, false);
optionWhoShowPanelWithMoreInformationAboutSelectTask[2].addEventListener('click', wyswietlSzczegolyLubEdytuj, false);

let flagSubmitButton = null;

const saveEditTask = (e) => {
    e.preventDefault();
    if (selectTaskID !== null) {
    const x = document.getElementById(selectTaskID);
    searchChooseObjectInTable(x.id);
        if (table[searchID][1]["name-task"] !== document.getElementById('editTaksTitle').value){
            table[searchID][1]["name-task"] = document.getElementById('editTaksTitle').value;
            document.getElementById(table[searchID][1]["task-id"]).innerHTML =   document.getElementById('editTaksTitle').value;
        }
        if (document.getElementById('editTimeAddTask').value !== ''){
            if (table[searchID][1]["time-create-task"] !== document.getElementById('editTimeAddTask').value) {
                table[searchID][1]["time-create-task"] = document.getElementById('editTimeAddTask').value;
            }
        }
        table[searchID][1]["time-end-task"] = document.getElementById('editTimeCompleteTask').value;
        table[searchID][1]["description"] = document.getElementById('editMoreInfoAboutTask').value;
        table[searchID][1]["autor"] = document.getElementById('editTaskAutor').value;
        table[searchID][1]["tel"] = document.getElementById('editTaskTel').value;
        table[searchID][1]["www"] = document.getElementById('editTaskLink').value;
        table[searchID][1]["mail"] = document.getElementById('editTaskMail').value;
        flagSubmitButton = e.target.children[16];
        wyswietlSzczegolyLubEdytuj();
        flagaSaveEditTask = true;
        return flagaSaveEditTask;
    } else alert("Najpierw wybierz zadanie");
};

formEditTask.addEventListener('submit', saveEditTask, false);

const exitShowMoreInformationAboutSelectTask = () => {
    moreInformationSection.style.display = 'none';
    const afterPanel = document.getElementsByClassName(openPanel);
    afterPanel[0].style.display = 'block';
};

buttonExitShowMoreInformation.addEventListener('click', exitShowMoreInformationAboutSelectTask, false);