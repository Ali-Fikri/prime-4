const iLetters = document.querySelectorAll(".letter-on");

iLetters.forEach((letter) => {
  letter.style.cursor = "pointer";

  letter.addEventListener("click", () => {
    letter.classList.add("highlight-circle");

    if (!letter.querySelector(".bravo-msg")) {
      const bravoMsg = document.createElement("div");
      bravoMsg.textContent = "✅ Bravo!";
      bravoMsg.classList.add("bravo-msg");
      letter.appendChild(bravoMsg);
    }
  });
});