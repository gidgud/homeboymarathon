async function initViewResult() {

    const page = document.getElementById("view-result-page");
    page.innerHTML = "";

    const container = document.createElement("div");
    container.className = "view-result-div";

    const title = document.createElement("h2");
    title.innerHTML = "Resultatliste";


    container.appendChild(title);

    promptEventSelection(container);

    page.appendChild(container);
}


async function createResultTable(container) {

    if (!selectedEventId) return;

    const results = await fetchResultsForEvent(selectedEventId);
    console.log("Results in createResultTable:", results); // add this

    const old = document.getElementById("results-table");
    if (old) old.remove();

    const resultTable = document.createElement("table");
    resultTable.id = "results-table";

    const headerRow = document.createElement("tr");
    headerRow.className = "header-row";

    const headers = ["Dato", "Deltager", "Tid", "Pace"];

    headers.forEach(text => {
        const th = document.createElement("th");
        th.innerText = text;
        th.scope = "col";
        headerRow.appendChild(th);
    });

    resultTable.appendChild(headerRow);

    for (const result of results) {

        const row = document.createElement("tr");
        row.className = "result-row";

        const dateCell = document.createElement("td");
        dateCell.innerHTML = result.event.date;

        const userCell = document.createElement("td");
        userCell.innerHTML = result.user.firstName + " " + result.user.lastName;

        const timeCell = document.createElement("td");
        timeCell.innerHTML = parseDuration(result.time);

        const registration = await fetchRegistration(result.event.id, result.user.id);

        const paceCell = document.createElement("td");
        const pace = calculatePace(result.time, registration.distance);
        paceCell.innerHTML = pace;

        row.append(dateCell, userCell, timeCell, paceCell);
        resultTable.appendChild(row);

    }

    container.appendChild(resultTable);
}

async function fetchResultsForEvent(eventId) {
    try {
        const response = await fetch(`/api/results/event/${eventId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch results: ${response.status}`);
        }

        const data = await response.json();
        console.log("Results from API:", data); // add this
        return data;
    } catch (error) {
        console.error("Error fetching results:", error);
        return [];
    }
}

async function fetchRegistration(eventId, userId) {
    try {
        const response = await fetch(`/api/registrations/event/${eventId}/user/${userId}`);
        if (!response.ok) throw new Error(`Failed: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching registration:", error);
        return { distance: 0 };
    }
}

function calculatePace(isoTime, distance) {
    const match = isoTime.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const h = parseInt(match[1] || 0);
    const m = parseInt(match[2] || 0);
    const s = parseInt(match[3] || 0);
    const totalSeconds = h * 3600 + m * 60 + s;

    const paceInSeconds = totalSeconds / distance;
    const minutes = Math.floor(paceInSeconds / 60);
    const seconds = Math.floor(paceInSeconds % 60);

    return `${minutes}:${String(seconds).padStart(2, '0')} min/km`;
}

function parseDuration(isoTime) {
    const match = isoTime?.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "N/A";

    const h = parseInt(match[1] || 0);
    const m = parseInt(match[2] || 0);
    const s = parseInt(match[3] || 0);

    if (h > 0) {
        return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${m}:${String(s).padStart(2, '0')}`;
}


