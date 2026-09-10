/* ============================================================
   ELEMENTS
============================================================ */

const envelopeWrapper =
    document.getElementById("envelopeWrapper");

const openButton =
    document.getElementById("openButton");

const introScreen =
    document.getElementById("introScreen");

const letterScreen =
    document.getElementById("letterScreen");

const paper =
    document.getElementById("paper");

const finalMessage =
    document.getElementById("finalMessage");

const signatureArea =
    document.querySelector(".signature-area");

const continueButton =
    document.getElementById("continueButton");

const goldTransition =
    document.getElementById("goldTransition");

const canvas =
    document.getElementById("particleCanvas");

const ctx =
    canvas.getContext("2d");


/* ============================================================
   PARTICLE SYSTEM
============================================================ */

let particles = [];

let particleAnimation;


/* Resize canvas */

function resizeCanvas() {

    canvas.width = window.innerWidth *
        window.devicePixelRatio;

    canvas.height = window.innerHeight *
        window.devicePixelRatio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* Create golden particle */

function createParticle(
    x,
    y,
    burst = false
) {

    particles.push({

        x: x,

        y: y,

        vx:
            (Math.random() - 0.5) *
            (burst ? 1.8 : 0.45),

        vy:
            -(Math.random() *
            (burst ? 2.5 : 1.2) +
            0.4),

        size:
            Math.random() *
            (burst ? 3 : 1.8) +
            0.5,

        opacity:
            Math.random() *
            0.7 +
            0.25,

        life: 1,

        decay:
            Math.random() *
            0.008 +
            0.003,

        wobble:
            Math.random() *
            Math.PI *
            2,

        wobbleSpeed:
            Math.random() *
            0.04 +
            0.01
    });
}


/* Draw particles */

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

        p.wobble +=
            p.wobbleSpeed;

        p.x +=
            p.vx +
            Math.sin(p.wobble) *
            0.25;

        p.y +=
            p.vy;

        p.life -=
            p.decay;

        if (p.life <= 0) {

            particles.splice(i, 1);

            continue;
        }

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255, 215, 135, ${p.opacity * p.life})`;

        ctx.shadowBlur = 10;

        ctx.shadowColor =
            "rgba(255, 201, 100, 0.7)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }

    particleAnimation =
        requestAnimationFrame(
            animateParticles
        );
}

animateParticles();


/* ============================================================
   GOLDEN PARTICLE BURST
============================================================ */

function particleBurst() {

    const rect =
        envelopeWrapper.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height * 0.35;

    for (
        let i = 0;
        i < 80;
        i++
    ) {

        createParticle(
            centerX +
            (Math.random() - 0.5) *
            rect.width *
            0.4,

            centerY +
            (Math.random() - 0.5) *
            30,

            true
        );
    }
}


/* ============================================================
   CONTINUOUS PARTICLES ABOVE ENVELOPE
============================================================ */

let ambientParticleTimer;

function startAmbientParticles() {

    ambientParticleTimer =
        setInterval(() => {

            if (
                envelopeWrapper.classList.contains(
                    "opening"
                )
            ) {

                return;
            }

            const rect =
                envelopeWrapper.getBoundingClientRect();

            createParticle(
                rect.left +
                rect.width / 2 +
                (Math.random() - 0.5) *
                100,

                rect.top +
                rect.height * 0.3,

                false
            );

        }, 180);
}

startAmbientParticles();


/* ============================================================
   LETTER TYPING
============================================================ */

/*
    We save the original text from each paragraph.
*/

const typewriterParagraphs =
    document.querySelectorAll(
        ".typewriter"
    );


typewriterParagraphs.forEach(
    paragraph => {

        paragraph.dataset.text =
            paragraph.textContent.trim();

        paragraph.textContent = "";

    }
);


/*
    Type one paragraph.
*/

function typeParagraph(
    paragraph,
    speed = 22
) {

    return new Promise(resolve => {

        const text =
            paragraph.dataset.text;

        let index = 0;

        function type() {

            if (
                index >= text.length
            ) {

                resolve();

                return;
            }

            paragraph.textContent +=
                text[index];

            index++;

            /*
                Slightly random typing speed
                makes it feel less robotic.
            */

            const variation =
                Math.random() * 20;

            setTimeout(
                type,
                speed + variation
            );
        }

        type();

    });
}


/* ============================================================
   REVEAL SECTIONS
============================================================ */

async function revealLetter() {

    const sections =
        document.querySelectorAll(
            ".letter-section"
        );


    /*
        Greeting first
    */

    await wait(700);


    /*
        Reveal each section one by one
    */

    for (
        let i = 0;
        i < sections.length;
        i++
    ) {

        const section =
            sections[i];

        section.classList.add(
            "revealed"
        );

        const paragraph =
            section.querySelector(
                ".typewriter"
            );

        /*
            Wait a little before writing.
        */

        await wait(350);

        await typeParagraph(
            paragraph,
            24
        );

        /*
            Pause between sections.
        */

        await wait(850);
    }


    /*
        Reveal signature
    */

    await wait(700);

    signatureArea.classList.add(
        "revealed"
    );


    /*
        Wait before final message.
    */

    await wait(1400);

    finalMessage.classList.add(
        "revealed"
    );

}


/* ============================================================
   WAIT FUNCTION
============================================================ */

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(resolve, ms)
    );
}


/* ============================================================
   OPEN LETTER
============================================================ */

let hasOpened = false;


async function openLetter() {

    if (hasOpened) {
        return;
    }

    hasOpened = true;


    /*
        Stop button interaction.
    */

    openButton.disabled = true;


    /*
        Envelope begins opening.
    */

    envelopeWrapper.classList.add(
        "opening"
    );


    /*
        Golden particles.
    */

    await wait(550);

    particleBurst();


    /*
        Hide intro text.
    */

    await wait(900);

    introScreen.classList.add(
        "hidden"
    );


    /*
        Bring letter screen in.
    */

    await wait(700);

    letterScreen.classList.add(
        "visible"
    );


    /*
        Paper emerges.
    */

    await wait(500);

    paper.classList.add(
        "visible"
    );


    /*
        Start writing.
    */

    await wait(1000);

    revealLetter();

}


/* ============================================================
   CLICK EVENTS
============================================================ */

openButton.addEventListener(
    "click",
    openLetter
);


envelopeWrapper.addEventListener(
    "click",
    openLetter
);


/* ============================================================
   FINAL TRANSITION
============================================================ */

let transitioning = false;


function goToGift() {

    if (transitioning) {
        return;
    }

    transitioning = true;


    /*
        Golden light expands.
    */

    goldTransition.classList.add(
        "active"
    );


    /*
        Give the animation time
        before navigation.
    */

    setTimeout(() => {

        window.location.href =
            "gift.html";

    }, 1600);

}


continueButton.addEventListener(
    "click",
    goToGift
);


/* ============================================================
   OPTIONAL:
   CLICK FINAL MESSAGE ITSELF
============================================================ */

finalMessage.addEventListener(
    "dblclick",
    () => {

        if (
            finalMessage.classList.contains(
                "revealed"
            )
        ) {

            goToGift();

        }

    }
);