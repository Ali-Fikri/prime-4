
// تحميل صوت التصفيق
const clapSound = document.getElementById('clap-sound');

// تحديد العناصر
document.querySelectorAll('.image-wrapper').forEach(img => {
  img.addEventListener('click', () => {
    if (img.dataset.role === "correct") {
      img.classList.toggle('selected');

      // شغّل صوت التصفيق
      if (clapSound) {
        clapSound.currentTime = 0;
        clapSound.play().catch(err => {
          console.warn("فشل تشغيل الصوت:", err);
        });
      }
    }
  });
});
