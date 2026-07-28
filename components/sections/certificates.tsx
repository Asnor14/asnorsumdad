"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Award, FileText, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { certificates } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

function certificateHref(file: string) {
    return file ? `/certificates/${encodeURIComponent(file)}` : "";
}

function certificateImageHref(image: string) {
    return image ? `/certificates/${encodeURIComponent(image)}` : "";
}

export function Certificates() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });
    const [selectedCert, setSelectedCert] = useState<(typeof certificates)[number] | null>(null);

    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedCert]);

    return (
        <motion.section
            id="certificates"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative isolate scroll-mt-28 border-t border-black py-12 md:py-16"
            aria-labelledby="certificates-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                        04 — Certifications
                    </p>
                    <h2 id="certificates-heading" className="font-display text-3xl font-semibold text-black sm:text-4xl">
                        Proof of practice.
                    </h2>
                </div>
            </div>

            {/* Compact Grid of Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {certificates.map((cert) => {
                    const imgHref = certificateImageHref(cert.image);

                    return (
                        <div
                            key={cert.title}
                            onClick={() => setSelectedCert(cert)}
                            className="group relative flex min-h-[210px] flex-col items-center justify-between border border-neutral-300 bg-white p-5 text-center transition-all duration-200 hover:border-black cursor-pointer shadow-2xs hover:shadow-sm"
                        >
                            {/* Top Badge Icon / Image */}
                            <div className="flex h-12 w-12 items-center justify-center border border-neutral-200 bg-neutral-50 transition-colors group-hover:border-black">
                                {imgHref ? (
                                    <div className="relative h-8 w-8 overflow-hidden">
                                        <Image
                                            src={imgHref}
                                            alt={cert.title}
                                            fill
                                            className="object-contain grayscale transition-all group-hover:grayscale-0"
                                        />
                                    </div>
                                ) : (
                                    <Award size={20} className="text-neutral-600" />
                                )}
                            </div>

                            {/* Center Title & Issuer */}
                            <div className="my-3 space-y-1">
                                <h3 className="font-display text-sm font-semibold leading-snug text-black group-hover:underline">
                                    {cert.title}
                                </h3>
                                <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                                    {cert.issuer}
                                </p>
                                <p className="font-mono text-[9px] text-neutral-400">
                                    {cert.year}
                                </p>
                            </div>

                            {/* Bottom Action */}
                            <div className="w-full border-t border-neutral-100 pt-3 font-mono text-[11px] uppercase tracking-wider text-neutral-600 group-hover:text-black">
                                <span>{"{ VERIFY }"}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Certificate Modal Dialog */}
            {selectedCert && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto"
                    onClick={() => setSelectedCert(null)}
                >
                    <div
                        className="relative my-auto flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border-2 border-black bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-black bg-neutral-50 px-5 py-4">
                            <div>
                                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500">
                                    {selectedCert.issuer} · {selectedCert.year}
                                </p>
                                <h3 className="font-display text-xl font-semibold text-black">
                                    {selectedCert.title}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedCert(null)}
                                className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center border border-black bg-white text-black transition-colors hover:bg-black hover:text-white"
                                aria-label="Close dialog"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="flex min-h-[300px] flex-1 items-center justify-center bg-neutral-100 p-5 overflow-y-auto">
                            {selectedCert.image ? (
                                <div className="relative aspect-[4/3] w-full max-w-lg border border-neutral-300 bg-white">
                                    <Image
                                        src={certificateImageHref(selectedCert.image)}
                                        alt={selectedCert.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : selectedCert.file ? (
                                <iframe
                                    src={certificateHref(selectedCert.file)}
                                    title={selectedCert.title}
                                    className="h-[400px] w-full border-0"
                                />
                            ) : null}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black bg-neutral-50 px-5 py-4">
                            <button
                                type="button"
                                onClick={() => setSelectedCert(null)}
                                className="border border-neutral-400 px-4 py-2 font-mono text-xs uppercase tracking-widest text-neutral-700 hover:border-black hover:text-black"
                            >
                                Close
                            </button>

                            <div className="flex flex-wrap items-center gap-3">
                                {selectedCert.file && (
                                    <a
                                        href={certificateHref(selectedCert.file)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 border border-black bg-black px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800"
                                    >
                                        Open PDF
                                        <FileText size={14} />
                                    </a>
                                )}
                                {selectedCert.credlyBadgeId && (
                                    <a
                                        href={`https://www.credly.com/badges/${selectedCert.credlyBadgeId}/public_url`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 border border-black px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-black hover:bg-black hover:text-white"
                                    >
                                        Credly Badge
                                        <ArrowUpRight size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.section>
    );
}
