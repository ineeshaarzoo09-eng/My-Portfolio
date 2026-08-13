/* =========================================================
   INEESHA ARZOO — PREMIUM FEMININE PORTFOLIO JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. AOS ANIMATIONS
    ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 850,
            easing: "ease-out-cubic",
            once: true,
            offset: 70,
            mirror: false
        });
    }


    /* =====================================================
       2. ELEMENTS
    ===================================================== */

    const header = document.querySelector(".site-header");

    const nav =
        document.querySelector(".nav-links") ||
        document.querySelector(".nav-menu");

    const menuToggle =
        document.querySelector(".menu-toggle") ||
        document.querySelector(".hamburger") ||
        document.querySelector(".nav-toggle");

    const navLinks = [
        ...document.querySelectorAll(
            '.nav-links a[href^="#"], .nav-menu a[href^="#"]'
        )
    ];

    const sections = [
        ...document.querySelectorAll("main section[id]")
    ];


    /* =====================================================
       3. PAGE LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    if (loader) {

        const hideLoader = () => {

            loader.classList.add("hide");

            setTimeout(() => {
                loader.style.display = "none";
            }, 650);

        };

        if (document.readyState === "complete") {

            setTimeout(hideLoader, 500);

        } else {

            window.addEventListener(
                "load",
                () => setTimeout(hideLoader, 500),
                { once: true }
            );

        }
    }


    /* =====================================================
       4. MOBILE NAVIGATION
    ===================================================== */

    function closeMenu() {

        if (!nav || !menuToggle) return;

        nav.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");
    }


    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        navLinks.forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

    }


    /* =====================================================
       5. SMOOTH SCROLL
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 78;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                8;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            setActiveLink(target.id);

        });

    });


    /* =====================================================
       6. ACTIVE NAVBAR
       ===================================================== */

    function setActiveLink(id) {

        navLinks.forEach(link => {

            const isActive =
                link.getAttribute("href") ===
                `#${id}`;

            link.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        });

    }


    function detectActiveSection() {

        if (!sections.length) return;

        const headerHeight =
            header
                ? header.offsetHeight
                : 78;

        const scrollPosition =
            window.scrollY +
            headerHeight +
            150;

        let currentSection =
            sections[0].id;


        sections.forEach(section => {

            if (
                scrollPosition >=
                section.offsetTop
            ) {

                currentSection =
                    section.id;

            }

        });


        setActiveLink(currentSection);

    }


    let scrollTick = false;


    window.addEventListener(
        "scroll",
        () => {

            if (!scrollTick) {

                window.requestAnimationFrame(() => {

                    detectActiveSection();


                    /* Navbar background on scroll */

                    if (header) {

                        header.classList.toggle(
                            "scrolled",
                            window.scrollY > 30
                        );

                    }

                    scrollTick = false;

                });

                scrollTick = true;

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "load",
        detectActiveSection
    );

    detectActiveSection();


    /* =====================================================
       7. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       8. TYPING EFFECT
    ===================================================== */

    const typing =
        document.querySelector(".typing-text");


    if (typing) {

        const words = [

            "Flutter Developer",

            "Freelancer",

            "UI-Focused App Builder",

            "Flutter Instructor"

        ];


        let wordIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typing.textContent =
                    currentWord.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;


                if (
                    characterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;

                }

            } else {

                typing.textContent =
                    currentWord.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;


                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }


            setTimeout(
                typeEffect,
                deleting ? 55 : 95
            );

        }


        typeEffect();

    }


    /* =====================================================
       9. HERO MOUSE PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        hero &&
        !reduceMotion &&
        window.innerWidth > 900
    ) {

        let animationFrame = null;


        window.addEventListener(
            "mousemove",
            event => {

                if (animationFrame) return;


                animationFrame =
                    requestAnimationFrame(() => {

                        const x =
                            (
                                window.innerWidth / 2 -
                                event.clientX
                            ) / 90;


                        const y =
                            (
                                window.innerHeight / 2 -
                                event.clientY
                            ) / 90;


                        hero.style.setProperty(
                            "--mouse-x",
                            `${x}px`
                        );


                        hero.style.setProperty(
                            "--mouse-y",
                            `${y}px`
                        );


                        animationFrame = null;

                    });

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       10. 3D CARD TILT
    ===================================================== */

    if (
        !reduceMotion &&
        window.innerWidth > 950
    ) {

        const cards =
            document.querySelectorAll(
                ".project-card, .experience-card, .design-placeholder"
            );


        cards.forEach(card => {


            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) / rect.width;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) / rect.height;


                    const rotateY =
                        (x - 0.5) * 5;


                    const rotateX =
                        (0.5 - y) * 5;


                    card.style.transform =
                        `
                        translateY(-8px)
                        perspective(900px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       11. BUTTON RIPPLE EFFECT
    ===================================================== */

    const rippleButtons =
        document.querySelectorAll(
            ".btn, .experience-link"
        );


    rippleButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "ripple";


                const rect =
                    button.getBoundingClientRect();


                ripple.style.left =
                    `${event.clientX - rect.left}px`;


                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                button.appendChild(ripple);


                setTimeout(
                    () => ripple.remove(),
                    650
                );

            }
        );

    });


    /* =====================================================
       12. ANIMATED COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const element =
                            entry.target;


                        const target =
                            Number(
                                element.dataset.count
                            );


                        if (
                            !Number.isFinite(
                                target
                            )
                        ) {
                            return;
                        }


                        const duration = 1100;

                        const start =
                            performance.now();


                        function animateCounter(
                            currentTime
                        ) {

                            const progress =
                                Math.min(
                                    (
                                        currentTime -
                                        start
                                    ) / duration,
                                    1
                                );


                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );


                            element.textContent =
                                Math.floor(
                                    target * eased
                                );


                            if (
                                progress < 1
                            ) {

                                requestAnimationFrame(
                                    animateCounter
                                );

                            } else {

                                element.textContent =
                                    target;

                            }

                        }


                        requestAnimationFrame(
                            animateCounter
                        );


                        counterObserver.unobserve(
                            element
                        );

                    });

                },
                {
                    threshold: 0.65
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(
                counter
            );

        });

    }


    /* =====================================================
       13. CUSTOM CURSOR
    ===================================================== */

    const cursor =
        document.getElementById(
            "cursor"
        );


    if (
        cursor &&
        !reduceMotion &&
        window.innerWidth > 900
    ) {


        window.addEventListener(
            "mousemove",
            event => {

                cursor.style.left =
                    `${event.clientX}px`;


                cursor.style.top =
                    `${event.clientY}px`;

            },
            {
                passive: true
            }
        );


        const cursorTargets =
            document.querySelectorAll(
                "a, button, .project-card, .experience-card, .design-placeholder"
            );


        cursorTargets.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.classList.add(
                        "cursor-large"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.classList.remove(
                        "cursor-large"
                    );

                }
            );

        });

    }


    /* =====================================================
       14. CURRENT YEAR
    ===================================================== */

    document
        .querySelectorAll(
            ".current-year"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       15. SCROLL TO TOP
    ===================================================== */

    const scrollTopButtons =
        document.querySelectorAll(
            ".scroll-top, #scrollTop"
        );


    scrollTopButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       16. PROJECT CARD HOVER
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card, .app-card, .portfolio-card"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.classList.add(
                    "hovered"
                );
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {
                card.classList.remove(
                    "hovered"
                );
            }
        );

    });


    /* =====================================================
       17. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(
            "#contactForm"
        ) ||
        document.querySelector(
            ".contact-form"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const button =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                if (!button) return;


                const originalText =
                    button.textContent;


                button.textContent =
                    "Sending...";


                button.disabled = true;


                setTimeout(() => {

                    button.textContent =
                        "Message Sent ✓";


                    contactForm.reset();


                    setTimeout(() => {

                        button.textContent =
                            originalText;


                        button.disabled =
                            false;

                    }, 2500);


                }, 1000);

            }
        );

    }


    /* =====================================================
       18. IMAGE HOVER EFFECT
    ===================================================== */

    const images =
        document.querySelectorAll(
            ".project-image img, .hero-image-frame img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0.3";

            }
        );

    });


    /* =====================================================
       19. BACK TO TOP VISIBILITY
    ===================================================== */

    const backTop =
        document.querySelector(
            ".scroll-top"
        );


    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.scrollY > 500
                ) {

                    backTop.classList.add(
                        "show"
                    );

                } else {

                    backTop.classList.remove(
                        "show"
                    );

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       20. PREVENT EMPTY HASH JUMP
    ===================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                }
            );

        });


    /* =====================================================
       21. FINAL NAVBAR CHECK
    ===================================================== */

    setTimeout(() => {

        detectActiveSection();

    }, 100);

});

