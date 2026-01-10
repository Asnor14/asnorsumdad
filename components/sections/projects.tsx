"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/utils";
import { ExternalLink, Folder } from "lucide-react";

export function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="projects" className="py-24 scroll-mt-20">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <motion.div variants={fadeInUp} className="mb-12">
                        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider">
                            Projects
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mt-2">
                            Featured Work
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                custom={index}
                                className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Background gradient on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-transparent dark:from-neutral-800 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Folder className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
