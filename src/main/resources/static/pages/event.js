function initEventPage() {

    const page = document.getElementById("event-page");

    page.innerHTML = `
        
        <div>
        
        <label></label>
        <select class="date-filter" id="date-filter" onchange="filterEvents()">
        
        <option value="upcoming">Kommende events</option>
        <option value="past">Tidligere events</option>
        <option value="all">Alle events</option>
        
        </select>
        
        </div>
        
        <div id="event-grid" class="event-grid">
                         
        </div>
    
    
    `
    filterEvents();

}


function renderEvents(eventArray) {

    let grid = document.querySelector("#event-grid")


    grid.innerHTML = "";

    eventArray.forEach(event => {

            let card = document.createElement("div");
            card.classList.add("event-card");

            const formattedDate = new Date(event.date.replace("T", " ")).toLocaleString("da-DK", {

                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"

            })

            card.innerHTML = `

            <div class="image-container">
            
                <img src="${event.imagePath}" class="event-image">
                
                <div class="event-information">
                
                <div class="event-information-top">
                
                <span class="event-information-name">${event.name}</span>
                
                </div>
                
                <div class="event-information-bottom">
                  
                <div class="event-information-bottom-left">
                
                <span class="event-date">Dato: ${formattedDate}</span>
                <span class="event-address">Adresse: ${event.address}</span>
                
                </div>
                
                <div class="event-information-bottom-right">
                
                <select class="race-type-drop-down" id="raceType-${event.id}">
                
                <option value="undefined" >Vælg distance</option>
                <option value="marathon">Marathon - 50 kr.</option>
                <option value="half-marathon">Halv Marathon - 30 kr.</option>
                
                </select>
                
                <button class="sign-up-button" onclick="registerForEvent(${event.id})">Tilmeld</button>
                
                </div>
                
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

function filterEvents() {

    const date = document.getElementById("date-filter").value;
    const dateNow = new Date();

    fetchEvents().then(events => {

        const filteredDates = events.filter(event => {

            const eventDate = new Date(event.date.replace("T", " "));
            if (date === "upcoming") return eventDate >= dateNow;
            if (date === "past") return eventDate < dateNow;
            return true;

        }).sort((a, b) => {

            if (date === "past") {
                return new Date(b.date) - new Date(a.date)
            }
            return new Date(a.date) - new Date(b.date)

        });

        renderEvents(filteredDates);

    });


}

function registerForEvent(eventId) {

    const savedUserId = localStorage.getItem("loggedInUser");
    const user = JSON.parse(savedUserId);
    const userId = user.id;

    const raceType = document.getElementById(`raceType-${eventId}`).value;

    if(raceType === "undefined") {
        alert("Vælg en distance");
        return;

    }

    const price = raceType === "marathon" ? 50 : 30;
    const distance = raceType === "marathon" ? 42 : 21;

    fetch("http://localhost:8080/api/registrations", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                userId: userId,
                eventId: eventId,
                price: price,
                distance: distance

        })
    })
        .then(response => response.json())

}
