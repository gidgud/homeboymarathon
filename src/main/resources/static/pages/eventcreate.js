function initEventCreatePage() {
	const container = document.getElementById('event-create-page');

	container.innerHTML = `
    <div class="create-container">
      <h1>Opret arrangement</h1>
      <form id="create-event-form">

        <div class="form-group">
          <label for="event-name">Navn</label>
          <input type="text" id="event-name" placeholder="Arrangementsnavn" required />
        </div>

        <div class="form-group">
          <label for="event-date">Dato og tidspunkt</label>
          <input type="datetime-local" id="event-date" required />
        </div>

        <div class="form-group">
          <label for="event-address">Adresse</label>
          <input type="text" id="event-address" placeholder="Vejnavn, by" required />
        </div>

        <div class="form-group">
          <label for="event-image">Billedsti</label>
          <input type="text" id="event-image" placeholder="/images/event.jpg" />
        </div>

        <div class="form-group">
          <label for="event-price">Pris (kr)</label>
          <input type="number" id="event-price" placeholder="0.00" min="0" step="0.01" required />
        </div>

        <div id="create-error" class="error-msg hidden"></div>

        <button type="submit" id="create-btn">Opret</button>
      </form>
    </div>
  `;

	document.getElementById('create-event-form').addEventListener('submit', handleCreateEvent);
}

async function handleCreateEvent(e) {
	e.preventDefault();

	const errorDiv = document.getElementById('create-error');
	errorDiv.classList.add('hidden');

	const payload = {
		name: document.getElementById('event-name').value.trim(),
		date: document.getElementById('event-date').value,
		address: document.getElementById('event-address').value.trim(),
		imagePath: document.getElementById('event-image').value.trim(),
		price: parseFloat(document.getElementById('event-price').value),
	};

	try {
		const res = await fetch('/api/events', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			const msg = await res.text();
			showCreateError(msg || 'Noget gik galt. Prøv igen.');
			return;
		}

		showPage('event-page');

	} catch (err) {
		showCreateError('Kunne ikke oprette arrangement');
		console.error(err);
	}
}

function showCreateError(msg) {
	const errorDiv = document.getElementById('create-error');
	errorDiv.textContent = msg;
	errorDiv.classList.remove('hidden');
}
