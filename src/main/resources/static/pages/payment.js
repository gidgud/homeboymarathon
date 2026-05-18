function initPaymentPage() {
	const page = document.getElementById("payment-page");
	page.innerHTML = `
        <h2>Betal for tilmelding</h2>
        <form id="payment-form">
            <label>Registrering ID</label>
            <input type="number" id="payment-registration-id" required>

            <label>Kortholder navn</label>
            <input type="text" id="payment-card-holder" placeholder="Navn på kort" required>

            <label>Kortnummer</label>
            <input type="text" id="payment-card-number" placeholder="1234 5678 9012 3456" maxlength="19" required>

            <label>Udløbsdato</label>
            <input type="text" id="payment-expiry" placeholder="MM/ÅÅ" maxlength="5" required>

            <label>CVV</label>
            <input type="text" id="payment-cvv" placeholder="123" maxlength="4" required>

            <label>Beløb</label>
            <input type="number" id="payment-amount" placeholder="0.00" step="0.01" required>

            <label>Valuta</label>
            <select id="payment-currency">
                <option value="DKK">DKK</option>
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
            </select>

            <button type="submit">Betal nu</button>
            <p id="payment-error" style="color:red; display:none;"></p>
        </form>
    `;
	document.getElementById('payment-form').addEventListener('submit', handlePayment);
}

// Called after initPaymentPage, fills in the values
function showPaymentForm(registrationId, price) {
	document.getElementById('payment-registration-id').value = registrationId;
	document.getElementById('payment-amount').value = price;
}

async function handlePayment(e) {
	e.preventDefault();

	const page = document.getElementById('payment-page');
	const registrationId = document.getElementById('payment-registration-id').value;

	const paymentRequest = {
		cardHolder: document.getElementById('payment-card-holder').value,
		cardNumber: document.getElementById('payment-card-number').value.replace(/\s/g, ''),
		expiryDate: document.getElementById('payment-expiry').value,
		cvv: document.getElementById('payment-cvv').value,
		amount: parseFloat(document.getElementById('payment-amount').value),
		currency: document.getElementById('payment-currency').value,
	};

	page.innerHTML = `<p>Behandler betaling...</p>`;

	try {
		const response = await fetch(`/api/payments/run-registration/${registrationId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(paymentRequest),
		});

		const data = await response.json();

		if (response.ok) {
			page.innerHTML = `
        <h2>Betaling gennemført!</h2>
        <p>Din tilmelding er bekræftet.</p>
        <ul>
          <li><strong>Status:</strong> ${data.status}</li>
          <li><strong>Transaktions-ID:</strong> ${data.transactionId ?? 'N/A'}</li>
          <li><strong>Besked:</strong> ${data.message ?? ''}</li>
        </ul>
        <button onclick="showPage('front-page')">Tilbage til forsiden</button>
      `;
		} else {
			page.innerHTML = `
        <h2>Betaling mislykkedes</h2>
        <p>Status: ${data.status}</p>
        <p>${data.message ?? 'Prøv igen.'}</p>
        <button onclick="showPaymentForm()">Prøv igen</button>
      `;
		}
	} catch (error) {
		page.innerHTML = `
      <h2>Fejl</h2>
      <p>Noget gik galt: ${error.message}</p>
      <button onclick="showPaymentForm()">Prøv igen</button>
    `;
	}
}


