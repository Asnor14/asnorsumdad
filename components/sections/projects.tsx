"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import {
    ArrowUpRight,
    Bot,
    ChevronLeft,
    ChevronRight,
    Info,
    Lock,
    MonitorUp,
    Navigation,
    X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { projectGroups, projects } from "@/lib/data";

type ProjectType = (typeof projects)[number];

/* ── Project Preview Thumbnail ──────────────────────────────────── */

function ProjectPreview({ project }: { project: ProjectType }) {
    const previewImage = project.images && project.images.length > 0 ? project.images[0] : project.image;

    if (previewImage) {
        return (
            <div className="relative h-full min-h-56 overflow-hidden bg-neutral-950">
                <Image
                    src={previewImage}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 768px) 450px, 100vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 border border-white/30 bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                    <MonitorUp size={12} />
                    Preview
                </div>
            </div>
        );
    }

    if (project.url) {
        return (
            <div className="relative h-full min-h-56 overflow-hidden bg-white">
                <iframe
                    src={project.url}
                    title={`${project.title} website preview`}
                    loading="lazy"
                    tabIndex={-1}
                    className="pointer-events-none h-full w-full bg-white grayscale"
                />
                <div className="pointer-events-none absolute inset-0 border border-black/5" />
                <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 border border-black bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-black">
                    <MonitorUp size={12} />
                    Live Preview
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex h-full min-h-56 items-center justify-center bg-black p-5 text-white">
            <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                {project.status ?? "Private"}
            </span>

            {project.title === "PillPal" ? (
                <div className="flex flex-col items-center">
                    <div className="flex h-16 w-10 flex-col items-center gap-1.5 rounded-lg border-2 border-white/20 bg-white/5 pt-2">
                        <span className="h-[1.5px] w-2.5 rounded bg-white/20" />
                        <span className="h-1.5 w-7 rounded-sm bg-white/10" />
                        <span className="h-1.5 w-7 rounded-sm bg-white/10" />
                        <span className="h-1.5 w-7 rounded-sm bg-white/10" />
                    </div>
                    <span className="mt-2 font-mono text-[9px] uppercase tracking-widest text-white/30">
                        Flutter · Mobile
                    </span>
                </div>
            ) : project.title === "Rydar" ? (
                <div className="flex flex-col items-center text-center">
                    <Navigation size={22} className="mb-2 text-white opacity-50" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                        Flutter · Speed & Overlay
                    </span>
                </div>
            ) : project.title === "AI Facebook Content Automation" ? (
                <div className="flex flex-col items-center text-center">
                    <Bot size={24} className="mb-2 text-white opacity-50" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                        n8n · Telegram · FB API
                    </span>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <Lock size={20} className="opacity-20" />
                    <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/30">
                        {project.status ?? "Private"}
                    </span>
                </div>
            )}
        </div>
    );
}

/* ── Project Details Modal with Image Carousel ──────────────────── */

