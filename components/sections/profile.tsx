"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { aboutContent, personalInfo, profileStats } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

export function Profile() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });

    return (
        <motion.section
            id="profile"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative isolate scroll-mt-28 border-t border-black py-12 md:py-16"
            aria-labelledby="profile-heading"
        >
            <PixelScatter active={isActive} />

            <div className="grid gap-8 lg:grid-cols-[22rem_1fr] lg:items-stretch">
                <figure className="relative aspect-[4/5] overflow-hidden border border-black bg-neutral-100 sm:max-w-sm lg:max-w-none">
                    <Image
                        src="/images/profile.jpg"
                        alt={`${personalInfo.name} profile portrait`}
                        fill
                        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 24rem, 100vw"
                        className="object-cover object-[50%_36%] grayscale"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 grid grid-cols-2 divide-x divide-white/20 border-t border-white/20 bg-black text-white">
                        {profileStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 8 }}
                                animate={isActive ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                className="p-2.5 sm:p-3"
                            >
                                <p className="font-display text-2xl font-semibold leading-none sm:text-3xl">
                                    {stat.value}
                                </p>
                                <p className="mt-2 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-white/75 sm:text-[9px]">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </figcaption>
                </figure>

                <div id="about" className="grid min-w-0 content-start gap-8 scroll-mt-28">
                    <div>
                        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            Profile / Work
                        </p>
                        <h2 id="profile-heading" className="font-display text-4xl font-semibold text-black sm:text-5xl">
                            {personalInfo.name}
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
                            Full Stack Developer
                        </p>
                    </div>

                    <div className="max-w-3xl border-t border-neutral-200 pt-6">
                        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            About
                        </p>
                        <div className="max-w-2xl space-y-4 text-base leading-8 text-neutral-700">
                            {aboutContent.split("\n\n").map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
