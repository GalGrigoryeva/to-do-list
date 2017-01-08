// Шаблон задачи
const taskTemplate = `
      <li class="list-group-item">
        <span class="task-text">%TASK_TEXT%</span>
        <div class="list-group__actions">
          <input type="checkbox" aria-label="...">
          <button type="submit" class="btn btn-default">Delete</button>
        </div>
      </li>`;

var taskCreator = document.querySelector(".navbar-form--create-task-form");
var taskList = document.querySelector(".list-group");

const addTaskDOMElement = (description, completed) => {
  //Создаём ДОМ элемент из шаблона
  var template = taskTemplate;
  template = template.replace("%TASK_TEXT%", description);

  //div нужен для того, чтобы не добавлять класс к li (использовать innerHTML)
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  var element = tempDiv.querySelector("li");
  element.querySelector("input").checked = completed;

  taskList.appendChild(element);

  var checkbox = element.querySelector("input");

  //Прослушиватель для кнопки удаления задачи
  var deleteBtn = element.querySelector(".btn");

  //Функция нужна для того, чтобы потом у неё удалить прослушиватели
  const deleteBtnClickHandler = (event) => {
    event.preventDefault();

    taskList.removeChild(element);

    deleteBtn.removeEventListener("click", deleteBtnClickHandler);
    checkbox.removeEventListener("change", checkboxChangeHandler);

    save();
  }

  deleteBtn.addEventListener("click", deleteBtnClickHandler);

  const checkboxChangeHandler = (event) => {
    save();
  }

  checkbox.addEventListener("change", checkboxChangeHandler);
}

//Загрузить данные из localStorage
const load = () => {
  var dataArrString = localStorage.getItem("data");

  if (dataArrString) {
    dataArr = JSON.parse(dataArrString);
    dataArr.forEach((taskData) => {
      addTaskDOMElement(taskData.description, taskData.completed);
    });
  }
}

//Сохранить данные в localStorage
const save = () => {
  var dataArr = [];

  var taskElementsArr = document.querySelectorAll("li");
  taskElementsArr.forEach((taskElement) => {
    var description = taskElement.querySelector(".task-text").innerHTML;
    var completed = taskElement.querySelector("input").checked;
    var taskData = {
      "description": description,
      "completed": completed
    };
    dataArr.push(taskData);
  });

  var dataArrString = JSON.stringify(dataArr);

  localStorage.setItem("data", dataArrString);
}

// Прослушиватель формы добавления задачи
taskCreator.addEventListener("submit", (event) => {
  event.preventDefault();

  var input = document.querySelector(".form-control");
  var inputValue = input.value;

  if (inputValue === "") {
    return;
  }

  input.value = "";

  addTaskDOMElement(inputValue, false);

  save();
});

load();
