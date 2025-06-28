const mots = document.querySelectorAll(".mots img");
const dropTargets = document.querySelectorAll(".drop-target");
const clapSound = document.getElementById("clapSound");

let draggedMot = null;
let touchClone = null;

// Setup drag and touch for each mot
mots.forEach((mot) => {
  mot.setAttribute("draggable", true);

  // Desktop drag
  mot.addEventListener("dragstart", (e) => {
    draggedMot = mot;
    e.dataTransfer.setData("text/plain", mot.id);
  });

  // Touch drag start
  mot.addEventListener("touchstart", (e) => {
    draggedMot = mot;

    touchClone = mot.cloneNode(true);
    touchClone.style.position = "fixed";
    touchClone.style.pointerEvents = "none";
    touchClone.style.opacity = "0.7";
    touchClone.style.zIndex = "1000";
    touchClone.style.width = mot.offsetWidth + "px";
    touchClone.style.height = mot.offsetHeight + "px";
    document.body.appendChild(touchClone);

    moveTouchClone(e.touches[0]);
  });

  mot.addEventListener("touchmove", (e) => {
    moveTouchClone(e.touches[0]);
  });

  mot.addEventListener("touchend", (e) => {
    if (!draggedMot || !touchClone) return;

    const touch = e.changedTouches[0];
    const dropTarget = [...dropTargets].find((target) => {
      const rect = target.getBoundingClientRect();
      return (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      );
    });

    if (dropTarget) {
      handleDrop(draggedMot.id, dropTarget);
    }

    document.body.removeChild(touchClone);
    touchClone = null;
    draggedMot = null;
  });
});

// Desktop drop zone events
dropTargets.forEach((target) => {
  target.addEventListener("dragover", (e) => {
    e.preventDefault();
    target.style.backgroundColor = "#f0f0f0";
  });

  target.addEventListener("dragleave", () => {
    target.style.backgroundColor = "transparent";
  });

  target.addEventListener("drop", (e) => {
    e.preventDefault();
    target.style.backgroundColor = "transparent";

    const motId = e.dataTransfer.getData("text/plain");
    handleDrop(motId, target);
  });
});

// Position clone under touch finger
function moveTouchClone(touch) {
  if (touchClone) {
    touchClone.style.left = touch.clientX - touchClone.offsetWidth / 2 + "px";
    touchClone.style.top = touch.clientY - touchClone.offsetHeight / 2 + "px";
  }
}

// Drop logic with answer reuse support
function handleDrop(motId, target) {
  const correctMotId = target.getAttribute("data-correct");

  if (target.querySelector("img")) return; // prevent re-filling

  if (motId === correctMotId) {
    const motElement = document.getElementById(motId);
    const droppedMot = motElement.cloneNode(true);
    droppedMot.classList.add("dropped-answer");
    droppedMot.setAttribute("draggable", "false");
    target.appendChild(droppedMot);

    // ✅ Sound feedback
    if (clapSound) {
      clapSound.currentTime = 0;
      clapSound.play().catch((e) => {
        console.error("Playback failed:", e);
      });
    }
  } else {
    alert("Incorrect! Please drag the correct answer.");
  }
}
