function initAdminDiploma (){

    const page = document.getElementById("admin-diploma-page")

    page.innerHTML = "";

    const container = document.createElement("div")
    container.className = "admin-diploma-div"

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-container"

    const title = document.createElement("h2")
    title.innerHTML = "Opret bruger"

    const uploadInput = document.createElement("input")
    uploadInput.type = "file"
    uploadInput.id = "diploma-file"


    const submitBtn = document.createElement("button")
    submitBtn.innerHTML = "Upload"

    submitBtn.addEventListener("click", uploadDiploma);

    buttonContainer.append(uploadInput, submitBtn)
    container.append(title, buttonContainer)
    page.appendChild(container)
}

async function uploadDiploma () {

    const fileInput = document.getElementById('diploma-file');
    const file = fileInput.files[0];

    if (!file) {
        alert("Vælg en fil først");
        return;
    }

    try {

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch ("http://localhost:8080/api/diplomas/upload-image", {
            method: "POST",
            body: formData,
        });

        if(response.ok){
            alert("Diplom uploaded");
            showPage("admin-diploma-page");

        } else {
            alert("Noget gik galt. Øv.");
        }

    } catch (error){
        console.log(error);
        alert("Server fejl :/");
    }

}