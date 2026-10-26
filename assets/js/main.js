let deferredPrompt;

// ఏ సెక్షన్ ఏ ఫోల్డర్ లో ఉందో ఇక్కడ చెప్పాము
const sectionPaths = {
    'role-selection': 'sections/auth/role-selection.html',
    'gi-login': 'sections/auth/gi-login.html',
    'school-login': 'sections/auth/school-login.html',
    'gi-dashboard': 'sections/admin/gi-dashboard.html',
    'principal-dashboard': 'sections/admin/principal-dashboard.html',
    'attendance': 'sections/incharge/attendance.html',
    'e-diary': 'sections/incharge/e-diary.html',
    'announcements': 'sections/incharge/announcements.html',
    'link-child': 'sections/parent/link-child.html',
    'parent-dashboard': 'sections/parent/parent-dashboard.html'
};

async function loadSection(sectionName) {
    const container = document.getElementById('app-container');
    
    // ఇప్పటికే ఉన్న సెక్షన్స్ ని హైడ్ చేయడం
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active'));

    // ఒకవేళ ఆ సెక్షన్ ఇంతకుముందే లోడ్ అయ్యి ఉంటే, డైరెక్ట్ గా చూపించడం
    if (document.getElementById(`section-${sectionName}`)) {
        document.getElementById(`section-${sectionName}`).classList.add('active');
        return;
    }

    // కొత్త సెక్షన్ ని లోడ్ చేయడం
    const path = sectionPaths[sectionName];
    if (!path) {
        console.error("Section not found:", sectionName);
        return;
    }

    try {
        const response = await fetch(path);
        const html = await response.text();
        
        const sectionWrapper = document.createElement('div');
        sectionWrapper.id = `section-${sectionName}`;
        sectionWrapper.className = 'app-section active';
        sectionWrapper.innerHTML = html;
        container.appendChild(sectionWrapper);

        // సెక్షన్ కి సంబంధించిన JS ఫైల్ లోడ్ చేయడం (ఉంటే)
        const jsPath = path.replace('.html', '.js');
        if (jsPath !== path) {
            const script = document.createElement('script');
            script.src = jsPath;
            script.type = 'module';
            document.body.appendChild(script);
        }

    } catch (error) {
        console.error("Error loading section:", error);
        container.innerHTML = `<p style="padding:20px; text-align:center;">Error loading page. Please check console.</p>`;
    }
}

window.loadSection = loadSection;

// --- Startup Logic ---
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('global-splash').classList.add('hidden');
        loadSection('role-selection'); 
    }, 2000);
});

// --- PWA Install Logic ---
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-banner').classList.add('show');
});

document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        document.getElementById('install-banner').classList.remove('show');
    }
});

window.addEventListener('appinstalled', () => {
    document.getElementById('install-banner').classList.remove('show');
    deferredPrompt = null;
});

// --- GI Popup Logic ---
window.openGiPopup = () => document.getElementById('gi-popup').classList.add('active');
window.closeGiPopup = () => document.getElementById('gi-popup').classList.remove('active');
window.openSuperAdmin = () => { alert("Super Admin Access (Phase 2)"); closeGiPopup(); };

// --- Demo Login Logic (Phase 1 Testing) ---
window.handleSchoolLogin = function(event) {
    event.preventDefault();
    alert("Demo Login Successful! Redirecting to Principal Dashboard.");
    loadSection('principal-dashboard'); 
};

// --- Dark Mode Toggle ---
window.toggleDarkMode = function() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#dark-mode-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
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

// --- Tab Switcher for Announcements ---
window.switchTab = function(btn, type) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const classGroup = document.getElementById('class-selector-group');
    if (type === 'school') {
        classGroup.style.display = 'none';
    } else {
        classGroup.style.display = 'flex';
    }
};
