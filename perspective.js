const cardList = document.getElementsByClassName("js-perspective");

for (let i = 0; i < cardList.length; i++) {
  const card = cardList.item(i);

  card.style.transformStyle = "preserve-3d";
  card.style.perspective = "700px";
}

// Updates card rotations when the mouse moves
window.addEventListener("mousemove", (event) => {
  const maxAxisAngle = 20; // Max tilt angle per axis, if using dual axis approach
  const maxNetAngle = 25; // Max net tilt angle, if using single axis approach

  // Mouse pos
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  for (let i = 0; i < cardList.length; i++) {
    const card = cardList.item(i);

    const box = card.getBoundingClientRect();

    // Center pos of card
    const centerX = (box.left + box.right) / 2;
    const centerY = (box.top + box.bottom) / 2;
    const width = box.right - box.left;
    const height = box.bottom - box.top;

    // Relative mouse pos to center
    const relativeX = mouseX - centerX;
    const relativeY = mouseY - centerY;

    // Percent (in decimal) of mouse pos (center to edge)
    const percentX = (2 * relativeX) / width;
    const percentY = (2 * relativeY) / height;

    // Reverse the sign of the angle if set to flipped
    const angleSign = card.classList.contains("js-flip-perspective") ? -1 : 1;

    // Single Rotation Axis Approach (Vector)
    const angle = Math.min(percentX ** 2 + percentY ** 2, 1) * maxNetAngle;

    card.style.setProperty("--js-directionX", `${-percentY}`);
    card.style.setProperty("--js-directionY", `${percentX}`);
    card.style.setProperty("--js-angle", `${angleSign * angle}deg`);

    // Dual Rotation Axis Approach

    // !!! Order of rotateX(), rotateY() matters for this approach
    // !!! (Vertical/horizontal edge will stay parallel depending on order)
    const angleX = -Math.min(Math.max(percentY, -1), 1) * maxAxisAngle;
    const angleY = Math.min(Math.max(percentX, -1), 1) * maxAxisAngle;

    card.style.setProperty("--js-rotateX", `${angleSign * angleX}deg`);
    card.style.setProperty("--js-rotateY", `${angleSign * angleY}deg`);
  }
});
