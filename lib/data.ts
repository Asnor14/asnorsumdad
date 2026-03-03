// Personal Info
export const personalInfo = {
    name: "Asnor Sumdad",
    role: "Full-Stack Developer",
    tagline: "Building modern web, mobile, and AI-powered systems",
    location: "Laguna, Philippines",
    email: "asnor023@gmail.com",
    github: "https://github.com/SilencioOrgs",
    linkedin: "https://www.linkedin.com/in/sumdad-asnor-a-924566327",
    instagram: "https://www.instagram.com/asnor_sumdad",
    portfolio: "https://asnorsumdad.vercel.app",
};

// About Section
export const aboutContent = `I'm a full-stack developer with a strong background in software engineering, IoT, and AI-powered applications. I specialize in building modern web platforms, mobile apps, and hardware-integrated systems that solve real-world problems.

I have worked as the primary developer for multiple client projects, capstone systems, and thesis-level applications, delivering production-ready solutions using technologies like Next.js, Flutter, FastAPI, Firebase, Supabase, and ESP32-based hardware.

My focus is on creating clean, scalable, and reliable systems — whether it's an AI-driven web app, a real-time tracking platform, or a smart embedded device. I enjoy turning complex ideas into usable, high-impact digital products.`;

// Tech Stack
export const techStack = {
    frontend: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Flutter"],
    backend: ["Node.js", "Python", "FastAPI", "PHP", "REST APIs"],
    database: ["Firebase", "Supabase", "MySQL", "SQLite"],
    ai: ["OpenAI API", "LLaMA", "Flan-T5", "NLP", "Text Processing"],
    iot: ["ESP32", "Arduino", "Raspberry Pi", "GPS Modules", "Sensors & Actuators"],
    other: ["Git / GitHub", "Trello"],
};

// Experience
interface Experience {
    period: string;
    summary: string;
}

export const experiences: Experience[] = [
    {
        period: "2019",
        summary:
            'Began my journey in programming by creating my first "Hello, World!" program and learning the foundations of coding.',
    },
    {
        period: "2020",
        summary:
            "Started building simple games with Scratch and later explored VB.NET, where I developed a basic ordering system and gained early hands-on experience in software development.",
    },
    {
        period: "2022 - Present",
        summary:
            "Began my Computer Engineering journey and actively participated in programming events, regional competitions, and hackathons, which helped shape my technical growth and collaborative skills.",
    },
    {
        period: "2025 - Present",
        summary:
            "Expanded into professional work as a Video Editor and Full-Stack Developer, while also managing small freelance projects such as wedding websites and capstone/thesis web systems for students.",
    },
];

// Achievements
export const achievements = [
    "Participant: ICPEP Regional Competitive Programming (Java)",
    "Lead developer for AI-based and IoT projects",
    "Created a Sentiment & Tone Profiler powered by LLMs (ChadGpt)",
];

// Projects
interface Project {
    title: string;
    description: string;
    tags: string[];
    url: string;
    image: string;
}

export const projects: Project[] = [
    {
        title: "ChadGPT - Tone Profiler",
        description: "Sentiment & tone profiler using FLAN-T5 and Llama 3.2",
        tags: ["Next.js", "FastAPI", "AI/ML"],
        url: "https://tone-profiler.vercel.app",
        image: "/photos/tone-profiler.vercel.app_.png",
    },
    {
        title: "Wedding Landing Page",
        description: "Elegant wedding invitation landing page",
        tags: ["Next.js", "Framer Motion"],
        url: "https://wedding-landingpage.vercel.app",
        image: "/photos/wedding-landingpage.vercel.app_.png",
    },
    {
        title: "LSPU Student Registration",
        description: "Student registration system for LSPU",
        tags: ["React", "Vite"],
        url: "",
        image: "/photos/lspu-student-reg.vercel.app_.png",
    },
    {
        title: "Focus Flow",
        description: "Productivity and focus management app",
        tags: ["Next.js", "Productivity"],
        url: "https://focus-flow-vert.vercel.app",
        image: "/photos/focus-flow-vert.vercel.app_.png",
    },
];

// Navigation Links
export const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tech", href: "#tech" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];
