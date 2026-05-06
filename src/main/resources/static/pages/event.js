
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

            let button = document.createElement("tr")
            button.innerHTML = `
            
            <td colspan="2">
            
            <button onclick="">Tilmeld</button>
            
            </td>
            
            `

            tableBody.appendChild(row);
            tableBody.appendChild(button)

        }

    )


}

async function fetchEvents() {

    let eventResponse = await fetch("http://localhost:8080/api/events");
    let eventData = await eventResponse.json();
    renderEvents(eventData);
    return eventData;

}

async function signUpForEvent() {



}



