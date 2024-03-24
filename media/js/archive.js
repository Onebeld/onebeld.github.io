const ARCHIVE_TEMPLATE = `
    <a>
        <div class="archive" data-tilt data-tilt-max="5" data-tilt-speed="400" data-tilt-perspective="500">
            <img class="archive-image">
            <h2 class="archive-title"></h2>
            <p class="archive-description"></p>
            <p><span data-translate-key="archive.discontinued"></span>: <span class="archive-date"></span></p>
        </div>
    </a>
`;

function formatDate(stringDate) {
    const date = new Date(stringDate);
    return new Intl.DateTimeFormat(document.documentElement.lang, {dateStyle: "long"}).format(date);
}

async function fetchArchives() {
    let archives;
    
   await fetch(`assets/projects/archive.json`)
        .then(result => result.json())
        .then(data => archives = data);
   
    return archives;
}

async function generateArchive() {
    const archives = await fetchArchives();
    
    let style = document.createElement("style");
    let css = "";

    for (const archive of archives) {
        const archiveElement = createElementFromHTML(ARCHIVE_TEMPLATE);

        archiveElement.href = archive.url;
        
        const imageElement = archiveElement.querySelector(".archive-image");
        
        if (archive.image === "") {
            imageElement.style.display = "none";
        }
        else {
            imageElement.src = archive.image;
            imageElement.alt = archive.title;
        }

        while (translations.length <= 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        archiveElement.querySelector(".archive-title").innerText = translateString(archive.title);
        archiveElement.querySelector(".archive-description").innerText = translateString(archive.description);
        archiveElement.querySelector(".archive-date").innerText = formatDate(archive.date);

        archiveElement.querySelectorAll("[data-translate-key]").forEach(translateElement);

        // Set styles
        css += `
        a:hover > .archive.${archive.id} {
            filter: drop-shadow(0 0 15pt ${archive.color});
            box-shadow: inset 0 0 5pt ${archive.color};
        }
        `;
        
        archiveElement.querySelector(".archive").classList.add(archive.id);

        // Add to DOM
        document.querySelector("#archive-container").appendChild(archiveElement);
    }
    
    style.innerHTML = css;
    
    document.head.appendChild(style);
}

window.addEventListener("load", async () => {
    await generateArchive();
    
    const tiltScript = document.createElement("script");
    tiltScript.src = "https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js";
    
    document.head.appendChild(tiltScript);

    document.querySelector("#archive-container").style.opacity = 1;
    document.querySelector("#archive-container").style.transform = "translateY(0)";
});