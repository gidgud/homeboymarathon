async function initViewDiplomas() {
    const page = document.getElementById("view-diploma-page");
    page.innerHTML = "";

    const container = document.createElement("div");
    container.className = "admin-diploma-div";

    const title = document.createElement("h2");
    title.innerHTML = "Diplomer";
    container.appendChild(title);

    const list = document.createElement("div");
    list.className = "diploma-list";
    container.appendChild(list);

    page.appendChild(container);

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

            const link = document.createElement("a");
            link.href = `http://localhost:8080${path}`;
            link.download = filename;
            link.innerHTML = `Diplom ${index + 1}`;
            link.className = "diploma-link";

            list.appendChild(link);
        });

    } catch (error) {
        console.error(error);
        list.innerHTML = "<p>Server fejl :/</p>";
    }
}