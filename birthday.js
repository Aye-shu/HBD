/* ============================================================
   BIRTHDAY DIMENSION
   Final page of the birthday experience
============================================================ */


/* ============================================================
   ELEMENTS
============================================================ */

const introScene =
    document.getElementById("introScene");

const celebrationScene =
    document.getElementById("celebrationScene");

const finalScene =
    document.getElementById("finalScene");

const enterBirthday =
    document.getElementById("enterBirthday");

const startExperience =
    document.getElementById("startExperience");

const audioOverlay =
    document.getElementById("audioOverlay");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const cake =
    document.getElementById("cake");

const cakeArea =
    document.getElementById("cakeArea");

const tapButton =
    document.getElementById("tapButton");

const micButton =
    document.getElementById("micButton");

const micStatus =
    document.getElementById("micStatus");

const blackout =
    document.getElementById("blackout");

const finalGlow =
    document.getElementById("finalGlow");

const particleCanvas =
    document.getElementById("particleCanvas");

const fireworkCanvas =
    document.getElementById("fireworkCanvas");

const confettiContainer =
    document.getElementById("confettiContainer");


/* ============================================================
   FINAL PAGE ELEMENTS
============================================================ */

const reasonsTransition =
    document.getElementById("reasonsTransition");

const reasonsButton =
    document.getElementById("reasonsButton");


/* ============================================================
   SETTINGS
============================================================ */

const CANDLE_BLOW_THRESHOLD = 0.055;

const BLACKOUT_DURATION = 1800;

const FIREWORK_DURATION = 6500;


/*
   How long the final birthday message remains visible
   before the final transition appears.
*/
const REASONS_DELAY = 8000;


/* ============================================================
   STATE
============================================================ */

let birthdayStarted = false;

let candlesBlown = false;

let microphoneActive = false;

let audioContext = null;

let analyser = null;

let microphoneStream = null;

let microphoneSource = null;

let microphoneAnimation = null;


/* ============================================================
   CANVAS SETUP
============================================================ */

function setupCanvas(canvas) {

    if (!canvas) {
        return null;
    }

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        window.innerWidth * dpr;

    canvas.height =
        window.innerHeight * dpr;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    const context =
        canvas.getContext("2d");

    context.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    return context;
}


let particleCtx =
    setupCanvas(
        particleCanvas
    );


let fireworkCtx =
    setupCanvas(
        fireworkCanvas
    );


window.addEventListener(
    "resize",
    () => {

        particleCtx =
            setupCanvas(
                particleCanvas
            );

        fireworkCtx =
            setupCanvas(
                fireworkCanvas
            );

    }
);


/* ============================================================
   PARTICLE SYSTEM
============================================================ */

const particles = [];


function createParticle(
    x,
    y,
    options = {}
) {

    particles.push({

        x,

        y,

        vx:
            options.vx ??
            (Math.random() - .5) * .5,

        vy:
            options.vy ??
            -(Math.random() * .8 + .2),

        size:
            options.size ??
            (Math.random() * 2 + .5),

        life:
            options.life ??
            1,

        decay:
            options.decay ??
            (Math.random() * .008 + .003),

        type:
            options.type ??
            "star",

        rotation:
            Math.random() *
            Math.PI *
            2,

        rotationSpeed:
            (Math.random() - .5) *
            .04,

        drift:
            Math.random() *
            Math.PI *
            2

    });
}


/* ============================================================
   CONTINUOUS ATMOSPHERIC PARTICLES
============================================================ */

function createAmbientParticles() {

    if (
        candlesBlown
    ) {

        return;
    }


    for (
        let i = 0;
        i < 2;
        i++
    ) {

        createParticle(

            window.innerWidth / 2 +
            (Math.random() - .5) *
            500,

            window.innerHeight *
            .65 +
            Math.random() *
            120,

            {

                vx:
                    (Math.random() - .5) *
                    .25,

                vy:
                    -(Math.random() *
                    .5 +
                    .15),

                size:
                    Math.random() *
                    1.5 +
                    .4,

                decay:
                    .004,

                type:
                    "gold"

            }
        );
    }
}


/* ============================================================
   PARTICLE ANIMATION
============================================================ */

