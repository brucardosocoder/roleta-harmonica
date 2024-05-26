// script.js
document.addEventListener('DOMContentLoaded', () => {
    const rotateDiv = document.getElementById('rotateDiv');
    let isRotating = false;
    let initialAngle = 0;
    let rotationAngle = 0;

    const startRotation = (clientX, clientY) => {
        isRotating = true;
        const rect = rotateDiv.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const startX = clientX - centerX;
        const startY = clientY - centerY;
        initialAngle = Math.atan2(startY, startX);
    };

    const rotate = (clientX, clientY) => {
        if (isRotating) {
            const rect = rotateDiv.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const currentX = clientX - centerX;
            const currentY = clientY - centerY;
            const currentAngle = Math.atan2(currentY, currentX);
            const deltaAngle = currentAngle - initialAngle;
            rotationAngle += deltaAngle * (180 / Math.PI);
            rotateDiv.style.transform = `rotate(${rotationAngle}deg)`;
            initialAngle = currentAngle;
        }
    };

    rotateDiv.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    rotateDiv.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            startRotation(e.clientX, e.clientY);
        }
    });

    document.addEventListener('mousemove', (e) => {
        rotate(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', (e) => {
        if (e.button === 0) {
            isRotating = false;
        }
    });

    rotateDiv.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startRotation(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        rotate(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchend', () => {
        isRotating = false;
    });
});
