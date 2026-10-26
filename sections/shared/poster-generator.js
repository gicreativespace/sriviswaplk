// Poster Generator Logic (To be called in Phase 2)
window.generatePoster = function(className, date, subjectsData, isApproved) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set Canvas Size
    canvas.width = 800;
    canvas.height = 1000;
    
    // 1. Draw Background (White)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Draw Top Border (Deep Blue)
    ctx.fillStyle = "#0F4C81";
    ctx.fillRect(0, 0, canvas.width, 20);
    
    // 3. Draw School Name
    ctx.fillStyle = "#0F4C81";
    ctx.font = "bold 40px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("SRI VISWA GROUP OF INSTITUTIONS", canvas.width/2, 80);
    
    // 4. Draw Title
    ctx.fillStyle = "#1E293B";
    ctx.font = "bold 36px Poppins";
    ctx.fillText("📚 E-DIARY UPDATE", canvas.width/2, 150);
    
    // 5. Draw Class and Date
    ctx.font = "24px Poppins";
    ctx.fillText(`Class: ${className} | Date: ${date}`, canvas.width/2, 200);
    
    // 6. Draw Subjects (Loop through data)
    let yPos = 260;
    ctx.textAlign = "left";
    subjectsData.forEach(sub => {
        ctx.fillStyle = "#0F4C81";
        ctx.font = "bold 24px Poppins";
        ctx.fillText(`🔹 ${sub.name.toUpperCase()}`, 80, yPos);
        
        ctx.fillStyle = "#1E293B";
        ctx.font = "20px Poppins";
        ctx.fillText(sub.notes, 100, yPos + 30);
        
        yPos += 90; // Increment height for next subject
    });
    
    // 7. Draw Approved Stamp
    if (isApproved) {
        ctx.save();
        ctx.translate(canvas.width/2, yPos + 50);
        ctx.rotate(-15 * Math.PI / 180);
        
        ctx.strokeStyle = "#3F8F29";
        ctx.lineWidth = 5;
        ctx.strokeRect(-100, -30, 200, 60);
        
        ctx.fillStyle = "#3F8F29";
        ctx.font = "bold 28px Poppins";
        ctx.textAlign = "center";
        ctx.fillText("✅ APPROVED", 0, 10);
        ctx.restore();
    }
    
    // 8. Footer
    ctx.fillStyle = "#64748B";
    ctx.font = "16px Poppins";
    ctx.textAlign = "center";
    ctx.fillText("Generated via Sri Viswa Connect App", canvas.width/2, canvas.height - 40);
    
    // Convert to Image
    const dataURL = canvas.toDataURL("image/png");
    
    // Show in a new tab or download
    const link = document.createElement('a');
    link.download = `SriViswa_EDiary_${className}.png`;
    link.href = dataURL;
    link.click();
};
