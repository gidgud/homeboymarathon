function initEventPage() {

	//Opretter en konstant, så siden kan renderes i script.js.

	const page = document.getElementById("event-page");

	//Definerer den del af siden, der skal renderes, når scriptet bliver kaldt i script.js.

	//Dropdown menu til filtrering efter kommende og tidligere events.

	page.innerHTML = `
    	    
        <div>
        
        <select class="date-filter" id="date-filter" onchange="filterEventsEventPage()">
        
        <option value="upcoming">Kommende events</option>
        <option value="past">Tidligere events</option>
        <option value="all">Alle events</option>
        
        </select>
        
        </div>
        
        <div id="event-grid" class="event-grid">
                         
        </div>
    
    
    `

	//Kører filterEventsEventPage for at få et filtreret array af events afhængigt at brugerens valg i dropdown menuen.
	filterEventsEventPage();

}

async function renderEvents(eventArray) {
	const user = JSON.parse(localStorage.getItem("loggedInUser"));
	const isLoggedIn = !!user;
	const dateNow = new Date();

	// Only fetch registrations if logged in
	const registeredEventIds = isLoggedIn
		? await fetch(`http://localhost:8080/api/registrations/user/${user.id}`)
			.then(r => r.json())
			.then(regs => regs.map(r => r.eventId))
		: [];

	const grid = document.querySelector("#event-grid");
	grid.innerHTML = "";

	eventArray.forEach(event => {
		const isRegistered = registeredEventIds.includes(event.id);
		const isPastEvent = new Date(event.date) < dateNow;

		const card = document.createElement("div");
		card.classList.add("event-card");

		const formattedDate = new Date(event.date).toLocaleString("da-DK", {
			day: "numeric", month: "long", year: "numeric",
			hour: "2-digit", minute: "2-digit"
		});

		card.innerHTML = `
            <div class="image-container">
                <img src="${event.imagePath}" class="event-image" alt="løberute">
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
                            ${isPastEvent ? "" : `
                                ${isRegistered ? "" : `
                                    <select class="race-type-drop-down" id="raceType-${event.id}">
                                        <option value="undefined">Vælg distance</option>
                                        <option value="marathon">Marathon - 50 kr.</option>
                                        <option value="half-marathon">Halv Marathon - 30 kr.</option>
                                    </select>
                                `}
                                <button 
                                    class="${isRegistered ? "registered-button" : "sign-up-button"}"
                                    id="sign-up-button-${event.id}"
                                    ${!isLoggedIn ? 'disabled title="Log ind for at tilmelde dig"' : ''}
                                >
                                    ${isRegistered ? "Tilmeldt" : "Tilmeld"}
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;

		const signUpButton = card.querySelector(".sign-up-button");
		if (signUpButton) {
			signUpButton.addEventListener("click", () => registerForEvent(event.id));
		}

		grid.appendChild(card);
	});
}
//Script til at rendere events på siden.
/*async function renderEvents(eventArray) {

	//Definerer user, så man kan finde userId for brugeren, der er logget ind.
	const user = JSON.parse(localStorage.getItem("loggedInUser"));
	const dateNow = new Date();

	//Henter en liste af alle registrations for den bruger, der er logget ind.
	const userRegistrations = await fetch(`http://localhost:8080/api/registrations/user/${user.id}`)
		.then(r => r.json());

	//Opretter en liste bestående af event ids til alle brugerens registrations.
	const registeredEventIds = userRegistrations.map(r => r.eventId);

	//Opretter grid som er den dynamiske del af siden, der skal renderes.
	const grid = document.querySelector("#event-grid");

	grid.innerHTML = "";

	//Den løber igennem et array af events for at rendere dem.
	eventArray.forEach(event => {

		//Kontrollerer om brugeren allerede er tilmeldt hvert event.
		const isRegistered = registeredEventIds.includes(event.id);
		const isPastEvent = new Date(event.date) < dateNow;

		//Opretter en div til hvert event.
		const card = document.createElement("div");
		card.classList.add("event-card");

		//Formaterer date.
		const formattedDate = new Date(event.date).toLocaleString("da-DK", {

			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"

		})

		//Definerer hvad hver event div skal indeholde
		card.innerHTML = `

	    <div class="image-container">
	    
		<img src="${event.imagePath}" class="event-image" alt="løberute">
	        
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
	        
		${isPastEvent ? "" : `
		${isRegistered ? "" : `
		<select class="race-type-drop-down" id="raceType-${event.id}">
	        
		<option value="undefined" >Vælg distance</option>
		<option value="marathon">Marathon - 50 kr.</option>
		<option value="half-marathon">Halv Marathon - 30 kr.</option>
	        
		</select>
		`}
	        
	        
		<button class="${isRegistered ? "registered-button" : "sign-up-button"}"  id="sign-up-button-${event.id}"  
		>
		${isRegistered ? "Tilmeldt" : "Tilmeld"}
		</button>
	        
		`}
	        
		</div>
	        
		</div>
	        
		</div>
	        
	    </div>    
    
	    `;

		const signUpButton = card.querySelector(".sign-up-button");

		if (signUpButton) {
			signUpButton.addEventListener("click", () => {
				registerForEvent(event.id);
			})
		}

		//Tilføjer event div til grid
		grid.appendChild(card);

	}
	)


}
*/

