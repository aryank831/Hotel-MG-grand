const track = document.getElementById("carouselTrack");
const slides = Array.from(track.children);
let currentIndex = 0;

function updateCarousel() {
  const slideWidth = slides[0].offsetWidth;
  const gap = 40; // Must match CSS gap
  const totalSlideWidth = slideWidth + gap;
  const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
  
  // Calculate offset to center the current slide
  const offset = (totalSlideWidth * currentIndex) - (containerWidth / 2 - slideWidth / 2);
  
  track.style.transform = `translateX(-${offset}px)`;
  
  // Update active class
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });
}

// Right arrow click
document.querySelector(".arrow.right").addEventListener("click", () => {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// Left arrow click
document.querySelector(".arrow.left").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Initialize on load and resize
window.addEventListener("load", updateCarousel);
window.addEventListener("resize", updateCarousel);