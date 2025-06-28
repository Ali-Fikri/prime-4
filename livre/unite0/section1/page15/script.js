// Handle dragging
const mots = document.querySelectorAll(".mots img");
mots.forEach((mot) => {
  mot.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", mot.id);
  });
});

// Handle dropping
const dropTargets = document.querySelectorAll(".drop-target");
dropTargets.forEach((target) => {
  target.addEventListener("dragover", (e) => {
    e.preventDefault(); // Allow drop
    target.style.backgroundColor = "#f0f0f0"; // Visual feedback
  });

  target.addEventListener("dragleave", () => {
    target.style.backgroundColor = "transparent";
  });

  target.addEventListener("drop", (e) => {
    e.preventDefault();
    target.style.backgroundColor = "transparent";

    const motId = e.dataTransfer.getData("text/plain");
    const correctMotId = target.getAttribute("data-correct");

    if (motId === correctMotId) {
      const motElement = document.getElementById(motId);

      // Prevent double appending
      if (!target.querySelector(`#${motId}`)) {
        // Create a new cloned mot element to drop
        const droppedMot = motElement.cloneNode(true);
        droppedMot.classList.add("dropped-answer");

        target.appendChild(droppedMot);

        // Optionally: hide the original mot
        motElement.style.visibility = "hidden";
      }
    } else {
      alert("Incorrect! Please drag the correct answer.");
    }
  });
});









//////////////// green circle  ///////////////////////////
document.querySelectorAll('.image-wrapper').forEach(img => {
  img.addEventListener('click', () => {
    if (img.dataset.role === "correct") {
      img.classList.toggle('selected'); 
    }
  });
});