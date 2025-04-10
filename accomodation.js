document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slides");

    function showSlides(index) {
        if (index >= slides.length) slideIndex = 0;
        if (index < 0) slideIndex = slides.length - 1;

        slides.forEach((slide, i) => {
            slide.style.display = i === slideIndex ? "block" : "none";
        });
    }

    function plusSlides(n) {
        slideIndex += n;
        showSlides(slideIndex);
    }

    // Auto Slide (Optional)
    function autoSlide() {
        plusSlides(1);
        setTimeout(autoSlide, 3000); // Change every 3 seconds
    }

    // Initialize
    showSlides(slideIndex);
    setTimeout(autoSlide, 3000); // Start auto-sliding

    // Attach event listeners
    document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
    document.querySelector(".next").addEventListener("click", () => plusSlides(1));
});
