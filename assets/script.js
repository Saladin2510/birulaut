let lastScrollY = window.scrollY;

document.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    document.querySelectorAll(".navbar").forEach(navbar => {
        // Hide saat scroll down, show saat scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            navbar.style.transform = "translateY(-100%)";
        } else {
            navbar.style.transform = "translateY(0)";
        }
    });

    lastScrollY = currentScrollY;
});

// Toggle mobile menu
function toggleMenu() {
    const menu = document.getElementById("menu-items");
    const navContainer = document.getElementById("nav-container");
    const menuBtn = document.getElementById("hamburger");

    const menuIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>`;
    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;

    const isOpen = !menu.classList.contains('hidden');

    menu.classList.toggle('hidden');
    navContainer.classList.toggle('bg-white');

    // Rotate animation
    menuBtn.classList.toggle('rotate-180');
    menuBtn.classList.toggle('-rotate-180');

    setTimeout(() => {
        menuBtn.innerHTML = isOpen ? menuIcon : closeIcon;
    }, 150);
}

// Auto close menu on link click (mobile only)
document.querySelectorAll('#menu-items a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('menu-items');
        if (!menu.classList.contains('hidden')) {
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