//Henter events med fetch fra backend gennem end point. Man renderer herefter den hentede data.
async function fetchEvents() {

	const eventResponse = await fetch("http://localhost:8080/api/events");
	return await eventResponse.json();

}

//Script til at filtrere events efter tidspunkt
async function filterEventsEventPage() {

	const dateFilter = document.getElementById("date-filter").value;
	const dateNow = new Date();

	fetchEvents().then(events => {

		//Sorterer forskelligt afhængigt af om det er kommende el. tidligere event.
		const filteredDates = events.filter(event => {

			const eventDate = new Date(event.date);
			if (dateFilter === "upcoming") return eventDate >= dateNow;
			if (dateFilter === "past") return eventDate < dateNow;
			return true;


		}).sort((a, b) => {

			if (dateFilter === "past") {
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

	if (raceType === "undefined") {
		alert("Vælg en distance");
		return;
	}

	const price = raceType === "marathon" ? 50 : 30;
	const distance = raceType === "marathon" ? 42 : 21;

	// First POST the registration to get a registrationId back
	fetch("http://localhost:8080/api/registrations", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			userId: userId,
			eventId: eventId,
			price: price,
			distance: distance
		})
	})
		.then(response => response.json())
		.then(registration => {

			// Then redirect to payment page with the new registrationId
			showPage('payment-page');
			showPaymentForm(registration.id, price);

		});
}


//Script til at registere bruger til event.
/*function registerForEvent(eventId) {

    //Finder userId fra localStorage.
    const savedUserId = localStorage.getItem("loggedInUser");
    const user = JSON.parse(savedUserId);
    const userId = user.id;

    //Finder raceType ud fra valg i dropdown menu.
    const raceType = document.getElementById(`raceType-${eventId}`).value;

    //Sikrer at brugeren vælger en mulighed.
    if (raceType === "undefined") {
	alert("Vælg en distance");
	return;

    }

    //Definerer variable afhængigt af valg i dropdown.
    const price = raceType === "marathon" ? 50 : 30;
    const distance = raceType === "marathon" ? 42 : 21;

    //Kalder POST-metode til at tilføje til databasen.
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
	.then(() => {

	    //Fjerne dropdown og disabler button ved tilmelding.

	    const dropdown = document.getElementById(`raceType-${eventId}`);
	    dropdown.remove();

	    const button = document.getElementById(`sign-up-button-${eventId}`);
	    button.innerText = "Tilmeldt";
	    button.style.pointerEvents = "none";
	    button.classList.remove("sign-up-button")
	    button.classList.add("registered-button")

	})

}*/
