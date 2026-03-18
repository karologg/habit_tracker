const date = new Date();
const currentMonth = date.getMonth();
const currentDate = date.getDate();
const currentYear = date.getFullYear();

const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const daysInTheMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const monthName = months[currentMonth];
const title = document.getElementById("title");
title.innerHTML = `<img class="month-icon" src="assets/ppp.png" alt="ícone"> ${monthName} <img class="month-icon" src="assets/ppp.png" alt="ícone">`;

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

    var tempString = "" + (i + 1) + "/" + (currentMonth + 1) + "/" + currentYear;;
    console.log("storing date: " + tempString);

    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);

    if (dayNum <= daysInThisMonth) {
        dayEl.textContent = dayNum;
        dayEl.classList.add("day-disabled");
        dayEl.setAttribute("id", `day-${dayNum}`);

        if (dayNum === currentDate) {
            dayEl.classList.add("day-current");
            dayEl.classList.remove("day-disabled");
        }

        dayEl.addEventListener("click", function () {
            if (dayNum > currentDate) {
                return;
            }

            if (dayEl.classList.contains("day-completed")) {
                dayEl.classList.remove("day-completed");
                dayEl.classList.add("day-disabled");
                tempDay = "false";
                localStorage.setItem(tempString, tempDay);
                daysCompleted = Math.max(0, daysCompleted - 1);
            } else {
                dayEl.classList.remove("day-disabled");
                dayEl.classList.add("day-completed");
                tempDay = "true";
                localStorage.setItem(tempString, tempDay);
                daysCompleted += 1;
            }

            totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;
            if (daysCompleted === currentDate) {
                context.textContent = "frequência perfeita!";
                defaultContext.textContent = "";
            } else {
                context.textContent = " ";
                defaultContext.textContent = "frequência mensal";
            }
        });
    } else {
        dayEl.style.visibility = "hidden";
    }
}
totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;

const habitName = document.getElementById("habit-title");
habitName.onclick = function () {
    const habits = prompt("digite o seu hábito:", habitName.innerHTML);
    if (!habits || habits.trim().length === 0) {
        habitName.innerHTML = "clique para adicionar";
    } else {
        habitName.innerHTML = habits.trim();
    }
};



const hojeEl = document.getElementById("current-date");
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const hojeFormatado = date.toLocaleDateString('pt-BR', options);
hojeEl.innerHTML = hojeFormatado;
console.log("data atual: " + hojeFormatado);


const resetButton = document.getElementById("reset-button");
resetButton.onclick = function() {
    if (confirm("tem certeza que desejas resetar o progresso?")) {
        daysCompleted = 0;
        totalDays.innerHTML = `${daysCompleted}/${daysInThisMonth}`;
        dayElements.forEach(dayEl => {
            if (dayEl.classList.contains("day-completed")) {
                dayEl.classList.remove("day-completed");
                dayEl.classList.add("day-disabled");
            }
        });
        habitName.innerHTML = "(clique para adicionar)";
    }
}

/*para os dados*/
