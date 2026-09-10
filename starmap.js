/* ========================================================
   PAGE 2 — STAR MAP
======================================================== */


/* ========================================================
   ELEMENTS
======================================================== */

const skyScene =
    document.getElementById("skyScene");

const skyVideo =
    document.getElementById("skyVideo");

const infoCard =
    document.getElementById("infoCard");

const infoTitle =
    document.getElementById("infoTitle");

const infoText =
    document.getElementById("infoText");

const closeInfo =
    document.getElementById("closeInfo");

const specialStar =
    document.getElementById("specialStar");

const loveMessage =
    document.getElementById("loveMessage");

const continueButton =
    document.getElementById("continueButton");


/* ========================================================
   MAKE SURE VIDEO PLAYS
======================================================== */

if (skyVideo) {

    skyVideo.muted = true;

    skyVideo.play().catch(() => {

        document.addEventListener(
            "click",
            () => {

                skyVideo
                    .play()
                    .catch(() => {});

            },
            {
                once: true
            }
        );

    });

}


/* ========================================================
   CONSTELLATIONS
======================================================== */

const constellations =
    document.querySelectorAll(
        ".constellation"
    );


constellations.forEach(
    constellation => {

        constellation.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                const title =
                    constellation.dataset.name;


                const text =
                    constellation.dataset.text;


                infoTitle.textContent =
                    title;


                infoText.textContent =
                    text;


                infoCard.classList.add(
                    "show"
                );


                loveMessage.classList.remove(
                    "show"
                );

            }
        );

    }
);


/* ========================================================
   CLOSE INFO
======================================================== */

closeInfo.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        infoCard.classList.remove(
            "show"
        );

    }
);


/* ========================================================
   SPECIAL STAR
======================================================== */

specialStar.addEventListener(
    "click",
    event => {

        event.stopPropagation();


        infoCard.classList.remove(
            "show"
        );


        loveMessage.classList.add(
            "show"
        );

    }
);



/* ========================================================
   CONTINUE → PAGE 3
======================================================== */

continueButton.addEventListener(
    "click",
    () => {

        continueButton.disabled =
            true;


        document.body.style.transition =
            "opacity 1.2s ease, transform 1.2s ease";


        document.body.style.opacity =
            "0";


        document.body.style.transform =
            "scale(1.03)";


        setTimeout(
            () => {

                window.location.href =
                    "message.html";

            },
            1200
        );

    }
);