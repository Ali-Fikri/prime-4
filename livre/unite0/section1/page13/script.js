let choices = document.querySelectorAll(".choice");

choices.forEach((choice) => {
  choice.addEventListener("click", (_) => {
    if (choice.getAttribute("isCorrect") == "true") {
      playClapSound();
      choice.classList.add("correct");
    } else {
      playIncorrectSound();
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
