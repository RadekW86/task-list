{
    const tasksTable = [{
        content: "ABC",
        done: true,
    }];

    const render = () => {
        let htmlString = "";
        for (const i of tasksTable) {
            htmlString += `
            <li${i.done ? " class = \"outputSection__list--done\"" : ""}>
            ${i.content}
            </li>
            `;
        };
        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const monitorFormActions = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formInput = document.querySelector(".js-formInput").value.trim();
            if (formInput === "") { return; };
            tasksTable.unshift({ content: formInput, });
            render();
        });       
    };




    
    const init = () => {
        render();
        monitorFormActions();
    }

    init();
}