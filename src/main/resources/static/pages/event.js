
function initEventPage() {

    const page = document.getElementById("event-page");

    page.innerHTML = `
    
    <h2>Events</h2>
    
        <table>
    <thead>
    
    <tr>
        <td>Dato</td>
        <td>Adresse</td>
        <td>Rute</td>
    </tr>
    
    </thead>
    
    <tbody id="event-body"></tbody>
    
</table>
    
    `

    fetchEvents()

}



function renderEvents(eventArray) {

    let tableBody = document.querySelector("#event-body")
    tableBody.innerHTML = "";

    eventArray.forEach(event => {

            let row = document.createElement("tr");

            row.innerHTML = `

      <td>${event.date}</td>
      <td>${event.address}</td>
      <td><img src="${event.route}"></td>

      `;

            tableBody.appendChild(row);

        }

    )


}

async function fetchEvents() {

    let eventResponse = await fetch("http://localhost:8080/api/events");
    let eventData = await eventResponse.json();
    renderEvents(eventData);
    return eventData;

}



