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

    // Telemetry Automation
    const bpmVal = document.getElementById('bpm-val');
    const velVal = document.getElementById('vel-val');
    const pwrVal = document.getElementById('pwr-val');
    const co2Val = document.getElementById('co2-val');

    setInterval(() => {
        // Randomly fluctuate BPM
        const bpm = 70 + Math.floor(Math.random() * 20);
        bpmVal.innerText = bpm;
        bpmVal.nextElementSibling.firstChild.style.width = bpm + '%';

        // Randomly fluctuate velocity
        const vel = 310 + Math.floor(Math.random() * 25);
        velVal.innerText = vel + ' km/h';
        velVal.nextElementSibling.firstChild.style.width = (vel - 300) * 4 + '%';

        // Randomly fluctuate Power
        const pwr = 95 + Math.floor(Math.random() * 5);
        pwrVal.innerText = pwr + '%';
        pwrVal.nextElementSibling.firstChild.style.width = pwr + '%';

        // Randomly fluctuate CO2
        const co2 = (12.4 + Math.random() * 0.5).toFixed(1);
        co2Val.innerText = co2 + 't';
    }, 2000);

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

    // Simulated Formula Counters
    const counters = document.querySelectorAll('.formula-number');
    const startTime = 2; // Initial delay
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const updateCount = () => {
            const count = +counter.innerText.replace('+', '').replace('H', '');
            const speed = target / 50;
            if (count < target) {
                counter.innerText = Math.ceil(count + speed) + (counter.getAttribute('data-unit') || '');
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target + (counter.getAttribute('data-unit') || '');
            }
        };
        
        // Only start count when visible
        const countObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                countObserver.unobserve(entries[0].target);
            }
        }, { threshold: 1 });
        
        countObserver.observe(counter);
    });
});
