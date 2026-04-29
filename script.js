/**
 * ALMAARI - The Heirloom Editorial
 * Main Script File
 */

document.addEventListener('DOMContentLoaded', () => {
    
    document.addEventListener('DOMContentLoaded', () => {
    
    // --- SEARCH BAR TOGGLE ---
    const searchToggle = document.getElementById('search-toggle');
    const searchInput = document.getElementById('search-input');

    if (searchToggle) {
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            searchInput.classList.toggle('active');
            if (searchInput.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }

    // --- MINI CART SIDEBAR TOGGLE ---
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartClose = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');

    function toggleCart() {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        // Prevent body scroll when cart is open
        document.body.style.overflow = cartSidebar.classList.contains('active') ? 'hidden' : '';
    }

    if (cartToggle) {
        cartToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCart();
        });
    }

    if (cartClose) cartClose.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // --- PROFILE DROPDOWN TOGGLE ---
    const profileToggle = document.getElementById('profile-toggle');
    const profileMenu = document.getElementById('profile-menu');

    if (profileToggle) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('active');
        });
    }

    // --- GLOBAL CLICK TO CLOSE EVERYTHING ---
    window.addEventListener('click', (e) => {
        // Close search if clicking outside
        if (!e.target.closest('.search-container')) {
            searchInput.classList.remove('active');
        }
        // Close profile menu if clicking outside
        if (!e.target.closest('.profile-dropdown-container')) {
            profileMenu.classList.remove('active');
        }
    });

    // --- SCROLL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
});
    /* --- 1. Scroll Animation Logic --- */
    
    // Configuration for the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element enters the viewport: animate in
                entry.target.classList.add('fade-in-up');
                entry.target.classList.remove('hidden');
            } else {
                // Element leaves the viewport: reset to hidden state
                // This allows the animation to happen again when scrolling back
                entry.target.classList.remove('fade-in-up');
                entry.target.classList.add('hidden');
            }
        });
    }, observerOptions);

    // Initialize all elements marked for scroll animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(el => {
        el.classList.add('hidden'); // Apply initial hidden state
        observer.observe(el);       // Start observing continuously
    });


    /* --- 2. Collection Filter Logic --- */

    // Handles the "Refine Selection" sidebar interaction for the Collections page
    const filterItems = document.querySelectorAll('.filter-list li');
    
    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            // Find the current list (Fabric, Price, etc.) and clear existing selection
            const parentList = item.parentElement;
            parentList.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
            
            // Highlight the newly selected filter
            item.classList.add('selected');
            
            // Log for development (This is where you'd add actual filtering logic in the future)
            console.log(`User filtered collection by: ${item.innerText.trim()}`);
        });
    });

    // Handle Color Swatch selection
    const swatches = document.querySelectorAll('.swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.style.outline = 'none');
            swatch.style.outline = '2px solid var(--primary)';
            swatch.style.outlineOffset = '2px';
        });
    });


    /* --- 3. Form Submission Logic --- */

    // Simple preventDefault for the contact form
    const contactForm = document.querySelector('.contact-form form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Provide a refined feedback message matching the brand tone
            alert('Your inquiry has been received. Our curator will get back to you shortly.');
        });
    }

    /* --- 4. Navigation Styling --- */

    // Adds a subtle shadow to the navbar when the user scrolls down
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });


    // Image Switcher for thumbnails
function switchImage(img) {
    const main = document.getElementById("expandedImg");
    main.src = img.src;
    // Add a quick fade effect
    main.style.opacity = 0.5;
    setTimeout(() => main.style.opacity = 1, 100);
}

// Quantity Counter
function changeQty(amount) {
    const qtyText = document.getElementById("quantity");
    let current = parseInt(qtyText.innerText);
    if (current + amount >= 1) {
        qtyText.innerText = current + amount;
    }
}

/* --- 6. Wishlist Management --- */
function removeItem(button) {
    const card = button.closest('.wishlist-card');
    const container = document.getElementById('wishlist-container');
    const emptyState = document.getElementById('empty-wishlist');

    // Smooth removal animation
    card.style.opacity = '0';
    card.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        card.remove();
        
        // Check if wishlist is empty
        if (container.querySelectorAll('.wishlist-card').length === 0) {
            container.classList.add('hidden');
            emptyState.classList.remove('hidden');
            emptyState.classList.add('fade-in-up');
        }
    }, 300);
}


/* --- 7. Cart Interactions --- */

function updateCartQty(btn, change) {
    const qtySpan = btn.parentElement.querySelector('span');
    let currentQty = parseInt(qtySpan.innerText);
    if (currentQty + change >= 1) {
        qtySpan.innerText = currentQty + change;
    }
}

function removeCartItem(btn) {
    const item = btn.closest('.cart-item');
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        item.remove();
        // Here you would normally update the total price calculation
        console.log("Item removed from bag.");
    }, 400);
}


/* --- 8. Profile Dropdown Logic --- */
const profileToggle = document.getElementById('profile-toggle');
const profileMenu = document.getElementById('profile-menu');

if (profileToggle) {
    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the click from reaching the window
        profileMenu.classList.toggle('active');
    });

    // Close the dropdown if the user clicks anywhere else on the page
    window.addEventListener('click', () => {
        if (profileMenu.classList.contains('active')) {
            profileMenu.classList.remove('active');
        }
    });
}

});