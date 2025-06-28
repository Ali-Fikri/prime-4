const clapSound = new Audio("../../../../sounds/clap.mp3");

const iLetters = document.querySelectorAll(".letter-e");

iLetters.forEach((letter) => {
  letter.style.cursor = "pointer";

  letter.addEventListener("click", () => {
    letter.classList.add("highlight-circle");

    clapSound.currentTime = 0;
    clapSound.play().catch((err) => {
      console.warn("فشل تشغيل الصوت:", err);
    });
  });
});
