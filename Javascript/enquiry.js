// enquiry.js - JavaScript for the enquiry page

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
    
    // Form validation and submission
    const enquiryForm = document.getElementById('enquiryForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    
    // Dynamic field visibility based on enquiry type
    const enquiryTypeSelect = document.getElementById('enquiryType');
    const serviceFields = document.getElementById('serviceFields');
    const productFields = document.getElementById('productFields');
    const urgencyFields = document.getElementById('urgencyFields');
    
    if (enquiryTypeSelect) {
        enquiryTypeSelect.addEventListener('change', function() {
            // Hide all dynamic fields first
            serviceFields.style.display = 'none';
            productFields.style.display = 'none';
            urgencyFields.style.display = 'none';
            
            // Show relevant fields based on selection
            switch(this.value) {
                case 'service':
                    serviceFields.style.display = 'block';
                    urgencyFields.style.display = 'block';
                    break;
                case 'product':
                    productFields.style.display = 'block';
                    urgencyFields.style.display = 'block';
                    break;
                case 'volunteer':
                case 'sponsor':
                    // No additional fields needed for these types
                    break;
            }
        });
    }
    
    if (enquiryForm) {
        // Insert success message after form
        enquiryForm.parentNode.insertBefore(successMessage, enquiryForm.nextSibling);
        
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Simulate form submission
                const submitBtn = enquiryForm.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Processing Your Enquiry...';
                
                // In a real application, you would send the form data to a server here
                setTimeout(function() {
                    // Generate response based on enquiry type
                    const enquiryType = document.getElementById('enquiryType').value;
                    let responseMessage = '';
                    
                    switch(enquiryType) {
                        case 'service':
                            const service = document.getElementById('service').value;
                            const urgency = document.getElementById('urgency').value;
                            responseMessage = generateServiceResponse(service, urgency);
                            break;
                        case 'product':
                            const product = document.getElementById('product').value;
                            responseMessage = generateProductResponse(product);
                            break;
                        case 'volunteer':
                            responseMessage = generateVolunteerResponse();
                            break;
                        case 'sponsor':
                            responseMessage = generateSponsorResponse();
                            break;
                        default:
                            responseMessage = 'Thank you for your enquiry! Our team will review your request and get back to you within 24 hours.';
                    }
                    
                    // Show success message with specific response
                    successMessage.innerHTML = responseMessage;
                    successMessage.style.display = 'block';
                    
                    // Reset form
                    enquiryForm.reset();
                    
                    // Reset dynamic fields visibility
                    serviceFields.style.display = 'none';
                    productFields.style.display = 'none';
                    urgencyFields.style.display = 'none';
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Enquiry';
                    
                    // Hide success message after 8 seconds
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 8000);
                }, 1500);
            }
        });
        
        // Add real-time validation
        const formInputs = enquiryForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                clearError(this);
            });
        });
    }
});

