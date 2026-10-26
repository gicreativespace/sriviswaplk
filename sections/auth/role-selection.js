window.selectPortal = function(role) {
    localStorage.setItem('sv_role', role);
    
    if (role === 'school') {
        loadSection('school-login'); 
    } else {
        // ప్రస్తుతానికి పేరెంట్ కి link-child పేజీ చూపిస్తున్నాము
        loadSection('link-child'); 
    }
};
