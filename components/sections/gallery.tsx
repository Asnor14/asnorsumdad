"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { fadeInUp } from "@/lib/utils";

const galleryImages = [
    { id: 1, src: "/images/gallery/1.jpg", alt: "Archive photo 1" },
    { id: 2, src: "/images/gallery/2.jpg", alt: "Archive photo 2" },
    { id: 3, src: "/images/gallery/3.jpg", alt: "Archive photo 3" },
    { id: 4, src: "/images/gallery/4.jpg", alt: "Archive photo 4" },
    { id: 5, src: "/images/gallery/5.jpg", alt: "Archive photo 5" },
    { id: 6, src: "/images/gallery/6.jpg", alt: "Archive photo 6" },
    { id: 7, src: "/images/gallery/7.jpg", alt: "Archive photo 7" },
    { id: 8, src: "/images/gallery/8.jpg", alt: "Archive photo 8" },
    { id: 9, src: "/images/gallery/9.jpg", alt: "Archive photo 9" },
    { id: 10, src: "/images/gallery/10.jpg", alt: "Archive photo 10" },
];

export function Gallery() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });

    return (
        <motion.section
            id="archive"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative isolate border-t border-neutral-200 py-12 md:py-24"
            aria-labelledby="archive-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-10">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Archive
                </p>
                <h2 id="archive-heading" className="font-display text-4xl font-semibold text-black sm:text-5xl">
                    Behind the work.
                </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {galleryImages.map((image, index) => (
                    <motion.figure
                        key={image.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={isActive ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.025, duration: 0.18 }}
                        className="aspect-[4/3] overflow-hidden border border-neutral-200 bg-neutral-100"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={360}
                            height={270}
                            className="h-full w-full object-cover grayscale transition duration-200 hover:scale-[1.02]"
                        />
                    </motion.figure>
                ))}
            </div>
        </motion.section>
    );
}
