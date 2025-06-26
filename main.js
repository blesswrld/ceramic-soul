// --- Импорт стилей из Swiper ---
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Импорт файлов из purecss
import "purecss/build/grids-min.css";
import "purecss/build/grids-responsive-min.css";

// Импорт общего файла стилей
import "/src/sass/style.scss";

// --- Импорт модулей ---
import { initBurgerMenu } from "/src/js/burger-menu";
import { initSlider } from "/src/js/slider.js";
import { initTabs } from "/src/js/tabs.js";
import { initFormHandler } from "/src/js/form-handler.js";

// --- Инициализация скриптов после загрузки DOM ---
document.addEventListener("DOMContentLoaded", () => {
    initBurgerMenu();
    initSlider();
    initTabs();
    initFormHandler();
});
