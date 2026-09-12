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

    const totalSections = sections.length;
    const progressTotal = document.querySelector(".progress-total");
    if (progressTotal) {
        progressTotal.textContent = totalSections;
    }

    if (video) {
        video.muted = true;
        video.play().catch(() => {});
    }

    function showSection(index) {
        if (index < 0 || index >= sections.length || isTransitioning) return;
        isTransitioning = true;
        sections.forEach((section, i) => {
            section.classList.toggle("active", i === index);
        });
        currentIndex = index;
        updateProgress();
        setTimeout(() => { isTransitioning = false; }, 900);
    }

    function updateProgress() {
        const current = document.querySelector(".progress-current");
        if (!current) return;
        current.textContent = String(currentIndex + 1).padStart(2, "0");
    }

    function nextSection() {
        if (currentIndex < sections.length - 1) {
            showSection(currentIndex + 1);
        } else {
            openWishTransition();
        }
    }

    document.querySelectorAll(".next-button").forEach(button => {
        button.addEventListener("click", nextSection);
    });

    const openingButton = document.querySelector(".opening .story-button");
    if (openingButton) {
        openingButton.addEventListener("click", nextSection);
    }

    document.addEventListener("keydown", event => {
        if (event.key === "ArrowDown" || event.key === " " || event.key === "Enter") {
            if (event.target.tagName === "BUTTON") return;
            event.preventDefault();
            nextSection();
        }
        if (event.key === "ArrowUp" && currentIndex > 0) {
            showSection(currentIndex - 1);
        }
    });

    let wheelLocked = false;
    document.addEventListener("wheel", event => {
        if (wheelLocked) return;
        wheelLocked = true;
        if (event.deltaY > 0) nextSection();
        else if (event.deltaY < 0 && currentIndex > 0) showSection(currentIndex - 1);
        setTimeout(() => { wheelLocked = false; }, 1300);
    }, { passive: true });

    let touchStartY = 0;
    document.addEventListener("touchstart", e => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    document.addEventListener("touchend", e => {
        const distance = touchStartY - e.changedTouches[0].screenY;
        if (Math.abs(distance) < 50) return;
        if (distance > 0) nextSection();
        else if (currentIndex > 0) showSection(currentIndex - 1);
    }, { passive: true });

    function updateVideoMood() {
        if (!video) return;
        const progress = currentIndex / (sections.length - 1);
        video.style.filter = `
            brightness(${.60 + progress * .25})
            saturate(${.78 + progress * .35})
            contrast(1.05)
        `;
    }

    function goToBirthday() {
    console.log("[betterme] Going to birthday page...");
    window.location.assign("birthday.html");
}

    function openWishTransition() {
        if (!wishTransition) {
            goToBirthday();
            return;
        }
        wishTransition.classList.add("show");
        if (video) video.style.filter = "brightness(0.15) saturate(0.3)";
    }

    if (continueButton) {
        continueButton.addEventListener("click", () => {
            console.log("[betterme] Continue clicked — going to birthday");
            goToBirthday();
        });
    } else {
        console.error("[betterme] #continueButton not found");
    }

    if (wishButton) {
        wishButton.addEventListener("click", () => {
            console.log("[betterme] Wish button clicked");
            goToBirthday();
        });
    }

    let soundOn = false;
    if (soundButton) {
        soundButton.addEventListener("click", () => {
            soundOn = !soundOn;
            soundButton.textContent = soundOn ? "🔊" : "♫";
        });
    }

    updateProgress();
    updateVideoMood();

    const observer = new MutationObserver(updateVideoMood);
    sections.forEach(s => observer.observe(s, {
        attributes: true,
        attributeFilter: ["class"]
    }));

    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", e => e.stopPropagation());
    });

    console.log("[betterme] ready — sections:", sections.length);
});