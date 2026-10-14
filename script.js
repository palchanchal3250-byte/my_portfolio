
// ==================== MOBILE NAVIGATION ====================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
    const menuIcon = hamburger.querySelector("i");
    const navigationLinks = navLinks.querySelectorAll("a");

    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");

        hamburger.setAttribute("aria-expanded", String(isOpen));

        if (menuIcon) {
            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);
        }
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");

            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        }
    });
}


// ==================== ACTIVE NAVIGATION LINK ====================

const sections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll("#navLinks a");

if (sections.length && allNavLinks.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;

                    allNavLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    sections.forEach((section) => observer.observe(section));
}


// ==================== CONTACT FORM WITH EMAILJS ====================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Show sending message
        formStatus.textContent = "Sending your message...";
        formStatus.classList.add("visible");

        try {
            await emailjs.sendForm(
                "service_le9dr6b",
                "template_ojzz64v",
                contactForm,
                {
                    publicKey: "y5V1lM3gZsqXruCj5"
                }
            );

            // Success message
            formStatus.textContent =
                "Message sent successfully! Thank you for contacting me.";

            contactForm.reset();

        } catch (error) {
            console.error("EmailJS error:", error);

            // Error message
            formStatus.textContent =
                "Sorry, your message could not be sent. Please try again.";
        }
    });
}
