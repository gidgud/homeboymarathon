async function initCreatePage() {

    const page = document.getElementById("create-page")

    page.innerHTML = "";

    const container = document.createElement("div");
    container.className = "create-div";

    const title = document.createElement("h2");
    title.innerHTML = "Opret bruger"

    const firstName = document.createElement("input");
    firstName.type = "text"
    firstName.placeholder = "Fornavn"
    firstName.id = "firstName"

    const lastName = document.createElement("input");
    lastName.type = "text";
    lastName.placeholder = "Efternavn";
    lastName.id = "lastName";

    const birthday = document.createElement("input");
    birthday.type = "date";
    birthday.placeholder = "YYYY-MM-DD";
    birthday.id = "dateOfBirth";

    const phoneNumber = document.createElement("input");
    phoneNumber.type = "tel";
    phoneNumber.placeholder = "4512345678";
    phoneNumber.id = "phoneNumber";

    const email = document.createElement("input");
    email.type = "email";
    email.placeholder = "HBMarathon@gmail.com";
    email.id = "email";

    const password = document.createElement("input");
    password.type = "password";
    password.placeholder = "Kodeord";
    password.id = "password";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-container"

    const createButton = document.createElement("button");
    createButton.innerText = "Opret";
    createButton.addEventListener("click", createUser);

    buttonContainer.append(createButton)
    container.append(title, firstName, lastName, birthday, phoneNumber, email, password, buttonContainer);
    page.appendChild(container);

}

async function createUser (){
    const user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {

        const response = await fetch ("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response.ok) {
            alert("Bruger oprettet! :D");
            showPage("login-page")
        } else {
            const errorText = await response.text();

            console.log(response.status);
            console.log(errorText);

            alert("Kunne ikke oprette bruger")
        }
    } catch (error) {
        console.error(error);
        alert("Server fejl ;_;")
    }
}
