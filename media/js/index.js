document.addEventListener("DOMContentLoaded", () => {
    const infoContainers = document.querySelectorAll(".info-container");

    function checkContainersVisibility() {
        const windowHeight = window.innerHeight;

        infoContainers.forEach(container => {
            const containerPosition = container.getBoundingClientRect().top;

            if (containerPosition < windowHeight - 100) {
                container.style.opacity = 1;
                container.style.transform = "translateY(0)";
            }
        });
    }

    checkContainersVisibility();

    window.addEventListener("scroll", () => {
        checkContainersVisibility();
    });
});