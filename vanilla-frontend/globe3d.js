/**
 * Aceternity-style 3D Globe — vanilla Three.js implementation
 * Features: Earth texture, atmosphere glow, city markers with avatars,
 *           auto-rotation, mouse drag, hover tooltips, click handler
 */
(function () {
    const MARKERS = [
        { lat: 40.7128,  lng: -74.006,   src: 'https://assets.aceternity.com/avatars/1.webp',  label: 'New York' },
        { lat: 51.5074,  lng: -0.1278,   src: 'https://assets.aceternity.com/avatars/2.webp',  label: 'London' },
        { lat: 35.6762,  lng: 139.6503,  src: 'https://assets.aceternity.com/avatars/3.webp',  label: 'Tokyo' },
        { lat: -33.8688, lng: 151.2093,  src: 'https://assets.aceternity.com/avatars/4.webp',  label: 'Sydney' },
        { lat: 48.8566,  lng: 2.3522,    src: 'https://assets.aceternity.com/avatars/5.webp',  label: 'Paris' },
        { lat: 28.6139,  lng: 77.2090,   src: 'https://assets.aceternity.com/avatars/6.webp',  label: 'New Delhi' },
        { lat: 55.7558,  lng: 37.6173,   src: 'https://assets.aceternity.com/avatars/7.webp',  label: 'Moscow' },
        { lat: -22.9068, lng: -43.1729,  src: 'https://assets.aceternity.com/avatars/8.webp',  label: 'Rio de Janeiro' },
        { lat: 31.2304,  lng: 121.4737,  src: 'https://assets.aceternity.com/avatars/9.webp',  label: 'Shanghai' },
        { lat: 25.2048,  lng: 55.2708,   src: 'https://assets.aceternity.com/avatars/10.webp', label: 'Dubai' },
        { lat: -34.6037, lng: -58.3816,  src: 'https://assets.aceternity.com/avatars/11.webp', label: 'Buenos Aires' },
        { lat: 1.3521,   lng: 103.8198,  src: 'https://assets.aceternity.com/avatars/12.webp', label: 'Singapore' },
        { lat: 37.5665,  lng: 126.9780,  src: 'https://assets.aceternity.com/avatars/13.webp', label: 'Seoul' },
    ];

    // Convert lat/lng to 3D point on sphere of radius R
    function latLngToVec3(lat, lng, R) {
        const phi   = (90 - lat) * Math.PI / 180;
        const theta = (lng + 180) * Math.PI / 180;
        return new THREE.Vector3(
            -R * Math.sin(phi) * Math.cos(theta),
             R * Math.cos(phi),
             R * Math.sin(phi) * Math.sin(theta)
        );
    }

    function init() {
        const canvas  = document.getElementById('globeCanvas');
        const wrapper = document.getElementById('globeWrapper');
        const tooltip = document.getElementById('globeTooltip');
        if (!canvas || !wrapper) return;

        const W = wrapper.clientWidth  || 520;
        const H = wrapper.clientHeight || 520;
        const R = 1.5; // globe radius in scene units

        // ── Renderer ──────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setSize(W, H);
        renderer.setClearColor(0x000000, 0);

        // ── Scene & Camera ────────────────────────────────
        const scene  = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.z = 5;

        // ── Lighting ──────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const sun = new THREE.DirectionalLight(0x4da6ff, 1.2);
        sun.position.set(5, 3, 5);
        scene.add(sun);

        // ── Earth Sphere ──────────────────────────────────
        const texLoader = new THREE.TextureLoader();

        // Night-sky dark earth texture (works without CORS issues)
        const earthTex = texLoader.load(
            'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg',
            undefined, undefined,
            () => {
                // fallback: plain dark sphere
                earthMat.color.set(0x0a1628);
            }
        );
        const bumpTex  = texLoader.load('https://threejs.org/examples/textures/earth_normal_2048.jpg');
        const specTex  = texLoader.load('https://threejs.org/examples/textures/earth_specular_2048.jpg');

        const earthGeo = new THREE.SphereGeometry(R, 64, 64);
        const earthMat = new THREE.MeshPhongMaterial({
            map:         earthTex,
            bumpMap:     bumpTex,
            bumpScale:   0.05,
            specularMap: specTex,
            specular:    new THREE.Color(0x333333),
            shininess:   15
        });
        const earth = new THREE.Mesh(earthGeo, earthMat);
        scene.add(earth);

        // ── Atmosphere Glow ───────────────────────────────
        const atmGeo = new THREE.SphereGeometry(R * 1.07, 64, 64);
        const atmMat = new THREE.MeshPhongMaterial({
            color:       0x4da6ff,
            transparent: true,
            opacity:     0.10,
            side:        THREE.FrontSide,
            depthWrite:  false,
        });
        scene.add(new THREE.Mesh(atmGeo, atmMat));

        // ── Marker Sprites ────────────────────────────────
        const markerMeshes = [];

        MARKERS.forEach(m => {
            const pos = latLngToVec3(m.lat, m.lng, R + 0.04);

            // Glowing dot
            const dotGeo = new THREE.SphereGeometry(0.035, 12, 12);
            const dotMat = new THREE.MeshBasicMaterial({ color: 0x4da6ff });
            const dot    = new THREE.Mesh(dotGeo, dotMat);
            dot.position.copy(pos);
            dot.userData = { label: m.label };
            scene.add(dot);
            markerMeshes.push(dot);

            // Ring pulse
            const ringGeo = new THREE.RingGeometry(0.05, 0.07, 20);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0x4da6ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
            const ring    = new THREE.Mesh(ringGeo, ringMat);
            ring.position.copy(pos);
            ring.lookAt(0, 0, 0);
            ring.userData = { isRing: true };
            scene.add(ring);

            // Avatar sprite
            const avatarTex = texLoader.load(m.src, undefined, undefined, () => {});
            const spriteMat = new THREE.SpriteMaterial({ map: avatarTex, transparent: true, depthTest: false });
            const sprite    = new THREE.Sprite(spriteMat);
            const sp        = latLngToVec3(m.lat, m.lng, R + 0.32);
            sprite.position.copy(sp);
            sprite.scale.set(0.22, 0.22, 1);
            sprite.userData = { label: m.label };
            scene.add(sprite);
            markerMeshes.push(sprite);
        });

        // ── Drag / Auto-Rotation ──────────────────────────
        let isDragging = false;
        let prevMouse  = { x: 0, y: 0 };
        let rotVel     = { x: 0, y: 0.003 }; // auto-rotate
        const pivot    = new THREE.Group();
        pivot.add(earth);
        // Re-add marker children to pivot so they rotate with globe
        scene.add(pivot);

        canvas.addEventListener('mousedown', e => {
            isDragging = true;
            prevMouse  = { x: e.clientX, y: e.clientY };
            canvas.style.cursor = 'grabbing';
        });
        window.addEventListener('mouseup', () => {
            isDragging = false;
            canvas.style.cursor = 'grab';
        });
        window.addEventListener('mousemove', e => {
            if (!isDragging) return;
            const dx = e.clientX - prevMouse.x;
            const dy = e.clientY - prevMouse.y;
            rotVel.y = dx * 0.004;
            rotVel.x = dy * 0.004;
            prevMouse = { x: e.clientX, y: e.clientY };
        });

        // ── Raycaster for hover/click ─────────────────────
        const raycaster = new THREE.Raycaster();
        const mouse2D   = new THREE.Vector2();

        function getNDC(e) {
            const rect = canvas.getBoundingClientRect();
            mouse2D.x = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
            mouse2D.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        }

        canvas.addEventListener('mousemove', e => {
            getNDC(e);
            raycaster.setFromCamera(mouse2D, camera);
            const hits = raycaster.intersectObjects(markerMeshes);
            if (hits.length > 0 && hits[0].object.userData.label) {
                const lbl  = hits[0].object.userData.label;
                const rect = canvas.getBoundingClientRect();
                const sx   = e.clientX - rect.left;
                const sy   = e.clientY - rect.top;
                tooltip.textContent = '📍 ' + lbl;
                tooltip.style.left  = (sx + 12) + 'px';
                tooltip.style.top   = (sy - 30) + 'px';
                tooltip.style.opacity = '1';
                canvas.style.cursor = 'pointer';
            } else {
                tooltip.style.opacity = '0';
                if (!isDragging) canvas.style.cursor = 'grab';
            }
        });

        canvas.addEventListener('click', e => {
            getNDC(e);
            raycaster.setFromCamera(mouse2D, camera);
            const hits = raycaster.intersectObjects(markerMeshes);
            if (hits.length > 0 && hits[0].object.userData.label) {
                console.log('Clicked marker:', hits[0].object.userData.label);
            }
        });

        // ── Ring pulse animation state ────────────────────
        let clock = 0;

        // ── Render loop ───────────────────────────────────
        function animate() {
            requestAnimationFrame(animate);
            clock += 0.016;

            // Auto-rotate globe mesh group
            earth.rotation.y  += rotVel.y;
            earth.rotation.x  += rotVel.x * 0.3;
            rotVel.y = isDragging ? rotVel.y : rotVel.y * 0.97 + 0.003 * 0.03;
            rotVel.x *= 0.96;

            // Rotate all markers with the globe
            scene.children.forEach(obj => {
                if (obj !== earth && obj.userData && (obj.userData.label || obj.userData.isRing)) {
                    obj.rotation.y = earth.rotation.y;
                    obj.rotation.x = earth.rotation.x;
                }
            });

            // Pulse rings
            scene.children.forEach(obj => {
                if (obj.userData && obj.userData.isRing && obj.material) {
                    obj.material.opacity = 0.3 + 0.4 * Math.abs(Math.sin(clock * 2));
                    const s = 1 + 0.15 * Math.abs(Math.sin(clock * 2));
                    obj.scale.set(s, s, s);
                }
            });

            renderer.render(scene, camera);
        }
        animate();

        // ── Resize handler ────────────────────────────────
        window.addEventListener('resize', () => {
            const nW = wrapper.clientWidth;
            const nH = wrapper.clientHeight;
            camera.aspect = nW / nH;
            camera.updateProjectionMatrix();
            renderer.setSize(nW, nH);
        });
    }

    // Load Three.js from CDN then init
    if (window.THREE) {
        init();
    } else {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
        s.onload = init;
        document.head.appendChild(s);
    }
})();
