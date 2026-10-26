let deferredPrompt;

async function loadSection(sectionName) {
    const container = document.getElementById('app-container');
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active'));

    if (!document.getElementById(`section-${sectionName}`)) {
        try {
            const response = await fetch(`/sections/auth/${sectionName}.html`);
            const html = await response.text();
            
            const sectionWrapper = document.createElement('div');
            sectionWrapper.id = `section-${sectionName}`;
            sectionWrapper.className = 'app-section';
            sectionWrapper.innerHTML = html;
            container.appendChild(sectionWrapper);

            const script = document.createElement('script');
            script.src = `/sections/auth/${sectionName}.js`;
            script.type = 'module';
            document.body.appendChild(script);

        } catch (error) {
            console.error("Error loading section:", error);
        }
    }
    document.getElementById(`section-${sectionName}`).classList.add('active');
}

window.loadSection = loadSection;

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('global-splash').classList.add('hidden');
        const savedRole = localStorage.getItem('sv_role');
        loadSection('role-selection'); 
    }, 2000);
});

// PWA Install Logic
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-banner').classList.add('show');
});

document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
        document.getElementById('install-banner').classList.remove('show');
    }
});

window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    document.getElementById('install-banner').classList.remove('show');
    deferredPrompt = null;
});

// GI Popup Logic
window.openGiPopup = () => document.getElementById('gi-popup').classList.add('active');
window.closeGiPopup = () => document.getElementById('gi-popup').classList.remove('active');
window.openSuperAdmin = () => { alert("Super Admin Access (Phase 2)"); closeGiPopup(); };
