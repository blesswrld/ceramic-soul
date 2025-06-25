import Swiper from "swiper";
import JustValidate from "just-validate";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Импорт файлов из purecss
import "purecss/build/grids-min.css";
import "purecss/build/grids-responsive-min.css";

// Импорт общего файла стилей
import "/src/sass/style.scss";

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

// Слайдер (оборачиваем в try/catch)
try {
    new Swiper(".works__slider", {
        slidesPerView: 1,
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".icon-right-open", prevEl: ".icon-left-open" },
        breakpoints: {
            1200: { slidesPerView: 3, spaceBetween: 5 },
            1920: { slidesPerView: 3, spaceBetween: 35 },
        },

        // configure Swiper to use modules
        modules: [Navigation, Pagination],
    });
} catch (e) {}

try {
    const tabs = document.querySelectorAll(".catalog__tab");
    if (tabs.length > 0) {
        const contents = document.querySelectorAll(".catalog__content-item");
        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
                contents.forEach((c) => (c.style.display = "none"));
                tab.classList.add("catalog__tab_active");
                contents[index].style.display = "block";
            });
        });
        contents.forEach(
            (c, i) => (c.style.display = i === 0 ? "block" : "none")
        );
    }
} catch (error) {}

try {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        // Настраиваем классы для стилей
        const validator = new JustValidate(form, {
            submitFormAutomatically: true,
            errorFieldCssClass: "just-validate-error-field",
            errorLabelCssClass: "just-validate-error-label",
        });

        // --- Поля применяются только если существуют в форме ---
        if (form.querySelector("#name")) {
            validator.addField("#name", [
                { rule: "required", errorMessage: "Please fill the name" },
                { rule: "minLength", value: 2, errorMessage: "Min 2 char!" },
            ]);
        }

        if (form.querySelector("#email")) {
            validator.addField("#email", [
                { rule: "required", errorMessage: "Enter your email address" },
                {
                    rule: "email",
                    errorMessage:
                        "Please enter an email of the following format: example@gmail.com",
                },
            ]);
        }

        if (form.querySelector("#footer-email")) {
            validator.addField("#footer-email", [
                { rule: "required", errorMessage: "Enter your email address" },
                {
                    rule: "email",
                    errorMessage:
                        "Please enter an email of the following format: example@gmail.com",
                },
            ]);
        }

        if (form.querySelector("#question")) {
            validator.addField(
                "#question",
                [
                    {
                        rule: "required",
                        errorMessage: "Please write down your question",
                    },
                    {
                        rule: "minLength",
                        value: 5,
                        errorMessage: "Too short min 5 char!",
                    },
                ],
                { errorsContainer: form.querySelector(".error-message") }
            );
        }

        if (form.querySelector("#checkbox")) {
            validator.addField(
                "#checkbox",
                [
                    {
                        rule: "required",
                        errorMessage: "You must agree to the terms",
                    },
                ],
                {
                    errorsContainer: form.querySelector(
                        ".checkbox-error-message"
                    ),
                }
            );
        }

        if (form.querySelector("#footer-terms")) {
            validator.addField(
                "#footer-terms",
                [
                    {
                        rule: "required",
                        errorMessage: "You must agree to the terms",
                    },
                ],
                {
                    errorsContainer: form.querySelector(
                        ".footer-checkbox-error"
                    ),
                }
            );
        }
    });
} catch (e) {
    console.error("Validation script failed:", e);
}
