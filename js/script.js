{
    let tasksTable = [];

    const addNewTask = (formInput) => {
        tasksTable = [{ content: formInput }, ...tasksTable];
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
        tasksTable = [
            ...tasksTable.slice(0, taskIndex),
            { ...tasksTable[taskIndex], done: !tasksTable[taskIndex].done, },
            ...tasksTable.slice(taskIndex + 1),
        ]
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
        tasksTable = [
            ...tasksTable.slice(0, taskIndex),
            ...tasksTable.slice(taskIndex + 1),
        ]
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

    const markAllDone = () => {
        tasksTable = tasksTable.map(
            (task) => ({ ...task, done: true })
        )
        init();
    };

    let hideDone = false;

    const toggleHideDone = () => {
        hideDone = !hideDone;
        init();
    };

    const bindButtonsEvents = () => {
        const toggleHideDoneElement = document.querySelector(".js-toggleHideDone");
        if (toggleHideDoneElement) {
            toggleHideDoneElement.addEventListener("click", toggleHideDone);
        }

        const markAllDoneElement = document.querySelector(".js-markAllDone")
        if (markAllDoneElement) {
            markAllDoneElement.addEventListener("click", markAllDone);
        }
    }

    const generateButtons = () => {
        const buttonElement = document.querySelector(".js-buttons");
        buttonElement.innerHTML = `
        <button class="section__button js-toggleHideDone">
        ${hideDone ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__button js-markAllDone"
        ${tasksTable.every(({ done }) => done) ? " disabled" : ""} 
        >
        Ukończ wszystkie
        </button>
        `
    }

    const renderButtons = () => {
        const buttonElement = document.querySelector(".js-buttons");
        (!tasksTable.length) ? buttonElement.innerHTML = "" : generateButtons();
    };

    const renderTasks = () => {
        const addTaskToHtml = (i) => `
            <li class = "list__item ${(i.done && hideDone) ? "list__item--hidden" : ""}">
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
        const taskElement = document.querySelector(".js-tasksList");
        taskElement.innerHTML = tasksTable.map(addTaskToHtml).join("");
    };

    const init = () => {
        renderTasks();
        renderButtons();
        bindSubmitEvent();
        bindToggleEvents();
        bindRemoveEvents();
        bindButtonsEvents();
        document.querySelector(".js-formInput").value = "";
        document.querySelector(".js-formInput").focus();
    };

    init();
}