function ProjectModal({
    project,
    onClose,
}: {
    project: ProjectType | null;
    onClose: () => void;
}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [project]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!project) return null;

    const projectImages =
        project.images && project.images.length > 0
            ? project.images
            : project.image
              ? [project.image]
              : [];

    const hasMultipleImages = projectImages.length > 1;

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ duration: 0.2 }}
                    className="relative my-auto flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden border-2 border-black bg-white shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-black bg-neutral-50 px-5 py-4 sm:px-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                {project.group}
                            </span>
                            <span className="text-neutral-300">·</span>
                            <span
                                className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${
                                    (project.status ?? (project.url ? "Live" : "Private")) === "Live"
                                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                        : "border-neutral-300 bg-white text-neutral-700"
                                }`}
                            >
                                {(project.status ?? (project.url ? "Live" : "Private")) === "Live" && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                )}
                                {project.status ?? (project.url ? "Live" : "Private")}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center border border-black bg-white text-black transition-colors duration-150 hover:bg-black hover:text-white active:bg-black active:text-white"
                            aria-label="Close project modal"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
                        <div>
                            <h3 className="font-display text-2xl font-semibold leading-tight text-black sm:text-3xl">
                                {project.title}
                            </h3>
                            <p className="mt-3 text-base leading-relaxed text-neutral-700">
                                {project.description}
                            </p>
                        </div>

                        {/* Image Carousel Viewer */}
                        {projectImages.length > 0 && (
                            <div className="border border-neutral-300 bg-neutral-950 p-2">
                                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center overflow-hidden bg-black">
                                    <Image
                                        key={projectImages[currentImageIndex]}
                                        src={projectImages[currentImageIndex]}
                                        alt={`${project.title} image ${currentImageIndex + 1}`}
                                        fill
                                        sizes="(min-width: 768px) 600px, 100vw"
                                        className="object-contain"
                                    />
                                </div>

                                {hasMultipleImages && (
                                    <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 text-white">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setCurrentImageIndex(
                                                    (i) => (i - 1 + projectImages.length) % projectImages.length
                                                )
                                            }
                                            className="inline-flex h-8 w-8 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white hover:text-black"
                                            aria-label="Previous screenshot"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>

                                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/70">
                                            {projectImages.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setCurrentImageIndex(idx)}
                                                    className={`h-2 w-2 transition-colors ${
                                                        idx === currentImageIndex ? "bg-white" : "bg-white/30"
                                                    }`}
                                                    aria-label={`Go to screenshot ${idx + 1}`}
                                                />
                                            ))}
                                            <span className="ml-1">
                                                {currentImageIndex + 1} / {projectImages.length}
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setCurrentImageIndex((i) => (i + 1) % projectImages.length)
                                            }
                                            className="inline-flex h-8 w-8 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white hover:text-black"
                                            aria-label="Next screenshot"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tech Stack Pills */}
                        <div>
                            <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                Tech Stack & Tags
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="border border-neutral-300 bg-neutral-50 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-neutral-800"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black bg-neutral-50 px-5 py-4 sm:px-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex min-h-[44px] items-center justify-center border border-neutral-400 px-5 font-mono text-xs uppercase tracking-widest text-neutral-700 transition-colors duration-150 hover:border-black hover:text-black"
                        >
                            Close
                        </button>

                        {project.url ? (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-black bg-black px-5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-150 hover:bg-neutral-800"
                            >
                                Open Live Site
                                <ArrowUpRight size={15} />
                            </a>
                        ) : (
                            <span className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-neutral-300 px-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                                <Lock size={14} />
                                Private Project
                            </span>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

/* ── Card Stack Carousel ────────────────────────────────────────── */

function CardStack({
    groupProjects,
    onSelectProject,
}: {
    groupProjects: ProjectType[];
    onSelectProject: (project: ProjectType) => void;
}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = groupProjects.length;

    const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);
    const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);

    function getCardPosition(index: number) {
        const diff = index - activeIndex;
        if (diff === 0) return 0;
        if (diff === 1 || diff === -(total - 1)) return 1;
        if (diff === -1 || diff === total - 1) return -1;
        return null;
    }

    const cardVariants = {
        center: {
            x: 0,
            rotate: 0,
            scale: 1,
            zIndex: 10,
            opacity: 1,
        },
        left: {
            x: "-12%",
            rotate: -4,
            scale: 0.92,
            zIndex: 5,
            opacity: 0.6,
        },
        right: {
            x: "12%",
            rotate: 4,
            scale: 0.92,
            zIndex: 5,
            opacity: 0.6,
        },
        hidden: {
            x: 0,
            rotate: 0,
            scale: 0.85,
            zIndex: 0,
            opacity: 0,
        },
    };

    return (
        <div>
            <div className="relative mx-auto w-full max-w-md" style={{ minHeight: "390px" }}>
                <AnimatePresence initial={false}>
                    {groupProjects.map((project, index) => {
                        const pos = getCardPosition(index);
                        if (pos === null) return null;

                        const variant = pos === 0 ? "center" : pos === -1 ? "left" : "right";
                        const isCenter = pos === 0;

                        return (
                            <motion.article
                                key={project.title}
                                className={`group absolute inset-0 overflow-hidden border border-neutral-300 bg-white transition-colors duration-200 hover:border-black ${
                                    isCenter ? "cursor-pointer" : "pointer-events-none"
                                }`}
                                variants={cardVariants}
                                initial="hidden"
                                animate={variant}
                                exit="hidden"
                                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                                style={{ originX: 0.5, originY: 1 }}
                                onClick={() => isCenter && onSelectProject(project)}
                            >
                                <div className="aspect-[16/10] border-b border-neutral-300">
                                    <ProjectPreview project={project} />
                                </div>

                                <div className="grid gap-4 p-5">
                                    <div>
                                        <div className="mb-2 flex items-center justify-between gap-3">
                                            <span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span
                                                className={`inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] ${
                                                    (project.status ?? (project.url ? "Live" : "Private")) === "Live"
                                                        ? "border-emerald-300 text-emerald-700"
                                                        : "border-neutral-300 text-neutral-700"
                                                }`}
                                            >
                                                {(project.status ?? (project.url ? "Live" : "Private")) === "Live" && (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                )}
                                                {project.status ?? (project.url ? "Live" : "Private")}
                                            </span>
                                        </div>
                                        <h4 className="font-display text-xl font-semibold leading-tight text-black sm:text-2xl group-hover:underline">
                                            {project.title}
                                        </h4>
                                        <p className="mt-2 text-sm leading-6 text-neutral-600 line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={`${project.title}-${tag}`}
                                                className="border border-neutral-300 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-700"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between gap-2 border-t border-neutral-100 pt-3">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectProject(project);
                                            }}
                                            className="inline-flex min-h-[38px] items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:opacity-60"
                                        >
                                            <Info size={14} />
                                            View Details
                                        </button>

                                        {project.url ? (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex min-h-[38px] items-center justify-center gap-1.5 border border-black bg-black px-3.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black"
                                                aria-label={`Open ${project.title}`}
                                            >
                                                Live Site
                                                <ArrowUpRight size={13} />
                                            </a>
                                        ) : (
                                            <span className="inline-flex min-h-[38px] items-center justify-center gap-1.5 border border-neutral-200 px-3 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                                                <Lock size={12} />
                                                Private
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation controls */}
            {total > 1 && (
                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={goPrev}
                        className="inline-flex h-10 w-10 items-center justify-center border border-black text-black transition-colors duration-200 hover:bg-black hover:text-white"
                        aria-label="Previous project"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div className="flex items-center gap-2">
                        {groupProjects.map((_, dotIndex) => (
                            <button
                                key={dotIndex}
                                type="button"
                                onClick={() => setActiveIndex(dotIndex)}
                                className={`h-2 w-2 transition-colors duration-200 ${
                                    dotIndex === activeIndex ? "bg-black" : "bg-neutral-300 hover:bg-neutral-500"
                                }`}
                                aria-label={`Go to project ${dotIndex + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={goNext}
                        className="inline-flex h-10 w-10 items-center justify-center border border-black text-black transition-colors duration-200 hover:bg-black hover:text-white"
                        aria-label="Next project"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}

