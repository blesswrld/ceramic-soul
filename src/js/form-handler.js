import JustValidate from "just-validate";
import emailjs from "@emailjs/browser";

export function initFormHandler() {
    try {
        // Инициализируем EmailJS ключом из .env файла
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

        const forms = document.querySelectorAll("form");

        forms.forEach((form) => {
            // Настраиваем классы для стилей
            const validator = new JustValidate(form, {
                errorFieldCssClass: "just-validate-error-field",
                errorLabelCssClass: "just-validate-error-label",
            });

            // --- Поля применяются только если существуют в форме ---
            if (form.querySelector("#name")) {
                validator.addField("#name", [
                    { rule: "required", errorMessage: "Please fill the name" },
                    {
                        rule: "minLength",
                        value: 2,
                        errorMessage: "Min 2 char!",
                    },
                ]);
            }
            if (form.querySelector("#email")) {
                validator.addField("#email", [
                    {
                        rule: "required",
                        errorMessage: "Enter your email address",
                    },
                    {
                        rule: "email",
                        errorMessage:
                            "Please enter an email of the following format: example@gmail.com",
                    },
                ]);
            }
            if (form.querySelector("#footer-email")) {
                validator.addField("#footer-email", [
                    {
                        rule: "required",
                        errorMessage: "Enter your email address",
                    },
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

            validator.onSuccess((event) => {
                const submitButton = form.querySelector('[type="submit"]');
                const initialButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";

                // 1. Собираем данные из формы в объект вручную
                const templateParams = {
                    title: form.querySelector('[name="title"]')
                        ? form.querySelector('[name="title"]').value
                        : "Заявка с сайта",
                    name: form.querySelector('[name="name"]')
                        ? form.querySelector('[name="name"]').value
                        : "",
                    email: form.querySelector('[name="email"]')
                        ? form.querySelector('[name="email"]').value
                        : "",
                    // 2. говорим, что свойство 'message' для шаблона
                    // нужно взять из поля с name="question" в нашей форме (тк шаблон в email.js по какой-то причине у меня не работает)
                    message: form.querySelector('[name="question"]')
                        ? form.querySelector('[name="question"]').value
                        : "",
                };

                if (form.classList.contains("footer__form")) {
                    templateParams.email =
                        form.querySelector('[name="email"]').value;
                }

                // Инициализируем ключи из .env
                const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

                // 3. Вызываем emailjs.send с нашим объектом, а не emailjs.sendForm
                emailjs
                    .send(serviceID, templateID, templateParams)
                    .then(
                        () => {
                            console.log("SUCCESS!");
                            alert("Request is sent, wait for feedback!");
                            form.reset();
                        },
                        (error) => {
                            console.log("FAILED...", error);
                            alert(`Error sending request: ${error.text}`);
                        }
                    )
                    .finally(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = initialButtonText;
                    });
            });
        });
    } catch (e) {
        console.error("Validation or EmailJS script failed:", e);
    }
}
