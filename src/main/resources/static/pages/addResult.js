let selectedUserId = null;
let selectedEventId = null;

function initAddResult () {

    const page = document.getElementById("add-result-page");

    page.innerHTML = " ";

    const container = document.createElement("div");
    container.className = "add-result-div";

    const title = document.createElement("h2");
    title.innerHTML = "Tilføj resultat";

    promptEventSelection();

    const miniTitle1 = document.createElement("h4");
    miniTitle1.innerHTML = "Deltager";

    const userDropdown = document.createElement("input");
    userDropdown.type = "text";
    userDropdown.id = "user-dropdown";
    userDropdown.placeholder = "Vælg deltager";

    const userList = document.createElement("ul");
    userList.id = "user-list";

    userDropdown.addEventListener("keyup", filterUser)

    const miniTitle2 = document.createElement("h4");
    miniTitle2.innerHTML = "Tid"

    const raceTime = document.createElement("input");
    raceTime.type = "time";
    raceTime.step = "1";
    raceTime.placeholder = "HH:MM:SS";
    raceTime.id = "race-time";

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Opret resultat";
    submitBtn.id = "submit-btn";

    submitBtn.addEventListener("click", async() => {

        const timeValue = document.getElementById("race-time").value;

        const resultData = {
            eventId: selectedEventId,
            userId: selectedUserId,
            time: timeValue
        };

        try {

            const response = await fetch("/api/results", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(resultData)
            });

            if(response.ok) {

                alert("Resultatet er oprettet yay! B)");
            }

        } catch (error) {

            console.error("Det gik jo galt igen, øv", error);
        }
    });
    container.append(title, eventInput, eventList, miniTitle1, userDropdown, userList, miniTitle2, raceTime, submitBtn);
    page.appendChild(container);
}

function promptEventSelection() {

    const container = document.getElementById("view-result-page")
        || document.getElementById("add-result-page");

    const eventInput = document.createElement("input");
    eventInput.type = "text";
    eventInput.placeholder = "Indtast dato";
    eventInput.id = "event-dropdown";

    const eventList = document.createElement("ul");
    eventList.id = "event-list"

    container.append(eventInput, eventList);

    eventInput.addEventListener("keyup", filterEvents)

}

async function filterUser() {
    const searchInput = document.getElementById("user-dropdown");
    const userList = document.getElementById("user-list");
    const query = searchInput.value;

    try {
        const response = await fetch(`/api/users?search=${query}`);
        const users = await response.json();

        userList.innerHTML = " ";

        users.forEach(user => {
            const li = document.createElement("li");

            li.textContent = `${user.firstName} ${user.lastName}`;

            li.addEventListener("click", () => {

            searchInput.value = li.textContent;

            selectedUserId = user.id;

            userList.innerHTML = "";
            });

            userList.appendChild(li);
        });

    }catch (error) {

        console.error("Kan ikke finde deltagere ;_;", error);
    }
}

async function filterEvents(){
    const searchInput = document.getElementById("event-dropdown");
    const eventList = document.getElementById("event-list");
    const query = searchInput.value;

    try {

        const response = await fetch(`/api/events?search=${query}`);
        const events = await response.json();

        eventList.innerHTML = "";

        events.forEach(event => {

            const li = document.createElement("li");

            li.textContent = `${event.name} (${event.date})`;

            li.addEventListener("click", () => {

                searchInput.value = li.textContent;

                selectedEventId = event.id;

                eventList.innerHTML = "";

            });

            eventList.appendChild(li);
        });

    } catch (error) {

        console.error("Grrr nu virker det ikke igen", error);
    }
}