// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // IMAGE SLIDERS/CAROUSELS
    // =============================================
    
    // Main Carousel Functionality
    const carouselTrack = document.getElementById('carouselTrack');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.arrow.right');
    const prevBtn = document.querySelector('.arrow.left');
    let currentIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Set slide positions
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });
    
    // Move to slide function
    function moveToSlide(track, currentSlide, targetSlide) {
        track.style.transform = `translateX(-${targetSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }
    
    // Next slide
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % slides.length;
        const currentSlide = document.querySelector('.current-slide');
        const nextSlide = slides[currentIndex];
        moveToSlide(carouselTrack, currentSlide, nextSlide);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        const currentSlide = document.querySelector('.current-slide');
        const prevSlide = slides[currentIndex];
        moveToSlide(carouselTrack, currentSlide, prevSlide);
    });
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        const currentSlide = document.querySelector('.current-slide');
        const nextSlide = slides[currentIndex];
        moveToSlide(carouselTrack, currentSlide, nextSlide);
    }, 5000);
    
    // Pause on hover
    carouselTrack.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carouselTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            const currentSlide = document.querySelector('.current-slide');
            const nextSlide = slides[currentIndex];
            moveToSlide(carouselTrack, currentSlide, nextSlide);
        }, 5000);
    });
    
    // Accommodation Slider
    let slideIndex = 1;
    showSlides(slideIndex);
    
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("slides");
        const dots = document.getElementsByClassName("dot");
        
        if (n > slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slides.length; }
        
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        
        slides[slideIndex-1].style.display = "block";
        if (dots.length > 0) {
            dots[slideIndex-1].className += " active";
        }
    }
    
    // =============================================
    // FAQ ACCORDION FUNCTIONALITY
    // =============================================
    
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');
            
            // Toggle active class
            faqItem.classList.toggle('active');
            
            // Toggle icon
            if (faqItem.classList.contains('active')) {
                icon.textContent = '-';
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                icon.textContent = '+';
                answer.style.maxHeight = '0';
            }
            
            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    
                    otherItem.classList.remove('active');
                    otherIcon.textContent = '+';
                    otherAnswer.style.maxHeight = '0';
                }
            });
        });
    });
    
    // =============================================
    // MOBILE MENU TOGGLE
    // =============================================
    
    function setupMobileMenu() {
        const navbarContainer = document.querySelector('.navbar-container');
        const navLinks = document.querySelector('.nav-links');
        
        // Only add mobile menu if screen is small
        if (window.innerWidth <= 768) {
            // Check if toggle already exists
            if (!document.querySelector('.mobile-menu-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-menu-toggle';
                toggle.innerHTML = '<i class="bi bi-list"></i> MENU';
                navbarContainer.parentNode.insertBefore(toggle, navbarContainer);
                
                toggle.addEventListener('click', function() {
                    navbarContainer.classList.toggle('active');
                    this.classList.toggle('active');
                });
            }
            
            // Make sure navbar is hidden initially on mobile
            navbarContainer.classList.remove('active');
        } else {
            // Remove toggle if screen is large
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.remove();
            }
            // Make sure navbar is visible on desktop
            navbarContainer.classList.add('active');
        }
    }
    
    // Run on load and when window is resized
    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);
    
    // =============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // =============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu-toggle');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.click();
                }
            }
        });
    });
    
    // =============================================
    // ENQUIRE NOW BUTTON FUNCTIONALITY
    // =============================================
    
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // You could also add a form popup here
            // alert('Enquiry form would open here');
        });
    });
    
    // =============================================
    // LAZY LOAD IMAGES FOR BETTER PERFORMANCE
    // =============================================
    
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // =============================================
    // CURRENT YEAR IN FOOTER
    // =============================================
    
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
