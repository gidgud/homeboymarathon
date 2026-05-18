function initAddResult() {

    const page = document.getElementById("add-result-page");
    page.innerHTML = "";

    const container = document.createElement("div");
    container.className = "add-result-div";

    const title = document.createElement("h2");
    title.innerHTML = "Tilføj resultat";

    const miniTitle1 = document.createElement("h4");
    miniTitle1.innerHTML = "Deltager";

    const userDropdown = document.createElement("input");
    userDropdown.type = "text";
    userDropdown.id = "user-dropdown";
    userDropdown.placeholder = "Vælg deltager";
    userDropdown.addEventListener("keyup", filterUser);

    const userList = document.createElement("ul");
    userList.id = "user-list";

    const miniTitle2 = document.createElement("h4");
    miniTitle2.innerHTML = "Tid";

    const raceTime = document.createElement("input");
    raceTime.type = "text";
    raceTime.placeholder = "HH:MM:SS";
    raceTime.id = "race-time";

    const submitBtn = document.createElement("button");
    submitBtn.innerText = "Opret resultat";

    submitBtn.addEventListener("click", async () => {

        console.log("CLICKED");

        if (!selectedEventId || !selectedUserId) {
            alert("Vælg event og deltager først");
            return;
        }

        const timeValue = document.getElementById("race-time").value;

        if (!timeValue) {
            alert("Indtast tid");
            return;
        }

        const resultData = {
            eventId: selectedEventId,
            userId: selectedUserId,
            time: timeToSeconds(timeValue)
        };

        try {
            const response = await fetch("/api/results", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resultData)
            });

            const text = await response.text();

            if (!response.ok) {
                console.error(text);
                alert("Fejl ved oprettelse");
                return;
            }

            alert("Resultat oprettet!");

        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

    container.appendChild(title);

    promptEventSelection(container);

    container.append(
        miniTitle1,
        userDropdown,
        userList,
        miniTitle2,
        raceTime,
        submitBtn
    );

    page.appendChild(container);
}

function promptEventSelection(container) {

    const eventInput = document.createElement("input");
    eventInput.type = "text";
    eventInput.placeholder = "Indtast dato";
    eventInput.id = "event-dropdown";

    const eventList = document.createElement("ul");
    eventList.id = "event-list";

    container.append(eventInput, eventList);

    eventInput.addEventListener("keyup", filterEvents);
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

            li.addEventListener("click", async() => {

                searchInput.value = li.textContent;

                selectedEventId = event.id;

                eventList.innerHTML = "";

                const container = document.querySelector(".view-result-div, .add-result-div");

                if (container) {
                    await createResultTable(container);
                }

            });

            eventList.appendChild(li);
        });

    } catch (error) {

        console.error("Grrr nu virker det ikke igen", error);
    }
}

function timeToSeconds(time) {
    const [h, m, s] = time.split(":").map(Number);
    return (h * 3600) + (m * 60) + s;
}