/* ========================================================
   MESSAGE GARDEN + HEART ROOM — COMPLETE
   MESSAGE → HEART ROOM NAVIGATION FIXED
   8TH LIGHT WHITE DOT FIXED
   BACKGROUND VIDEO ADDED (replaces static image)
======================================================== */

(function () {

    'use strict';


    /* ========================================================
       MESSAGE GARDEN
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

    const viewerImage =
        document.getElementById('viewerImage');

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

                    gardenVideo.play().catch(() => {});

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
            window.innerWidth < 700 ? 35 : 65;

        for (let i = 0; i < amount; i++) {

            const firefly =
                document.createElement('div');

            firefly.className = 'firefly';

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

            fireflies.appendChild(firefly);

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

        const image =
            memory.querySelector('img');

        const title =
            memory.dataset.title;

        const caption =
            memory.dataset.caption;

        const song =
            memory.dataset.song;

        const index =
            memory.dataset.index;


        if (image && viewerImage) {

            viewerImage.src =
                image.src;

        }


        if (viewerTitle) {

            viewerTitle.textContent =
                title;

        }


        if (viewerCaption) {

            viewerCaption.textContent =
                caption;

        }


        /* PLAY MEMORY SONG */

        if (song && memoryAudio) {

            memoryAudio.pause();

            memoryAudio.currentTime = 0;

            memoryAudio.src = song;

            memoryAudio.volume = 0.55;

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


        /* MARK MEMORY AS VIEWED */

        viewedMemories.add(index);

        memory.classList.add('visited');


        if (memoryNumber) {

            memoryNumber.textContent =
                viewedMemories.size;

        }


        /* OPEN VIEWER */

        if (memoryViewer) {

            memoryViewer.classList.add('open');

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
                    event.target === memoryViewer
                ) {

                    closeViewer();

                }

            }
        );

    }


    function closeViewer() {

        if (memoryViewer) {

            memoryViewer.classList.remove('open');

        }


        if (memoryAudio) {

            memoryAudio.pause();

            memoryAudio.currentTime = 0;

        }


        document.body.style.overflow =
            'hidden';


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

                    finalMessage.classList.add('show');


                    const persistentNav =
                        document.querySelector('.heart-navigation');

                    if (persistentNav) {

                        persistentNav.style.display =
                            'none';

                    }

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

            if (event.key === 'Escape') {

                if (
                    memoryViewer &&
                    memoryViewer.classList.contains('open')
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
            function (event) {

                event.preventDefault();

                continueButton.style.pointerEvents =
                    'none';

                document.body.classList.add(
                    'page-leaving'
                );


                setTimeout(() => {

                    /*
                       FIXED:
                       Removed unwanted space
                       from "./ heart.html"
                    */

                    window.location.href =
                        './heart.html';

                }, 1000);

            }
        );

    }


    console.log(
        '✅ Message Garden loaded.'
    );


    /* ========================================================
       HEART ROOM
       PAGE 4
    ======================================================== */


    /*
       Only run Heart Room code when
       heartCanvas actually exists.
    */

    const canvas =
        document.getElementById('heartCanvas');


    if (!canvas) {

        return;

    }


    /* ========================================================
       BASIC SETUP
    ======================================================== */

    if (
        typeof THREE === 'undefined'
    ) {

        console.error(
            '❌ Three.js is not loaded.'
        );

        return;

    }


    if (
        typeof gsap === 'undefined'
    ) {

        console.error(
            '❌ GSAP is not loaded.'
        );

        return;

    }


    const scene =
        new THREE.Scene();


    /* ========================================================
       BACKGROUND VIDEO (replaces static image)
    ======================================================== */

    const bgVideo = document.getElementById('bgVideo');

    if (bgVideo) {

        bgVideo.muted = true;
        bgVideo.loop = true;
        bgVideo.playsInline = true;
        bgVideo.play().catch(() => {});

        const videoTexture = new THREE.VideoTexture(bgVideo);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBFormat;

        scene.background = videoTexture;

    } else {

        console.warn('bgVideo element not found – using black background');

    }


    /* ========================================================
       CAMERA
    ======================================================== */

    const camera =
        new THREE.PerspectiveCamera(
            50,
            window.innerWidth /
                window.innerHeight,
            0.1,
            1000
        );


    camera.position.set(
        0,
        0,
        12
    );


    /* ========================================================
       RENDERER
    ======================================================== */

    const renderer =
        new THREE.WebGLRenderer({

            canvas: canvas,

            antialias: true,

            alpha: true

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.outputEncoding =
        THREE.sRGBEncoding;


    /* ========================================================
       LIGHTING
    ======================================================== */

    const ambientLight =
        new THREE.AmbientLight(
            0x4777aa,
            0.45
        );

    scene.add(
        ambientLight
    );


    const blueLight =
        new THREE.PointLight(
            0x238cff,
            5,
            30
        );


    blueLight.position.set(
        0,
        1,
        4
    );


    scene.add(
        blueLight
    );


    const softLight =
        new THREE.PointLight(
            0x8bc9ff,
            2,
            20
        );


    softLight.position.set(
        -5,
        3,
        2
    );


    scene.add(
        softLight
    );


    /* ========================================================
       HEART SHAPE
    ======================================================== */

    const heartShape =
        new THREE.Shape();


    heartShape.moveTo(
        0,
        1.5
    );


    heartShape.bezierCurveTo(
        -2.2,
        3.2,
        -4.5,
        1.3,
        -4.5,
        -0.4
    );


    heartShape.bezierCurveTo(
        -4.5,
        -2.7,
        -1.8,
        -4.0,
        0,
        -5.8
    );


    heartShape.bezierCurveTo(
        1.8,
        -4.0,
        4.5,
        -2.7,
        4.5,
        -0.4
    );


    heartShape.bezierCurveTo(
        4.5,
        1.3,
        2.2,
        3.2,
        0,
        1.5
    );


    const heartGeometry =
        new THREE.ExtrudeGeometry(
            heartShape,
            {
                depth: 1.3,

                bevelEnabled: true,

                bevelSegments: 8,

                steps: 2,

                bevelSize: 0.25,

                bevelThickness: 0.25
            }
        );


    heartGeometry.center();


    const heartMaterial =
        new THREE.MeshPhysicalMaterial({

            color: 0x176dcc,

            emissive: 0x063b72,

            emissiveIntensity: 1.5,

            metalness: 0.15,

            roughness: 0.22,

            transparent: true,

            opacity: 0.94

        });


    const heart =
        new THREE.Mesh(
            heartGeometry,
            heartMaterial
        );


    heart.scale.set(
        0.72,
        0.72,
        0.72
    );


    heart.rotation.x =
        0;


    scene.add(
        heart
    );


    /* ========================================================
       HEART GLOW
    ======================================================== */

    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color: 0x278eff,

            transparent: true,

            opacity: 0.12,

            blending:
                THREE.AdditiveBlending

        });


    const heartGlow =
        new THREE.Mesh(
            heartGeometry.clone(),
            glowMaterial
        );


    heartGlow.scale.set(
        0.82,
        0.82,
        0.82
    );


    heartGlow.rotation.x =
        0;


    scene.add(
        heartGlow
    );


    /* ========================================================
       PARTICLE FIELD
    ======================================================== */

    const particleCount =
        1200;


    const particleGeometry =
        new THREE.BufferGeometry();


    const particlePositions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            8 +
            Math.random() * 15;


        const theta =
            Math.random() *
            Math.PI *
            2;


        const phi =
            Math.acos(
                (Math.random() * 2) - 1
            );


        particlePositions[
            i * 3
        ] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);


        particlePositions[
            i * 3 + 1
        ] =
            radius *
            Math.cos(phi);


        particlePositions[
            i * 3 + 2
        ] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);

    }


    particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0x72bfff,

            size: 0.035,

            transparent: true,

            opacity: 0.55,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );


    scene.add(
        particles
    );


    /* ========================================================
       CLICKABLE LIGHTS
    ======================================================== */

    const lights = [];

    const raycaster =
        new THREE.Raycaster();

    const mouse =
        new THREE.Vector2();


    /* ========================================================
       8 REASONS
    ======================================================== */

    const reasons = [

        "You didn't just become a part of my life somehow you became a part of the way my heart understands life.",

        "You have seen pieces of me that I don't show the world, and somehow, you made me feel that those pieces were worth loving too.",

        "Somewhere between all our little moments, you stopped being someone I loved and became someone my heart couldn't imagine living without.",

        "You became my favorite thought in the middle of ordinary days and my most comforting thought at the end of difficult ones.",

        'The way ordinary moments somehow become my favorite moments when I\'m with you.',

        "How you can make me laugh even when I don't feel like smiling.",

        'The patience you have with me, especially on the days when I need it most.',

        'You are one of those beautiful things in my life that I never want to take for granted, no matter how familiar your presence becomes.'

    ];


    /* ========================================================
       LIGHT POSITIONS
       
       IMPORTANT:
       The 8th light has been moved forward
       from Z = 0.6 to Z = 1.8.

       This keeps its white center visible
       in front of the heart.
    ======================================================== */

    const lightPositions = [

        [-3.0, 1.2, 1.0],

        [3.0, 1.7, 0.8],

        [-3.4, -1.2, 1.5],

        [3.2, -1.0, 1.3],

        [-2.0, 3.0, 0.5],

        [2.1, 3.0, 0.4],

        [-2.4, -3.0, 0.7],

        [2.5, -2.8, 1.8]

    ];


    /* ========================================================
       CREATE LIGHT
    ======================================================== */

    function createLight(
        position,
        index
    ) {

        /*
           MAIN WHITE/BLUE DOT
        */

        const geometry =
            new THREE.SphereGeometry(
                0.075,
                16,
                16
            );


        const material =
            new THREE.MeshBasicMaterial({

                color: 0xffffff,

                transparent: true,

                opacity: 1,

            depthTest: false,

        depthWrite: false

            });


        const light =
            new THREE.Mesh(
                geometry,
                material
            );


        light.position.set(
            position[0],
            position[1],
            position[2]
        );


        light.userData.index =
            index;


        light.userData.active =
            true;


        scene.add(
            light
        );


        lights.push(
            light
        );


        /* ====================================================
           HALO
        ==================================================== */

        const haloGeometry =
            new THREE.SphereGeometry(
                0.22,
                16,
                16
            );


        const haloMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x4da8ff,

                transparent: true,

                opacity: 0.08,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false

            });


        const halo =
            new THREE.Mesh(
                haloGeometry,
                haloMaterial
            );


        light.add(
            halo
        );


        /* ====================================================
           INDIVIDUAL POINT LIGHT
        ==================================================== */

        const pointLight =
            new THREE.PointLight(
                0x68baff,
                0.8,
                4
            );


        light.add(
            pointLight
        );


        /* ====================================================
           GENTLE MOVEMENT
        ==================================================== */

        gsap.to(
            light.position,
            {

                y:
                    light.position.y +
                    0.25,

                duration:
                    2.5 +
                    Math.random() * 2,

                repeat: -1,

                yoyo: true,

                ease: 'sine.inOut',

                delay:
                    Math.random()

            }
        );


        return light;

    }


    /* ========================================================
       CREATE ALL 8 LIGHTS
    ======================================================== */

    lightPositions.forEach(
        (
            position,
            index
        ) => {

            createLight(
                position,
                index
            );

        }
    );


    /* ========================================================
       FLOATING RINGS
    ======================================================== */

    const rings = [];


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const ringGeometry =
            new THREE.TorusGeometry(
                3.2 + i * 0.7,
                0.006,
                8,
                120
            );


        const ringMaterial =
            new THREE.MeshBasicMaterial({

                color: 0x287fd1,

                transparent: true,

                opacity: 0.12,

                blending:
                    THREE.AdditiveBlending

            });


        const ring =
            new THREE.Mesh(
                ringGeometry,
                ringMaterial
            );


        ring.rotation.x =
            Math.PI / 2 +
            i * 0.35;


        ring.rotation.y =
            i * 0.45;


        scene.add(
            ring
        );


        rings.push(
            ring
        );

    }


    /* ========================================================
       CLICK / TOUCH HANDLER
    ======================================================== */

    let collected = 0;

    let isShowingReason = false;


    window.addEventListener(
        'pointerdown',
        onPointerDown
    );


    function onPointerDown(event) {

        mouse.x =
            (
                event.clientX /
                window.innerWidth
            ) * 2 - 1;


        mouse.y =
            -(
                event.clientY /
                window.innerHeight
            ) * 2 + 1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const intersects =
            raycaster.intersectObjects(
                lights
            );


        if (
            intersects.length === 0
        ) {

            return;

        }


        const selected =
            intersects[0].object;


        if (
            !selected.userData.active
        ) {

            return;

        }


        showReason(
            selected
        );

    }


    /* ========================================================
       SHOW REASON
    ======================================================== */

    function showReason(
        light
    ) {

        if (isShowingReason) {

            return;

        }


        isShowingReason =
            true;


        const index =
            light.userData.index;


        const reason =
            reasons[index];


        collected++;


        light.userData.active =
            false;


        /* ====================================================
           HIDE SELECTED LIGHT
        ==================================================== */

        gsap.to(
            light.scale,
            {

                x: 0,

                y: 0,

                z: 0,

                duration: 0.5,

                ease: 'power2.in'

            }
        );


        /* ====================================================
           UPDATE TEXT
        ==================================================== */

        const reasonNumber =
            document.getElementById(
                'reasonNumber'
            );


        const reasonText =
            document.getElementById(
                'reasonText'
            );


        const progressText =
            document.getElementById(
                'progressText'
            );


        if (reasonNumber) {

            reasonNumber.textContent =
                String(
                    collected
                ).padStart(
                    2,
                    '0'
                );

        }


        if (reasonText) {

            reasonText.textContent =
                reason;

        }


        if (progressText) {

            progressText.textContent =
                `${collected} / ${reasons.length}`;

        }


        /* ====================================================
           HIDE HINT
        ==================================================== */

        gsap.to(
            '#interactionHint',
            {

                opacity: 0,

                duration: 0.5

            }
        );


        /* ====================================================
           HEART GETS BRIGHTER
        ==================================================== */

        gsap.to(
            heartMaterial,
            {

                emissiveIntensity:
                    2.2 +
                    collected * 0.18,

                duration: 0.8,

                ease: 'power2.out'

            }
        );


        gsap.to(
            blueLight,
            {

                intensity:
                    5 +
                    collected * 0.8,

                duration: 0.8

            }
        );


        /* ====================================================
           CARD ENTRANCE
        ==================================================== */

        const container =
            document.getElementById(
                'reasonContainer'
            );


        if (container) {

            gsap.killTweensOf(
                container
            );


            gsap.set(
                container,
                {

                    opacity: 0,

                    scale: 0.92

                }
            );


            gsap.to(
                container,
                {

                    opacity: 1,

                    scale: 1,

                    duration: 0.7,

                    ease: 'power3.out'

                }
            );

        }


        /* ====================================================
           PARTICLE BURST
        ==================================================== */

        createBurst(
            light.position.clone()
        );


        /* ====================================================
           HEART PULSE
        ==================================================== */

        gsap.fromTo(
            heart.scale,
            {

                x: 0.72,

                y: 0.72,

                z: 0.72

            },
            {

                x: 0.78,

                y: 0.78,

                z: 0.78,

                duration: 0.35,

                yoyo: true,

                repeat: 1,

                ease: 'power2.out'

            }
        );


        /* ====================================================
           CLOSE REASON
        ==================================================== */

        setTimeout(
            () => {

                if (!container) {

                    isShowingReason =
                        false;

                    if (
                        collected >=
                        reasons.length
                    ) {

                        showFinal();

                    }

                    return;

                }


                gsap.to(
                    container,
                    {

                        opacity: 0,

                        scale: 0.96,

                        duration: 0.6,

                        onComplete: () => {

                            isShowingReason =
                                false;


                            if (
                                collected >=
                                reasons.length
                            ) {

                                showFinal();

                            } else {

                                gsap.to(
                                    '#interactionHint',
                                    {

                                        opacity: 0.7,

                                        duration: 0.5

                                    }
                                );

                            }

                        }

                    }
                );

            },
            4500
        );

    }


    /* ========================================================
       PARTICLE BURST
    ======================================================== */

    function createBurst(
        position
    ) {

        const count =
            70;


        const geometry =
            new THREE.BufferGeometry();


        const positions =
            new Float32Array(
                count * 3
            );


        const velocities = [];


        for (
            let i = 0;
            i < count;
            i++
        ) {

            positions[
                i * 3
            ] =
                position.x;


            positions[
                i * 3 + 1
            ] =
                position.y;


            positions[
                i * 3 + 2
            ] =
                position.z;


            velocities.push({

                x:
                    (
                        Math.random() -
                        0.5
                    ) * 0.08,

                y:
                    (
                        Math.random() -
                        0.5
                    ) * 0.08,

                z:
                    (
                        Math.random() -
                        0.5
                    ) * 0.08

            });

        }


        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(
                positions,
                3
            )
        );


        const material =
            new THREE.PointsMaterial({

                color: 0xa7dcff,

                size: 0.055,

                transparent: true,

                opacity: 0.9,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false

            });


        const burst =
            new THREE.Points(
                geometry,
                material
            );


        scene.add(
            burst
        );


        let progress =
            0;


        function animateBurst() {

            progress +=
                0.018;


            const array =
                geometry.attributes
                    .position.array;


            for (
                let i = 0;
                i < count;
                i++
            ) {

                array[
                    i * 3
                ] +=
                    velocities[i].x;


                array[
                    i * 3 + 1
                ] +=
                    velocities[i].y;


                array[
                    i * 3 + 2
                ] +=
                    velocities[i].z;

            }


            geometry.attributes
                .position
                .needsUpdate =
                true;


            material.opacity =
                0.9 *
                (
                    1 -
                    progress
                );


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    animateBurst
                );

            } else {

                scene.remove(
                    burst
                );


                geometry.dispose();

                material.dispose();

            }

        }


        animateBurst();

    }


    /* ========================================================
       FINAL MESSAGE
    ======================================================== */

    function showFinal() {

        gsap.to(
            '#interactionHint',
            {

                opacity: 0,

                duration: 0.5

            }
        );


        gsap.to(
            '#heartIntro',
            {

                opacity: 0,

                duration: 1

            }
        );


        gsap.to(
            '#finalMessage',
            {

                opacity: 1,

                duration: 2.5,

                delay: 0.7,

                ease: 'power2.out'

            }
        );


        /* MAXIMUM HEART GLOW */

        gsap.to(
            heartMaterial,
            {

                emissiveIntensity: 5,

                duration: 2.5,

                ease: 'power2.inOut'

            }
        );


        gsap.to(
            heartGlow.material,
            {

                opacity: 0.28,

                duration: 2.5

            }
        );


        /* BRIGHT ENVIRONMENT */

        gsap.to(
            blueLight,
            {

                intensity: 14,

                duration: 2

            }
        );


        setTimeout(
            () => {

                const nextPage =
                    document.getElementById(
                        'nextPage'
                    );


                if (!nextPage) {

                    return;

                }


                gsap.to(
                    nextPage,
                    {

                        opacity: 1,

                        y: 0,

                        duration: 1.5,

                        delay: 1,

                        ease: 'power3.out',

                        onStart: () => {

                            nextPage.style
                                .pointerEvents =
                                'auto';

                        }

                    }
                );

            },
            3500
        );

    }


    /* ========================================================
       ANIMATION LOOP
    ======================================================== */

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        /* HEART FLOATING */

        heart.position.y =
            Math.sin(
                time * 0.7
            ) * 0.12;


        heart.rotation.y =
            Math.sin(
                time * 0.25
            ) * 0.12;


        /* GLOW FOLLOWS HEART */

        heartGlow.position.copy(
            heart.position
        );


        heartGlow.rotation.copy(
            heart.rotation
        );


        /* PARTICLES */

        particles.rotation.y =
            time * 0.008;


        particles.rotation.x =
            Math.sin(
                time * 0.05
            ) * 0.05;


        /* RINGS */

        rings.forEach(
            (
                ring,
                index
            ) => {

                ring.rotation.z =
                    time *
                    (
                        0.03 +
                        index * 0.015
                    );

            }
        );


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    /* ========================================================
       RESIZE
    ======================================================== */

    window.addEventListener(
        'resize',
        () => {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );


            renderer.setPixelRatio(
                Math.min(
                    window.devicePixelRatio,
                    2
                )
            );

        }
    );


    /* ========================================================
       NEXT PAGE → LETTER
    ======================================================== */

    const letterButton =
        document.getElementById(
            'letterButton'
        );


    if (letterButton) {

        letterButton.addEventListener(
            'click',
            () => {

                document.body.style.transition =
                    'opacity 1.2s ease';


                document.body.style.opacity =
                    '0';


                setTimeout(
                    () => {

                        window.location.href =
                            'letter.html';

                    },
                    1200
                );

            }
        );

    }


    /* ========================================================
       SOUND BUTTON
    ======================================================== */

    const soundButton =
        document.getElementById(
            'soundButton'
        );


    let soundOn =
        false;


    if (soundButton) {

        soundButton.addEventListener(
            'click',
            () => {

                soundOn =
                    !soundOn;


                soundButton.textContent =
                    soundOn
                        ? '🔊'
                        : '♫';

            }
        );

    }


    console.log(
        '❤️ Heart Room loaded successfully.'
    );


})();