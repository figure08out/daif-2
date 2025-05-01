// Type definitions for Vanta.js
interface VantaWavesOptions {
    el: string | HTMLElement;
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
}

export interface VantaEffect {
    destroy: () => void;
}

interface VantaWaves {
    WAVES: (options: VantaWavesOptions) => VantaEffect;
}

declare global {
    interface Window {
        VANTA: VantaWaves;
    }
}

export { }; 