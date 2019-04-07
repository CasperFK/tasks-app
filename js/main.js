const listNewTasks = document.getElementById('listTasks'); //secja do zrobienia
const listDoneTasks = document.getElementById('doneTasks'); //sekcja ukończone
const listDeleteTasks = document.getElementById('deleteTasks'); // sekcja usunięte
const buttonAddNewTask = document.getElementById('listenClickNewTask1'); // buton dodaj nowe zadanie
const moreInformationSection = document.querySelector('.moreInformation'); // sekcja moreInformation (panel który wyświetla informacje wybranego zadania)
const editMoreInformationSection = document.querySelector('.editMoreInformation');  // sekcja editMoreInformation (panel który wyświetla formularz do edycji wybranego zadania)
const buttonEditInformation = document.querySelector('#editTask'); // button do edycji bieżacego zadania
const formEditTask = document.querySelector('#moreInformationTask'); // formularz edycji szczegółowych informacji o zadaniu
const optionWhoShowPanelWithMoreInformationAboutSelectTask = document.querySelector('.showMoreInformationAboutThisTask');
const optionWhoShowPanelWithEditorSelectTask = document.querySelector('.showPanelWhoEditThisTask');
const showSectionNewTasks = document.getElementsByClassName('chooseOptionSectionNew');
const showSectionDoneTasks = document.getElementsByClassName('chooseOptionSectionDone');
const showSectionDeleteTasks = document.getElementsByClassName('chooseOptionSectionDelete');

let selectTask = null; //wybrne bieżace zadanie
let selectTaskID = null; //bieżace id zadania
let table = null; // tablica zadań

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

// sectionNewTasks || sectionDoneTasks || sectionDeleteTasks
const showChoosePanel = (e) => {
    const choose = e.target.getAttribute('typepanel');
    console.log(choose);
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
const wyswietlSzczegolyLubEdytuj = () => { //wyświetla panel ze szczegółami o wybranym zadaniu lub panel o edycji wybranego zadania
    if (moreInformationSection.style.display === 'none') {
        moreInformationSection.style.display = 'block';
        editMoreInformationSection.style.display = 'none';
    }
    else {
        moreInformationSection.style.display = 'none';
        editMoreInformationSection.style.display = 'block';
    }
};

buttonEditInformation.addEventListener('click', wyswietlSzczegolyLubEdytuj, false);

const saveEditTask = (e) => {
    e.preventDefault();
    wyswietlSzczegolyLubEdytuj();
};

formEditTask.addEventListener('submit', saveEditTask, false);



