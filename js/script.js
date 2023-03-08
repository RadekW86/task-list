{
    const tasksTable = [];

    const addNewTask = (formInput) => {
        tasksTable.unshift({ content: formInput });
    };

    const processInput = () => {
        const formInput = document.querySelector(".js-formInput").value.trim();
        if (formInput === "") { return; };
        addNewTask(formInput);
    };

    const bindSubmitEvent = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            processInput();
            init();
        });
    };

    const toggleCompletion = (taskIndex) => {
        tasksTable[taskIndex].done = !tasksTable[taskIndex].done;
    };

    const bindToggleEvents = () => {
        const doneButtons = document.querySelectorAll(".js-markDone");
        doneButtons.forEach((doneButton, taskIndex) => {
            doneButton.addEventListener("click", () => {
                toggleCompletion(taskIndex);
                init();
            });
        });
    };

    const removeTask = (taskIndex) => {
        tasksTable.splice(taskIndex, 1);
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
                init();
            });
        });
    };

    const render = () => {
        let htmlString = "";
        for (const i of tasksTable) {
            htmlString += `
            <li class = "list__item">
              <button class = "list__button list__button--doneBox js-markDone">
               ${i.done ? "✔️" : "&#160;"}
              </button>
              <div class = "list__content${i.done ? " list__content--done" : ""}">
               ${i.content}
              </div>
              <button class = "list__button list__button--remove js-remove">
               🗑️
              </button>
            </li>
            `;
        };
        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const init = () => {
        render();
        bindSubmitEvent();
        bindToggleEvents();
        bindRemoveEvents();
        document.querySelector(".js-formInput").value = "";
        document.querySelector(".js-formInput").focus();
    };

    init();
}