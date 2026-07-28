export const personalInfo = {
    name: "Asnor Sumdad",
    role: "Full-Stack & Mobile Developer",
    label: "Full-Stack & Mobile Developer",
    tagline:
        "I build clean websites and mobile apps for real-world problems.",
    location: "Laguna, Philippines",
    availability:
        "Available for freelance projects, capstone systems, and web/mobile development.",
    email: "asnor023@gmail.com",
    github: "https://github.com/SilencioOrgs",
    linkedin: "https://www.linkedin.com/in/sumdad-asnor-a-924566327",
    instagram: "https://www.instagram.com/asnor_sumdad",
    portfolio: "https://asnorsumdad.vercel.app",
    resume: "/cv.pdf",
};

export const aboutContent = `I'm a full-stack developer with experience in software engineering, IoT, and AI-powered applications.

I build modern web platforms, mobile apps, and hardware-integrated systems using tools like Next.js, Flutter, FastAPI, Firebase, Supabase, and ESP32.

My focus is simple: clean interfaces, reliable systems, and practical products that solve real problems.`;

export const techStack = {
    frontend: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "FlutterFlow", "HTML / CSS"],
    backend: ["Node.js", "Python", "FastAPI", "PHP", "REST APIs", "Firebase", "Supabase", "PostgreSQL", "MySQL", "SQLite"],
    ai: ["OpenAI API", "Gemini API", "Claude", "Cursor", "Codex", "Antigravity", "n8n", "LLaMA / Ollama", "NLP"],
    mobileAndHardware: ["Flutter", "ESP32", "Arduino", "Raspberry Pi", "GPS Modules", "Sensors"],
    tools: ["Git", "GitHub", "Vercel", "Figma", "Canva", "Trello"],
};

interface ProfileStat {
    value: string;
    label: string;
    detail: string;
}

export const profileStats: ProfileStat[] = [
    {
        value: "3 yrs",
        label: "Dev exp.",
        detail: "Hands-on work with web apps, client pages, and full-stack systems.",
    },
    {
        value: "20+",
        label: "Projects",
        detail: "Freelance, capstone, event, productivity, AI, and IoT builds.",
    },
];

interface Experience {
    period: string;
    summary: string;
}

export const experiences: Experience[] = [
    {
        period: "2019",
        summary: 'Started programming with my first "Hello, World" program.',
    },
    {
        period: "2020",
        summary: "Built simple games and early VB.NET systems.",
    },
    {
        period: "2022",
        summary:
            "Started Computer Engineering and joined hackathons, programming events, and technical communities.",
    },
    {
        period: "2023",
        summary:
            "Worked as Virtual Assistant & Social Media Manager — built content automation workflows for multi-platform publishing.",
    },
    {
        period: "2024 - 2025",
        summary:
            "Worked as Video Editor for Australian keto diet channel (DisruptingDiabetes) and produced AI-animated educational content for MagpieTutor Academy.",
    },
    {
        period: "2025 - Present",
        summary:
            "Expanded into freelance full-stack development, AI automation workflows, and client systems — continuously evolving and leveraging AI to turn automated workflows into living, self-sustaining digital products.",
    },
];

interface Certificate {
    title: string;
    issuer: string;
    year: string;
    file: string;
    image: string;
    credlyBadgeId?: string;
}

export const certificates: Certificate[] = [
    {
        title: "Python Essentials 1",
        issuer: "Cisco Networking Academy & OpenEDG Python Institute",
        year: "2026",
        file: "cisco-python-essentials-1.pdf",
        image: "cisco-python-essentials-1.png",
        credlyBadgeId: "b0f9b703-d9d5-46d1-9d87-fcb0c0f751ae",
    },
    {
        title: "Innovation Lab Hackathon",
        issuer: "The Innovation Lab 2026",
        year: "2026",
        file: "SUMDAD, ASNOR A. Certificate of Attendance.pdf",
        image: "innovation-lab-2026-certificate.png",
    },
    {
        title: "Cybersecurity Plan Orientation",
        issuer: "DICT Region IV-A Cybersecurity",
        year: "2025",
        file: "cert_Asnor A. Sumdad.pdf",
        image: "dict-cybersecurity-orientation-2025-certificate.png",
    },
    {
        title: "Regional Convention, GA, CpE Challenge",
        issuer: "ICpEP.se",
        year: "2022",
        file: "ICpEP.se Regional Convention, GA, CpE Challenge_SUMDAD, ASNOR.pdf",
        image: "icpep-cpe-challenge-2022-certificate.png",
    },
    {
        title: "Reply Code Challenge Teen",
        issuer: "Reply Code Challenge",
        year: "2023",
        file: "ReplyCodeChallengeTeen2023_Certificate.pdf",
        image: "reply-code-challenge-teen-2023-certificate.png",
    },
];

export const projectGroups = [
    {
        id: "capstone",
        label: "Capstone / Thesis / Client Projects",
        description: "Systems built for practical workflows, client needs, and product validation.",
    },
    {
        id: "wedding",
        label: "Wedding Website Projects",
        description: "Event websites focused on invitations, guest information, and celebration details.",
    },
    {
        id: "personal",
        label: "Personal Projects",
        description: "Experiments, productivity tools, and independent builds.",
    },
] as const;

