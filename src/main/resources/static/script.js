function showPage(name) {

	document.querySelectorAll('.page').forEach(a => a.classList.add('hidden'));
	document.getElementById(name).classList.remove('hidden');

	if(name === 'login-page') {
		initLoginPage();
	} else if (name === 'create-page') {
		initCreatePage();
	} else if (name === 'event-page') {
    initEventPage();
  }
}
