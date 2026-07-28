"use client";

import { VisitorCounter } from "@/components/sections/visitor-counter";
import { personalInfo } from "@/lib/data";

const footerLinks = [
    { name: "Email", href: `mailto:${personalInfo.email}` },
    { name: "GitHub", href: personalInfo.github },
    { name: "LinkedIn", href: personalInfo.linkedin },
    { name: "Instagram", href: personalInfo.instagram },
];

export function Footer() {
    return (
        <footer className="bg-black px-5 py-8 text-white sm:px-8">
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                    <p className="font-display text-2xl font-semibold sm:text-3xl">
                        Let&apos;s build something useful.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                        {footerLinks.map((link) => {
                            const isExternal = !link.href.startsWith("mailto:");

                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className="font-mono text-xs uppercase tracking-[0.16em] text-white/70 transition-colors duration-200 hover:text-white"
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="text-left md:text-right">
                    <div className="mb-3 text-white/70">
                        <VisitorCounter />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/60">
                        &copy; {new Date().getFullYear()} {personalInfo.name}
                    </p>
                </div>
            </div>
        </footer>
    );
}
