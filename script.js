/**
 * ESTIEM LG Warsaw - Interactive Script Supplement
 * Handles board visualization, dynamic data rendering, animations, and interactions.
 */


document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out'
        });
    }

    // 3. Setup Interactive Plane Animation triggers
    setupPlaneTrigger();

    // 5. Run initial plane flight to grab attention
    setTimeout(triggerPlaneFlight, 1500);
});


/**
 * Toggles the visibility of the Board members grid.
 */
function openBoard() {
    const grid = document.getElementById('members-grid');
    if (!grid) return;

    if (grid.classList.contains('hidden')) {
        grid.classList.remove('hidden');
        if (typeof AOS !== 'undefined') {
            setTimeout(() => AOS.refresh(), 100);
        }
        grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        grid.classList.add('hidden');
        const bioDisplay = document.getElementById('bio-display');
        if (bioDisplay) bioDisplay.classList.add('hidden');
    }
}

/**
 * Displays detailed information about a selected member.
 */
function showBio(name, role, text, image) {
    const bioDisplay = document.getElementById('bio-display');
    const bioName = document.getElementById('bio-name');
    const bioRole = document.getElementById('bio-role');
    const bioText = document.getElementById('bio-text');
    const bioImgContainer = document.getElementById('bio-img');

    if (!bioDisplay || !bioName || !bioRole || !bioText || !bioImgContainer) return;

    bioName.textContent = name;
    bioRole.textContent = role;
    bioText.textContent = text;
    bioImgContainer.innerHTML = `
        <img src="${image}" class="w-full h-full object-cover" alt="Zdjęcie: ${name}">
    `;

    bioDisplay.classList.remove('hidden');
    setTimeout(() => {
        bioDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
}

/**
 * Setup click trigger on the word "Podróże" in the main heading
 */
function setupPlaneTrigger() {
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

    plane.classList.remove('plane-fly');
    planeContainer.classList.remove('opacity-0');
    planeContainer.style.opacity = '1';
    void plane.offsetWidth;
    plane.classList.add('plane-fly');

    setTimeout(() => {
        planeContainer.classList.add('opacity-0');
        planeContainer.style.opacity = '0';
    }, 2800);
}