type ProjectGroupId = (typeof projectGroups)[number]["id"];

interface Project {
    title: string;
    description: string;
    tags: string[];
    url: string;
    group: ProjectGroupId;
    image?: string;
    images?: string[];
    status?: string;
}

export const projects: Project[] = [
    {
        title: "Ate Ai's Kitchen Ordering System",
        description:
            "Food ordering platform for managing orders, notifications, and delivery locations.",
        tags: ["Next.js", "Supabase", "Firebase", "Nodemailer", "Mapbox"],
        url: "https://ateaikitchen.vercel.app",
        group: "capstone",
        image: "/images/projects/orderingsystem.png",
    },
    {
        title: "HereafterPal",
        description:
            "Digital memorial platform for preserving stories, photos, tributes, and legacy archives.",
        tags: ["React", "Vercel", "Responsive UI", "Product Design"],
        url: "https://hereafterpal.vercel.app",
        group: "capstone",
        status: "Live",
    },
    {
        title: "PillPal",
        description:
            "Private mobile app for medication reminders, schedules, and health routine tracking.",
        tags: ["Flutter", "Mobile App", "Firebase", "Private"],
        url: "",
        group: "capstone",
        status: "Private · NDA",
    },
    {
        title: "Rydar",
        description:
            "Mobile tracking application for riders to record ride telemetry, track top speed, and overlay stats onto shareable photo templates.",
        tags: ["Flutter", "Mapbox", "Firebase", "Speed Tracking", "Photo Templates", "Mobile App"],
        url: "",
        group: "capstone",
        status: "Private · Mobile App",
        image: "/images/projects/rydar/rydar-overlay.jpg",
        images: [
            "/images/projects/rydar/rydar-welcome.jpg",
            "/images/projects/rydar/rydar-map.jpg",
            "/images/projects/rydar/rydar-overlay.jpg",
        ],
    },
    {
        title: "ChadGPT - Tone Profiler",
        description:
            "AI-powered writing tone analysis platform using sentiment and tone profiling. (School project demo — FastAPI backend was hosted locally via ngrok and is currently offline).",
        tags: ["Next.js", "FastAPI", "NLP", "Ollama", "ngrok"],
        url: "https://tone-profiler.vercel.app",
        group: "personal",
        status: "Demo · Backend Offline",
        image: "/images/projects/tone-profiler.png",
    },
    {
        title: "Wedding Landing Page",
        description:
            "Elegant wedding website with RSVP-focused presentation and animated sections.",
        tags: ["Next.js", "Framer Motion"],
        url: "https://wedding-landingpage.vercel.app",
        group: "wedding",
        image: "/images/projects/wedding-landingpage.png",
    },
    {
        title: "Daniel & Giada Wedding Website",
        description:
            "Custom event website for guest information, storytelling, and event experience.",
        tags: ["Next.js", "Framer Motion"],
        url: "https://daniel-giada-wedding.vercel.app",
        group: "wedding",
        image: "/images/projects/wedding-landingpage.png",
    },
    {
        title: "Carl Joseph & Shania Mae Wedding Website",
        description:
            "Responsive wedding landing page for ceremony details, couple story, and celebration timeline.",
        tags: ["Next.js", "Framer Motion"],
        url: "https://carl-joseph-and-shania-mae.vercel.app",
        group: "wedding",
        image: "/images/projects/wedding-landingpage.png",
    },
    {
        title: "Rameez & Kris Wedding Website",
        description:
            "Invitation website for sharing event information in a warm, modern layout.",
        tags: ["Next.js", "Framer Motion"],
        url: "https://rameez-kris-i13a.vercel.app",
        group: "wedding",
        image: "/images/projects/wedding-landingpage.png",
    },
    {
        title: "Godfrey & Vanessa Wedding Website",
        description:
            "Wedding website featuring invitation content, key event details, and a mobile-friendly experience.",
        tags: ["Next.js", "Framer Motion"],
        url: "https://godfreyvanessa.vercel.app",
        group: "wedding",
        image: "/images/projects/wedding-landingpage.png",
    },
    {
        title: "LSPU Student Registration",
        description:
            "Student registration system built for clearer data entry and enrollment workflows.",
        tags: ["React", "Vite"],
        url: "",
        group: "personal",
        image: "/images/projects/lspu-student-reg.png",
    },
    {
        title: "Focus Flow",
        description:
            "Productivity and focus management app for structuring work sessions.",
        tags: ["Next.js", "Productivity"],
        url: "https://focus-flow-vert.vercel.app",
        group: "personal",
        image: "/images/projects/focus-flow.png",
    },
    {
        title: "AI Facebook Content Automation",
        description:
            "n8n workflow that uses the Gemini API to suggest content topics, generates matching images on demand, and schedules Facebook posts via the Graph API/HTTP Request node — all triggered through Telegram bot commands. Self-hosted locally on a Raspberry Pi.",
        tags: ["n8n", "Gemini API", "Telegram Bot API", "Facebook Graph API", "Raspberry Pi"],
        url: "",
        group: "personal",
        status: "Personal · Self-hosted",
        image: "/images/projects/n8n-workflow.png",
    },
];

export const navLinks = [
    { name: "Profile", href: "#profile" },
    { name: "Work", href: "#work" },
    { name: "Stack", href: "#stack" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];
