/* ============================================================
   SECRET GIFT PAGE
============================================================ */


/* ============================================================
   SETTINGS
============================================================ */

/*
    CHANGE THE SECRET CODE HERE.

    Current answer:

    ABHISHEK + ISHIKA
    = ABHIKA
*/

const SECRET_CODE = "ABHIKA";


/*
    Your next page.

    If reasons.html is in the same folder,
    this is correct.
*/

const NEXT_PAGE = "./reasons.html";


/* ============================================================
   ELEMENTS
============================================================ */

const secretScreen =
    document.getElementById("secretScreen");

const secretCode =
    document.getElementById("secretCode");

const unlockButton =
    document.getElementById("unlockButton");

const feedback =
    document.getElementById("feedback");

const attemptCounter =
    document.getElementById("attemptCounter");

const wrongMessage =
    document.getElementById("wrongMessage");

const wrongText =
    document.getElementById("wrongText");

const tryAgainButton =
    document.getElementById("tryAgainButton");

const giftRoom =
    document.getElementById("giftRoom");

const giftWrapper =
    document.getElementById("giftWrapper");

const videoReveal =
    document.getElementById("videoReveal");

const birthdayVideo =
    document.getElementById("birthdayVideo");

const finalReveal =
    document.getElementById("finalReveal");

const birthdayButton =
    document.getElementById("birthdayButton");

const transitionScreen =
    document.getElementById("transitionScreen");

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas.getContext("2d");


/* ============================================================
   ATTEMPTS
============================================================ */

let attempts = 0;

let unlocked = false;

let giftOpened = false;

let transitioning = false;


/* ============================================================
   WRONG ANSWER MESSAGES
============================================================ */

const wrongMessages = [

    "Hmm... that's not quite it. But I like where your mind is going. ❤️",

    "Nope. The universe is keeping this one secret for a little longer. ✦",

    "Close... maybe think about the two names a little differently. 👀",

    "Not this time, birthday boy. Try again. 💙",

    "I know you can figure this out. Think about the hint. 😉",

    "The answer is hiding in plain sight...",

    "You're making me nervous. What if you actually open it? 😂❤️",

    "One little secret stands between you and your gift.",

    "Try combining the two names. Maybe they're more connected than you think. ✨",

    "You're getting warmer... don't give up. 💙"

];


/* ============================================================
   SUCCESS MESSAGES
============================================================ */

const successMessages = [

    "You really know us. ❤️",

    "Of course you figured it out.",

    "I knew you would find it. ✦",

    "Some secrets are only meant for you."

];


/* ============================================================
   CANVAS
============================================================ */

function resizeCanvas() {

    const ratio =
        window.devicePixelRatio || 1;

    canvas.width =
        window.innerWidth * ratio;

    canvas.height =
        window.innerHeight * ratio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* ============================================================
   PARTICLES
============================================================ */

let particles = [];


function createParticle(
    x,
    y,
    strong = false
) {

    particles.push({

        x: x,

        y: y,

        vx:
            (Math.random() - 0.5) *
            (strong ? 3 : 0.5),

        vy:
            -(Math.random() *
            (strong ? 3.5 : 1.3) +
            0.4),

        size:
            Math.random() *
            (strong ? 3 : 1.5)
            + 0.5,

        opacity:
            Math.random() * 0.8 + 0.2,

        life: 1,

        decay:
            Math.random() *
            0.012 + 0.004,

        rotation:
            Math.random() *
            Math.PI * 2
    });
}


/* ============================================================
   PARTICLE ANIMATION
============================================================ */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            particles[i];


        p.x += p.vx;

        p.y += p.vy;

        p.life -= p.decay;


        if (p.life <= 0) {

            particles.splice(i, 1);

            continue;
        }


        ctx.save();

        ctx.translate(
            p.x,
            p.y
        );

        ctx.rotate(
            p.rotation
        );


        /*
            Small four-point star
        */

        ctx.beginPath();

        ctx.moveTo(
            0,
            -p.size * 2
        );

        ctx.lineTo(
            p.size * 0.55,
            -p.size * 0.55
        );

        ctx.lineTo(
            p.size * 2,
            0
        );

        ctx.lineTo(
            p.size * 0.55,
            p.size * 0.55
        );

        ctx.lineTo(
            0,
            p.size * 2
        );

        ctx.lineTo(
            -p.size * 0.55,
            p.size * 0.55
        );

        ctx.lineTo(
            -p.size * 2,
            0
        );

        ctx.lineTo(
            -p.size * 0.55,
            -p.size * 0.55
        );

        ctx.closePath();


        ctx.fillStyle =
            `rgba(255, 211, 125, ${p.opacity * p.life})`;

        ctx.shadowBlur = 12;

        ctx.shadowColor =
            "rgba(255, 200, 100, 0.8)";

        ctx.fill();

        ctx.restore();
    }


    requestAnimationFrame(
        animateParticles
    );
}

animateParticles();


/* ============================================================
   PARTICLE BURST
============================================================ */

function particleBurst() {

    const rect =
        giftWrapper.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height * 0.35;


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        createParticle(

            centerX +
            (Math.random() - 0.5) *
            140,

            centerY +
            (Math.random() - 0.5) *
            50,

            true

        );
    }
}


/* ============================================================
   WRONG ANSWER
============================================================ */

