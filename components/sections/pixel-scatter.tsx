"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Pixel {
    left: number;
    top: number;
    size: number;
    scatterX: number;
    scatterY: number;
    restX: number;
    restY: number;
    delay: number;
    opacity: number;
    rotate: number;
}

const pixels: Pixel[] = Array.from({ length: 42 }, (_, index) => {
    const lane = index % 4;
    const laneTop = [7, 30, 58, 82][lane];
    const top = laneTop + ((index * 11) % 12) - 6;
    const left = (index * 29) % 100;
    const direction = index % 2 === 0 ? 1 : -1;

    return {
        left,
        top,
        size: 4 + (index % 3) * 2,
        scatterX: direction * (36 + ((index * 17) % 84)),
        scatterY: (index % 3 === 0 ? -1 : 1) * (28 + ((index * 19) % 72)),
        restX: direction * ((index * 7) % 8),
        restY: ((index * 5) % 10) - 5,
        delay: (index % 14) * 0.012,
        opacity: 0.16 + (index % 4) * 0.05,
        rotate: direction * (30 + ((index * 13) % 80)),
    };
});

export function PixelScatter({ active }: { active: boolean }) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return null;
    }

    return (
        <div
            aria-hidden="true"
            className="hidden sm:block pointer-events-none absolute inset-0 z-20 overflow-hidden"
        >
            {pixels.map((pixel, index) => (
                <motion.span
                    key={`${pixel.left}-${pixel.top}-${index}`}
                    className="absolute bg-black"
                    style={{
                        left: `${pixel.left}%`,
                        top: `${pixel.top}%`,
                        width: pixel.size,
                        height: pixel.size,
                    }}
                    initial={{
                        opacity: 0,
                        x: pixel.scatterX,
                        y: pixel.scatterY,
                        scale: 0.15,
                        rotate: 0,
                    }}
                    animate={
                        active
                            ? {
                                  opacity: [0, pixel.opacity, pixel.opacity * 0.45],
                                  x: [pixel.scatterX, pixel.restX * 0.35, pixel.restX],
                                  y: [pixel.scatterY, pixel.restY * 0.35, pixel.restY],
                                  scale: [0.15, 0.9, 0.48],
                                  rotate: [pixel.rotate, pixel.rotate * 0.18, 0],
                              }
                            : {
                                  opacity: [pixel.opacity * 0.45, 0],
                                  x: [pixel.restX, pixel.scatterX * 0.9],
                                  y: [pixel.restY, pixel.scatterY * 0.9],
                                  scale: [0.48, 0.08],
                                  rotate: [0, pixel.rotate * 0.85],
                              }
                    }
                    transition={
                        active
                            ? {
                                  duration: 0.9,
                                  delay: pixel.delay,
                                  ease: [0.22, 1, 0.36, 1],
                                  times: [0, 0.5, 1],
                              }
                            : {
                                  duration: 0.68,
                                  delay: pixel.delay * 0.15,
                                  ease: [0.32, 0, 0.67, 0],
                              }
                    }
                />
            ))}
        </div>
    );
}
