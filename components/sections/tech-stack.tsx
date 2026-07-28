"use client";

import {
    Bot,
    Braces,
    ChevronUp,
    Cloud,
    Code2,
    Cpu,
    Database,
    Figma,
    GitBranch,
    Github,
    Layers,
    Palette,
    PenTool,
    Server,
    Smartphone,
    Sparkles,
    Terminal,
    Workflow,
} from "lucide-react";
import { type ComponentType, useRef, useState } from "react";
import { PixelScatter } from "@/components/sections/pixel-scatter";

type AccentColor =
    | "accent-frontend"
    | "accent-backend"
    | "accent-database"
    | "accent-ai"
    | "accent-hardware"
    | "accent-tools";

interface ToolItem {
    name: string;
    Icon: ComponentType<{ size?: number; className?: string }>;
}

interface StackCategoryGroup {
    title: string;
    color: AccentColor;
    items: ToolItem[];
}

const categorizedTools: StackCategoryGroup[] = [
    {
        title: "FRONTEND",
        color: "accent-frontend",
        items: [
            { name: "JavaScript", Icon: Code2 },
            { name: "TypeScript", Icon: Braces },
            { name: "React", Icon: Code2 },
            { name: "Next.js", Icon: Braces },
            { name: "Tailwind CSS", Icon: Palette },
            { name: "FlutterFlow", Icon: Layers },
            { name: "HTML / CSS", Icon: Code2 },
        ],
    },
    {
        title: "BACKEND & DATABASE",
        color: "accent-backend",
        items: [
            { name: "Node.js", Icon: Server },
            { name: "Python", Icon: Terminal },
            { name: "FastAPI", Icon: Terminal },
            { name: "PHP", Icon: Code2 },
            { name: "REST APIs", Icon: Server },
            { name: "Firebase", Icon: Cloud },
            { name: "Supabase", Icon: Database },
            { name: "PostgreSQL", Icon: Database },
            { name: "MySQL", Icon: Database },
            { name: "SQLite", Icon: Database },
        ],
    },
    {
        title: "AI & AUTOMATION",
        color: "accent-ai",
        items: [
            { name: "OpenAI API", Icon: Bot },
            { name: "Gemini API", Icon: Bot },
            { name: "Claude", Icon: Sparkles },
            { name: "Cursor", Icon: Sparkles },
            { name: "Codex", Icon: Sparkles },
            { name: "Antigravity", Icon: Sparkles },
            { name: "n8n", Icon: Workflow },
            { name: "LLaMA / Ollama", Icon: Bot },
            { name: "NLP", Icon: Bot },
        ],
    },
    {
        title: "MOBILE & HARDWARE",
        color: "accent-hardware",
        items: [
            { name: "Flutter", Icon: Smartphone },
            { name: "ESP32", Icon: Cpu },
            { name: "Arduino", Icon: Cpu },
            { name: "Raspberry Pi", Icon: Cpu },
            { name: "GPS Modules", Icon: Cpu },
            { name: "Sensors", Icon: Cpu },
        ],
    },
    {
        title: "TOOLS & PLATFORMS",
        color: "accent-tools",
        items: [
            { name: "Git", Icon: GitBranch },
            { name: "GitHub", Icon: Github },
            { name: "Vercel", Icon: Cloud },
            { name: "Figma", Icon: Figma },
            { name: "Canva", Icon: PenTool },
            { name: "Trello", Icon: PenTool },
        ],
    },
];

// Merged flat list of tools for collapsed view (Frontend + Backend + all tools merged)
const mergedTools = categorizedTools.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, color: cat.color }))
);

const iconColorMap: Record<AccentColor, string> = {
    "accent-frontend": "text-accent-frontend",
    "accent-backend": "text-accent-backend",
    "accent-database": "text-accent-database",
    "accent-ai": "text-accent-ai",
    "accent-hardware": "text-accent-hardware",
    "accent-tools": "text-accent-tools",
};

export function TechStack() {
    const ref = useRef(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <section
            id="stack"
            ref={ref}
            className="relative isolate scroll-mt-28 border-t border-black py-12 md:py-16"
            aria-labelledby="stack-heading"
        >
            <PixelScatter active={true} />

            <div className="relative z-30 mb-8 max-w-2xl">
                <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Stack & Tools
                </p>
                <h2 id="stack-heading" className="font-display text-3xl font-semibold text-black sm:text-4xl">
                    Tools I use to ship.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                    The tools, frameworks, and platforms I reach for — across front end, back end, AI, mobile, hardware, and infrastructure.
                </p>
            </div>

            {/* Content Display */}
            {isExpanded ? (
                /* Sorted Categorized View */
                <div className="relative z-20 space-y-10">
                    {categorizedTools.map((cat) => (
                        <div key={cat.title} className="space-y-3">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">
                                {cat.title}
                            </h3>
                            <div className="flex flex-wrap gap-2.5">
                                {cat.items.map(({ name, Icon }) => (
                                    <div
                                        key={name}
                                        className="inline-flex items-center gap-2 border border-neutral-300 bg-white px-3.5 py-2 font-mono text-sm tracking-[0.03em] text-neutral-800 transition-colors duration-150 hover:border-black"
                                    >
                                        <Icon size={15} className={iconColorMap[cat.color]} />
                                        {name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Merged Un-sorted View (Top 10 tools) */
                <div className="relative z-20">
                    <div className="flex flex-wrap gap-2.5">
                        {mergedTools.slice(0, 10).map(({ name, Icon, color }) => (
                            <div
                                key={name}
                                className="inline-flex items-center gap-2 border border-neutral-300 bg-white px-3.5 py-2 font-mono text-sm tracking-[0.03em] text-neutral-800 transition-colors duration-150 hover:border-black"
                            >
                                <Icon size={15} className={iconColorMap[color]} />
                                {name}
                            </div>
                        ))}

                        {mergedTools.length > 10 && (
                            <button
                                type="button"
                                onClick={toggleExpanded}
                                className="inline-flex cursor-pointer items-center gap-1 border border-dashed border-neutral-400 bg-neutral-50 px-3.5 py-2 font-mono text-sm tracking-[0.03em] text-neutral-600 transition-colors hover:border-black hover:bg-black hover:text-white"
                            >
                                +{mergedTools.length - 10} more
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Bottom Toggle Button when Expanded */}
            {isExpanded && (
                <div className="relative z-30 mt-10 flex justify-center border-t border-neutral-100 pt-6">
                    <button
                        type="button"
                        onClick={toggleExpanded}
                        className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-black bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-black transition-colors duration-200 hover:bg-black hover:text-white active:bg-black active:text-white shadow-xs"
                        aria-label="Collapse tech stack"
                    >
                        <span>Collapse View ↑</span>
                        <ChevronUp size={15} />
                    </button>
                </div>
            )}
        </section>
    );
}
