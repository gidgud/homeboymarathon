function showPage(name) {

	document.querySelectorAll('.page').forEach(a => a.classList.add('hidden'));
	document.getElementById(name).classList.remove('hidden');

	if (name === 'login-page') initLoginPage();
	if (name === 'create-page') initCreatePage();
	if (name === 'event-page') initEventPage();
	if (name === 'event-create-page') initEventCreatePage();

}
