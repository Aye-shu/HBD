/* ===========================================================
   PAGE 1 — ENTRY PAGE
   Connected to starmap.html
   =========================================================== */


/* ===========================================================
   CONFIGURATION
   =========================================================== */

const CONFIG = {

    heading: "Happy Birthday My Love",

    message: `So tonight, on your birthday,
I wanted to give you something a little different.
A place made from my memories,
my words, my love,
and all the little things that remind me of you.`,

    welcomeLine: "Welcome to my universe.",

    // Page 2
    nextPage: "starmap.html",

    // Optional ambient music
    ambientAudioSrc: "audio/ambient.mp3"

};


/* ===========================================================
   PAGE ELEMENTS
   =========================================================== */

(function () {

    const ns = window.BirthdayUniverse || {};

    const transition = ns.transition;


    const els = {

        heading:
            document.getElementById("heading"),

        message:
            document.getElementById("message"),

        welcome:
            document.getElementById("welcome-line"),

        // IMPORTANT:
        // Your index.html uses id="enterButton"
        btn:
            document.getElementById("enterButton"),

        overlay:
            document.querySelector(".video-overlay"),

        pageTransition:
            document.getElementById("page-transition"),

        soundToggle:
            document.getElementById("sound-toggle"),

        video:
            document.getElementById("bg-video")

    };


    /* =======================================================
       CHECK REQUIRED ELEMENTS
    ======================================================= */

    if (!els.btn) {

        console.error(
            "ERROR: #enterButton was not found in index.html"
        );

    }


    /* =======================================================
       INSERT PAGE TEXT
    ======================================================= */

    if (els.heading) {

        els.heading.textContent =
            CONFIG.heading;

    }


    if (els.message) {

        els.message.textContent =
            CONFIG.message;

    }


    if (els.welcome) {

        els.welcome.textContent =
            CONFIG.welcomeLine;

    }


    /* =======================================================
       BACKGROUND VIDEO
    ======================================================= */

    if (els.video) {

        els.video.play().catch(() => {

            /*
             Some mobile browsers prevent
             autoplay until the user interacts.
            */

            const retryVideo = () => {

                els.video
                    .play()
                    .catch(() => {});

            };

            document.addEventListener(
                "click",
                retryVideo,
                { once: true }
            );

        });

    }


    /* =======================================================
       AMBIENT AUDIO
    ======================================================= */

    let audio = null;

    let muted = true;


    if (CONFIG.ambientAudioSrc) {

        audio =
            new Audio(
                CONFIG.ambientAudioSrc
            );

        audio.loop = true;

        audio.volume = 0.5;

    }


    function updateSoundIcon() {

        if (!els.soundToggle) {
            return;
        }


        els.soundToggle.textContent =
            muted
                ? "♪̶"
                : "♪";

    }


    updateSoundIcon();


    if (els.soundToggle) {

        els.soundToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                muted = !muted;


                if (!audio) {
                    return;
                }


                if (!muted) {

                    audio
                        .play()
                        .catch(() => {});

                }

                else {

                    audio.pause();

                }


                updateSoundIcon();

            }
        );

    }


    /* =======================================================
       FORCE PAGE CONTENT TO APPEAR
       FALLBACK IF GSAP FAILS
    ======================================================= */

    function forceReveal() {

        if (els.pageTransition) {

            els.pageTransition.style.opacity =
                "0";

        }


        if (els.overlay) {

            els.overlay.style.opacity =
                "1";

        }


        if (els.heading) {

            els.heading.style.opacity =
                "1";

        }


        if (els.message) {

            els.message.style.opacity =
                "1";

        }


        if (els.welcome) {

            els.welcome.style.opacity =
                "1";

        }


        if (els.btn) {

            els.btn.style.opacity =
                "1";

            els.btn.style.pointerEvents =
                "auto";

        }

    }


    /* =======================================================
       GSAP ANIMATION
    ======================================================= */

    const gsapAvailable =
        typeof window.gsap !== "undefined";


    if (gsapAvailable) {

        try {

            const tl =
                gsap.timeline({
                    delay: 0.2
                });


            /*
             Initial transition reveal
            */

            if (
                transition &&
                typeof transition.revealIn === "function"
            ) {

                tl.call(
                    () => {
                        transition.revealIn(1.6);
                    },
                    null,
                    0
                );

            }


            /*
             Video overlay
            */

            if (els.overlay) {

                tl.to(
                    els.overlay,
                    {
                        opacity: 1,
                        duration: 1.6,
                        ease: "power1.out"
                    },
                    0.3
                );

            }


            /*
             Main heading
            */

            if (els.heading) {

                tl.to(
                    els.heading,
                    {
                        opacity: 1,
                        duration: 1.6,
                        ease: "power2.out"
                    },
                    1.1
                );

            }


            /*
             Message
            */

            if (els.message) {

                tl.to(
                    els.message,
                    {
                        opacity: 1,
                        duration: 1.4,
                        ease: "power2.out"
                    },
                    2.1
                );

            }


            /*
             Welcome line
            */

            if (els.welcome) {

                tl.to(
                    els.welcome,
                    {
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.out"
                    },
                    3.0
                );

            }


            /*
             ENTER MY UNIVERSE button
            */

            if (els.btn) {

                tl.to(
                    els.btn,
                    {
                        opacity: 1,
                        duration: 1.2,
                        pointerEvents: "auto",
                        ease: "power2.out"
                    },
                    3.8
                );

            }


        }

        catch (error) {

            console.warn(
                "Animation failed. Showing page normally.",
                error
            );

            forceReveal();

        }

    }

    else {

        /*
         GSAP isn't available.
         Show page normally.
        */

        forceReveal();

    }


    /* =======================================================
       SAFETY NET
    ======================================================= */

    setTimeout(
        forceReveal,
        5000
    );


    /* =======================================================
       ENTER MY UNIVERSE
       PAGE 1 → PAGE 2
    ======================================================= */

    if (els.btn) {

        els.btn.addEventListener(
            "click",
            function () {

                /*
                 Prevent multiple clicks
                */

                els.btn.disabled =
                    true;


                /*
                 Use your existing
                 transition system if available.
                */

                if (
                    transition &&
                    typeof transition.goTo === "function"
                ) {

                    transition.goTo(
                        CONFIG.nextPage
                    );

                }

                else {

                    /*
                     Fallback navigation
                     */

                    window.location.href =
                        CONFIG.nextPage;

                }

            }
        );

    }


})();