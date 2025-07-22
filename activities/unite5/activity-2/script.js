document.querySelectorAll(".input").forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value === input.getAttribute("answer")) {
      input.classList.remove("incorrect");
      input.classList.add("correct");
      playClapSound();
    } else {
      input.classList.remove("correct");
      input.classList.add("shake");
      input.classList.add("incorrect");
      playIncorrectSound();
      setTimeout(() => {
        input.classList.remove("shake");
        input.classList.remove("incorrect");
      }, 400);
    }
  });
});

function playClapSound() {
  const sound = document.getElementById("clapSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}

function playIncorrectSound() {
  const sound = document.getElementById("inCorrectSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
