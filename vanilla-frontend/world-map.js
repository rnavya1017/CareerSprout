document.addEventListener('DOMContentLoaded', () => {
    // 1. Text Animation for "Connectivity"
    const textEl = document.getElementById('animConnectivity');
    if (textEl) {
        const word = "Connectivity";
        textEl.innerHTML = '';
        word.split('').forEach((char, idx) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateX(-10px)';
            span.style.transition = `all 0.5s ease ${idx * 0.04}s`;
            textEl.appendChild(span);
        });
        
        // Trigger animation shortly after load
        setTimeout(() => {
            textEl.querySelectorAll('span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateX(0)';
            });
        }, 500);
    }

    // 2. World Map Connection Animation
    const canvas = document.getElementById('worldMapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Resize handling for high-DPI
    let width, height;
    function resize() {
        width = canvas.parentElement.clientWidth;
        height = canvas.parentElement.clientHeight;
        canvas.width = width * (window.devicePixelRatio || 1);
        canvas.height = height * (window.devicePixelRatio || 1);
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    window.addEventListener('resize', resize);
    resize();

    // The routes provided natively
    const routes = [
        { start: {lat: 64.2008, lng: -149.4937}, end: {lat: 34.0522, lng: -118.2437} },
        { start: {lat: 64.2008, lng: -149.4937}, end: {lat: -15.7975, lng: -47.8919} },
        { start: {lat: -15.7975, lng: -47.8919}, end: {lat: 38.7223, lng: -9.1393} },
        { start: {lat: 51.5074, lng: -0.1278}, end: {lat: 28.6139, lng: 77.209} },
        { start: {lat: 28.6139, lng: 77.209}, end: {lat: 43.1332, lng: 131.9113} },
        { start: {lat: 28.6139, lng: 77.209}, end: {lat: -1.2921, lng: 36.8219} }
    ];

    // Basic equirectangular mapping to map image
    // Note: The specific wikimedia map cuts off mostly at 85N and 60S roughly
    // We calibrate offsets to fit the visual image boundaries
    function project(lat, lng) {
        const x = (lng + 180) * (width / 360);
        
        // This SVG is cut differently. Approximate mapping:
        const mapLatRadius = 85; 
        const yOffset = height / 2;
        const y = yOffset - (lat * (height / (mapLatRadius * 2)));
        
        return {x, y};
    }

    let startTime = Date.now();

    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        const now = Date.now();
        const elapsed = (now - startTime) / 1000; // in seconds
        
        routes.forEach((route, index) => {
            const p1 = project(route.start.lat, route.start.lng);
            const p2 = project(route.end.lat, route.end.lng);
            
            // Draw Dots
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#3b82f6';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#3b82f6';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(p2.x, p2.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#10b981';
            ctx.shadowColor = '#10b981';
            ctx.fill();
            ctx.shadowBlur = 0; // reset
            
            // Quadratic curve control point (bend upwards)
            const cx = (p1.x + p2.x) / 2;
            const cy = Math.min(p1.y, p2.y) - Math.abs(p2.x - p1.x) * 0.2;
            
            // Draw background path (faded)
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Draw animated dashed segment
            // We use setLineDash and lineDashOffset
            const dashLength = 15;
            const gapLength = 1000; // big gap so we only see one line moving
            ctx.setLineDash([dashLength, gapLength]);
            
            // speed and offset
            const speed = 100; // pixels per second
            const offset = -((elapsed * speed) % gapLength);
            // stagger animation start based on index
            ctx.lineDashOffset = offset + (index * 200); 
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.quadraticCurveTo(cx, cy, p2.x, p2.y);
            
            // gradient for the moving line
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, '#3b82f6');
            grad.addColorStop(1, '#10b981');
            
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.setLineDash([]); // reset
        });

        requestAnimationFrame(draw);
    }
    
    draw();
});
