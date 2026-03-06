const popup = document.getElementById("cookie-popup");
const acceptButton = document.getElementById("accept-button");
const declineButton = document.getElementById("decline-button");

const cookieContainer = document.getElementById("cookie-container");

let currentlyDragging = null;

let cookieLevel = 0;
const cookiePhrase = [
  "More",
  "Even More",
  "Lots More",
  "Too Many More",
  "The Whole Box Of",
  "Gluttonous Amounts Of",
  "A Disturbing Quantity Of",
  "A Whole Season Of Bake Off Worth Of",
  "Costco Pallet Loads Of",
  "The Whole Warehouse Of",
  "The Cookie Monster’s Monthly Ration Of",
  "The Entire Oreo Factory Output Of",
  "The Nationwide Supply Of",
  "Unholy Amounts Of",
  "Willy Wonka’s Lifetime Inventory Of",
  "Forbidden, Eldritch, Reality-Bending Quantities Of",
  "Cookie Clicker Amounts Of",
];

function addCookie() {
  cookie = document.createElement("div");
  cookie.classList.add("draggable-cookie");
  cookie.innerText = "🍪";
  cookie.style.top = Math.random() * window.innerHeight + "px";
  cookie.style.left = Math.random() * window.innerWidth + "px";

  cookieContainer.appendChild(cookie);
}

declineButton.addEventListener("click", (event) => {
  popup.style.right = "-800px";
  popup.style.pointerEvents = "none";

  cookieContainer.remove();
  
  setTimeout(() => {
    popup.remove();
  }, 1000);
});

acceptButton.addEventListener("click", (event) => {
  addCookie();

  acceptButton.innerText = `Accept ${
    cookiePhrase[Math.floor(cookieLevel)]
  } Cookies`;
  cookieLevel = Math.min(cookieLevel + 0.5, cookiePhrase.length - 1);
});

function moveCookie(targetCookie, posX, posY) {
  posX = Math.max(0, Math.min(window.innerWidth, posX));
  posY = Math.max(0, Math.min(window.innerHeight, posY));
  targetCookie.style.left = `${posX}px`;
  targetCookie.style.top = `${posY}px`;
}

document.addEventListener("mousedown", (event) => {
  const targetElement = event.target;

  if (event.buttons === 1 && targetElement.classList.contains("draggable-cookie")) {
    currentlyDragging = targetElement

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    moveCookie(targetElement, mouseX, mouseY);

    // Move cookie to end of cookie container
    const parentElement = targetElement.parentNode;
    parentElement.appendChild(targetElement);
  }
});

document.addEventListener("mousemove", (event) => {
  if (event.buttons === 1 && currentlyDragging !== null) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    moveCookie(currentlyDragging, mouseX, mouseY);

    // Move cookie to end of cookie container
    const parentElement = currentlyDragging.parentNode;
    parentElement.appendChild(currentlyDragging);
  }
})

document.addEventListener("mouseup", (event) => {
  currentlyDragging = null;
});

window.addEventListener("load", (event) => {
  setTimeout(() => {
    popup.style.display = "block";
    popup.style.right = "50px";
    popup.style.pointerEvents = "auto";
  }, 2000);
});
