function showPage(name) {

    document.querySelectorAll('.page').forEach(a => a.classList.add('hidden'));
    document.getElementById(name).classList.remove('hidden');

    if (name === 'login-page') initLoginPage();
    if (name === 'create-page') initCreatePage();
    if (name === 'event-page') initEventPage();
    if (name === 'event-create-page') initEventCreatePage();

}

function updateNav() {

    const loginBtn = document.getElementById("login-btn");

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user) {

        loginBtn.innerHTML = user.firstName;

        loginBtn.onclick = () => toggleUserMenu();

    } else {

        loginBtn.innerHTML = "Login";

        loginBtn.onclick = () => showPage("login-page");

    }
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
    dropdownContainer.append(editUser, deleteUser);

    loginBtn.appendChild(dropdownContainer);

}