function animateParticles() {

    if (!particleCtx) {
        return;
    }

    particleCtx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    createAmbientParticles();


    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            particles[i];


        p.x +=
            p.vx +
            Math.sin(p.drift) *
            .15;


        p.y +=
            p.vy;


        p.drift +=
            .015;


        p.rotation +=
            p.rotationSpeed;


        p.life -=
            p.decay;


        if (
            p.life <= 0
        ) {

            particles.splice(
                i,
                1
            );

            continue;
        }


        particleCtx.save();


        particleCtx.translate(
            p.x,
            p.y
        );


        particleCtx.rotate(
            p.rotation
        );


        const alpha =
            p.life *
            .8;


        if (
            p.type === "gold"
        ) {

            particleCtx.fillStyle =
                `rgba(255,215,130,${alpha})`;

        } else {

            particleCtx.fillStyle =
                `rgba(185,220,255,${alpha})`;

        }


        particleCtx.shadowBlur =
            8;

        particleCtx.shadowColor =
            particleCtx.fillStyle;


        particleCtx.beginPath();

        particleCtx.arc(
            0,
            0,
            p.size,
            0,
            Math.PI * 2
        );

        particleCtx.fill();


        particleCtx.restore();

    }


    requestAnimationFrame(
        animateParticles
    );
}


animateParticles();


/* ============================================================
   AUDIO
============================================================ */

async function startMusic() {

    if (!birthdayMusic) {
        return;
    }

    try {

        birthdayMusic.volume =
            0;

        await birthdayMusic.play();


        let volume =
            0;


        const fade =
            setInterval(
                () => {

                    volume +=
                        .025;

                    birthdayMusic.volume =
                        Math.min(
                            volume,
                            .75
                        );


                    if (
                        volume >= .75
                    ) {

                        clearInterval(
                            fade
                        );
                    }

                },
                80
            );

    } catch (error) {

        console.log(
            "Music could not start automatically.",
            error
        );

    }
}


/* ============================================================
   START EXPERIENCE
============================================================ */

function beginExperience() {

    if (
        birthdayStarted
    ) {

        return;
    }


    birthdayStarted = true;


    if (audioOverlay) {

        audioOverlay.classList.add(
            "hidden"
        );

    }


    setTimeout(
        () => {

            if (introScene) {

                introScene.classList.add(
                    "active"
                );

            }

        },
        300
    );


    startMusic();

}


if (startExperience) {

    startExperience.addEventListener(
        "click",
        beginExperience
    );

}


/* ============================================================
   ENTER BIRTHDAY DIMENSION
============================================================ */

function enterDimension() {

    if (!introScene || !celebrationScene) {
        return;
    }


    introScene.classList.remove(
        "active"
    );


    setTimeout(
        () => {

            celebrationScene.classList.add(
                "active"
            );

        },
        900
    );

}


if (enterBirthday) {

    enterBirthday.addEventListener(
        "click",
        enterDimension
    );

}


/* ============================================================
   CAKE CLICK / TAP
============================================================ */

function blowCandles() {

    if (
        candlesBlown
    ) {

        return;
    }


    candlesBlown = true;


    if (cakeArea) {

        cakeArea.classList.add(
            "blown"
        );

    }


    const controls =
        document.getElementById(
            "blowControls"
        );


    if (controls) {

        controls.style.opacity =
            "0";

        controls.style.pointerEvents =
            "none";

    }


    stopMicrophone();


    createCakeBurst();


    setTimeout(
        () => {

            triggerBlackout();

        },
        900
    );

}


if (cake) {

    cake.addEventListener(
        "click",
        blowCandles
    );


    cake.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                blowCandles();

            }

        }
    );

}


if (tapButton) {

    tapButton.addEventListener(
        "click",
        blowCandles
    );

}


/* ============================================================
   CAKE PARTICLE BURST
============================================================ */

function createCakeBurst() {

    if (!cake) {
        return;
    }


    const rect =
        cake.getBoundingClientRect();


    const centerX =
        rect.left +
        rect.width / 2;


    const centerY =
        rect.top +
        rect.height / 2;


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            2 +
            1;


        createParticle(

            centerX,

            centerY,

            {

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                size:
                    Math.random() *
                    2.5 +
                    .5,

                decay:
                    .015,

                type:
                    i % 2 === 0
                        ? "gold"
                        : "star"

            }
        );

    }

}


/* ============================================================
   MICROPHONE
============================================================ */

