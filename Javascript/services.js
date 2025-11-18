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
    
    // Initialize service filtering
    initServiceFilter();
    
    // Initialize accordion functionality
    initAccordion();
    
    // Initialize service detail modals
    initServiceModals();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Service Filter Functionality
function initServiceFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter service cards
            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show card with animation
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.classList.remove('fade-out');
                    }, 10);
                } else {
                    // Hide card with animation
                    card.classList.add('fade-out');
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Accordion Functionality
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', function() {
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Service Detail Modal Functionality
function initServiceModals() {
    const serviceDetailButtons = document.querySelectorAll('.service-details-btn');
    const modal = document.getElementById('serviceModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Service data for modals
    const serviceData = {
        furniture: {
            title: "Custom Furniture Design",
            description: "Our custom furniture service creates unique, handcrafted pieces that perfectly match your style and space requirements. We work with you from initial concept to final delivery, ensuring every detail meets your expectations.",
            features: [
                "Personalized design consultation",
                "Material selection guidance",
                "3D renderings of your piece",
                "Handcrafted construction",
                "Quality finish and detailing",
                "Delivery and installation"
            ],
            timeline: "4-8 weeks depending on complexity",
            price: "Starting from R5,000"
        },
        cabinetry: {
            title: "Custom Cabinetry Solutions",
            description: "Our cabinetry service provides custom storage solutions that combine functionality with beautiful design. From kitchen cabinets to built-in wardrobes, we create pieces that maximize your space while enhancing your interior.",
            features: [
                "Space optimization planning",
                "Custom storage solutions",
                "Durable construction",
                "Professional installation",
                "Hardware selection assistance",
                "Finish and color customization"
            ],
            timeline: "3-6 weeks depending on scope",
            price: "Starting from R8,000"
        },
        decor: {
            title: "Wooden Décor & Accents",
            description: "Transform your space with our custom wooden décor pieces. From wall art to functional decorative items, we create unique pieces that add warmth and character to any room.",
            features: [
                "Custom design creation",
                "Material and finish options",
                "Wall mounting solutions",
                "Size customization",
                "Artistic detailing",
                "Quick turnaround available"
            ],
            timeline: "1-4 weeks depending on design",
            price: "Starting from R1,500"
        }
    };
    
    // Add click event to service detail buttons
    serviceDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const category = serviceCard.getAttribute('data-category');
            openServiceModal(category);
        });
    });
    
    // Add click event to service images (overlay)
    const serviceImages = document.querySelectorAll('.service-img');
    serviceImages.forEach(img => {
        img.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const category = serviceCard.getAttribute('data-category');
            openServiceModal(category);
        });
    });
    
    // Close modal when clicking the X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeServiceModal();
        });
    }
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeServiceModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeServiceModal();
        }
    });
    
    // Function to open the modal with service data
    function openServiceModal(category) {
        const service = serviceData[category];
        if (!service) return;
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="modal-service">
                <img src="Images/${category.charAt(0).toUpperCase() + category.slice(1)}.jpeg" alt="${service.title}">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
                
                <h4>What's Included:</h4>
                <ul>
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                
                <div class="service-details">
                    <div class="detail-item">
                        <strong>Estimated Timeline:</strong> ${service.timeline}
                    </div>
                    <div class="detail-item">
                        <strong>Starting Price:</strong> ${service.price}
                    </div>
                </div>
                
                <div class="modal-cta">
                    <p>Ready to get started with our ${service.title} service?</p>
                    <a href="contact.html" class="cta-button">Request a Quote</a>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close the modal
    function closeServiceModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Scroll Animation Functionality
function initScrollAnimations() {
    const processSteps = document.querySelectorAll('.process-step');
    
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
    
    // Observe each process step
    processSteps.forEach(step => {
        observer.observe(step);
    });
}

// Add image fallback for service images
document.addEventListener('DOMContentLoaded', function() {
    const serviceImages = document.querySelectorAll('.service-img img');
    
    serviceImages.forEach(img => {
        img.addEventListener('error', function() {
            // If the image fails to load, replace with a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjdGN0Y3Ii8+CjxwYXRoIGQ9Ik0xMDAgODBIMzAwVjE3MEgxMDBWODBaIiBmaWxsPSIjOEQ2RTYzIi8+CjxwYXRoIGQ9Ik0xMjAgNjBIMjgwVjE5MEgxMjBWNjBaIiBzdHJva2U9IiM1RDQwMzciIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=';
            this.alt = 'Service Image';
        });
    });
});