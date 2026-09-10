/* ============================================================
   A THOUSAND LITTLE REASONS
   PAGE 9
============================================================ */


/* ============================================================
   ELEMENTS
============================================================ */

const stars =
    document.querySelectorAll(".reason-star");

const reasonMessage =
    document.getElementById("reasonMessage");

const reasonText =
    document.getElementById("reasonText");

const openedCount =
    document.getElementById("openedCount");

const finalMessage =
    document.getElementById("finalMessage");

const nextContainer =
    document.getElementById("nextContainer");

const nextButton =
    document.getElementById("nextButton");


/* ============================================================
   STATE
============================================================ */

let openedReasons = 0;

const totalReasons = stars.length;

let currentlyShowing = false;


/* ============================================================
   STAR CLICK
============================================================ */

stars.forEach(star => {

    star.addEventListener("click", () => {

        if (
            currentlyShowing ||
            star.classList.contains("opening") ||
            star.dataset.opened === "true"
        ) {
            return;
        }


        currentlyShowing = true;


        /*
            Mark the star as opened.
        */

        star.dataset.opened = "true";


        /*
            Make the star grow and disappear.
        */

        star.classList.add("opening");


        /*
            Get its reason.
        */

        const reason =
            star.dataset.reason;


        /*
            Small delay makes the
            disappearance feel magical.
        */

        setTimeout(() => {

            showReason(reason);

        }, 350);


        /*
            Remove the star completely
            after its animation.
        */

        setTimeout(() => {

            star.style.display = "none";

        }, 700);

    });

});


/* ============================================================
   SHOW REASON
============================================================ */

function showReason(reason) {

    reasonText.textContent =
        reason;


    reasonMessage.classList.add(
        "visible"
    );


    /*
        Count this reason.
    */

    openedReasons++;


    openedCount.textContent =
        openedReasons;


    /*
        Keep the message visible
        long enough to read.
    */

    setTimeout(() => {

        reasonMessage.classList.remove(
            "visible"
        );


        setTimeout(() => {

            currentlyShowing = false;


            /*
                If all ten stars
                have disappeared,
                finish the page.
            */

            if (
                openedReasons >=
                totalReasons
            ) {

                finishReasons();

            }

        }, 500);

    }, 3300);

}


/* ============================================================
   FINISH
============================================================ */

function finishReasons() {

    /*
        Wait slightly after
        the final reason closes.
    */

    setTimeout(() => {

        finalMessage.classList.add(
            "visible"
        );


        /*
            Show next button
            shortly after final
            message appears.
        */

        setTimeout(() => {

            nextContainer.classList.add(
                "visible"
            );

        }, 2200);

    }, 400);

}


/* ============================================================
   NEXT PAGE
============================================================ */

nextButton.addEventListener(
    "click",
    () => {

        /*
            Gentle transition.
        */

        document.body.style.transition =
            "opacity 1s ease";

        document.body.style.opacity =
            "0";


        setTimeout(() => {

            window.location.href =
                "./betterme.html";

        }, 900);

    }
);


/* ============================================================
   KEYBOARD ACCESSIBILITY
============================================================ */

stars.forEach(star => {

    star.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                star.click();

            }

        }
    );

});


/* ============================================================
   INITIAL STATE
============================================================ */

openedCount.textContent = "0";


/*
    Prevent browser focus outline
    from looking harsh while keeping
    keyboard accessibility.
*/

stars.forEach(star => {

    star.addEventListener(
        "focus",
        () => {

            star.style.outline =
                "none";

        }
    );

});