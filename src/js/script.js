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

burger.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    document.body.style.overflow = "";
});

try {
    new Swiper(".works__slider", {
        slidesPerView: 1,
        loop: true,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".icon-right-open",
            prevEl: ".icon-left-open",
        },

        breakpoints: {
            // when window width is >= 1200px
            1200: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            1920: {
                slidesPerView: 3,
                spaceBetween: 35,
            },
        },

        // configure Swiper to use modules
        modules: [Navigation, Pagination],
    });
} catch (e) {}

try {
    const tabs = document.querySelectorAll(".catalog__tab");
    const contents = document.querySelectorAll(".catalog__content-item");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Удаляем активный класс у всех табов и контента
            tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
            contents.forEach((c) => (c.style.display = "none"));

            // Добавляем класс активности к нажатому табу и показываем соответствующий контент
            tab.classList.add("catalog__tab_active");
            contents[index].style.display = "block";
        });
    });

    // Показываем первый контент при загрузке
    contents.forEach((c, i) => (c.style.display = i === 0 ? "block" : "none"));
} catch (error) {}

try {
    const validator = new JustValidate("#contact-form", {
        submitFormAutomatically: "true", //
    });
    validator
        .addField("#name", [
            {
                rule: "required",
                errorMessage: "Please fill the name",
            },
            {
                rule: "minLength",
                value: 2,
                errorMessage: "Min 2 char!",
            },
        ])
        .addField("#email", [
            {
                rule: "required",
                errorMessage: "Enter your email address",
            },
            {
                rule: "email",
                errorMessage:
                    "Please enter an email of the following format: example@gmail.com",
            },
        ])
        .addField(
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
            {
                errorsContainer: document
                    .querySelector("#question")
                    .parentElement.querySelector(".error-message"),
            }
        )
        .addField(
            "#checkbox",
            [
                {
                    rule: "required",
                    errorMessage: "Need to agree with the terms",
                },
            ],
            {
                errorsContainer: document
                    .querySelector("#checkbox")
                    .parentElement.parentElement.querySelector(
                        ".checkbox-error-message"
                    ),
            }
        );
} catch (e) {}
