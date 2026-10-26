import { db } from './firebase-config.js';
import { doc, getDoc, collection, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- Show/Hide Section Logic ---
window.showSection = function(sectionId) {
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active'));
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) targetSection.classList.add('active');
};

// --- Startup Logic ---
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('global-splash').classList.add('hidden');
        showSection('role-selection');
    }, 1500);
});

// --- Role Selection ---
window.selectPortal = function(role) {
    localStorage.setItem('sv_role', role);
    if (role === 'school') {
        showSection('school-login');
    } else {
        showSection('link-child');
    }
};

// --- REAL SCHOOL LOGIN LOGIC (Firestore) ---
window.handleSchoolLogin = async function(event) {
    event.preventDefault();
    
    // HTML లో id="login-phone" మరియు id="login-pin" ఉన్నాయని కన్ఫర్మ్ చేసుకోండి
    const phone = document.getElementById('login-phone').value;
    const pin = document.getElementById('login-pin').value;
    
    try {
        const userDocRef = doc(db, "users", phone);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.pin === pin) {
                alert(`Welcome ${userData.name}!`);
                localStorage.setItem('sv_user', JSON.stringify(userData));
                
                if (userData.role === 'principal') {
                    showSection('principal-dashboard');
                    loadPrincipalData();
                } else if (userData.role === 'incharge') {
                    showSection('attendance');
                } else if (userData.role === 'admin') {
                     // Admin కి కూడా ప్రిన్సిపాల్ డాష్ బోర్డ్ చూపిస్తున్నాము
                    showSection('principal-dashboard');
                    loadPrincipalData();
                } else {
                    alert("Role not recognized.");
                }
            } else {
                alert("Incorrect PIN! Please try again.");
            }
        } else {
            alert("User not found! Please check your phone number.");
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Something went wrong. Check console.");
    }
};

// --- Load Principal Data (Approvals) ---
async function loadPrincipalData() {
    const approvalsContainer = document.querySelector('#section-principal-dashboard .dash-content');
    try {
        const querySnapshot = await getDocs(collection(db, "ediary"));
        let html = `<h3 class="section-title">Pending Approvals</h3>`;
        let count = 0;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.status === 'pending') {
                count++;
                html += `
                    <div class="approval-card">
                        <div class="approval-header">
                            <span class="badge class-badge">${data.className}</span>
                        </div>
                        <p class="approval-text"><strong>${data.subject}:</strong> ${data.notes}</p>
                        <div class="approval-actions">
                            <button class="btn-approve" onclick="approveDiary('${doc.id}')"><i class="fa-solid fa-check"></i> Approve</button>
                            <button class="btn-reject"><i class="fa-solid fa-xmark"></i> Reject</button>
                        </div>
                    </div>
                `;
            }
        });

        if (count === 0) html += `<p style="color:#64748b; font-size:14px;">No pending approvals.</p>`;
        approvalsContainer.innerHTML = html;
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// --- Approve Diary Logic ---
window.approveDiary = async function(diaryId) {
    try {
        const diaryRef = doc(db, "ediary", diaryId);
        await updateDoc(diaryRef, {
            status: "approved",
            approvedBy: "Principal",
            approvedAt: new Date().toISOString()
        });
        alert("Diary Approved Successfully!");
        loadPrincipalData();
    } catch (error) {
        console.error("Approval Error:", error);
        alert("Failed to approve. Check console.");
    }
};

// --- Attendance Toggle ---
window.markAttendance = function(btn, status) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.att-btn').forEach(b => b.classList.remove('active-p', 'active-a', 'active-l'));
    if (status === 'P') btn.classList.add('active-p');
    if (status === 'A') btn.classList.add('active-a');
    if (status === 'L') btn.classList.add('active-l');
};

// --- Tab Switcher for Announcements ---
window.switchTab = function(btn, type) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const classGroup = document.getElementById('class-selector-group');
    if (classGroup) {
        classGroup.style.display = (type === 'school') ? 'none' : 'flex';
    }
};

// --- GI Popup Logic ---
window.openGiPopup = () => document.getElementById('gi-popup').classList.add('active');
window.closeGiPopup = () => document.getElementById('gi-popup').classList.remove('active');
