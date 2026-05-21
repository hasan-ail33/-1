const popSound = new Audio("sounds/pop.mp3");
const items = document.querySelectorAll(".item");
const room = document.getElementById("room");
items.forEach(item => {

  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text", item.innerHTML);
  });

});

room.addEventListener("dragover", e => {
  e.preventDefault();
});

room.addEventListener("drop", e => {

  e.preventDefault();

  const data = e.dataTransfer.getData("text");

  const newItem = document.createElement("div");

  newItem.innerHTML = data;

  newItem.style.position = "absolute";
  newItem.style.left = e.offsetX + "px";
  newItem.style.top = e.offsetY + "px";

  newItem.style.fontSize = "40px";
  newItem.dataset.size = 40;

  newItem.style.cursor = "move";

  makeDraggable(newItem);

  // حذف العنصر بالدبل كلك
  newItem.addEventListener("dblclick", () => {
    newItem.remove();
  });

  // تكبير وتصغير العنصر
  newItem.addEventListener("wheel", e => {

    e.preventDefault();

    let size = parseInt(newItem.dataset.size);

    if (e.deltaY < 0) {
      size += 5;
    } else {
      size -= 5;
    }

    if (size < 20) size = 20;
    if (size > 120) size = 120;

    newItem.dataset.size = size;
    newItem.style.fontSize = size + "px";

  });

  room.appendChild(newItem);

// 🔊 صوت
popSound.currentTime = 0;
popSound.play();

});

function makeDraggable(element) {

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  element.addEventListener("mousedown", e => {

    isDragging = true;

    offsetX = e.offsetX;
    offsetY = e.offsetY;

  });

  document.addEventListener("mousemove", e => {

    if (!isDragging) return;

    const roomRect = room.getBoundingClientRect();

    element.style.left =
      e.clientX - roomRect.left - offsetX + "px";

    element.style.top =
      e.clientY - roomRect.top - offsetY + "px";

  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

}

// تغيير لون الغرفة
function changeColor(color) {
  room.style.background = color;
}
function randomBg() {
  const colors = [
    "#0f0f0f",
    "#1c1c1c",
    "#2c3e50",
    "#34495e",
    "#3a3a3a",
    "#2d3436",
    "#1e272e"
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

setInterval(() => {
  document.body.style.background = randomBg();
}, 3000);