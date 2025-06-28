window.addEventListener("load", () => {
  const canvas = document.getElementById("drawing-canvas");
  const ctx = canvas.getContext("2d");
  let drawing = false;
  let color = "red";

  const container = canvas.parentElement; // This is .letters-box

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Color picker
  document.querySelectorAll(".color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      color = btn.getAttribute("data-color");
    });
  });

  function getCursorPosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    const pos = getCursorPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const pos = getCursorPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
  });

  canvas.addEventListener("mouseleave", () => {
    drawing = false;
  });
});

document.querySelectorAll(".input-letter").forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.toLowerCase().slice(0, 1); // force lowercase, one letter
  });
});

const svg = document.getElementById("svg");
let selectedWord = null;

document.querySelectorAll(".word").forEach((word) => {
  word.addEventListener("click", () => {
    document
      .querySelectorAll(".word")
      .forEach((w) => w.classList.remove("selected-word"));
    word.classList.add("selected-word");
    selectedWord = word;
  });
});

function playClapSound() {
  const sound = document.getElementById('clapSound');
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

document.querySelectorAll(".img-item").forEach((img) => {
  img.addEventListener("click", () => {
    if (!selectedWord) return;

    const wordRect = selectedWord.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const containerRect = document
      .querySelector(".letters-box")
      .getBoundingClientRect();

    const x1 = wordRect.right - containerRect.left;
    const y1 = wordRect.top + wordRect.height / 2 - containerRect.top;
    const x2 = imgRect.left - containerRect.left;
    const y2 = imgRect.top + imgRect.height / 2 - containerRect.top;

    const matchCorrect = selectedWord.dataset.match === img.dataset.id;

    if (matchCorrect) {
      playClapSound(); // ✅ يشغل التصفيق فقط هنا

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("stroke-width", 3);
      line.setAttribute("stroke", "green");
      line.setAttribute("marker-end", "url(#arrow)");
      svg.appendChild(line);
    } else {
      // ❌ مفيش صوت هنا
      selectedWord.classList.add("shake");
      img.classList.add("shake");

      setTimeout(() => {
        selectedWord.classList.remove("shake");
        img.classList.remove("shake");
      }, 400);
    }

    selectedWord.classList.remove("selected-word");
    selectedWord = null;
  });
});
