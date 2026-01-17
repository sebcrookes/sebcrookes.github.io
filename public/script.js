/* ======= script.js - this file provides the main functionality to the site. ======= */

/* ======= Navigation bar + menu ======= */

function setBackdropVisibility(visibility) {
    let backdrop = document.querySelector("#nav-menu-backdrop");
    backdrop.style.visibility = visibility;
}

function openHamburgerMenu() {
    let backdrop = document.querySelector("#nav-menu-backdrop");
    setBackdropVisibility("visible");
    backdrop.style.opacity = 1;
    backdrop.style.pointerEvents = "auto";
}

function closeHamburgerMenu() {
    let backdrop = document.querySelector("#nav-menu-backdrop");
    backdrop.style.opacity = 0;
    backdrop.style.pointerEvents = "none";
    setTimeout(function() { setBackdropVisibility("hidden"); }, 300);
}

function scrollToSection(sectionID) {
    // If the button gives us "top" then we scroll to the top
    if (sectionID === "top") {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        return;
    }

    // Otherwise, we get the position of the element to scroll to, offset it by
    // the height of the nav bar (to ensure it is visible), and scroll to it.

    let section = document.querySelector("#" + sectionID);

    let nav = document.querySelector("#nav-blur");

    let position = section.getBoundingClientRect().top + window.pageYOffset - nav.getBoundingClientRect().height;

    window.scrollTo({
        top: position,
        behavior: "smooth"
    });
}

/* ======= Image enlargement when clicked ======= */

function enlargeImage(imageID) { // It is the caller's job to pass its ID to this function
    let img = document.getElementById(imageID);

    let scale = 2.0;

    if (img.width * 2 > window.innerWidth) {
        scale = window.innerWidth / img.width;
    }

    img.style.transform = "scale(" + scale + ")";
    img.style.transition = "transform 0.25s ease";

    setTimeout(function() {
        img.style.transform = "scale(1.0)";
        img.style.transition = "transform 0.25s ease";
    }, 1500);
}
