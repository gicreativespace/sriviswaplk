// --- State Management & Local Storage ---
document.addEventListener('DOMContentLoaded', () => {
    // Splash screen check
    setTimeout(() => {
        const savedRole = localStorage.getItem('sv_role');
        
        if (savedRole) {
            // If role is saved, go straight to Login (Phase 2 will handle auth)
            // Currently, we are skipping the role selection screen
            goToLogin(savedRole);
        } else {
            // Show role selection for first time
            showScreen('role-screen');
        }
    }, 2000); // 2 seconds splash
});

// --- Navigation Functions ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function selectRole(role) {
    localStorage.setItem('sv_role', role); // Save role permanently
    goToLogin(role);
}

function goToLogin(role) {
    const title = document.getElementById('login-title');
    if (role === 'school') {
        title.innerText = "School Portal Login";
    } else {
        title.innerText = "Parent Portal Login";
    }
    showScreen('login-screen');
}

function goBack() {
    // If they go back, we remove the saved role so they can choose again
    // Note: In Phase 2, we might only want to do this on logout, but for now this works
    localStorage.removeItem('sv_role');
    showScreen('role-screen');
}

// --- GI Popup Logic ---
function openGiPopup() {
    document.getElementById('gi-popup').classList.add('active');
}

function closeGiPopup() {
    document.getElementById('gi-popup').classList.remove('active');
}

// Close popup if user clicks outside the card
document.getElementById('gi-popup').addEventListener('click', (e) => {
    if (e.target.id === 'gi-popup') {
        closeGiPopup();
    }
});

// --- Super Admin Trigger ---
function openSuperAdmin() {
    // This will be connected to Firebase Auth in Phase 2
    alert("Super Admin Portal will open here (Phase 2)");
    closeGiPopup();
}
