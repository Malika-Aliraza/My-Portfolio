// PROJECT FILTER TABS
const tabs = document.querySelectorAll(".tab");
const projectCards = document.querySelectorAll(".project-card");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const filter = tab.dataset.filter;

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        projectCards.forEach(card => {
            const tags = card.dataset.tags.split(" ");
            if (filter === "all" || tags.includes(filter)) {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
                card.style.pointerEvents = "auto";
            } else {
                card.style.opacity = "0.2";
                card.style.transform = "scale(0.97)";
                card.style.pointerEvents = "none";
            }
        });
    });
});

// INTERSECTION OBSERVER FOR FADE-IN SECTIONS
const observerOptions = {
    threshold: 0.18
};

const revealCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
        }
    });
};

const sectionObserver = new IntersectionObserver(revealCallback, observerOptions);

document.querySelectorAll(".section").forEach(section => {
    section.classList.add("section-hidden");
    sectionObserver.observe(section);
});

// CONTACT FORM SUBMIT
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        formStatus.textContent = "Sending...";
        formStatus.style.color = "#a1a4c5";

        const payload = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value
        };

        try {
            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.status === "success") {
                formStatus.textContent = data.message;
                formStatus.style.color = "#4facfe";
                contactForm.reset();
            } else {
                formStatus.textContent = "Something went wrong. Please try again.";
                formStatus.style.color = "#ff6fd8";
            }
        } catch (error) {
            console.error(error);
            formStatus.textContent = "Network error. Please try again.";
            formStatus.style.color = "#ff6f6f";
        }
    });
}

// SMALL ANIMATION UTILITY CLASSES
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.classList.add("section-visible");
    }
});