async function startMicrophone() {

    if (
        microphoneActive
    ) {

        stopMicrophone();

        return;
    }


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        if (micStatus) {

            micStatus.textContent =
                "Microphone unavailable — tap the cake instead.";

            micStatus.classList.add(
                "visible"
            );

        }

        return;
    }


    try {

        microphoneStream =
            await navigator.mediaDevices.getUserMedia(
                {
                    audio: true
                }
            );


        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        analyser =
            audioContext.createAnalyser();


        analyser.fftSize =
            512;


        microphoneSource =
            audioContext.createMediaStreamSource(
                microphoneStream
            );


        microphoneSource.connect(
            analyser
        );


        microphoneActive =
            true;


        if (micStatus) {

            micStatus.textContent =
                "Listening… blow toward your microphone";

            micStatus.classList.add(
                "visible"
            );

        }


        if (micButton) {

            const label =
                micButton.querySelector(
                    "span:last-child"
                );

            if (label) {

                label.textContent =
                    "Microphone listening";

            }

        }


        detectBlow();


    } catch (error) {

        console.log(
            "Microphone permission error:",
            error
        );


        if (micStatus) {

            micStatus.textContent =
                "Microphone unavailable — tap the cake instead.";

            micStatus.classList.add(
                "visible"
            );

        }

    }

}


if (micButton) {

    micButton.addEventListener(
        "click",
        startMicrophone
    );

}


/* ============================================================
   BLOW DETECTION
============================================================ */

function detectBlow() {

    if (
        !microphoneActive ||
        candlesBlown ||
        !analyser
    ) {

        return;
    }


    const data =
        new Uint8Array(
            analyser.fftSize
        );


    analyser.getByteTimeDomainData(
        data
    );


    let sum =
        0;


    for (
        let i = 0;
        i < data.length;
        i++
    ) {

        const normalized =
            (data[i] - 128) / 128;


        sum +=
            normalized *
            normalized;

    }


    const rms =
        Math.sqrt(
            sum / data.length
        );


    if (
        rms >
        CANDLE_BLOW_THRESHOLD
    ) {

        blowCandles();

        return;
    }


    microphoneAnimation =
        requestAnimationFrame(
            detectBlow
        );

}


/* ============================================================
   STOP MICROPHONE
============================================================ */

function stopMicrophone() {

    microphoneActive =
        false;


    if (
        microphoneAnimation
    ) {

        cancelAnimationFrame(
            microphoneAnimation
        );

        microphoneAnimation =
            null;
    }


    if (
        microphoneStream
    ) {

        microphoneStream
            .getTracks()
            .forEach(
                track =>
                    track.stop()
            );

        microphoneStream =
            null;
    }


    if (
        microphoneSource
    ) {

        microphoneSource.disconnect();

        microphoneSource =
            null;
    }


    if (
        audioContext
    ) {

        audioContext.close();

        audioContext =
            null;
    }

}


/* ============================================================
   BLACKOUT
============================================================ */

function triggerBlackout() {

    fadeMusicDown();


    if (blackout) {

        blackout.classList.add(
            "active"
        );

    }


    setTimeout(
        () => {

            launchFinalCelebration();

        },
        BLACKOUT_DURATION
    );

}


/* ============================================================
   MUSIC FADE DOWN
============================================================ */

function fadeMusicDown() {

    if (!birthdayMusic) {
        return;
    }


    const startVolume =
        birthdayMusic.volume;


    let volume =
        startVolume;


    const fade =
        setInterval(
            () => {

                volume -=
                    .035;


                birthdayMusic.volume =
                    Math.max(
                        volume,
                        0
                    );


                if (
                    volume <= 0
                ) {

                    clearInterval(
                        fade
                    );

                }

            },
            50
        );

}


/* ============================================================
   FINAL CELEBRATION
============================================================ */

function launchFinalCelebration() {

    setTimeout(
        () => {

            if (blackout) {

                blackout.classList.remove(
                    "active"
                );

            }


            if (finalGlow) {

                finalGlow.classList.add(
                    "active"
                );

            }


            if (celebrationScene) {

                celebrationScene.classList.remove(
                    "active"
                );

            }


            if (finalScene) {

                finalScene.classList.add(
                    "active"
                );

            }


            startMusic();


            setTimeout(
                launchFireworkSequence,
                250
            );


            setTimeout(
                launchConfetti,
                500
            );


            /*
                IMPORTANT:
                After the final birthday message has
                time to breathe, show the final
                transition and its button.
            */

            setTimeout(
                showReasonsTransition,
                REASONS_DELAY
            );

        },
        350
    );

}


