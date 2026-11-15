/**
 * ESTIEM LG Warsaw - Interactive Script Supplement
 * Handles board visualization, dynamic data rendering, animations, and interactions.
 */

// Placeholder board members; replace names, roles, bios, and photos with the real details.
const boardMembers = [
    {
        name: 'Jan Kowalski',
        role: 'Local President',
        bio: 'Odpowiada za strategię grupy i kontakt z europejską siecią ESTIEM.',
        image: 'https://i.pravatar.cc/240?img=12'
    },
    {
        name: 'Anna Nowak',
        role: 'Vice President',
        bio: 'Wspiera pracę zarządu i koordynuje realizację wspólnych celów.',
        image: 'https://i.pravatar.cc/240?img= 여성'
    },
    {
        name: 'Piotr Wiśniewski',
        role: 'Treasurer',
        bio: 'Dba o budżet i sprawy finansowe grupy.',
        image: 'https://i.pravatar.cc/240?img=14'
    },
    {
        name: 'Maria Zielińska',
        role: 'PR Responsible',
        bio: 'Zajmuje się komunikacją i promocją działań LG Warsaw.',
        image: 'https://i.pravatar.cc/240?img= महिला'
    },
    {
        name: 'Michał Wójcik',
        role: 'HR Responsible',
        bio: 'Wspiera członków grupy i dba o dobrą współpracę w zespole.',
        image: 'https://i.pravatar.cc/240?img=15'
    },
    {
        name: 'Katarzyna Kamińska',
        role: 'Activities Responsible',
        bio: 'Koordynuje wydarzenia i aktywności organizowane przez grupę.',
        image: 'https://i.pravatar.cc/240?img= महिला'
    },
    {
        name: 'Tomasz Lewandowski',
        role: 'IT Responsible',
        bio: 'Odpowiada za narzędzia cyfrowe i wsparcie techniczne.',
        image: 'https://i.pravatar.cc/240?img=17'
    }
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

    // 2. Populate and show Board Members Grid
    populateMembers();

    // 3. Setup Interactive Plane Animation triggers
    setupPlaneTrigger();

    // 4. Setup Navbar Scroll shadow
    setupScrollNavbar();

    // 5. Run initial plane flight to grab attention
    setTimeout(triggerPlaneFlight, 1500);
});

/**
 * Populates and displays the board grid using the boardMembers database.
 */
function populateMembers() {
    const grid = document.getElementById('members-grid');
    if (!grid) return;

    grid.innerHTML = boardMembers.map((member, index) => {
        const safeBio = member.bio.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        const safeImage = member.image.replace(/'/g, "%27");
        return `
            <div class="member-card p-6 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition cursor-pointer"
                 onclick="showBio('${member.name}', '${member.role}', '${safeBio}', '${safeImage}')"
                 data-aos="fade-up"
                 data-aos-delay="${index * 100}">
                <img src="${member.image}"
                     class="w-20 h-20 mx-auto rounded-2xl mb-4 border border-white/20 object-cover"
                     alt="Zdjęcie: ${member.name}">
                <h4 class="font-bold text-sm">${member.name}</h4>
                <p class="text-[10px] uppercase text-estiemMint opacity-70">${member.role}</p>
            </div>
        `;
    }).join('');

    // Show all seven placeholder profiles immediately, without requiring a click on the group photo.
    grid.classList.remove('hidden');
}

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