// Form validation functions
function validateForm() {
    const form = document.getElementById('enquiryForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        // Skip validation for hidden fields
        if (input.closest('.form-group') && input.closest('.form-group').style.display === 'none') {
            return;
        }
        
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearError(field);
    
    // Validation rules
    switch(fieldName) {
        case 'name':
            if (value === '') {
                errorMessage = 'Name is required for your enquiry';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            }
            break;
            
        case 'email':
            if (value === '') {
                errorMessage = 'Email is required to respond to your enquiry';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'phone':
            if (value !== '' && !isValidPhone(value)) {
                errorMessage = 'Please enter a valid South African phone number';
                isValid = false;
            }
            break;
            
        case 'enquiryType':
            if (value === '') {
                errorMessage = 'Please select an enquiry type';
                isValid = false;
            }
            break;
            
        case 'service':
            // Only validate if service fields are visible
            if (document.getElementById('serviceFields').style.display !== 'none' && value === '') {
                errorMessage = 'Please select a service for accurate pricing';
                isValid = false;
            }
            break;
            
        case 'product':
            // Only validate if product fields are visible
            if (document.getElementById('productFields').style.display !== 'none' && value === '') {
                errorMessage = 'Please select a product for accurate information';
                isValid = false;
            }
            break;
            
        case 'urgency':
            // Only validate if urgency fields are visible
            if (document.getElementById('urgencyFields').style.display !== 'none' && value === '') {
                errorMessage = 'Please select a timeline for accurate availability';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value === '') {
                errorMessage = 'Please provide details about your enquiry';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'Please provide more details about your enquiry (at least 10 characters)';
                isValid = false;
            }
            break;
    }
    
    // Display error if validation failed
    if (!isValid) {
        showError(field, errorMessage);
    }
    
    return isValid;
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    // Basic phone validation - allows various South African formats
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Response generation functions
function generateServiceResponse(service, urgency) {
    let response = '<h3>Thank you for your service enquiry!</h3>';
    response += '<p>Based on your selection, here is some preliminary information:</p>';
    
    // Service-specific information
    switch(service) {
        case 'custom-furniture':
            response += '<p><strong>Custom Furniture Design:</strong> Our custom furniture projects typically range from R5,000 to R30,000+ depending on size, materials, and complexity. We\'ll provide a detailed quote after discussing your specific requirements.</p>';
            break;
        case 'cabinetry':
            response += '<p><strong>Custom Cabinetry:</strong> Cabinet projects generally start at R8,000 for basic designs and can go up to R50,000+ for extensive custom installations. We\'ll schedule a consultation to assess your space and requirements.</p>';
            break;
        case 'wooden-decor':
            response += '<p><strong>Wooden Décor & Art:</strong> Our decorative pieces range from R1,000 for smaller items to R15,000+ for large statement pieces. We\'ll discuss your vision and provide concept sketches.</p>';
            break;
        case 'epoxy-tables':
            response += '<p><strong>Epoxy Resin Tables:</strong> Epoxy tables start at R10,000 for smaller pieces and can exceed R50,000 for large, complex designs with premium materials. We\'ll provide material samples and design options.</p>';
            break;
        case 'restoration':
            response += '<p><strong>Wood Restoration:</strong> Restoration services range from R1,000 for minor repairs to R15,000+ for extensive antique restoration. We\'ll need to assess the piece to provide an accurate quote.</p>';
            break;
        case 'architectural':
            response += '<p><strong>Architectural Woodwork:</strong> These projects require custom quoting based on scope and specifications. We\'ll arrange a site visit to discuss your architectural woodwork needs.</p>';
            break;
        default:
            response += '<p>We\'ll review your service requirements and provide a detailed quote within 24 hours.</p>';
    }
    
    // Urgency information
    if (urgency) {
        switch(urgency) {
            case 'urgent':
                response += '<p><strong>Timeline:</strong> We\'ll prioritize your urgent request and check our current capacity. Rush projects may incur additional fees.</p>';
                break;
            case 'soon':
                response += '<p><strong>Timeline:</strong> We should be able to accommodate your 1-month timeline, depending on project complexity.</p>';
                break;
            case 'flexible':
                response += '<p><strong>Timeline:</strong> Your flexible timeline allows us to schedule your project optimally.</p>';
                break;
            case 'no-rush':
                response += '<p><strong>Timeline:</strong> We\'ll work with your open timeline to deliver the highest quality results.</p>';
                break;
        }
    }
    
    response += '<p>Our team will contact you within 24 hours to discuss your project in detail and provide a comprehensive quote.</p>';
    
    return response;
}

function generateProductResponse(product) {
    let response = '<h3>Thank you for your product enquiry!</h3>';
    response += '<p>Here is information about your selected product:</p>';
    
    switch(product) {
        case 'dining-table':
            response += '<p><strong>Dining Tables:</strong> Our dining tables range from R8,000 for standard designs to R30,000+ for custom pieces with premium materials and epoxy features. Standard lead time is 4-6 weeks.</p>';
            break;
        case 'coffee-table':
            response += '<p><strong>Coffee Tables:</strong> Coffee tables start at R5,000 and can go up to R20,000 for custom designs with intricate details or epoxy elements. Lead time is typically 3-5 weeks.</p>';
            break;
        case 'bookshelf':
            response += '<p><strong>Bookshelves:</strong> Custom bookshelves range from R5,000 for simple designs to R25,000+ for large, built-in units. We\'ll discuss your space requirements and design preferences.</p>';
            break;
        case 'cabinet':
            response += '<p><strong>Cabinets:</strong> Our cabinets start at R6,000 and can exceed R30,000 for extensive custom storage solutions. We offer various wood types and finish options.</p>';
            break;
        case 'epoxy-art':
            response += '<p><strong>Epoxy Art Pieces:</strong> These unique pieces range from R3,000 for small decorative items to R25,000+ for large statement pieces. Each piece is one-of-a-kind.</p>';
            break;
        case 'custom-piece':
            response += '<p><strong>Custom Pieces:</strong> For completely custom creations, pricing depends on size, materials, and complexity. We\'ll schedule a consultation to discuss your vision.</p>';
            break;
        default:
            response += '<p>We\'ll provide detailed information about our products and availability within 24 hours.</p>';
    }
    
    response += '<p>Our product specialist will contact you soon with more details, including material options, dimensions, and exact pricing.</p>';
    
    return response;
}

function generateVolunteerResponse() {
    return `
        <h3>Thank you for your interest in volunteering!</h3>
        <p>We appreciate your desire to contribute to our woodcraft community. Our volunteer program offers:</p>
        <ul>
            <li>Hands-on woodworking experience</li>
            <li>Skill development in various techniques</li>
            <li>Opportunity to work on community projects</li>
            <li>Mentorship from experienced craftsmen</li>
        </ul>
        <p>Our volunteer coordinator will contact you within 2 business days to discuss available opportunities, requirements, and scheduling.</p>
        <p><strong>Note:</strong> Some volunteer positions may require basic woodworking experience or a commitment to training sessions.</p>
    `;
}

function generateSponsorResponse() {
    return `
        <h3>Thank you for your interest in sponsorship!</h3>
        <p>We're excited to discuss potential partnership opportunities. Our sponsorship program includes:</p>
        <ul>
            <li>Material donations (wood, tools, finishes)</li>
            <li>Financial support for community projects</li>
            <li>Collaborative product development</li>
            <li>Workshop sponsorship</li>
        </ul>
        <p>Our partnership director will contact you within 2 business days to discuss how we can work together and the benefits available to sponsors.</p>
        <p>We offer various sponsorship levels with corresponding recognition and benefits.</p>
    `;
}