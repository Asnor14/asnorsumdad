"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, FileText } from "lucide-react";
import { useRef } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";
import { personalInfo } from "@/lib/data";
import { fadeInUp } from "@/lib/utils";

const contactLinks = [
    { name: "Email", href: `mailto:${personalInfo.email}`, icon: Mail },
    { name: "GitHub", href: personalInfo.github, icon: Github },
    { name: "LinkedIn", href: personalInfo.linkedin, icon: Linkedin },
    { name: "Instagram", href: personalInfo.instagram, icon: Instagram },
    { name: "Resume", href: personalInfo.resume, icon: FileText },
];

export function SocialLinks() {
    const ref = useRef(null);
    const isActive = useInView(ref, { once: false, margin: "-50px" });

    return (
        <motion.section
            id="contact"
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative isolate scroll-mt-28 border-t border-black py-12 md:py-16"
            aria-labelledby="contact-heading"
        >
            <PixelScatter active={isActive} />

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        Contact
                    </p>
                    <h2 id="contact-heading" className="font-display text-3xl font-semibold text-black sm:text-4xl">
                        Let&apos;s build something useful.
                    </h2>
                </div>

                <div className="border-t border-neutral-200 lg:border-t-0">
                    {contactLinks.map((link, index) => {
                        const Icon = link.icon;
                        const isExternal = !link.href.startsWith("mailto:") && !link.href.startsWith("/");

                        return (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target={isExternal || link.name === "Resume" ? "_blank" : undefined}
                                rel={isExternal || link.name === "Resume" ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, y: 8 }}
                                animate={isActive ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.04, duration: 0.2 }}
                                className="group flex items-center justify-between border-b border-neutral-200 py-3.5 text-black transition-colors duration-200 hover:border-black"
                                aria-label={link.name === "Email" ? `Send email to ${personalInfo.email}` : `Open ${link.name}`}
                            >
                                <span className="flex items-center gap-2.5 text-base font-semibold">
                                    <Icon size={19} />
                                    {link.name}
                                </span>
                                <ArrowUpRight
                                    size={18}
                                    className="text-neutral-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                                />
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
}