/* ============================================================
   FINAL TRANSITION
============================================================ */

function showReasonsTransition() {

    if (!reasonsTransition) {

        console.log(
            "Final transition element not found."
        );

        return;
    }


    reasonsTransition.classList.add(
        "show"
    );

}


/* ============================================================
   FINAL BUTTON
============================================================ */

if (reasonsButton) {

    reasonsButton.addEventListener(
        "click",
        () => {

            /*
                Prevent accidental double clicks.
            */

            reasonsButton.disabled =
                true;


            /*
                Small fade before navigation.
            */

            reasonsTransition.classList.add(
                "leaving"
            );


            setTimeout(
                () => {

                    /*
                        Static hosting / GitHub Pages:
                        return to the beginning of
                        the birthday experience.
                    */

                    window.location.href =
                        "index.html";

                },
                350
            );

        }
    );

}


/* ============================================================
   FIREWORK SYSTEM
============================================================ */

const fireworks = [];

const fireworkParticles = [];


function launchFirework(
    x,
    y,
    targetY,
    type = "gold"
) {

    fireworks.push({

        x,

        y,

        targetY,

        speed:
            8 +
            Math.random() *
            3,

        type,

        trail: []

    });

}


/* ============================================================
   FIREWORK PARTICLES
============================================================ */

function explodeFirework(
    firework
) {

    const count =
        85 +
        Math.floor(
            Math.random() *
            45
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const speed =
            Math.random() *
            5 +
            2;


        fireworkParticles.push({

            x:
                firework.x,

            y:
                firework.y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            gravity:
                .035,

            friction:
                .985,

            life:
                1,

            decay:
                Math.random() *
                .012 +
                .008,

            size:
                Math.random() *
                2.2 +
                .7,

            type:
                firework.type

        });

    }

}


/* ============================================================
   FIREWORK ANIMATION
============================================================ */

function animateFireworks() {

    if (!fireworkCtx) {
        return;
    }


    fireworkCtx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    /*
        Rockets.
    */

    for (
        let i = fireworks.length - 1;
        i >= 0;
        i--
    ) {

        const rocket =
            fireworks[i];


        rocket.y -=
            rocket.speed;


        rocket.speed *=
            .992;


        rocket.trail.push({
            x: rocket.x,
            y: rocket.y
        });


        if (
            rocket.trail.length >
            8
        ) {

            rocket.trail.shift();

        }


        /*
            Draw trail.
        */

        fireworkCtx.beginPath();

        rocket.trail.forEach(
            (point, index) => {

                if (
                    index === 0
                ) {

                    fireworkCtx.moveTo(
                        point.x,
                        point.y
                    );

                } else {

                    fireworkCtx.lineTo(
                        point.x,
                        point.y
                    );

                }

            }
        );


        fireworkCtx.strokeStyle =
            rocket.type === "gold"
                ? "rgba(255,213,120,.65)"
                : "rgba(100,190,255,.65)";


        fireworkCtx.lineWidth =
            2;


        fireworkCtx.stroke();


        if (
            rocket.y <=
            rocket.targetY
        ) {

            explodeFirework(
                rocket
            );


            fireworks.splice(
                i,
                1
            );

        }

    }


    /*
        Explosion particles.
    */

    for (
        let i =
            fireworkParticles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            fireworkParticles[i];


        p.vx *=
            p.friction;


        p.vy =
            p.vy *
            p.friction +
            p.gravity;


        p.x +=
            p.vx;


        p.y +=
            p.vy;


        p.life -=
            p.decay;


        if (
            p.life <= 0
        ) {

            fireworkParticles.splice(
                i,
                1
            );

            continue;
        }


        fireworkCtx.beginPath();


        fireworkCtx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );


        const alpha =
            Math.max(
                p.life,
                0
            );


        fireworkCtx.fillStyle =
            p.type === "gold"

                ? `rgba(255,215,130,${alpha})`

                : `rgba(75,180,255,${alpha})`;


        fireworkCtx.shadowBlur =
            14;


        fireworkCtx.shadowColor =
            fireworkCtx.fillStyle;


        fireworkCtx.fill();


        fireworkCtx.shadowBlur =
            0;

    }


    requestAnimationFrame(
        animateFireworks
    );

}


