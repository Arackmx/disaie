// CTA Section - Typewriter Effect with Reset
(function () {
    'use strict';

    const text = "Da el primer paso. Hablemos de tu próximo proyecto.";
    const typewriterElement = document.getElementById('typewriter');
    const cursor = document.querySelector('.cursor');
    const ctaSection = document.getElementById('cta');

    if (!typewriterElement || !cursor || !ctaSection) {
        console.error('CTA elements not found');
        return;
    }

    let index = 0;
    let isTyping = false;
    const typingSpeed = 80; // milliseconds per character

    function resetTypewriter() {
        typewriterElement.textContent = '';
        cursor.style.display = 'none';
        index = 0;
        isTyping = false;
    }

    function typeWriter() {
        if (!isTyping) return;

        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Show cursor after typing is complete
            cursor.style.display = 'inline-block';
            isTyping = false;
        }
    }

    function startTyping() {
        if (isTyping || index > 0) return;

        isTyping = true;
        cursor.style.display = 'none';
        setTimeout(typeWriter, 500);
    }

    // Observe section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section is visible - start typing
                console.log('CTA section visible - starting typewriter');
                startTyping();
            } else {
                // Section is not visible - reset
                console.log('CTA section hidden - resetting typewriter');
                resetTypewriter();
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px'
    });

    observer.observe(ctaSection);

    console.log('CTA typewriter initialized with reset on scroll');
})();
