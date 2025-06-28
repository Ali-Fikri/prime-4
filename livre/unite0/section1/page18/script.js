// const sentences = document.querySelectorAll(".sentence");

// sentences.forEach((sentence) => {
//   const dropZone = sentence.querySelector(".drop-zone");
//   const wordsBank = sentence.querySelector(".words-bank");

//   let draggedElement = null;
//   let touchClone = null;

//   const words = sentence.querySelectorAll(".words-bank .word");

//   words.forEach((word) => {
//     word.setAttribute("draggable", true);

//     // Desktop drag
//     word.addEventListener("dragstart", (e) => {
//       draggedElement = word;
//       e.dataTransfer.setData("text/plain", word.textContent.trim());
//       e.dataTransfer.effectAllowed = "move";
//     });

//     // Touch start
//     word.addEventListener("touchstart", (e) => {
//       draggedElement = word;

//       touchClone = word.cloneNode(true);
//       touchClone.style.position = "absolute";
//       touchClone.style.pointerEvents = "none";
//       touchClone.style.opacity = "0.7";
//       touchClone.style.zIndex = "1000";
//       touchClone.style.fontSize = getComputedStyle(word).fontSize;
//       touchClone.style.padding = "0.25rem 0.5rem";
//       document.body.appendChild(touchClone);

//       moveClone(e.touches[0]);
//     });

//     // Touch move
//     word.addEventListener("touchmove", (e) => {
//       moveClone(e.touches[0]);
//     });

//     // Touch end
//     word.addEventListener("touchend", (e) => {
//       if (!draggedElement || !touchClone) return;

//       const touch = e.changedTouches[0];
//       const rect = dropZone.getBoundingClientRect();

//       const inDropZone =
//         touch.clientX >= rect.left &&
//         touch.clientX <= rect.right &&
//         touch.clientY >= rect.top &&
//         touch.clientY <= rect.bottom;

//       if (inDropZone) {
//         handleDrop(sentence, dropZone, draggedElement);
//       }

//       document.body.removeChild(touchClone);
//       touchClone = null;
//       draggedElement = null;
//     });
//   });

//   // Desktop drop zone events
//   dropZone.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     dropZone.classList.add("over");
//   });

//   dropZone.addEventListener("dragleave", () => {
//     dropZone.classList.remove("over");
//   });

//   dropZone.addEventListener("drop", (e) => {
//     e.preventDefault();
//     dropZone.classList.remove("over");

//     if (!draggedElement) return;

//     handleDrop(sentence, dropZone, draggedElement);
//     draggedElement = null;
//   });

//   updateLiveAndCheck(sentence);
// });

// function moveClone(touch) {
//   if (touchClone) {
//     touchClone.style.left = touch.pageX - 30 + "px";
//     touchClone.style.top = touch.pageY - 30 + "px";
//   }
// }

// function handleDrop(sentence, dropZone, wordElement) {
//   const draggedText = wordElement.textContent.trim();
//   const correctLetters = sentence.getAttribute("data-ordered").trim().split("");
//   const currentLetters = Array.from(dropZone.querySelectorAll(".word")).map(w => w.textContent.trim());
//   const expectedLetter = correctLetters[currentLetters.length]; // next correct letter

//   const resultDiv = sentence.querySelector(".result");

//   if (draggedText === expectedLetter) {
//     dropZone.appendChild(wordElement);
//     updateLiveAndCheck(sentence);
//   } else {
//     resultDiv.textContent = "❌ Incorrect word order!";
//     resultDiv.className = "result wrong";
//   }
// }

// function updateLiveAndCheck(sentence) {
//   const words = Array.from(sentence.querySelectorAll(".drop-zone .word")).map(w =>
//     w.textContent.trim()
//   );
//   const userSentence = words.join("");
//   const correctSentence = sentence.getAttribute("data-ordered").trim();

//   const resultDiv = sentence.querySelector(".result");

//   if (userSentence === correctSentence) {
//     resultDiv.textContent = "✔️ Correct!";
//     resultDiv.className = "result correct";
//     return true;
//   } else {
//     resultDiv.textContent = "";
//     resultDiv.className = "result";
//     return false;
//   }
// }

