/* ============================================================
   BETTER ME — STORY CONTROLLER
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const sections = Array.from(
        document.querySelectorAll(".story-section")
    );

    const video = document.querySelector(".background-video");

    const continueButton =
        document.getElementById("continueButton");

    const wishTransition =
        document.getElementById("wishTransition");

    const wishButton =
        document.getElementById("wishButton");

    const soundButton =
        document.getElementById("soundButton");

    let currentIndex = 0;

    let isTransitioning = false;

    // ★ Set total sections in progress
    const totalSections = sections.length;
    const progressTotal = document.querySelector(".progress-total");
    if (progressTotal) {
        progressTotal.textContent = totalSections;
    }


    /* ========================================================
       VIDEO
    ======================================================== */

    if (video) {

        video.muted = true;

        video.play().catch(() => {

            console.log(
                "Autoplay waiting for browser permission."
            );

        });
    }


    /* ========================================================
       SHOW SECTION
    ======================================================== */

    function showSection(index) {

        if (
            index < 0 ||
            index >= sections.length ||
            isTransitioning
        ) {
            return;
        }

        isTransitioning = true;

        sections.forEach((section, i) => {

            section.classList.toggle(
                "active",
                i === index
            );

        });

        currentIndex = index;

        updateProgress();

        /*
         * Give the CSS transition time to finish.
         */

        setTimeout(() => {

            isTransitioning = false;

        }, 900);
    }


    /* ========================================================
       PROGRESS
    ======================================================== */

    function updateProgress() {

        const current =
            document.querySelector(".progress-current");

        if (!current) return;

        current.textContent =
            String(currentIndex + 1).padStart(2, "0");
    }


    /* ========================================================
       NEXT SECTION
    ======================================================== */

    function nextSection() {

        if (currentIndex < sections.length - 1) {

            showSection(currentIndex + 1);

        } else {

            openWishTransition();

        }
    }


    /* ========================================================
       BUTTON EVENTS
    ======================================================== */

    document.querySelectorAll(".next-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                nextSection
            );

        });


    const openingButton =
        document.querySelector(
            ".opening .story-button"
        );

    if (openingButton) {

        openingButton.addEventListener(
            "click",
            nextSection
        );

    }


    /* ========================================================
       KEYBOARD NAVIGATION
    ======================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "ArrowDown" ||
                event.key === " " ||
                event.key === "Enter"
            ) {

                if (
                    event.target.tagName === "BUTTON"
                ) {
                    return;
                }

                event.preventDefault();

                nextSection();
            }

            if (event.key === "ArrowUp") {

                if (currentIndex > 0) {

                    showSection(
                        currentIndex - 1
                    );

                }

            }

        }
    );


    /* ========================================================
       MOUSE WHEEL
    ======================================================== */

    let wheelLocked = false;

    document.addEventListener(
        "wheel",
        event => {

            if (wheelLocked) return;

            wheelLocked = true;

            if (event.deltaY > 0) {

                nextSection();

            } else if (
                event.deltaY < 0 &&
                currentIndex > 0
            ) {

                showSection(
                    currentIndex - 1
                );

            }

            setTimeout(() => {

                wheelLocked = false;

            }, 1300);

        },
        {
            passive: true
        }
    );


    /* ========================================================
       TOUCH SWIPE
    ======================================================== */

    let touchStartY = 0;

    let touchEndY = 0;


    document.addEventListener(
        "touchstart",
        event => {

            touchStartY =
                event.changedTouches[0].screenY;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        event => {

            touchEndY =
                event.changedTouches[0].screenY;

            handleSwipe();

        },
        {
            passive: true
        }
    );


    function handleSwipe() {

        const distance =
            touchStartY - touchEndY;

        if (Math.abs(distance) < 50) {
            return;
        }

        if (distance > 0) {

            nextSection();

        } else if (currentIndex > 0) {

            showSection(
                currentIndex - 1
            );

        }

    }


    /* ========================================================
       VIDEO ATMOSPHERE
    ======================================================== */

    function updateVideoMood() {

        if (!video) return;

        /*
         * As the story progresses,
         * allow the background to become
         * slightly brighter.
         */

        const progress =
            currentIndex / (sections.length - 1);

        const brightness =
            .60 + (progress * .25);

        const saturation =
            .78 + (progress * .35);

        video.style.filter = `
            brightness(${brightness})
            saturate(${saturation})
            contrast(1.05)
        `;
    }


    const originalShowSection =
        showSection;


    /* ========================================================
       WISH TRANSITION
    ======================================================== */

    function openWishTransition() {

        wishTransition.classList.add("show");

        /*
         * Make the background video
         * disappear behind the transition.
         */

        if (video) {

            video.style.filter =
                "brightness(0.15) saturate(0.3)";

        }
    }


    /* ========================================================
       CONTINUE BUTTON
    ======================================================== */

    if (continueButton) {

        // ★ FIX: go directly to birthday.html ★
        continueButton.addEventListener(
            "click",
            () => {
                window.location.href = "./birthday.html";
            }
        );

    }


    /* ========================================================
       WISH BUTTON
    ======================================================== */

    if (wishButton) {
        wishButton.addEventListener("click", () => {
            // ★ Keep this as is – it still works if you want the transition
            window.location.href = "./birthday.html";
        });
    }


    /* ========================================================
       SOUND
    ======================================================== */

    let soundOn = false;

    if (soundButton) {

        soundButton.addEventListener(
            "click",
            () => {

                soundOn = !soundOn;

                /*
                 * Background video itself remains muted.
                 *
                 * If you later add a separate
                 * background music file, connect
                 * its audio element here.
                 */

                if (soundOn) {

                    soundButton.textContent = "🔊";

                } else {

                    soundButton.textContent = "♫";

                }

            }
        );

    }


    /* ========================================================
       INITIALIZATION
    ======================================================== */

    updateProgress();

    updateVideoMood();


    /*
     * Update video atmosphere whenever
     * the story changes.
     */

    const observer =
        new MutationObserver(() => {

            updateVideoMood();

        });

    sections.forEach(section => {

        observer.observe(
            section,
            {
                attributes: true,
                attributeFilter: ["class"]
            }
        );

    });


    /* ========================================================
       PREVENT DOUBLE CLICK ACCIDENTS
    ======================================================== */

    document.querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                }
            );

        });

});