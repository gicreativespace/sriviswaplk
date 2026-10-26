window.selectPortal = function(role) {
    localStorage.setItem('sv_role', role);
    
    if (role === 'school') {
        alert("School Portal Selected! Next time app opens, it will remember this. (Phase 2: Login screen will load here)");
    } else {
        alert("Parent Portal Selected! Next time app opens, it will remember this. (Phase 2: Login screen will load here)");
    }
};
