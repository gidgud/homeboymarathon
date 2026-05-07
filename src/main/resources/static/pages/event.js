
function initEventPage() {

    const page = document.getElementById("event-page");

    page.innerHTML = `
        
        <div id="event-grid" class="event-grid">
                         
        </div>
    
    
    `
    fetchEvents()

}



function renderEvents(eventArray) {

    let grid = document.querySelector("#event-grid")
    grid.innerHTML = "";

    eventArray.forEach(event => {

            let card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `

            <div class="image-container">
            
                <img src="${event.imagePath}" class="event-image">
                
                <div class="event-information">
                
                <span class="event-information-top">${event.name}</span>
                
                <div class="event-information-bottom">
                
                <span class="event-date">${event.date}</span>
                <span class="event-address">${event.address}</span>
                <button class="sign-up-button">Tilmeld</button>
                
                </div>
                
                </div>
                
            </div>    
    
            `;

            grid.appendChild(card);

        }

    )


}

async function fetchEvents() {

    let eventResponse = await fetch("http://localhost:8080/api/events");
    let eventData = await eventResponse.json();
    renderEvents(eventData);
    return eventData;

}




