let currentUser = null;

document.querySelectorAll('nav button[data-role]').forEach(btn => {
	btn.style.display = 'none';
});

updateNav();

function showPage(name) {

	document.querySelectorAll('.page').forEach(a => a.classList.add('hidden'));
	document.getElementById(name).classList.remove('hidden');

	if (name === 'login-page') initLoginPage();
	if (name === 'create-page') initCreatePage();
	if (name === 'event-page') initEventPage();
	if (name === 'event-create-page') initEventCreatePage();
	if (name === 'edit-user-page') initEditUser();
	if (name === 'payment-page') initPaymentPage();
  	if (name === 'add-result-page') initAddResult();
  	if (name === 'view-result-page') initViewResult();
	  if (name === 'admin-diploma-page') initAdminDiploma();
	  if (name === 'view-diploma-page') initViewDiplomas();
}

async function updateNav() {


	const loginBtn = document.getElementById("login-btn");
	const user = JSON.parse(localStorage.getItem("loggedInUser"));

	if (user) {
		try {
			const response = await fetch(`http://localhost:8080/api/users/isAdmin/${user.id}`);
			if (!response.ok) throw new Error("User not found");
			const isAdmin = await response.json();
			currentUser = { id: user.id, isAdmin: isAdmin };
			loginBtn.innerHTML = user.firstName;
			loginBtn.onclick = () => toggleUserMenu();
		} catch {
			// User no longer exists in DB — clear localStorage
			localStorage.removeItem("loggedInUser");
			currentUser = null;
			loginBtn.innerHTML = "Login";
			loginBtn.onclick = () => showPage("login-page");
		}

	} else {
		currentUser = null;
		loginBtn.innerHTML = "Login";
		loginBtn.onclick = () => showPage("login-page");
	}

	document.querySelectorAll('nav button[data-role]').forEach(btn => {
		const required = btn.dataset.role;
		if (required === 'admin') {
			btn.style.display = currentUser?.isAdmin === true ? '' : 'none';
		} else if (required === 'logged-in') {
			btn.style.display = currentUser !== null ? '' : 'none';
		}
	});
}

function toggleUserMenu() {

	const existingDropdown = document.getElementById("dropdown")
	if (existingDropdown) {
		existingDropdown.remove();
		return;
	}

	const user = JSON.parse(localStorage.getItem("loggedInUser"));

	const loginBtn = document.getElementById("login-btn");

	const dropdownContainer = document.createElement("div");
	dropdownContainer.id = "dropdown";
	dropdownContainer.className = "dropdown-content";

	const editUser = document.createElement("button");
	editUser.innerText = "Rediger bruger"
	editUser.onclick = () => {
		initEditUser();
		showPage("edit-user-page");
		dropdownContainer.remove();
	}

	const deleteUser = document.createElement("button");
	deleteUser.innerText = "Slet bruger";

	deleteUser.addEventListener("click", async () => {

		const confirmDelete = confirm("Er du sikker på du vil slette din bruger?");

		if (!confirmDelete) return

		try {
			const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
				method: "DELETE"

			})
			if (response.ok) {
				alert("Din profil er slettet");
				localStorage.removeItem("loggedInUser");
				updateNav();
				showPage("front-page");

			} else {
				alert("Der er sket en fejl. Profil er ikke slettet");

			}
		} catch (error) {
			console.error(error);
			alert("Server fejl ;_;")

		}

	});

	const logoutUser = document.createElement("button");
	logoutUser.innerText = "Log ud";
	logoutUser.onclick = () => {
		localStorage.removeItem("loggedInUser");
		currentUser = null;
		dropdownContainer.remove();
		updateNav();
		showPage("front-page");
	};

	dropdownContainer.append(editUser, deleteUser, logoutUser);

	loginBtn.appendChild(dropdownContainer);

}

