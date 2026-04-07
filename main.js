document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Sticky header logic
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for header links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Full Screen Menu Logic
    const burger = document.querySelector('.burger-menu');
    const overlay = document.querySelector('.menu-overlay');
    const closeBtn = document.querySelector('.menu-close');
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

    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Simplified Formula Counters
    const counters = document.querySelectorAll('.formula-number');
    
    counters.forEach(counter => {
        const targetAttr = counter.getAttribute('data-target');
        if (!targetAttr) return;

        const target = parseFloat(targetAttr);
        const unit = counter.getAttribute('data-unit') || '';
        
        const updateCount = () => {
            const currentText = counter.innerText.replace(unit, '').replace('%', '').replace('H', '');
            const count = parseFloat(currentText) || 0;
            const inc = target / 40;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + unit;
                setTimeout(updateCount, 30);
            } else {
                counter.innerText = target + unit;
            }
        };
        
        const countObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                countObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        countObserver.observe(counter);
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top = e.clientY - 10 + 'px';
        }, 50);
    });

    // Hover effect for cursor
    const links = document.querySelectorAll('a, button, .pillar-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(4)';
            cursor.style.opacity = '0.5';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '1';
        });
    });

    // End of main logic
});
