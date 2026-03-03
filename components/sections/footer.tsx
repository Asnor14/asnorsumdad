"use client";

import { VisitorCounter } from "@/components/sections/visitor-counter";
import { personalInfo } from "@/lib/data";

export function Footer() {
    return (
        <footer className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center">
            <VisitorCounter />
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
            </p>
        </footer>
    );
}