/* ── Main Projects Section ──────────────────────────────────────── */

export function Projects() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-80px" });
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    return (
        <motion.section
            id="work"
            ref={ref}
            className="relative isolate scroll-mt-28 py-12 md:py-16"
            aria-labelledby="work-heading"
        >
            <PixelScatter active={isActive} />

            <div className="mb-8 max-w-2xl">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Selected Work / Projects
                </p>
                <h2 id="work-heading" className="font-display text-3xl font-semibold text-black sm:text-4xl">
                    Project gallery.
                </h2>
            </div>

            <div className="space-y-10 sm:space-y-12">
                {projectGroups.map((group, groupIndex) => {
                    const groupProjects = projects.filter((project) => project.group === group.id);

                    return (
                        <section
                            key={group.id}
                            className="border-t border-black pt-6"
                            aria-labelledby={`${group.id}-projects-heading`}
                        >
                            <div className="mb-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                                <div>
                                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                        {String(groupIndex + 1).padStart(2, "0")} / {String(groupProjects.length).padStart(2, "0")}
                                    </p>
                                    <h3
                                        id={`${group.id}-projects-heading`}
                                        className="font-display text-xl font-semibold leading-tight text-black sm:text-2xl"
                                    >
                                        {group.label}
                                    </h3>
                                </div>
                                <p className="max-w-2xl text-sm leading-6 text-neutral-600 lg:justify-self-end">
                                    {group.description}
                                </p>
                            </div>

                            <CardStack
                                groupProjects={groupProjects}
                                onSelectProject={(p) => setSelectedProject(p)}
                            />
                        </section>
                    );
                })}
            </div>

            {/* Modal Dialog */}
            <ProjectModal
                key={selectedProject?.title}
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </motion.section>
    );
}
