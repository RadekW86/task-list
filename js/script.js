{
    const tasksTable = [];

    const bindingEvents = () => {
        render();
        addNewTask();
        removeTask();
        markDone();
        document.querySelector(".js-formInput").focus();
    };

    const render = () => {
        let htmlString = "";
        for (const i of tasksTable) {
            htmlString += `
            <li class = "list__item">
              <button class = "list__button list__button--doneBox js-markDone">
              ${i.done ? "✔️" : "&#160;"}</button>
             <div class = "list__content${i.done ? " list__content--done" : ""}">${i.content}</div>
              <button class = "list__button list__button--remove js-remove">🗑️</button>
            </li>
            `;
        };
        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };


    const addNewTask = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formInput = document.querySelector(".js-formInput").value.trim();
            if (formInput === "") { return; };
            tasksTable.unshift({ content: formInput });
            bindingEvents();
            document.querySelector(".js-formInput").value = "";
        });
    };

    const removeTask = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                tasksTable.splice(index, 1);
                bindingEvents();
            });
        });
    };

    const markDone = () => {
        const doneButtons = document.querySelectorAll(".js-markDone");
        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                tasksTable[index].done = !tasksTable[index].done;
                bindingEvents();
            });
        });
    };

    const init = () => {
        bindingEvents();
    };

    init();
}