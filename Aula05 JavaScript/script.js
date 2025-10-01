const app = document.getElementById("app");

const container = document.createElement("div");
container.classList.add("container");

const title = document.createElement("h2");
title.textContent = "Total";

let totalCount = 0;
const totalDisplay = document.createElement("div");
totalDisplay.classList.add("total");
totalDisplay.textContent = totalCount;

const row = document.createElement("div");
row.classList.add("row");

function createPerson(label, imgSrc) {
    let count = 0;

    const personDiv = document.createElement("div");
    personDiv.classList.add("person");

    const img = document.createElement("img");
    img.src = imgSrc;

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.classList.add("add");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "-";
    removeBtn.classList.add("remove");

    const counter = document.createElement("div");
    counter.classList.add("counter");
    counter.textContent = count;

    addBtn.onclick = () => {
        count++;
        totalCount++;
        counter.textContent = count;
        totalDisplay.textContent = totalCount;
    };

    removeBtn.onclick = () => {
        if (count > 0) {
            count--;
            totalCount--;
            counter.textContent = count;
            totalDisplay.textContent = totalCount;
        }
    };

    buttons.appendChild(removeBtn);
    buttons.appendChild(addBtn);

    const labelDiv = document.createElement("div");
    labelDiv.textContent = label;

    personDiv.appendChild(img);
    personDiv.appendChild(buttons);
    personDiv.appendChild(labelDiv);
    personDiv.appendChild(counter);

    return personDiv;
}

row.appendChild(createPerson("Homens", "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"));
row.appendChild(createPerson("Mulheres", "https://cdn-icons-png.flaticon.com/512/3135/3135789.png"));

container.appendChild(title);
container.appendChild(totalDisplay);
container.appendChild(row);
app.appendChild(container);