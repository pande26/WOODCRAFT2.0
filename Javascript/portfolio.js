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
    
    // Initialize portfolio filtering
    initPortfolioFilter();
    
    // Initialize lightbox functionality
    initLightbox();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCategories = document.querySelectorAll('.portfolio-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio categories
            portfolioCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                
                if (filterValue === 'all' || categoryType === filterValue) {
                    // Show category with animation
                    category.classList.remove('hidden');
                    setTimeout(() => {
                        category.classList.remove('fade-out');
                    }, 10);
                } else {
                    // Hide category with animation
                    category.classList.add('fade-out');
                    setTimeout(() => {
                        category.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Lightbox Functionality
function initLightbox() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxDetails = document.querySelector('.lightbox-details');
    
    // Create array of all portfolio items for navigation
    const allPortfolioItems = Array.from(portfolioItems);
    let currentIndex = 0;
    
    // Portfolio item data for lightbox
    const portfolioData = allPortfolioItems.map((item, index) => {
        const img = item.querySelector('.portfolio-img');
        const title = item.querySelector('.portfolio-overlay h3').textContent;
        const description = item.querySelector('.portfolio-overlay p').textContent;
        
        return {
            index: index,
            src: img.src,
            alt: img.alt,
            title: title,
            description: description,
            category: item.closest('.portfolio-category').getAttribute('data-category')
        };
    });
    
    // Function to open lightbox with specific item
    function openLightbox(index) {
        const item = portfolioData[index];
        if (!item) return;
        
        currentIndex = index;
        
        // Update lightbox content
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        lightboxTitle.textContent = item.title;
        lightboxDescription.textContent = item.description;
        
        // Add additional details based on category
        let detailsHTML = '';
        switch(item.category) {
            case 'epoxy':
                detailsHTML = `
                    <p><strong>Category:</strong> Epoxy Tables</p>
                    <p><strong>Materials:</strong> Premium wood with artistic resin</p>
                    <p><strong>Finish:</strong> High-gloss epoxy coating</p>
                    <p><strong>Timeline:</strong> 4-6 weeks</p>
                `;
                break;
            case 'furniture':
                detailsHTML = `
                    <p><strong>Category:</strong> Furniture</p>
                    <p><strong>Materials:</strong> Solid wood with premium upholstery</p>
                    <p><strong>Finish:</strong> Hand-rubbed oil or lacquer</p>
                    <p><strong>Timeline:</strong> 3-5 weeks</p>
                `;
                break;
            case 'cabinetry':
                detailsHTML = `
                    <p><strong>Category:</strong> Cabinetry</p>
                    <p><strong>Materials:</strong> Custom wood with hardware</p>
                    <p><strong>Finish:</strong> Painted or stained to specification</p>
                    <p><strong>Timeline:</strong> 2-4 weeks</p>
                `;
                break;
            case 'decor':
                detailsHTML = `
                    <p><strong>Category:</strong> Wooden Decor</p>
                    <p><strong>Materials:</strong> Various wood types</p>
                    <p><strong>Finish:</strong> Natural or custom finish</p>
                    <p><strong>Timeline:</strong> 1-3 weeks</p>
                `;
                break;
        }
        
        lightboxDetails.innerHTML = detailsHTML;
        
        // Show lightbox
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close lightbox
    function closeLightboxFunc() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Function to navigate to next item
    function nextItem() {
        currentIndex = (currentIndex + 1) % portfolioData.length;
        openLightbox(currentIndex);
    }
    
    // Function to navigate to previous item
    function prevItem() {
        currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
        openLightbox(currentIndex);
    }
    
    // Add click event to portfolio items
    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Add click event to view details buttons
    viewDetailsButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the portfolio item click
            openLightbox(index);
        });
    });
    
    // Close lightbox when clicking the X
    if (closeLightbox) {
        closeLightbox.addEventListener('click', closeLightboxFunc);
    }
    
    // Close lightbox when clicking outside the content
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightboxFunc();
        }
        
        // Navigate with arrow keys
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                nextItem();
            } else if (e.key === 'ArrowLeft') {
                prevItem();
            }
        }
    });
    
    // Add navigation buttons functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', prevItem);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextItem);
    }
}

// Scroll Animation Functionality
function initScrollAnimations() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const portfolioCategories = document.querySelectorAll('.portfolio-category');
    
    // Create an Intersection Observer to detect when elements enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // For portfolio categories, animate the items with a delay
                if (entry.target.classList.contains('portfolio-category')) {
                    const portfolioItems = entry.target.querySelectorAll('.portfolio-item');
                    portfolioItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100); // Stagger the animation
                    });
                }
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point
    });
    
    // Observe each testimonial card
    testimonialCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe each portfolio category
    portfolioCategories.forEach(category => {
        observer.observe(category);
    });
}

// Add image fallback for portfolio images
document.addEventListener('DOMContentLoaded', function() {
    const portfolioImages = document.querySelectorAll('.portfolio-img');
    
    portfolioImages.forEach(img => {
        img.addEventListener('error', function() {
            // If the image fails to load, replace with a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjdGN0Y3Ii8+CjxwYXRoIGQ9Ik0xMDAgODBIMzAwVjIyMEgxMDBWODBaIiBmaWxsPSIjOEQ2RTYzIi8+CjxwYXRoIGQ9Ik0xMjAgNjBIMjgwVjI0MEgxMjBWNjBaIiBzdHJva2U9IiM1RDQwMzciIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=';
            this.alt = 'Portfolio Image';
        });
    });
});