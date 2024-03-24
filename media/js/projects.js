const PROJECT_TEMPLATE = `
    <a>
        <div class="project" data-tilt data-tilt-max="5" data-tilt-speed="400" data-tilt-perspective="500">
            <img class="project-image">
            <h2 class="project-title"></h2>
            <p class="project-description"></p>
        </div>
    </a>
`;

async function fetchProjects() {
    let archives;

    await fetch(`assets/projects/projects.json`)
        .then(result => result.json())
        .then(data => archives = data);

    return archives;
}

async function generateProjects() {
    const projects = await fetchProjects();

    let style = document.createElement("style");
    let css = "";

    for (const project of projects) {
        const projectElement = createElementFromHTML(PROJECT_TEMPLATE);

        projectElement.href = project.url;

        const imageElement = projectElement.querySelector(".project-image");

        if (project.image === "") {
            imageElement.style.display = "none";
        }
        else {
            imageElement.src = project.image;
            imageElement.alt = project.title;
        }

        while (translations.length <= 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        projectElement.querySelector(".project-title").innerText = translateString(project.title);
        projectElement.querySelector(".project-description").innerText = translateString(project.description);

        // Set styles
        css += `
        a:hover > .project.${project.id} {
            filter: drop-shadow(0 0 15pt ${project.color});
            box-shadow: inset 0 0 5pt ${project.color};
        }
        `;

        projectElement.querySelector(".project").classList.add(project.id);

        // Add to DOM
        document.querySelector("#projects-container").appendChild(projectElement);
    }

    style.innerHTML = css;

    document.head.appendChild(style);
}

window.addEventListener("load", async () => {
    await generateProjects();

    const tiltScript = document.createElement("script");
    tiltScript.src = "https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js";

    document.head.appendChild(tiltScript);

    document.querySelector("#projects-container").style.opacity = 1;
    document.querySelector("#projects-container").style.transform = "translateY(0)";
});