export function initTabs() {
    try {
        const tabs = document.querySelectorAll(".catalog__tab");
        if (tabs.length > 0) {
            const contents = document.querySelectorAll(
                ".catalog__content-item"
            );
            tabs.forEach((tab, index) => {
                tab.addEventListener("click", () => {
                    tabs.forEach((t) =>
                        t.classList.remove("catalog__tab_active")
                    );
                    contents.forEach((c) => (c.style.display = "none"));
                    tab.classList.add("catalog__tab_active");
                    contents[index].style.display = "block";
                });
            });
            contents.forEach(
                (c, i) => (c.style.display = i === 0 ? "block" : "none")
            );
        }
    } catch (error) {
        console.error("Tabs initialization failed:", error);
    }
}
