import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export function initSlider() {
    // Слайдер (оборачиваем в try/catch)
    try {
        new Swiper(".works__slider", {
            slidesPerView: 1,
            loop: true,
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: {
                nextEl: ".icon-right-open",
                prevEl: ".icon-left-open",
            },
            breakpoints: {
                1200: { slidesPerView: 3, spaceBetween: 5 },
                1920: { slidesPerView: 3, spaceBetween: 35 },
            },
            // configure Swiper to use modules
            modules: [Navigation, Pagination],
        });
    } catch (e) {
        console.error("Slider initialization failed:", e);
    }
}
