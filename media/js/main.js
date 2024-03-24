let menuContainer;
let menuButton;

/**
 * Creates an element from the given HTML string, optionally trimming whitespace.
 *
 * @param {string} html - the HTML string to create the element from
 * @param {boolean} [trim=true] - flag to indicate whether to trim the HTML string
 * @return {Element|NodeList} the created element or a list of created elements
 */
function createElementFromHTML(html, trim = true) {
    html = trim ? html.trim() : html;
    if (!html) return null;

    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;

    if (result.length === 1) return result[0];
    return result;
}

function addEventToButton() {
    menuButton.addEventListener("click", () => {
        if (menuContainer.style.pointerEvents === "none") {
            menuContainer.style.transform = "translateX(0%)";
            menuContainer.style.pointerEvents = "all";
        } else {
            menuContainer.style.transform = "translateX(100%)";
            menuContainer.style.pointerEvents = "none";
        }
    });
}

function initializeGradientBackground() {
    const interactiveGradient = document.querySelector(".interactive");

    let cursorX = 0;
    let cursorY = 0;

    let targetX = 0;
    let targetY = 0;

    function move() {
        cursorX += (targetX - cursorX) / 20;
        cursorY += (targetY - cursorY) / 20;

        interactiveGradient.style.transform = `translate(${Math.round(cursorX)}px, ${Math.round(cursorY)}px)`;

        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener("mousemove", (event) => {
        targetX = event.clientX;
        targetY = event.clientY - 150;
    });

    move();
}

document.addEventListener("DOMContentLoaded", () => {
    menuContainer = document.querySelector(".menu-container");
    menuButton = document.querySelector(".menu-button");
    
    addEventToButton();
    initializeGradientBackground();
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-container") && !event.target.closest(".menu-button")) {
        menuContainer.style.transform = "translateX(100%)";
        menuContainer.style.pointerEvents = "none";
    }
});