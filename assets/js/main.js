// --- Show/Hide Section Logic ---
window.showSection = function(sectionId) {
    // అన్ని సెక్షన్స్ ని హైడ్ చేయడం
    document.querySelectorAll('.app-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // కావలసిన సెక్షన్ ని మాత్రమే చూపించడం
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    } else {
        console.error("Section not found: " + sectionId);
    }
};

// --- Startup Logic ---
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('global-splash').classList.add('hidden');
        // మొదట్లో రోల్ సెలెక్షన్ చూపించడం
        showSection('role-selection');
    }, 1500);
});

// --- Role Selection Logic ---
window.selectPortal = function(role) {
    localStorage.setItem('sv_role', role);
    if (role === 'school') {
        showSection('school-login');
    } else {
        alert("Parent Portal logic coming in Phase 2!");
    }
};

// --- Login Logic ---
window.handleSchoolLogin = function(event) {
    event.preventDefault();
    // ప్రస్తుతానికి డైరెక్ట్ గా ప్రిన్సిపాల్ డాష్ బోర్డ్ కి వెళ్దాం
    alert("Login Successful! (Demo)");
    showSection('principal-dashboard'); 
};

// --- Attendance Toggle ---
window.markAttendance = function(btn, status) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.att-btn').forEach(b => {
        b.classList.remove('active-p', 'active-a', 'active-l');
    });
    if (status === 'P') btn.classList.add('active-p');
    if (status === 'A') btn.classList.add('active-a');
    if (status === 'L') btn.classList.add('active-l');
};

// --- GI Popup Logic ---
window.openGiPopup = () => document.getElementById('gi-popup').classList.add('active');
window.closeGiPopup = () => document.getElementById('gi-popup').classList.remove('active');
