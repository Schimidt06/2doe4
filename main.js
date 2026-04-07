document.addEventListener('DOMContentLoaded', () => {

    // ── Reveal on Scroll ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Sticky Header ──
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Smooth Scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Full Screen Menu ──
    const burger = document.getElementById('burger');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('menuClose');
    const menuLinks = document.querySelectorAll('.menu-items a');

    burger.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeMenu = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeMenu);
    menuLinks.forEach(link => link.addEventListener('click', closeMenu));

    // ── Animated Counters ──
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const targetAttr = counter.getAttribute('data-target');
        if (!targetAttr) return;
        
        const target = parseFloat(targetAttr);
        const unit = counter.getAttribute('data-unit') || '';
        const duration = 1200;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.round(eased * target);
            counter.innerText = current + unit;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                counter.innerText = target + unit;
            }
        };

        const countObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                requestAnimationFrame(animate);
                countObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });

        countObserver.observe(counter);
    });

});