const sentences = document.querySelectorAll(".sentence");
const clapSound = document.getElementById("clapSound");

sentences.forEach((sentence) => {
  const dropZone = sentence.querySelector(".drop-zone");
  const wordsBank = sentence.querySelector(".words-bank");

  let draggedElement = null;
  let touchClone = null;

  const words = sentence.querySelectorAll(".words-bank .word");

  words.forEach((word) => {
    word.setAttribute("draggable", true);

    // Desktop drag
    word.addEventListener("dragstart", (e) => {
      draggedElement = word;
      e.dataTransfer.setData("text/plain", word.textContent.trim());
      e.dataTransfer.effectAllowed = "move";
    });

    // Touch start
    word.addEventListener("touchstart", (e) => {
      draggedElement = word;

      touchClone = word.cloneNode(true);
      touchClone.style.position = "fixed";
      touchClone.style.pointerEvents = "none";
      touchClone.style.opacity = "0.7";
      touchClone.style.zIndex = "1000";
      touchClone.style.fontSize = getComputedStyle(word).fontSize;
      touchClone.style.padding = getComputedStyle(word).padding;
      touchClone.style.backgroundColor = getComputedStyle(word).backgroundColor;
      touchClone.style.borderRadius = getComputedStyle(word).borderRadius;

      document.body.appendChild(touchClone);
      moveClone(e.touches[0]);
    });

    word.addEventListener("touchmove", (e) => {
      moveClone(e.touches[0]);
    });

    word.addEventListener("touchend", (e) => {
      if (!draggedElement || !touchClone) return;

      const touch = e.changedTouches[0];
      const rect = dropZone.getBoundingClientRect();

      const inDropZone =
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom;

      if (inDropZone) {
        handleDrop(sentence, dropZone, draggedElement);
      }

      document.body.removeChild(touchClone);
      touchClone = null;
      draggedElement = null;
    });
  });

  // Desktop drop
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("over");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("over");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("over");

    if (!draggedElement) return;

    handleDrop(sentence, dropZone, draggedElement);
    draggedElement = null;
  });

  updateLiveAndCheck(sentence); // initial state
});

function moveClone(touch) {
  if (touchClone) {
    touchClone.style.left = touch.clientX - touchClone.offsetWidth / 2 + "px";
    touchClone.style.top = touch.clientY - touchClone.offsetHeight / 2 + "px";
  }
}

function handleDrop(sentence, dropZone, wordElement) {
  const draggedText = wordElement.textContent.trim();
  const correctLetters = sentence.getAttribute("data-ordered").trim().split("");
  const currentLetters = Array.from(dropZone.querySelectorAll(".word")).map(w => w.textContent.trim());
  const expectedLetter = correctLetters[currentLetters.length]; // next correct letter

  const resultDiv = sentence.querySelector(".result");

  if (draggedText === expectedLetter) {
    dropZone.appendChild(wordElement);
    updateLiveAndCheck(sentence);
  } else {
    resultDiv.textContent = "❌ Incorrect word order!";
    resultDiv.className = "result wrong";
  }
}

function updateLiveAndCheck(sentence) {
  const words = Array.from(sentence.querySelectorAll(".drop-zone .word")).map(w =>
    w.textContent.trim()
  );
  const userSentence = words.join("");
  const correctSentence = sentence.getAttribute("data-ordered").trim();
  const resultDiv = sentence.querySelector(".result");

  if (userSentence === correctSentence) {
    if (!resultDiv.classList.contains("correct")) {
      // Only play sound once
      playClapSound();
    }
    resultDiv.textContent = "✔️ Correct!";
    resultDiv.className = "result correct";
    return true;
  } else {
    resultDiv.textContent = "";
    resultDiv.className = "result";
    return false;
  }
}

function playClapSound() {
  if (clapSound) {
    clapSound.currentTime = 0;
    clapSound.play().catch((e) => {
      console.error("Clap sound failed to play:", e);
    });
  }
}
