// Шаблон задачи
const taskTemplate = `
      <li class="list-group-item">
        %TASK_TEXT%
        <div class="list-group__actions">
          <input type="checkbox" aria-label="...">
          <button type="submit" class="btn btn-default">Delete</button>
        </div>
      </li>`;

var taskCreator = document.querySelector(".navbar-form--create-task-form");
var taskList = document.querySelector(".list-group");

//Загрузить данные из localStorage
const load = () => {

}

//Сохранить данные в localStorage
const save = () => {

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

  //Создаём ДОМ элемент из шаблона
  var template = taskTemplate;
  template = template.replace( "%TASK_TEXT%", inputValue );

  //div нужен для того, чтобы не добавлять класс к li (использовать innerHTML)
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = template;
  var element = tempDiv.querySelector("li");

  taskList.appendChild(element);

  save();

  //Прослушиватель для кнопки удаления задачи
  var deleteBtn = element.querySelector(".btn");
  //Функция нужна для того, чтобы потом у неё удалить прослушиватель
  const deleteBtnClickHandler = (event) => {
    event.preventDefault();

    taskList.removeChild(element);
    deleteBtn.removeEventListener("click", deleteBtnClickHandler);
    save();
  }

  deleteBtn.addEventListener("click", deleteBtnClickHandler);
});

load();