animateFireworks();


/* ============================================================
   FIREWORK SEQUENCE
============================================================ */

function launchFireworkSequence() {

    const width =
        window.innerWidth;

    const height =
        window.innerHeight;


    const positions = [

        {
            delay: 0,
            x: width * .23,
            y: height * .32,
            type: "gold"
        },

        {
            delay: 500,
            x: width * .75,
            y: height * .27,
            type: "blue"
        },

        {
            delay: 1100,
            x: width * .48,
            y: height * .21,
            type: "gold"
        },

        {
            delay: 1750,
            x: width * .15,
            y: height * .20,
            type: "blue"
        },

        {
            delay: 2250,
            x: width * .85,
            y: height * .38,
            type: "gold"
        },

        {
            delay: 2900,
            x: width * .50,
            y: height * .16,
            type: "blue"
        },

        {
            delay: 3600,
            x: width * .32,
            y: height * .25,
            type: "gold"
        },

        {
            delay: 4200,
            x: width * .68,
            y: height * .19,
            type: "blue"
        },

        {
            delay: 4900,
            x: width * .50,
            y: height * .12,
            type: "gold"
        }

    ];


    positions.forEach(
        item => {

            setTimeout(
                () => {

                    launchFirework(

                        item.x,

                        height,

                        item.y,

                        item.type

                    );

                },

                item.delay
            );

        }
    );

}


/* ============================================================
   CONFETTI
============================================================ */

function launchConfetti() {

    if (!confettiContainer) {
        return;
    }


    const amount =
        window.innerWidth < 600
            ? 90
            : 150;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.style.left =
            Math.random() *
            100 +
            "%";


        piece.style.width =
            (
                Math.random() *
                7 +
                4
            ) +
            "px";


        piece.style.height =
            (
                Math.random() *
                10 +
                7
            ) +
            "px";


        piece.style.background =
            [
                "#f3cb70",
                "#70bfff",
                "#ffffff",
                "#9edcff"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];


        piece.style.animationDelay =
            (
                Math.random() *
                1.5
            ) +
            "s";


        piece.style.animationDuration =
            (
                Math.random() *
                2 +
                3
            ) +
            "s";


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        confettiContainer.appendChild(
            piece
        );


        setTimeout(
            () => {

                piece.remove();

            },
            6000
        );

    }

}


/* ============================================================
   EXTRA NAME SPARKLES
============================================================ */

function createNameSparkles() {

    const name =
        document.getElementById(
            "skyName"
        );


    if (!name) {
        return;
    }


    const rect =
        name.getBoundingClientRect();


    for (
        let i = 0;
        i < 50;
        i++
    ) {

        setTimeout(
            () => {

                createParticle(

                    rect.left +
                    Math.random() *
                    rect.width,

                    rect.top +
                    Math.random() *
                    rect.height,

                    {

                        vx:
                            (Math.random() - .5) *
                            .8,

                        vy:
                            (Math.random() - .5) *
                            .8,

                        size:
                            Math.random() *
                            2 +
                            .5,

                        decay:
                            .01,

                        type:
                            i % 2 === 0
                                ? "gold"
                                : "star"

                    }

                );

            },

            i * 50

        );

    }

}


/* ============================================================
   NAME SPARKLES AFTER FINAL REVEAL
============================================================ */

setTimeout(
    () => {

        if (
            finalScene &&
            finalScene.classList.contains(
                "active"
            )
        ) {

            createNameSparkles();

        }

    },
    4500
);


/* ============================================================
   INITIAL STATE
============================================================ */

if (introScene) {

    introScene.classList.remove(
        "active"
    );

}


if (celebrationScene) {

    celebrationScene.classList.remove(
        "active"
    );

}


if (finalScene) {

    finalScene.classList.remove(
        "active"
    );

}


if (reasonsTransition) {

    reasonsTransition.classList.remove(
        "show"
    );

}


/* ============================================================
   CLEANUP
============================================================ */

window.addEventListener(
    "beforeunload",
    () => {

        stopMicrophone();

        if (
            birthdayMusic
        ) {

            birthdayMusic.pause();

        }

    }
);