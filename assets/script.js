let lastScrollY = window.scrollY;

// Scroll behavior
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const navContainer = document.getElementById("nav-container");
    const menuLinks = navContainer.querySelectorAll("a");
    const hamburger = document.getElementById("hamburger");

    const currentScrollY = window.scrollY;

    // Hide on scroll down
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }

    // Change style after scroll
    if (currentScrollY > 80) {
        navContainer.classList.remove(
            "bg-gradient-to-b",
            "from-black/50",
            "to-transparent",
            "text-white"
        );
        navContainer.classList.add(
            "bg-white",
            "shadow-md",
            "text-gray-800"
        );

        menuLinks.forEach(link => {
            link.classList.remove("md:text-white");
            link.classList.add("md:text-gray-800");
        });

        hamburger.classList.remove("text-white");
        hamburger.classList.add("text-gray-800");
    } else {
        navContainer.classList.add(
            "bg-gradient-to-b",
            "from-black/50",
            "to-transparent",
            "text-white"
        );
        navContainer.classList.remove(
            "bg-white",
            "shadow-md",
            "text-gray-800"
        );

        menuLinks.forEach(link => {
            link.classList.add("md:text-white");
            link.classList.remove("md:text-gray-800");
        });

        hamburger.classList.remove("text-gray-800");
    }

    lastScrollY = currentScrollY;
});

// Toggle mobile menu
function toggleMenu() {
    const menu = document.getElementById("menu-items");
    const navContainer = document.getElementById("nav-container");
    const menuBtn = document.getElementById("hamburger");

    const isOpen = !menu.classList.contains("hidden");

    menu.classList.toggle("hidden");

    // Mobile background
    navContainer.classList.toggle("bg-white", !isOpen);
    navContainer.classList.toggle("text-gray-800", !isOpen);
    navContainer.classList.toggle("text-white", isOpen);

    menuBtn.classList.toggle("rotate-180");
}

// Auto close menu on link click (mobile only)
document.querySelectorAll("#menu-items a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 768) {
            toggleMenu();
        }
    });
});

// Scroll Reveal Observer
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

reveals.forEach(el => observer.observe(el));