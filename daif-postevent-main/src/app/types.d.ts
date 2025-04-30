interface VantaEffect {
    destroy: () => void;
}

interface VantaWaves {
    (options: {
        el: HTMLElement | string;
        mouseControls?: boolean;
        touchControls?: boolean;
        gyroControls?: boolean;
        minHeight?: number;
        minWidth?: number;
        scale?: number;
        scaleMobile?: number;
        color?: number;
        shininess?: number;
        waveHeight?: number;
        waveSpeed?: number;
        zoom?: number;
    }): VantaEffect;
}

interface VantaAPI {
    WAVES: VantaWaves;
}

interface Window {
    VANTA: VantaAPI;
} 