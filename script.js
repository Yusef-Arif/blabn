// go up button
const goUp = document.querySelector(".goUp");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    goUp.style.display = "block";
  } else {
    goUp.style.display = "none";
  }
});

goUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// menu
const menu = document.querySelector(".menu");
const nav = document.querySelector(".navLinks");
const account = document.querySelector(".account");

menu.addEventListener("click", () => {
  nav.classList.toggle("active");
  account.classList.toggle("activeAccount");
});
// slider
const slider = document.querySelector(".slider");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let index = 0;
const images = [
  "./images/hero1.jpg",
  "./images/hero2.jpg",
  "./images/hero3.jpg",
];

function updateSlider() {
  slider.style.backgroundImage = `url("${images[index]}")`;
}

// prev button
prev.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  updateSlider();
});
// next button
next.addEventListener("click", () => {
  index = (index + 1) % images.length;
  updateSlider();
});

setInterval(() => {
  index = (index + 1) % images.length;
  updateSlider();
}, 5000);
updateSlider();

// menu
const itemsDiv = document.querySelector(".items");
const itemsProducts = document.querySelector(".products");

var activItem = 0;
function active(key) {
  activItem = key;
  renderItems();
}
function renderItems() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      itemsDiv.innerHTML = data.items
        .map(
          (item) =>
            `<label onclick="active('${item.key}')" class="${
              item.key == activItem ? "active" : "normal"
            }">${item.item}</label>`
        )
        .join("");

      const productsData = data.itemsProducts.find(
        (item) => item.key == activItem
      );

      itemsProducts.innerHTML = productsData.products
        .map(
          (
            item
          ) => `<div class="showUp menu flex flex-col items-center justify-between max-sm:h-[100%] gap-3 p-4 bg-white rounded-2xl shadow-md">
        <img src="${item.image}" class="rounded-2xl" alt="product">
        <h1 class="blue font-extrabold text-2xl">${item.title}</h1>
        <p class="font-bold text-xl mb-3"><span class="blue">price:</span> ${item.price}</p>
        <button class="w-[90%]">اشتري</button>
        <button class="normal w-[90%]">اضف للسله</button>
        </div>`
        )
        .join("");
    })
    .catch((err) => {
      console.log("Error fetching data:", err);
    });
}
renderItems();

// social links
const socials = document.querySelectorAll(".social");
const constant = [
  {
    a: "https://www.facebook.com/profile.php?id=61554331319184",
    img: "./images/icons/facebook.png",
  },
  {
    a: "https://www.instagram.com/b.laban.eg",
    img: "./images/icons/instagram.png",
  },
  {
    a: "https://tiktok.com/@b.laban.egypt",
    img: "./images/icons/social-media.png",
  },
];
const content = constant
  .map(
    (link) => `
      <a href="${link.a}" target="_blank">
        <img src="${link.img}" width="50px" />
      </a>
    `
  )
  .join("");
socials.forEach((element) => {
  element.innerHTML = content;
});
