/* ========================================================
   MESSAGE GARDEN — COMPLETE
   VIDEO MEMORIES
   MESSAGE → HEART ROOM NAVIGATION
======================================================== */

(function() {

    'use strict';


    
    /* ========================================================
       ELEMENTS
    ======================================================== */

    const gardenVideo =
        document.getElementById('gardenVideo');

    const fireflies =
        document.getElementById('fireflies');

    const memories =
        document.querySelectorAll('.memory');

    const memoryViewer =
        document.getElementById('memoryViewer');

    const closeMemory =
        document.getElementById('closeMemory');

    const viewerVideo =
        document.getElementById('viewerVideo');

    const viewerTitle =
        document.getElementById('viewerTitle');

    const viewerCaption =
        document.getElementById('viewerCaption');

    const musicText =
        document.getElementById('musicText');

    const memoryAudio =
        document.getElementById('memoryAudio');

    const memoryNumber =
        document.getElementById('memoryNumber');

    const memoryTotal =
        document.getElementById('memoryTotal');

    const finalMessage =
        document.getElementById('finalMessage');


    /* Continue button inside FINAL MESSAGE */

    const continueButton =
        document.querySelector('.continue-button');


    /* ========================================================
       VIDEO AUTOPLAY
    ======================================================== */

    if (gardenVideo) {

        gardenVideo.muted = true;

        gardenVideo.play().catch(() => {

            document.addEventListener(
                'click',
                () => {

                    gardenVideo
                        .play()
                        .catch(() => {});

                },
                { once: true }
            );

        });

    }


    /* ========================================================
       CREATE FIREFLIES
    ======================================================== */

    function createFireflies() {

        if (!fireflies) return;


        const amount =
            window.innerWidth < 700
                ? 35
                : 65;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const firefly =
                document.createElement('div');


            firefly.className =
                'firefly';


            firefly.style.left =
                Math.random() * 100 + '%';


            firefly.style.top =
                35 + Math.random() * 60 + '%';


            firefly.style.setProperty(
                '--move-x',
                (Math.random() * 100 - 50) + 'px'
            );


            firefly.style.setProperty(
                '--move-y',
                (Math.random() * -100) + 'px'
            );


            firefly.style.setProperty(
                '--duration',
                (4 + Math.random() * 7) + 's'
            );


            firefly.style.setProperty(
                '--delay',
                (Math.random() * -8) + 's'
            );


            fireflies.appendChild(
                firefly
            );

        }

    }


    createFireflies();


    /* ========================================================
       MEMORY COUNT
    ======================================================== */

    const totalMemories =
        memories.length;


    if (memoryTotal) {

        memoryTotal.textContent =
            totalMemories;

    }


    const viewedMemories =
        new Set();


    /* ========================================================
       KEEP MEMORY VIDEOS LOOPING
    ======================================================== */

    memories.forEach(memory => {

        const video =
            memory.querySelector('.memory-video');


        if (!video) return;


        video.muted = true;

        video.loop = true;

        video.playsInline = true;


        video.play().catch(() => {

            document.addEventListener(
                'click',
                () => {

                    video
                        .play()
                        .catch(() => {});

                },
                { once: true }
            );

        });

    });


    /* ========================================================
       OPEN MEMORY
    ======================================================== */

    memories.forEach(memory => {

        memory.addEventListener(
            'click',
            () => {

                openMemory(memory);

            }
        );

    });


    function openMemory(memory) {

        const video =
            memory.querySelector('.memory-video');


        const title =
            memory.dataset.title;


        const caption =
            memory.dataset.caption;


        const song =
            memory.dataset.song;


        const index =
            memory.dataset.index;


        /* ====================================================
           SET VIEWER VIDEO
        ==================================================== */

        if (
            video &&
            viewerVideo
        ) {

            viewerVideo.pause();

            viewerVideo.src =
                video.currentSrc ||
                video.src ||
                video.querySelector('source')?.src ||
                '';


            viewerVideo.currentTime =
                video.currentTime;


            viewerVideo.muted =
                true;


            viewerVideo.loop =
                true;


            viewerVideo.playsInline =
                true;


            viewerVideo.load();


            viewerVideo.play().catch(() => {});

        }


        /* ====================================================
           SET TITLE
        ==================================================== */

        if (viewerTitle) {

            viewerTitle.textContent =
                title;

        }


        /* ====================================================
           SET CAPTION
        ==================================================== */

        if (viewerCaption) {

            viewerCaption.textContent =
                caption;

        }


        /* ====================================================
           PLAY MEMORY SONG
        ==================================================== */

        if (
            song &&
            memoryAudio
        ) {

            memoryAudio.pause();

            memoryAudio.currentTime =
                0;

            memoryAudio.src =
                song;

            memoryAudio.volume =
                0.55;


            if (musicText) {

                musicText.textContent =
                    'A song chosen for this memory';

            }


            memoryAudio.play().catch(() => {

                if (musicText) {

                    musicText.textContent =
                        'Tap again to play the memory song';

                }

            });

        }


        /* ====================================================
           MARK MEMORY AS VIEWED
        ==================================================== */

        viewedMemories.add(index);


        memory.classList.add(
            'visited'
        );


        if (memoryNumber) {

            memoryNumber.textContent =
                viewedMemories.size;

        }


        /* ====================================================
           OPEN VIEWER
        ==================================================== */

        if (memoryViewer) {

            memoryViewer.classList.add(
                'open'
            );

        }


        document.body.style.overflow =
            'hidden';

    }


    /* ========================================================
       CLOSE MEMORY
    ======================================================== */

    if (closeMemory) {

        closeMemory.addEventListener(
            'click',
            closeViewer
        );

    }


    if (memoryViewer) {

        memoryViewer.addEventListener(
            'click',
            event => {

                if (
                    event.target ===
                    memoryViewer
                ) {

                    closeViewer();

                }

            }
        );

    }


    function closeViewer() {

        /* ====================================================
           CLOSE VIEWER
        ==================================================== */

        if (memoryViewer) {

            memoryViewer.classList.remove(
                'open'
            );

        }


        /* ====================================================
           STOP VIEWER VIDEO
        ==================================================== */

        if (viewerVideo) {

            viewerVideo.pause();

            viewerVideo.removeAttribute(
                'src'
            );

            viewerVideo.load();

        }


        /* ====================================================
           STOP MEMORY SONG
        ==================================================== */

        if (memoryAudio) {

            memoryAudio.pause();

            memoryAudio.currentTime =
                0;

        }


        document.body.style.overflow =
            'hidden';


        /* ====================================================
           CHECK ALL MEMORIES
        ==================================================== */

        checkAllMemories();

    }


    /* ========================================================
       ALL MEMORIES VIEWED
    ======================================================== */

    function checkAllMemories() {

        if (
            viewedMemories.size ===
            totalMemories
        ) {

            setTimeout(() => {

                if (finalMessage) {

                    finalMessage.classList.add(
                        'show'
                    );

                }

            }, 900);

        }

    }


    /* ========================================================
       KEYBOARD SUPPORT
    ======================================================== */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key ===
                'Escape'
            ) {

                if (
                    memoryViewer &&
                    memoryViewer.classList.contains(
                        'open'
                    )
                ) {

                    closeViewer();

                }

            }

        }
    );


    /* ========================================================
       MESSAGE GARDEN → HEART ROOM
    ======================================================== */

    if (continueButton) {

        continueButton.addEventListener(
            'click',
            function(event) {

                event.preventDefault();


                /* Prevent double-clicking */

                continueButton.style.pointerEvents =
                    'none';


                /* Cinematic fade */

                document.body.classList.add(
                    'page-leaving'
                );


                /* Go to Heart Room */

                setTimeout(() => {

                    window.location.href =
                        './ heart.html';

                }, 1000);

            }
        );

    } else {

        console.error(
            '❌ continueButton not found. Check message.html.'
        );

    }


    /* ========================================================
       MESSAGE GARDEN READY
    ======================================================== */

    console.log(
        '✅ Message Garden loaded.'
    );

    console.log(
        '❤️ Heart Room navigation connected.'
    );

})();