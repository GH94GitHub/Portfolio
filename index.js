// On Ready
document.addEventListener("DOMContentLoaded", () => {
    // Variables
    const introEl = document.querySelector('#main .content-row'); // First screen with Bio
    const dropdown = document.querySelector('.dropdown'); 
    const pageLinks = document.querySelectorAll('.page-link'); // Links that link to somewhere within the page
    const modal = document.querySelector('.modal'); // Modal holds video presentations
    const video = modal.querySelector('video');
    const presentations = document.querySelectorAll('.pp'); // Presentation cards
    
    // Fade In Intro after time
    setTimeout(() => {
        fadeIn(introEl);
    }, 350)
    
//---------- Event Listeners ----------
    /**
     * Script to smooth scroll to location on page specified by the href attribute on the link
     */
    for (const pageLink of pageLinks) {
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            const href = pageLink.getAttribute("href");
            const offsetTop = document.querySelector(href).offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        });
    }
    /**
     * Opens modal window and injects desired uri into video source src
     */
    for (const presentation of presentations) {
        presentation.addEventListener('click', (e) => {
            e.preventDefault();
            // uri to inject into modal video src
            const videoSrc = presentation.getAttribute("videoSrc");
            modal.classList.add('modal-open');
            video.querySelector('source').setAttribute('src', videoSrc);
            
            video.load();
        })
    }
    /**
     * When the modal is open, if the user clicks outside the modal window 
     * it close the modal window
     */
    modal.addEventListener('click', (e) => {
        if (!isMouseHovering('.modal-window') && modal.classList.contains('modal-open')) {
            modal.classList.remove('modal-open');
        }
    });
    // Dropdown click
    dropdown.addEventListener('click', (e) => {
        animateDropdown(dropdown);
    });

    // Dropdown mouseleave
    dropdown.addEventListener('mouseleave', (e) => {

        setTimeout(function () {
            if (!isMouseHovering('.dropdown')) {
                if (!dropdown.classList.contains('closed')) {
                    animateDropdown(dropdown);
                }
            }
        }, 250)
    });
});

// Toggle 'change' class on the element that is passed in
// Param: el = Html Element
function animateDropdown(el) {
    el.classList.toggle('change');
    el.classList.toggle('closed');
}
// Sets 'el' (html element) opacity to 1
// Param: el = Html Element
function fadeIn(el) {
    el.style.opacity = 1;
}
// Checks if mouse is hovering over specified element
// Param: elem = any css selector
function isMouseHovering(elem) {
    let hovered = document.querySelector(elem + ':hover');

    if (hovered) return true;
    else return false
}
