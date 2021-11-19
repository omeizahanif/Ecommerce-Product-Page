const menu = document.getElementById("hamburger");
const closeNav = document.getElementById("close");
const nav = document.querySelector("nav");
const body = document.querySelector("body");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slides = document.querySelectorAll(".slides");
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

function showSlide(n) {
    //prevent function from calling past slides length
    if(n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;
    //hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    //display only selected slide
    slides[slideIndex - 1].style.display = "block";
}