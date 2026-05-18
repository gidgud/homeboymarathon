function initEventCreatePage() {
	const container = document.getElementById('event-create-page');

	container.innerHTML = `
  <div class="create-page-wrapper">

    <!-- Form box -->
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
        <div id="create-error" class="error-msg hidden"></div>
        <button type="submit" id="create-btn">Opret</button>
      </form>
    </div>

    <!-- Image side box -->
    <div class="image-side-box">
      <label>Billede</label>
      <div class="image-upload-box" id="image-upload-box">
        <div class="image-placeholder" id="image-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>Klik for at uploade billede</span>
        </div>
        <img id="image-preview" class="image-preview hidden" alt="Preview" />
        <button type="button" class="image-remove hidden" id="image-remove">✕</button>
      </div>
      <input type="file" id="event-image" accept="image/*" class="image-file-input" />
    </div>


  </div>
  `;

	document.getElementById('create-event-form').addEventListener('submit', handleCreateEvent);

	const box = document.getElementById('image-upload-box');
	const fileInput = document.getElementById('event-image');
	const preview = document.getElementById('image-preview');
	const placeholder = document.getElementById('image-placeholder');
	const removeBtn = document.getElementById('image-remove');

	box.addEventListener('click', () => fileInput.click());

	fileInput.addEventListener('change', (e) => {
		const file = e.target.files[0];
		if (!file) return;
		const url = URL.createObjectURL(file);
		preview.src = url;
		preview.classList.remove('hidden');
		placeholder.classList.add('hidden');
		removeBtn.classList.remove('hidden');
	});

	removeBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		preview.src = '';
		preview.classList.add('hidden');
		placeholder.classList.remove('hidden');
		removeBtn.classList.add('hidden');
		fileInput.value = '';
	});

}


async function handleCreateEvent(e) {
	e.preventDefault();
	const errorDiv = document.getElementById('create-error');
	errorDiv.classList.add('hidden');

	const fileInput = document.getElementById('event-image');
	const file = fileInput.files[0];
	let imagePath = '';

	// Upload image first if one was selected
	if (file) {
		const formData = new FormData();
		formData.append('file', file);

		const imgRes = await fetch('/api/events/upload-image', {
			method: 'POST',
			body: formData,   // no Content-Type header — browser sets it with boundary
		});

		if (!imgRes.ok) {
			showCreateError('Billedet kunne ikke uploades.');
			return;
		}

		const imgData = await imgRes.json();
		imagePath = imgData.imagePath;
	}

	const payload = {
		name: document.getElementById('event-name').value.trim(),
		date: document.getElementById('event-date').value,
		address: document.getElementById('event-address').value.trim(),
		imagePath: imagePath,
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
