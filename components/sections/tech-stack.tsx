"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, Code2 } from "lucide-react";
import { techStack } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

const categoryLabels: Record<keyof typeof techStack, string> = {
    frontend: "Frontend",
    backend: "Backend",
    database: "Database & Cloud",
    ai: "AI & Data",
    iot: "IoT & Hardware",
};

export function TechStack() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [isExpanded, setIsExpanded] = useState(false);

    const categories = Object.keys(techStack) as Array<keyof typeof techStack>;
    const visibleCategories = isExpanded ? categories : categories.slice(0, 2);

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <Code2 size={18} className="text-neutral-500" />
                Tech Stack
            </h2>

            <div className="space-y-4">
                {visibleCategories.map((category, categoryIndex) => (
                    <div key={category}>
                        <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-500 mb-2">
                            {categoryLabels[category]}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {techStack[category].map((tech, index) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{
                                        delay: categoryIndex * 0.05 + index * 0.02,
                                        duration: 0.2,
                                    }}
                                    className="px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {categories.length > 2 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 mt-4 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp size={16} />
                            Show Less
                        </>
                    ) : (
                        <>
                            <ChevronDown size={16} />
                            View All ({categories.length - 2} more)
                        </>
                    )}
                </button>
            )}
        </motion.div>
    );
}
