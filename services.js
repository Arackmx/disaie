// Services Section - Scroll-Triggered Animation
(function () {
    'use strict';

    const section = document.getElementById('servicios');
    const blocks = document.querySelectorAll('.service-block');
    const image = document.getElementById('serviceImage');

    if (!section || !blocks.length || !image) {
        console.error('Services elements not found');
        return;
    }

    console.log('Services initialized with', blocks.length, 'blocks');

    // Hide all blocks initially
    blocks.forEach(b => b.classList.remove('active'));

    function updateServices() {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress through the section (0 to 1)
        const scrollProgress = -sectionTop / (sectionHeight - viewportHeight);

        // Determine which block should be active based on scroll progress
        let activeIndex = -1;

        if (scrollProgress < 0) {
            // Before section
            activeIndex = -1;
        } else if (scrollProgress >= 0 && scrollProgress < 0.33) {
            // First third - show block 0
            activeIndex = 0;
        } else if (scrollProgress >= 0.33 && scrollProgress < 0.66) {
            // Second third - show block 1
            activeIndex = 1;
        } else if (scrollProgress >= 0.66 && scrollProgress < 1) {
            // Last third - show block 2
            activeIndex = 2;
        }

        // Update active block
        blocks.forEach((block, index) => {
            if (index === activeIndex) {
                if (!block.classList.contains('active')) {
                    block.classList.add('active');

                    // Change image
                    const imageSrc = block.getAttribute('data-image');
                    if (imageSrc) {
                        console.log('Activating block', index, 'with image', imageSrc);
                        changeImage(imageSrc);
                    }
                }
            } else {
                block.classList.remove('active');
            }
        });
    }

    function changeImage(src) {
        image.style.opacity = '0';
        setTimeout(() => {
            image.src = src;
            image.style.opacity = '1';
        }, 250);
    }

    // Listen to scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateServices();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    updateServices();

    console.log('Services scroll handler ready');
})();
