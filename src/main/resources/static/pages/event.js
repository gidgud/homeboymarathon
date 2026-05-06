

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

fetchEvents()

