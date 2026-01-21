
import { useEffect, useRef } from 'react';

interface Particle {
    pos: { x: number; y: number };
    vel: { x: number; y: number };
    shrink: number;
    size: number;
    resistance: number;
    flick: boolean;
    color: string; // hsla string
    alpha: number;
    fade: number;
}

interface Rocket {
    pos: { x: number; y: number };
    vel: { x: number; y: number };
    resistance: number;
    color: string; // hsla string
    hue?: number;
    targetY: number;
    size: number;
    shrink: number;
    flick: boolean;
    alpha: number;
    fade: number;
}

interface FireworksProps {
    className?: string;
}

export function Fireworks({ className }: FireworksProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let rockets: Rocket[] = [];

        // Set canvas dimensions
        const updateDimensions = () => {
            if (containerRef.current && canvas) {
                canvas.width = containerRef.current.clientWidth;
                canvas.height = containerRef.current.clientHeight;
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        // Main loop
        let animationFrameId: number;

        const loop = () => {
            // Clear canvas with overlap for trail effect
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Slower fade for smoother trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';

            // Draw and update particles
            let i = particles.length;
            while (i--) {
                const p = particles[i];

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2, true);
                ctx.fill();

                // Update
                p.pos.x += p.vel.x;
                p.pos.y += p.vel.y;
                p.vel.x *= p.resistance;
                p.vel.y *= p.resistance;
                p.vel.y += 0.02; // Reduced gravity
                p.size *= p.shrink;
                p.alpha -= p.fade;

                if (p.alpha < 0 || p.size < 0.5) {
                    particles.splice(i, 1);
                }
            }

            // Draw and update rockets
            let j = rockets.length;
            while (j--) {
                const r = rockets[j];

                ctx.fillStyle = r.color;
                ctx.beginPath();
                ctx.arc(r.pos.x, r.pos.y, r.size, 0, Math.PI * 2, true);
                ctx.fill();

                // Update
                r.pos.x += r.vel.x;
                r.pos.y += r.vel.y;
                r.vel.x *= r.resistance;
                r.vel.y *= r.resistance;
                r.vel.y += 0.02; // Reduced gravity

                if (Math.random() < 0.05) {
                    // flicker logic
                }

                // Check bounds: Explode if reached target height OR if slowed down (apex)
                if ((r.pos.y <= r.targetY || (r.vel.y > -0.5 && r.vel.y < 0.5)) && Math.random() < 0.9) {
                    explode(r.pos.x, r.pos.y, r.color, r.hue);
                    rockets.splice(j, 1);
                } else if (r.pos.y < -50 || r.pos.x < -50 || r.pos.x > canvas.width + 50) {
                    rockets.splice(j, 1);
                }
            }

            // Random launch
            if (Math.random() < 0.08) { // Increased frequency significantly
                launchRocket();
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        const launchRocket = (x?: number) => {
            if (!canvas) return;

            const startX = x || Math.random() * canvas.width;
            const startY = canvas.height;
            // Varied target height: 10% to 75% down screen
            const targetY = canvas.height * 0.1 + Math.random() * (canvas.height * 0.65);

            // Faster ascent for "faster" feel
            const speed = -(Math.random() * 6 + 12);
            const angle = (Math.random() - 0.5) * 0.3;

            const hue = Math.floor(Math.random() * 360);

            rockets.push({
                pos: { x: startX, y: startY },
                vel: { x: Math.sin(angle) * Math.abs(speed), y: speed },
                resistance: 0.99,
                color: `hsla(${hue}, 100%, 65%, 1)`,
                hue: hue, // Store launching hue
                targetY: targetY,
                size: 4,
                shrink: 0.99,
                flick: true,
                alpha: 1,
                fade: 0
            });
        };

        const explode = (x: number, y: number, color: string, baseHue?: number) => {
            // More particles
            const count = 100 + Math.random() * 80;
            const centerHue = baseHue || Math.floor(Math.random() * 360);

            for (let k = 0; k < count; k++) {
                const angle = Math.random() * Math.PI * 2;
                // Much higher speed for HUGE explosion
                const speed = Math.random() * 12 + 3;

                // Varied colors per particle for "more colourful"
                const pHue = (centerHue + Math.random() * 60 - 30) % 360;
                const pLightness = 50 + Math.random() * 40; // Brighter

                particles.push({
                    pos: { x, y },
                    vel: { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
                    size: Math.random() * 4 + 2, // Bigger
                    shrink: 0.96, // Shrink faster? No, let them hang
                    resistance: 0.94, // Air drag
                    color: `hsla(${pHue}, 100%, ${pLightness}%, 1)`,
                    flick: Math.random() < 0.5, // More sparkling
                    alpha: 1,
                    fade: 0.005 + Math.random() * 0.015
                });
            }
        };

        loop();

        const handleClick = (e: MouseEvent) => {
            launchRocket(e.clientX);
        };

        canvas.addEventListener('mousedown', handleClick);

        return () => {
            window.removeEventListener('resize', updateDimensions);
            canvas.removeEventListener('mousedown', handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className || ''}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ touchAction: 'none' }}
            />
        </div>
    );
}
