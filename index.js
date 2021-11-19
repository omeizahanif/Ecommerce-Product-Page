const menu = document.getElementById("hamburger");
const closeNav = document.getElementById("close");
const nav = document.querySelector("nav");
const body = document.querySelector("body");


menu.addEventListener("click", function(e) {
        nav.style.display = "block";
        document.body.style.backgroundColor = "hsl(0, 0%, 0%, 0.5)";
});

closeNav.addEventListener("click", function(e) {
        nav.style.display = "none";    
        document.body.style.backgroundColor = "white";
})