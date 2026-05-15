async function initViewResult() {

    const page = document.getElementById("view-result-page");

    page.innerHTML = "";

    const container = document.createElement("div");
    container.className = "view-result-div";

    const title = document.createElement("h2");
    title.innerHTML = "Resultatliste";

    container.appendChild(title);
    page.appendChild(container);

    promptEventSelection();

    filterEvents();

    await createResultTable();

}

async function createResultTable() {

    const results = await fetchResultsForEvent(selectedEventId);
    const registratedDistance = await fetchDistanceForRegistration(selectedEventId);

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

    results.forEach(result => {

        const row = document.createElement("tr");
        row.className = "result-row";

        const dateCell = document.createElement("td");
        dateCell.innerHTML = formatDate(result.date);

        const userCell = document.createElement("td");
        userCell.innerHTML = result.firstName + " " + result.lastName;

        const timeCell = document.createElement("td");
        timeCell.innerHTML = result.time;

        const paceCell = document.createElement("td");
        const pace = resultService.calculatePace(result.time, registratedDistance.distance);
        paceCell.innerHTML = pace;

        row.append(dateCell, userCell, timeCell, paceCell);

        resultTable.appendChild(row);

    });

    document.getElementById("view-result-page").appendChild(resultTable);

}

async function fetchResultsForEvent(eventId) {
    try {
        const response = await fetch(`/api/registrations/event/${eventId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch results: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching results:", error);
        return [];
    }
}

async function fetchDistanceForRegistration(eventId) {
    try {
        const response = await fetch(`/api/events/${eventId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch event: ${response.status}`);
        }

        const event = await response.json();

        // assuming your Event model has a field like "distance"
        return event;
    } catch (error) {
        console.error("Error fetching event distance:", error);
        return { distance: 0 };
    }
}


