/**
 * ESTIEM LG Warsaw - Interactive Script Supplement
 * Handles board visualization, dynamic data rendering, animations, and interactions.
 */

// Board Members Database
const boardMembers = [

];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out'
        });
    }

    // 2. Populate Board Members Grid
    populateMembers();

    // 3. Setup Interactive Plane Animation triggers
    setupPlaneTrigger();

    // 4. Setup Navbar Scroll shadow
    setupScrollNavbar();

    // 5. Run initial plane flight to grab attention
    setTimeout(triggerPlaneFlight, 1500);
});

/**
 * Populates the board grid dynamically using the boardMembers database.
 */
function populateMembers() {
    const grid = document.getElementById('members-grid');
    if (!grid) return;

    grid.innerHTML = boardMembers.map((member, index) => {
        // We clean quotes for safe parameter passing in onclick
        const safeBio = member.bio.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `
            <div class="member-card p-6 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition cursor-pointer"
                 onclick="showBio('${member.name}', '${member.role}', '${safeBio}')"
                 data-aos="fade-up" 
                 data-aos-delay="${index * 100}">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatarSeed}"
                     class="w-20 h-20 mx-auto rounded-2xl mb-4 border border-white/20"
                     alt="${member.name}">
                <h4 class="font-bold text-sm">${member.name.split(' ')[0]}</h4>
                <p class="text-[10px] uppercase text-estiemMint opacity-70">${member.role}</p>
            </div>
        `;
    }).join('');
}

/**
 * Toggles the visibility of the Board members grid.
 */
function openBoard() {
    const grid = document.getElementById('members-grid');
    if (!grid) return;

    if (grid.classList.contains('hidden')) {
        grid.classList.remove('hidden');
        // Refresh AOS to calculate offsets for newly visible items
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }
        // Smoothly scroll down to the members list
        grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        grid.classList.add('hidden');
        // Close bio display if active
        const bioDisplay = document.getElementById('bio-display');
        if (bioDisplay) {
            bioDisplay.classList.add('hidden');
        }
    }
}

/**
 * Displays detailed information about a selected member.
 */
function showBio(name, role, text) {
    const bioDisplay = document.getElementById('bio-display');
    const bioName = document.getElementById('bio-name');
    const bioRole = document.getElementById('bio-role');
    const bioText = document.getElementById('bio-text');
    const bioImgContainer = document.getElementById('bio-img');

    if (!bioDisplay || !bioName || !bioRole || !bioText || !bioImgContainer) return;

    bioName.textContent = name;
    bioRole.textContent = role;
    bioText.textContent = text;

    // Set avatar based on first name seed
    const seed = name.split(' ')[0];
    bioImgContainer.innerHTML = `
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}" 
             class="w-full h-full object-cover" 
             alt="${name}">
    `;

    bioDisplay.classList.remove('hidden');
    
    // Smooth scroll down to details
    setTimeout(() => {
        bioDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
}

/**
 * Setup click trigger on the word "Podróże" in the main heading
 */
function setupPlaneTrigger() {
    // Find the third highlight word in the main page title (spans)
    const spans = document.querySelectorAll('h1 span.text-estiemLight');
    spans.forEach(span => {
        if (span.textContent.includes('Podróże')) {
            span.style.cursor = 'pointer';
            span.addEventListener('click', triggerPlaneFlight);
        }
    });
}

/**
 * Triggers the flying plane animation across the screen
 */
function triggerPlaneFlight() {
    const planeContainer = document.getElementById('plane-container');
    const plane = document.getElementById('plane');
    if (!planeContainer || !plane) return;

    // Reset class & visibility
    plane.classList.remove('plane-fly');
    planeContainer.classList.remove('opacity-0');
    planeContainer.style.opacity = '1';

    // Trigger reflow to restart css animation
    void plane.offsetWidth;

    // Start flying
    plane.classList.add('plane-fly');

    // Fade out container after flight completes
    setTimeout(() => {
        planeContainer.classList.add('opacity-0');
        planeContainer.style.opacity = '0';
    }, 2800);
}

/**
 * Handles adding/removing shadows on scroll for sticky header navbar
 */
function setupScrollNavbar() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('shadow-md', 'border-gray-200/50');
            nav.classList.remove('border-gray-100');
        } else {
            nav.classList.remove('shadow-md', 'border-gray-200/50');
            nav.classList.add('border-gray-100');
        }
    });
}
