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

// --- LOGIC GANTI BAHASA ---
function changeLanguage(lang) {
    // TEXT & HTML
    document.querySelectorAll('.lang-target').forEach(el => {
        const newText = el.getAttribute(`data-${lang}`);
        if (newText) el.innerHTML = newText;
    });

    // PLACEHOLDER INPUT
    document.querySelectorAll('input[data-placeholder-en]').forEach(input => {
        const placeholder = input.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) input.placeholder = placeholder;
    });

    // BUTTON STYLE & HTML LANG (tetap)
    const btnId = document.getElementById('btn-id');
    const btnEn = document.getElementById('btn-en');

    if (lang === 'id') {
        btnId?.classList.add('font-bold', 'opacity-100');
        btnId?.classList.remove('opacity-50');
        btnEn?.classList.remove('font-bold', 'opacity-100');
        btnEn?.classList.add('opacity-50');
        document.documentElement.lang = "id";
    } else {
        btnEn?.classList.add('font-bold', 'opacity-100');
        btnEn?.classList.remove('opacity-50');
        btnId?.classList.remove('font-bold', 'opacity-100');
        btnId?.classList.add('opacity-50');
        document.documentElement.lang = "en";
    }

    localStorage.setItem('selectedLanguage', lang);
}


// --- SAAT HALAMAN DI-LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLang);

    // Logic Scroll Smooth Original Kamu
    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            const section1 = document.getElementById('section1');
            if (section1) section1.scrollIntoView({ behavior: 'smooth' });
        });
    }
});