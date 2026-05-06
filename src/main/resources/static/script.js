function showPage(name) {

	document.querySelectorAll('.page').forEach(a => a.classList.add('hidden'));
	document.getElementById(name).classList.remove('hidden');

}
