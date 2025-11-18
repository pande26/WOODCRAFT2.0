// contact.js - Enhanced with AJAX, validation, and email functionality

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
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    
    // Character counter for message textarea
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            // Update character count color based on length
            if (count > 900) {
                charCount.parentElement.classList.add('warning');
                charCount.parentElement.classList.remove('error');
            } else if (count > 990) {
                charCount.parentElement.classList.remove('warning');
                charCount.parentElement.classList.add('error');
            } else {
                charCount.parentElement.classList.remove('warning', 'error');
            }
        });
    }
    
    // Modal functionality
    const emailModal = document.getElementById('emailModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelEmailBtn = document.getElementById('cancelEmailBtn');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            emailModal.style.display = 'none';
        });
    }
    
    if (cancelEmailBtn) {
        cancelEmailBtn.addEventListener('click', function() {
            emailModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === emailModal) {
            emailModal.style.display = 'none';
        }
    });
    
    if (contactForm) {
        // Insert success message after form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Show loading state
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Compile email content
                const emailContent = compileEmailContent();
                
                // Show email preview modal
                showEmailPreview(emailContent);
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
        
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                clearError(this);
            });
        });
        
        // Additional contact method buttons
        const liveChatBtn = document.getElementById('liveChatBtn');
        const virtualConsultBtn = document.getElementById('virtualConsultBtn');
        const siteVisitBtn = document.getElementById('siteVisitBtn');
        
        if (liveChatBtn) {
            liveChatBtn.addEventListener('click', function() {
                alert('Live chat feature would open here. In a real implementation, this would connect to a live chat service.');
            });
        }
        
        if (virtualConsultBtn) {
            virtualConsultBtn.addEventListener('click', function() {
                alert('Virtual consultation scheduling would open here. This would typically open a calendar booking interface.');
            });
        }
        
        if (siteVisitBtn) {
            siteVisitBtn.addEventListener('click', function() {
                alert('Site visit request form would open here. This would typically open a specialized form for site visit requests.');
            });
        }
    }
    
    // Initialize interactive map
    initInteractiveMap();
});

// Form validation functions
function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
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
                errorMessage = 'Name is required';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            } else if (value.length > 50) {
                errorMessage = 'Name must be less than 50 characters';
                isValid = false;
            }
            break;
            
        case 'email':
            if (value === '') {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'phone':
            if (value !== '' && !isValidPhone(value)) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
            break;
            
        case 'message-type':
            if (value === '') {
                errorMessage = 'Please select a message type';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value === '') {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            } else if (value.length > 1000) {
                errorMessage = 'Message must be less than 1000 characters';
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
    // Basic phone validation - allows various formats
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Email compilation and sending
function compileEmailContent() {
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    let emailBody = `New Contact Form Submission\n`;
    emailBody += `============================\n\n`;
    
    // Add form fields to email body
    for (let [key, value] of formData.entries()) {
        if (value.trim() !== '') {
            const fieldLabel = getFieldLabel(key);
            emailBody += `${fieldLabel}: ${value}\n`;
        }
    }
    
    emailBody += `\nSubmitted on: ${new Date().toLocaleString()}`;
    
    return emailBody;
}

function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Full Name',
        'email': 'Email Address',
        'phone': 'Phone Number',
        'contact-preference': 'Preferred Contact Method',
        'message-type': 'Message Type',
        'urgency': 'Urgency',
        'newsletter': 'Subscribe to Newsletter',
        'message': 'Message'
    };
    
    return labels[fieldName] || fieldName;
}

function showEmailPreview(emailContent) {
    const emailModal = document.getElementById('emailModal');
    const emailBody = document.getElementById('emailBody');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    
    if (emailModal && emailBody) {
        emailBody.textContent = emailContent;
        emailModal.style.display = 'block';
        
        // Set up email sending
        if (sendEmailBtn) {
            sendEmailBtn.onclick = function() {
                sendEmail(emailContent);
            };
        }
    }
}

function sendEmail(emailContent) {
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    const cancelEmailBtn = document.getElementById('cancelEmailBtn');
    const successMessage = document.querySelector('.success-message');
    const emailModal = document.getElementById('emailModal');
    
    // Show loading state
    sendEmailBtn.disabled = true;
    sendEmailBtn.textContent = 'Sending...';
    cancelEmailBtn.disabled = true;
    
    // In a real application, this would be an AJAX call to a server-side script
    // that handles email sending. For demonstration, we'll simulate the process.
    
    // Simulate AJAX request
    setTimeout(function() {
        // Simulate successful email sending
        sendEmailBtn.disabled = false;
        sendEmailBtn.textContent = 'Send Email';
        cancelEmailBtn.disabled = false;
        
        // Close modal
        emailModal.style.display = 'none';
        
        // Show success message
        if (successMessage) {
            successMessage.innerHTML = `
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting Woodcraft Creations. Your message has been sent to our team, and we'll respond within 24 hours.</p>
                <p><strong>Email sent to:</strong> info@woodcraftcreations.co.za</p>
            `;
            successMessage.style.display = 'block';
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset character count
            const charCount = document.getElementById('charCount');
            if (charCount) {
                charCount.textContent = '0';
                charCount.parentElement.classList.remove('warning', 'error');
            }
            
            // Hide success message after 8 seconds
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 8000);
        }
    }, 2000);
}

// Interactive Map Functionality
function initInteractiveMap() {
    const mapContainer = document.getElementById('interactiveMap');
    
    if (!mapContainer) return;
    
    // Coordinates for Cape Town City Centre
    const capeTownCoords = [-33.922087, 18.422298];
    
    // Initialize the map
    const map = L.map('interactiveMap').setView(capeTownCoords, 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add a marker for the workshop location
    const workshopMarker = L.marker(capeTownCoords).addTo(map);
    workshopMarker.bindPopup(`
        <div style="text-align: center;">
            <strong>Woodcraft Creations Workshop</strong><br>
            <p>Cape Town City Centre, Cape Town, 1234</p>
            <p><em>Custom Furniture & Woodcraft Experts</em></p>
        </div>
    `).openPopup();
    
    // Add a custom icon (optional)
    const woodIcon = L.divIcon({
        className: 'woodcraft-icon',
        html: '<i class="fas fa-hammer" style="color: #8D6E63; font-size: 20px;"></i>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
    
    // Update marker with custom icon
    workshopMarker.setIcon(woodIcon);
    
    // Add a circle to highlight the area
    L.circle(capeTownCoords, {
        color: '#8D6E63',
        fillColor: '#8D6E63',
        fillOpacity: 0.1,
        radius: 200
    }).addTo(map);
}