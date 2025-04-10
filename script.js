let slideIndex = 1;
const slides = document.getElementsByClassName("slide");
const totalSlides = slides.length;

showSlides(slideIndex);

function plusSlides(n) {
    slideIndex += n;
    
    // Circular navigation
    if (slideIndex > totalSlides) {
        slideIndex = 1;
    } else if (slideIndex < 1) {
        slideIndex = totalSlides;
    }
    
    showSlides(slideIndex);
}

function showSlides(n) {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Show current slide
    slides[n-1].classList.add("active");
    
    // Update counter
    document.getElementById("slide-counter").innerHTML = `< ${n}/${totalSlides} >`;
}

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = button.querySelector('.faq-icon');

        // Toggle the active class
        faqItem.classList.toggle('active');

        // Expand or collapse the answer
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px"; // Expand
            icon.textContent = "−"; // Change icon to minus
        } else {
            answer.style.maxHeight = "0"; // Collapse
            icon.textContent = "+"; // Change icon back to plus
        }
    });
});


// FAQ Accordion Functionality
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            faqItem.classList.toggle('active');
    
            const icon = button.querySelector('.faq-icon');
            icon.textContent = faqItem.classList.contains('active') ? "−" : "+";
        });
    });
    
});
// Auto slide change every 5 seconds with circular animation
setInterval(() => {
    plusSlides(1);
}, 5000);