async function initLoginPage() {

    const page = document.getElementById("login-page")

    const container = document.createElement("div");

    const title = document.createElement("h2");
    title.innerHTML = "Login";

    const username = document.createElement("input")
    username.type = "email";
    username.placeholder = "Brugernavn";
    username.id = "email";

    const password = document.createElement("input");
    password.type = "password";
    password.placeholder = "Kodeord";
    password.id = "password";

    const loginButton = document.createElement("button");
    loginButton.innerText = "Login";
    loginButton.onclick = "login";

    const createButton = document.createElement("button");
    createButton.innerText = "Opret bruger";
    createButton.onclick = () => showPage("create-page");

    container.append(title, username, password, loginButton, createButton);
    page.appendChild(container);

}

