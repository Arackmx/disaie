// ===================================
// Navbar Scroll Behavior
// ===================================

let lastScrollTop = 0;
let scrollThreshold = 10;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow when scrolled
    if (scrollTop > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/show navbar based on scroll direction
    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
            // Scrolling down - hide navbar
            navbar.classList.add('hidden');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    }
});

// ===================================
// Active Link Highlighting
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Smooth Scroll Enhancement
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for dropdown parent link
        if (href === '#servicios' && this.parentElement.classList.contains('navbar-dropdown')) {
            return;
        }

        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - navbar.offsetHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// Mobile Menu Toggle (for future implementation)
// ===================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// ===================================
// Close dropdown when clicking outside
// ===================================

document.addEventListener('click', (e) => {
    const dropdowns = document.querySelectorAll('.navbar-dropdown');

    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
});

// ===================================
// Prevent dropdown close on hover
// ===================================

const dropdownItems = document.querySelectorAll('.navbar-dropdown');

dropdownItems.forEach(item => {
    let timeout;

    item.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
    });

    item.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            item.classList.remove('active');
        }, 200);
    });
});
