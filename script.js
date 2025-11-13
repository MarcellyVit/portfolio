document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Toggle (Hamburger Menu)
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelector(".nav-links");
    const navLinksList = document.querySelectorAll(".nav-links li");

    const toggleNav = () => {
        // Toggle Nav
        navLinks.classList.toggle("nav-active");

        // Burger Animation
        burger.classList.toggle("toggle");
    };

    burger.addEventListener("click", toggleNav);

    // 2. Close mobile menu when a link is clicked
    navLinksList.forEach((link) => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("nav-active")) {
                toggleNav();
            }
        });
    });

    // 3. Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed navbar
                const navHeight =
                    document.querySelector(".navbar").offsetHeight;
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Active Navigation Link on Scroll (Intersection Observer)
    const sections = document.querySelectorAll("section[id]");
    const navLinksA = document.querySelectorAll(".nav-links a");

    const observerOptions = {
        root: null,
        rootMargin: "-70px 0px -50% 0px", // -70px for navbar, -50% to trigger mid-section
        threshold: 0
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinksA.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(
        observerCallback,
        observerOptions
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});