function submitCode() {

    if (unlocked) {
        return;
    }


    const entered =
        secretCode.value
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "");


    if (!entered) {

        feedback.textContent =
            "You have to try something first...";

        return;
    }


    attempts++;


    /* ========================================================
       CORRECT
    ======================================================== */

    if (
        entered === SECRET_CODE
    ) {

        unlockGift();

        return;
    }


    /* ========================================================
       WRONG
    ======================================================== */

    showWrongMessage();

}


/* ============================================================
   SHOW WRONG MESSAGE
============================================================ */

function showWrongMessage() {

    const index =
        Math.min(
            attempts - 1,
            wrongMessages.length - 1
        );


    wrongText.textContent =
        wrongMessages[index];


    wrongMessage.classList.add(
        "show"
    );


    attemptCounter.textContent =
        attempts === 1
            ? "First attempt... keep going."
            : `${attempts} attempts. The secret is still waiting.`;


    /*
        Small screen shake.
    */

    document.body.classList.add(
        "shake"
    );


    setTimeout(() => {

        document.body.classList.remove(
            "shake"
        );

    }, 550);
}


/* ============================================================
   TRY AGAIN
============================================================ */

tryAgainButton.addEventListener(
    "click",
    () => {

        wrongMessage.classList.remove(
            "show"
        );

        setTimeout(() => {

            secretCode.focus();

        }, 300);

    }
);


/* ============================================================
   UNLOCK
============================================================ */

async function unlockGift() {

    if (unlocked) {
        return;
    }

    unlocked = true;


    feedback.textContent =
        successMessages[
            Math.floor(
                Math.random() *
                successMessages.length
            )
        ];


    feedback.style.color =
        "rgba(150, 210, 255, 0.9)";


    secretCode.disabled = true;

    unlockButton.disabled = true;


    /*
        Small delay so he sees
        that he cracked the code.
    */

    await wait(1000);


    /*
        Fade password screen.
    */

    secretScreen.classList.add(
        "hidden"
    );


    /*
        Bring gift room in.
    */

    await wait(900);

    giftRoom.classList.add(
        "visible"
    );


    /*
        Start subtle particles.
    */

    createAmbientGiftParticles();

}


/* ============================================================
   AMBIENT GIFT PARTICLES
============================================================ */

let ambientTimer = null;


function createAmbientGiftParticles() {

    if (ambientTimer) {
        return;
    }


    ambientTimer =
        setInterval(() => {

            if (
                giftRoom.classList.contains(
                    "visible"
                ) &&
                !giftOpened
            ) {

                const rect =
                    giftWrapper.getBoundingClientRect();


                createParticle(

                    rect.left +
                    rect.width / 2 +
                    (Math.random() - 0.5) *
                    130,

                    rect.top +
                    rect.height * 0.35,

                    false
                );
            }

        }, 250);
}


/* ============================================================
   OPEN GIFT
============================================================ */

async function openGift() {

    if (
        !unlocked ||
        giftOpened
    ) {

        return;
    }


    giftOpened = true;


    giftWrapper.classList.add(
        "opening"
    );


    /*
        Hide instruction.
    */

    document.querySelector(
        ".gift-instruction"
    ).style.opacity = "0";


    /*
        CAMERA SHAKE
    */

    await wait(450);

    document.body.classList.add(
        "shake"
    );


    /*
        GOLD PARTICLE EXPLOSION
    */

    particleBurst();


    await wait(600);


    document.body.classList.remove(
        "shake"
    );


    /*
        Continue opening sequence.
    */

    await wait(900);


    /*
        Hide gift room.
    */

    giftRoom.classList.remove(
        "visible"
    );


    await wait(800);


    /*
        Show video.
    */

    videoReveal.classList.add(
        "visible"
    );


    await wait(1200);


    /*
        Scroll to top.
    */

    videoReveal.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /*
        Show final reveal after
        a short delay.
    */

    await wait(2200);

    finalReveal.classList.add(
        "visible"
    );

}


/* ============================================================
   VIDEO EVENTS
============================================================ */

birthdayVideo.addEventListener(
    "ended",
    () => {

        finalReveal.classList.add(
            "visible"
        );

    }
);


/* ============================================================
   OPTIONAL:
   CLICK VIDEO TO PLAY
============================================================ */

birthdayVideo.addEventListener(
    "click",
    () => {

        if (
            birthdayVideo.paused
        ) {

            birthdayVideo.play();

        } else {

            birthdayVideo.pause();

        }

    }
);


/* ============================================================
   GO TO REASONS
============================================================ */

function goToReasons() {

    if (transitioning) {
        return;
    }


    transitioning = true;


    /*
        Stop video.
    */

    birthdayVideo.pause();


    /*
        Create another particle burst.
    */

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        createParticle(

            window.innerWidth / 2 +
            (Math.random() - 0.5) *
            400,

            window.innerHeight / 2 +
            (Math.random() - 0.5) *
            200,

            true
        );

    }


    /*
        Start cinematic transition.
    */

    transitionScreen.classList.add(
        "active"
    );


    setTimeout(() => {

        window.location.href =
            NEXT_PAGE;

    }, 1700);

}


/* ============================================================
   WAIT
============================================================ */

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


/* ============================================================
   EVENTS
============================================================ */

unlockButton.addEventListener(
    "click",
    submitCode
);


secretCode.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            submitCode();

        }

    }
);


giftWrapper.addEventListener(
    "click",
    openGift
);


giftWrapper.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openGift();

        }

    }
);


birthdayButton.addEventListener(
    "click",
    goToReasons
);


/* ============================================================
   INITIAL FOCUS
============================================================ */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            secretCode.focus();

        }, 1000);

    }
);