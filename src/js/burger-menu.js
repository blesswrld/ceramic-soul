export function initBurgerMenu() {
    // Логика бургера
    const burger = document.querySelector(".burger"),
        close = document.querySelector(".header__menu-close"),
        menu = document.querySelector(".header__menu");

    if (burger && menu && close) {
        burger.addEventListener("click", () => {
            menu.classList.add("header__menu_active");
            document.body.style.overflow = "hidden";
        });

        close.addEventListener("click", () => {
            menu.classList.remove("header__menu_active");
            document.body.style.overflow = "";
        });
    }
}
