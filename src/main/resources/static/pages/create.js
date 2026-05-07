async function initCreatePage() {

    const page = document.getElementById("create-page")

    page.innerHTML = "";

    const container = document.createElement("div");

    const title = document.createElement("h2");
    title.innerHTML = "Opret bruger"

    const firstName = document.createElement("input");
    firstName.type = "firstName"
    firstName.placeholder = "Fornavn"
    firstName.id = "firstName"

    const lastName = document.createElement("input");
    lastName.type = "lastName";
    lastName.placeholder = "Efternavn";
    lastName.id = "lastName";

    const birthday = document.createElement("input");
    birthday.type = "date";
    birthday.placeholder = "YYYY-MM-DD";
    birthday.id = "birthday";

    const phoneNumber = document.createElement("input");
    phoneNumber.type = "phoneNumber";
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

    const createButton = document.createElement("button");
    createButton.innerText = "Opret";
    createButton.onclick = "create";

    container.append(title, firstName, lastName, birthday, phoneNumber, email, password, createButton);
    page.appendChild(container);

}