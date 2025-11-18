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
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize team member modals
    initTeamModals();
});

// Scroll Animation Functionality
function initScrollAnimations() {
    const cards = document.querySelectorAll('.card');
    const valueItems = document.querySelectorAll('.value-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
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
    
    // Observe each element
    cards.forEach(card => {
        observer.observe(card);
    });
    
    valueItems.forEach(item => {
        observer.observe(item);
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Team Member Modal Functionality
function initTeamModals() {
    const teamMembers = document.querySelectorAll('.team-member');
    const modal = document.getElementById('memberModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Team member data
    const teamData = {
        pandelani: {
            name: "Pandelani Munenyiwa",
            role: "Master Craftsman & Founder",
            bio: "With over 15 years of experience in woodworking, Pandelani founded Woodcraft Creations in 2015. His passion for transforming raw wood into beautiful, functional pieces drives the company's commitment to excellence. He specializes in custom furniture design and complex woodworking techniques.",
            specialties: ["Custom Furniture Design", "Complex Woodworking", "Project Leadership"]
        },
        angel: {
            name: "Angel Mohlahlo",
            role: "Design Specialist",
            bio: "Angel brings a creative eye and technical expertise to every project. With a background in interior design and fine arts, she helps clients visualize their dream pieces and ensures that every design is both beautiful and functional. She's passionate about sustainable design practices.",
            specialties: ["Interior Design Integration", "Client Consultation", "Sustainable Design"]
        },
        humbulani: {
            name: "Humbulani Munenyiwa",
            role: "Project Manager",
            bio: "Humbulani ensures that every project runs smoothly from concept to completion. With excellent organizational skills and attention to detail, he coordinates timelines, materials, and team resources to deliver exceptional results on schedule. He's the bridge between our clients and craftsmen.",
            specialties: ["Project Coordination", "Timeline Management", "Client Communication"]
        }
    };
    
    // Add click event to each team member
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            const memberId = this.getAttribute('data-member');
            openMemberModal(memberId);
        });
    });
    
    // Close modal when clicking the X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            closeMemberModal();
        });
    }
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeMemberModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeMemberModal();
        }
    });
    
    // Function to open the modal with member data
    function openMemberModal(memberId) {
        const member = teamData[memberId];
        if (!member) return;
        
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="modal-member">
                <img src="Images/${memberId.charAt(0).toUpperCase() + memberId.slice(1)}.jpg" alt="${member.name}">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <div class="bio">
                    <p>${member.bio}</p>
                    <h4>Specialties:</h4>
                    <ul>
                        ${member.specialties.map(specialty => `<li>${specialty}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function to close the modal
    function closeMemberModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Add image fallback for team member images
document.addEventListener('DOMContentLoaded', function() {
    const teamImages = document.querySelectorAll('.team-member img');
    
    teamImages.forEach(img => {
        img.addEventListener('error', function() {
            // If the image fails to load, replace with a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjdGN0Y3Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzhENkU2MyIvPjxwYXRoIGQ9Ik0xMDAgMTMwQzcwIDEzMCA1NSAxNjUgNTUgMTY1SDE0NUMxNDUgMTY1IDEzMCAxMzAgMTAwIDEzMFoiIGZpbGw9IiM4RDZFNjMiLz4KPC9zdmc+';
            this.alt = 'Team Member Image';
        });
    });
});