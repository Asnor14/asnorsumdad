"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { experiences } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

export function Experience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-neutral-500" />
                Experience Journey
            </h2>

            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-6 pb-4 border-l-2 border-neutral-200 dark:border-neutral-800 last:pb-0"
                    >
                        <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-neutral-500" />
                        <p className="text-xs font-semibold text-neutral-900 dark:text-white mb-1">
                            {exp.period}
                        </p>
                        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {exp.summary}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
