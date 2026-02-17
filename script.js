/* ============================================
   VAKYA INTELLIGENCE - SENTINELFLOW
   Interactive Animations & Effects
   ============================================ */

// ==========================================
// PARTICLE CONSTELLATION CANVAS
// ==========================================
class ParticleNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        this.animationId = null;
        this.resize();
        this.init();
        this.animate();
        this.setupEvents();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        const count = Math.min(Math.floor((this.canvas.width * this.canvas.height) / 12000), 120);
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
                pulseOffset: Math.random() * Math.PI * 2,
            });
        }
    }

    setupEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.init();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const time = Date.now() * 0.001;

        // Update & draw particles
        this.particles.forEach((p, i) => {
            // Movement
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Mouse interaction - gentle attraction
            if (this.mouse.x !== null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius * 0.01;
                    p.vx += dx * force;
                    p.vy += dy * force;
                }
            }

            // Damping
            p.vx *= 0.99;
            p.vy *= 0.99;

            // Pulse
            const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.3 + 0.7;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(54, 238, 224, ${p.opacity * pulse})`;
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(54, 238, 224, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }

            // Mouse connections
            if (this.mouse.x !== null) {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const opacity = (1 - dist / 200) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = `rgba(54, 238, 224, ${opacity})`;
                    this.ctx.lineWidth = 0.8;
                    this.ctx.stroke();
                }
            }
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('active');
                        }, parseInt(delay));
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        this.elements.forEach(el => this.observer.observe(el));
    }
}

// ==========================================
// ANIMATED COUNTERS
// ==========================================
class AnimatedCounter {
    constructor() {
        this.counters = document.querySelectorAll('[data-target]');
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        this.counters.forEach(counter => this.observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseFloat(element.dataset.target);
        const suffix = element.dataset.suffix || '';
        const prefix = element.dataset.prefix || '';
        const decimals = parseInt(element.dataset.decimals) || 0;
        const duration = 2000;
        const startTime = performance.now();

        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = target * easedProgress;

            if (decimals > 0) {
                element.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
            } else {
                element.textContent = `${prefix}${Math.floor(current)}${suffix}`;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = `${prefix}${decimals > 0 ? target.toFixed(decimals) : target}${suffix}`;
            }
        };

        requestAnimationFrame(update);
    }
}

// ==========================================
// NAVBAR
// ==========================================
class Navbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.toggle = document.getElementById('navToggle');
        this.links = document.getElementById('navLinks');
        this.setup();
    }

    setup() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile toggle
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                this.toggle.classList.toggle('active');
                this.links.classList.toggle('active');
                document.body.style.overflow = this.links.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu on link click
        if (this.links) {
            this.links.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    this.toggle.classList.remove('active');
                    this.links.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
class SmoothScroll {
    constructor() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const top = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            });
        });
    }
}

// ==========================================
// CONTACT FORM
// ==========================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    async handleSubmit() {
        const btn = this.form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        try {
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: new FormData(this.form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                btn.innerHTML = '<span>Demo Requested!</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>';
                btn.style.background = 'linear-gradient(135deg, #10B981, #36eee0)';
                this.form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            btn.innerHTML = '<span>Something went wrong. Try again.</span>';
            btn.style.background = 'linear-gradient(135deg, #EF4444, #F97316)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        }
    }
}

// ==========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ==========================================
class ActiveNavHighlight {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

        window.addEventListener('scroll', () => this.update());
    }

    update() {
        const scrollY = window.scrollY + 200;

        this.sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                this.navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = '#36eee0';
                    }
                });
            }
        });
    }
}

// ==========================================
// TILT EFFECT ON CARDS
// ==========================================
class TiltEffect {
    constructor() {
        if (window.innerWidth < 768) return;

        const cards = document.querySelectorAll('.crisis-card, .feature-card, .impact-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -3;
                const rotateY = (x - centerX) / centerX * 3;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================
class MagneticButtons {
    constructor() {
        if (window.innerWidth < 768) return;

        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }
}

// ==========================================
// TYPING EFFECT FOR HERO (subtle)
// ==========================================
class TypingEffect {
    constructor() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        // Add a blinking cursor to the accent word
        const accentSpan = subtitle.querySelector('.accent');
        if (accentSpan) {
            accentSpan.style.borderRight = '2px solid #36eee0';
            accentSpan.style.paddingRight = '4px';
            accentSpan.style.animation = 'none';

            setTimeout(() => {
                accentSpan.style.borderRight = 'none';
                accentSpan.style.paddingRight = '0';
            }, 3000);
        }
    }
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Particle canvas
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        new ParticleNetwork(canvas);
    }

    // Core functionality
    new Navbar();
    new SmoothScroll();
    new ScrollReveal();
    new AnimatedCounter();
    new ContactForm();
    new ActiveNavHighlight();

    // Extraordinary effects
    new TiltEffect();
    new MagneticButtons();
    new TypingEffect();

    // Stagger the hero reveals
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, i) => {
        setTimeout(() => {
            el.classList.add('active');
        }, 300 + i * 200);
    });
});
