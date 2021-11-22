const menu = document.getElementById("hamburger");
const closeNav = document.getElementById("close");
const nav = document.querySelector("nav");
const body = document.querySelector("body");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slides = document.querySelectorAll(".slides");
const lightboxSlides = document.querySelectorAll(".lightbox-slides");
const slideNavigation = document.querySelectorAll(".slide-navigation img");
const lightboxNavigation = document.querySelectorAll(".lightbox-navigation img");

let slideIndex = 1;

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    showSlide(slideIndex);
});

menu.addEventListener("click", function(e) {
        nav.style.display = "block";
        document.body.style.backgroundColor = "hsl(0, 0%, 0%, 0.5)";
});

closeNav.addEventListener("click", function(e) {
        nav.style.display = "none";    
        document.body.style.backgroundColor = "white";
});

function changeSlide(i) {
    return showSlide(slideIndex += i);
}

function currentSlide(i) {
    return showSlide(slideIndex = i);
}

function showSlide(n) {
    //prevent function from calling past slides length
    if(n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    //hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        lightboxSlides[i].style.display = "none";
        slideNavigation[i].classList.remove("active");
        lightboxNavigation[i].classList.remove("active");
    }
    //display only selected slide
    slides[slideIndex - 1].style.display = "block";
    lightboxSlides[slideIndex - 1].style.display = "block";
    slideNavigation[slideIndex - 1].classList.add("active");
    lightboxNavigation[slideIndex - 1].classList.add("active");
}

function openLightbox() {
    document.getElementById("lightbox").style.display = "block";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}