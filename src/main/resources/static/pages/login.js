async function initLoginPage() {

    const page = document.getElementById("login-page")

    page.innerHTML = "";

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
    loginButton.addEventListener("click", loginUser);

    const createButton = document.createElement("button");
    createButton.innerText = "Opret bruger";
    createButton.onclick = () => showPage("create-page");

    container.append(title, username, password, loginButton, createButton);
    page.appendChild(container);

}

async function loginUser() {

    const email = document.getElementById("email").value;
    const password =  document.getElementById("password").value;

    const loginData = {
        email,
        password
    };

    try {

        const response = await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if(response.ok){

            const user = await response.json();

            alert("Login lykkedes!");

            console.log(user);

            showPage("front-page");

        } else {

            alert("Forkert email eller kodeord");

        }

    } catch(error) {

        console.error(error);
        alert("Server fejl")
    }
}

