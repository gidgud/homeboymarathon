function initAdminDiploma() {
    const page = document.getElementById("admin-diploma-page");
    page.innerHTML = "";

    const container = document.createElement("div");
    container.className = "admin-diploma-div";

    const title = document.createElement("h2");
    title.innerHTML = "Administrer diplomer";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "btn-container";

    const uploadInput = document.createElement("input");
    uploadInput.type = "file";
    uploadInput.id = "diploma-file";

    const submitBtn = document.createElement("button");
    submitBtn.innerHTML = "Upload";
    submitBtn.addEventListener("click", uploadDiploma);

    buttonContainer.append(uploadInput, submitBtn);

    const listTitle = document.createElement("h2");
    listTitle.innerHTML = "Uploadede diplomer";

    const list = document.createElement("div");
    list.className = "diploma-list";
    list.id = "admin-diploma-list";

    container.append(title, buttonContainer, listTitle, list);
    page.appendChild(container);

    loadAdminDiplomas();
}

async function loadAdminDiplomas() {
    const list = document.getElementById("admin-diploma-list");
    list.innerHTML = "";

    try {
        const response = await fetch("http://localhost:8080/api/diplomas/files");

        if (!response.ok) {
            list.innerHTML = "<p>Kunne ikke hente diplomer.</p>";
            return;
        }

        const filePaths = await response.json();

        if (filePaths.length === 0) {
            list.innerHTML = "<p>Ingen diplomer fundet.</p>";
            return;
        }

        filePaths.forEach((path, index) => {
            const filename = path.split("/").pop();

            const row = document.createElement("div");
            row.className = "diploma-row";

            const link = document.createElement("a");
            link.href = `http://localhost:8080${path}`;
            link.download = filename;
            link.innerHTML = `Diplom ${index + 1}`;
            link.className = "diploma-link";

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "Slet";
            deleteBtn.className = "delete-btn";
            deleteBtn.addEventListener("click", () => deleteDiplomaFile(path, row));

            row.append(link, deleteBtn);
            list.appendChild(row);
        });

    } catch (error) {
        console.error(error);
        list.innerHTML = "<p>Server fejl :/</p>";
    }
}

async function uploadDiploma() {
    const fileInput = document.getElementById('diploma-file');
    const file = fileInput.files[0];

    if (!file) {
        alert("Vælg en fil først");
        return;
    }

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch("http://localhost:8080/api/diplomas/upload-image", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Diplom uploaded");
            loadAdminDiplomas();
        } else {
            alert("Noget gik galt. Øv.");
        }

    } catch (error) {
        console.log(error);
        alert("Server fejl :/");
    }
}

async function deleteDiplomaFile(path, rowElement) {
    if (!confirm("Er du sikker på, at du vil slette dette diplom?")) return;

    const filename = path.split("/").pop();

    try {
        const response = await fetch(`http://localhost:8080/api/diplomas/files/${filename}`, {
            method: "DELETE",
        });

        if (response.ok) {
            rowElement.remove();
        } else {
            alert("Kunne ikke slette diplom.");
        }

    } catch (error) {
        console.error(error);
        alert("Server fejl :/");
    }
}