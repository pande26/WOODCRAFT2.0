// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Testimonial Carousel
    initTestimonialCarousel();
    
    // Animate features on scroll
    initScrollAnimations();
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
});

// Testimonial Carousel Functionality
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Next slide function
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    // Previous slide function
    function prevSlide() {
        let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    // Add event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Add event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
}

// Scroll Animation Functionality
function initScrollAnimations() {
    const features = document.querySelectorAll('.feature');
    
    // Create an Intersection Observer to detect when elements enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point
    });
    
    // Observe each feature
    features.forEach(feature => {
        observer.observe(feature);
    });
}

// Smooth Scrolling Functionality
function initSmoothScrolling() {
    // Select all links with hashes
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target element
            const targetId = this.getAttribute('href');
            
            // If it's just "#", do nothing
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate the position to scroll to
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add a simple image fallback for project images
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(img => {
        img.addEventListener('error', function() {
            // If the image fails to load, replace with a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjdGN0Y3Ii8+CjxwYXRoIGQ9Ik0xMjUgMTAwSDE3NVYxNTBIMTI1VjEwMFoiIGZpbGw9IiM4RDZFNjMiLz4KPHN0eWxlPi5zdDB7ZmlsbDojNUQ0MDM3O308L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTUwIDcwQzEzNC4zIDcwIDEyMS41IDgyLjggMTIxLjUgOTguNUMxMjEuNSAxMTQuMiAxMzQuMyAxMjcgMTUwIDEyN0MxNjUuNyAxMjcgMTc4LjUgMTE0LjIgMTc4LjUgOTguNUMxNzguNSA4Mi44IDE2NS43IDcwIDE1MCA3MFpNMTc1IDE1N0gxMjVDMTE2LjIgMTU3IDEwOSAxNjQuMiAxMDkgMTczVjE5N0gxOTFWMTczQzE5MSAxNjQuMiAxODMuOCAxNTcgMTc1IDE1N1oiLz4KPC9zdmc+';
            this.alt = 'Woodcraft Project Image';
        });
    });
});