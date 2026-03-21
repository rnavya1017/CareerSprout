import createGlobe from 'https://cdn.jsdelivr.net/npm/cobe@0.6.3/+esm';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById("cobe");
    
    if (canvas) {
        let phi = 0;
        let width = 0;
        
        // Match the "aceternity" globe markers
        const markers = [
            { location: [40.7128, -74.006], size: 0.1 },
            { location: [51.5074, -0.1278], size: 0.1 },
            { location: [35.6762, 139.6503], size: 0.1 },
            { location: [-33.8688, 151.2093], size: 0.1 },
            { location: [48.8566, 2.3522], size: 0.1 },
            { location: [28.6139, 77.209], size: 0.1 },
            { location: [55.7558, 37.6173], size: 0.1 },
            { location: [-22.9068, -43.1729], size: 0.1 },
            { location: [31.2304, 121.4737], size: 0.1 },
            { location: [25.2048, 55.2708], size: 0.1 },
            { location: [-34.6037, -58.3816], size: 0.1 },
            { location: [1.3521, 103.8198], size: 0.1 },
            { location: [37.5665, 126.978], size: 0.1 },
        ];
        
        const onResize = () => {
             width = canvas.offsetWidth;
        };
        window.addEventListener('resize', onResize);
        onResize();
        
        const globe = createGlobe(canvas, {
            devicePixelRatio: window.devicePixelRatio || 1,
            width: width * 2, // retina scaling
            height: width * 2,
            phi: 0,
            theta: 0.3, // Slight tilt downwards
            dark: 1, // dark mode surface
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.1, 0.15, 0.25], 
            markerColor: [0.1, 0.8, 1], // matches atmosphereColor: "#4da6ff"
            glowColor: [0.2, 0.5, 0.8],
            markers: markers,
            onRender: (state) => {
                state.phi = phi;
                phi += 0.005; 
                state.width = canvas.offsetWidth * 2;
                state.height = canvas.offsetWidth * 2;
            }
        });
    }
});
