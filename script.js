// script.js
document.addEventListener('DOMContentLoaded', () => {
    const rotateDiv = document.getElementById('rotateDiv');
    let isRotating = false;
    let initialAngle = 0;
    let rotationAngle = 0;

    rotateDiv.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    rotateDiv.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Botão esquerdo do mouse
            isRotating = true;
            const rect = rotateDiv.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const startX = e.clientX - centerX;
            const startY = e.clientY - centerY;
            initialAngle = Math.atan2(startY, startX);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isRotating) {
            const rect = rotateDiv.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const currentX = e.clientX - centerX;
            const currentY = e.clientY - centerY;
            const currentAngle = Math.atan2(currentY, currentX);
            const deltaAngle = currentAngle - initialAngle;
            rotationAngle += deltaAngle * (180 / Math.PI);
            rotateDiv.style.transform = `rotate(${rotationAngle}deg)`;
            initialAngle = currentAngle;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
            isRotating = false;
        }
    });
});
