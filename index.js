const displayCard = document.getElementById("display-card");
const glint = document.getElementById("glint");

window.addEventListener("mousemove", (event) => {
  const computedStyles = getComputedStyle(displayCard);
  const rotateX = parseInt(computedStyles.getPropertyValue("--js-rotateX"));
  const rotateY = parseInt(computedStyles.getPropertyValue("--js-rotateY"));

  if (isNaN(rotateX) || isNaN(rotateY)) {
    return;
  }

  const translation = parseInt(50 * (rotateX - 0.3 * rotateY + 30));

  glint.style.translate = `0 ${translation}%`;
});

// About Card

const ageText = document.getElementById("age");

function updateAge() {
  const now = new Date();
  const age = now.getTime() - 1195040640000; // in ms

  const milliseconds = Math.floor(age % 1000);
  const seconds = Math.floor(age / 1000) % 60;
  const minutes = Math.floor(age / (1000 * 60)) % 60;
  const hours = Math.floor(age / (1000 * 60 * 60)) % 24;
  const days = Math.floor((age / (1000 * 60 * 60 * 24)) % 30.4167);
  const months = Math.floor(age / (1000 * 60 * 60 * 24 * 30.4167)) % 12;
  const years = Math.floor(age / (1000 * 60 * 60 * 24 * 30.4167 * 12));

  const text = `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds, and ${milliseconds} milliseconds old`;
  ageText.innerText = text;
}

updateAge();
setInterval(updateAge, 23);
