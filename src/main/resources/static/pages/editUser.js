async function initEditUser() {

    const page = document.getElementById("edit-user-page")

    page.innerHTML = "";

    const container = document.createElement("div");
    container.className = "edit-user-div";

    const title = document.createElement("h2");
    title.innerHTML = "Rediger bruger";

    const number = document.createElement("input")
    number.type = "number";
    number.placeholder = "Telefonnummer";
    number.id = "edit-number";

    const email = document.createElement("input")
    email.type = "email";
    email.placeholder = "Email";
    email.id = "edit-email";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-container"

    const saveButton = document.createElement("button");
    saveButton.innerText = "Gem ændringer";
    saveButton.addEventListener("click", saveChanges);

    buttonContainer.append(saveButton)
    container.append(title, number, email, buttonContainer);
    page.appendChild(container);
}

async function saveChanges() {

    const number = document.getElementById("edit-number").value;
    const email = document.getElementById("edit-email").value;

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    const updatedData = {
        phoneNumber: number,
        email: email
    };

    try {

        const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        if (response.ok) {
            alert("Brugeroplysninger opdateret!");
            showPage("event-page");
        } else {
            alert("Fejl ved opdatering af brugeroplysninger.");
        }

    } catch (error) {
        console.error("Error updating user:", error);
        alert("Server fejl ;_;");
    }
}