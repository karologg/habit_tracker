const date = new Date();
const currentMonth = date.getMonth();
const currentDate = date.getDate();
const currentYear = date.getFullYear();

const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const daysInTheMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const monthName = months[currentMonth];
const title = document.getElementById("title");
title.innerHTML = `<img class="month-icon" src="assets/ppp.png"></img>${monthName}<img class="month-icon" src="assets/ppp.png"></img>`;

const daysInThisMonth = daysInTheMonth[currentMonth];

let daysCompleted = 0;
const totalDays = document.getElementById("total-days");
const tracker = document.getElementById("tracker");
const dayElements = tracker.querySelectorAll(".day");

for (let i = 0; i < dayElements.length; i++) {
    const dayNum = i + 1;
    const dayEl = dayElements[i];
    var context = document.getElementById("contexto");
    var defaultContext = document.getElementById("default");

    const tempString = `${dayNum}/${currentMonth + 1}/${currentYear}`;

    let tempDay = localStorage.getItem(tempString);

    if (dayNum <= daysInThisMonth) {
        dayEl.textContent = dayNum;
        dayEl.setAttribute("id", `day${dayNum}`);

    if (tempDay === "true") {
        dayEl.classList.add("day-completed");
        daysCompleted++;
    } else if (dayNum < currentDate) {
        dayEl.classList.add("day-disabled");
    }

        if (dayNum === currentDate) {
            dayEl.classList.add("day-current");
            dayEl.classList.remove("day-disabled");
        }

        dayEl.addEventListener("click", function () {
            if (dayNum > currentDate) return;

            if (dayEl.classList.contains("day-completed")) {
                dayEl.classList.remove("day-completed");
                dayEl.classList.add("day-disabled");
                localStorage.setItem(tempString, "false");
                daysCompleted = Math.max(0, daysCompleted - 1);
            } else {
                tempDay = "true";
                dayEl.classList.remove("day-disabled");
                dayEl.classList.add("day-completed");
                localStorage.setItem(tempString, "true");
                daysCompleted += 1;
            }
            totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;

            if (daysCompleted === currentDate) {
            context.textContent = "frequência perfeita!";
                defaultContext.textContent = "";
            } else if ((daysCompleted >= (currentDate / 2) && daysCompleted < currentDate) || (freq >= (currentDate / 2) && freq < currentDate)) {
                context.textContent = "está indo bem!"
                defaultContext.textContent = "";
            } else {
                context.textContent = " ";
                defaultContext.textContent = "acompanhe sua frequência:";
            }
        });
    } else {
        dayEl.style.visibility = "hidden";
    }

    
}
totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;
const freq = localStorage.setItem("frequency", daysCompleted);

const habitName = document.getElementById("habit-title");
habitName.onclick = function () {
    const habits = prompt("digite o seu hábito:", habitName.innerHTML);
    if (!habits || habits.trim().length === 0) {
        habitName.innerHTML = "clique para adicionar";
    } else {
        habitName.innerHTML = habits.trim();
    }
    localStorage.setItem("habitName", habitName.innerHTML);
};



const hojeEl = document.getElementById("current-date");
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const hojeFormatado = date.toLocaleDateString('pt-BR', options);
hojeEl.innerHTML = hojeFormatado;
console.log("data atual: " + hojeFormatado);


const resetButton = document.getElementById("reset-button");
resetButton.onclick = function() {
    if (confirm("esta ação apagará o progresso do navegador")) {
        localStorage.clear();
        location.reload();
    }
}

const habitSalvo = localStorage.getItem("habitName");
if (habitSalvo) habitName.innerHTML = habitSalvo;
