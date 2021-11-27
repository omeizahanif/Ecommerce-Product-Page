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
const priceTag = document.getElementById("tag");

const addButton = document.getElementById("addButton");
const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");
const count = document.getElementById("count");
const list = document.getElementById("list");
const checkout = document.getElementById("checkout");
const emptyCart = `<p class="empty">Your cart is empty</p>`;
let slideIndex = 1;

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    list.innerHTML = emptyCart;
    checkout.style.display = "none";
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

increase.addEventListener("click", function(e) {
    const counter = update(increaseMsg, cartModel);
    const updatedModel = { ...cartModel, counter };
    view(updatedModel);
});

decrease.addEventListener("click", function(e) {
    const counter = update(decreaseMsg, cartModel);
    const updatedModel = { ...cartModel, counter };
    view(updatedModel);
})

addButton.addEventListener("click", function(e) {
    const updatedModel = update(addToCartMsg, cartModel);
    return view(updatedModel);
    
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

//model
const cartModel = {
    counter: 0,
    cart: [],
    isEmpty: true,
};

const addToCartMsg = {
        type: "addToCart",
}

const increaseMsg = {
    type: "add"
}

const decreaseMsg = {
    type: "subtract"
}

function deleteMsg(id) {
    const msg = {
        type: "delete",
        id
    }

    return msg;
}

function update(msg, model) {
    switch(msg.type) {
        case "add":   
            return model.counter += 1;
        case "subtract":
            return model.counter -= 1;
        case "addToCart":
            const price = parseFloat(priceTag.textContent.slice(1)).toFixed(2);
            const total = price * model.counter;
            const product = {
                productName: "Autumn Limited Edition",
                price,
                quantity: model.counter,
                total,
                id: Math.floor((Math.random() * 10000) + 1)
            }
            const cart = [...model.cart, product];
            model.counter = 0;
            return { ...model, cart, isEmpty: false};
        case "delete":
            const { id } = msg;
            let { isEmpty } = model;
            const updatedCart = model.cart.filter(item => item.id !== id);
            isEmpty = updatedCart.length > 0 ? false : true;
            console.log({ ...model, cart: [...updatedCart], isEmpty});
            return { ...model, updatedCart, isEmpty};
        default:
            return model.counter;
    }
}

function cartView(model) {
    let listArray = [];

    if (model.cart.length) {
        listArray = model.cart.map(function(item) {
            return `<article data.id=${item.id}>
                <img src="/images/image-product-1.jpg">
                <div class="item-info">
                    <p>${item.productName}</p>
                    <span class="item-price">$${item.price} x ${item.quantity}</span>
                    <span class="cart-total">$${item.total}</span>
                </div>
                <svg onclick="update(deleteMsg(${item.id}), cartModel);view(cartModel)" width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
                </article>`
        });

        return listArray;
    }

    return emptyCart;
    
}

function checkEmptyCart(model) {
    if (model.isEmpty) {
        console.log("empty");
        checkout.style.display = "none";
    } else {
        console.log("not empty")
        checkout.style.display = "block";
    }
}

function view(model) {
    count.innerText = model.counter;
    checkEmptyCart(model);
    list.innerHTML = cartView(model);
}