// Personal Info
export const personalInfo = {
    name: "Asnor Sumdad",
    role: "Full-Stack Developer",
    tagline: "Building modern web, mobile, and AI-powered systems",
    location: "Laguna, Philippines",
    email: "asnor023@gmail.com",
    github: "https://github.com/Asnor14",
    linkedin: "https://www.linkedin.com/in/sumdad-asnor-a-924566327",
    instagram: "https://www.instagram.com/asnor_sumdad",
    portfolio: "https://your-portfolio.vercel.app",
};

// About Section
export const aboutContent = `I'm a full-stack developer with a strong background in software engineering, IoT, and AI-powered applications. I specialize in building modern web platforms, mobile apps, and hardware-integrated systems that solve real-world problems.

I have worked as the primary developer for multiple client projects, capstone systems, and thesis-level applications, delivering production-ready solutions using technologies like Next.js, Flutter, FastAPI, Firebase, Supabase, and ESP32-based hardware.

My focus is on creating clean, scalable, and reliable systems — whether it's an AI-driven web app, a real-time tracking platform, or a smart embedded device. I enjoy turning complex ideas into usable, high-impact digital products.`;

// Tech Stack
export const techStack = {
    frontend: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Flutter"],
    backend: ["Node.js", "FastAPI", "Python", "PHP", "REST APIs"],
    database: ["Firebase", "Supabase", "MySQL", "SQLite"],
    ai: ["OpenAI API", "LLaMA", "Flan-T5", "NLP", "Text Processing"],
    iot: ["ESP32", "Arduino", "GPS Modules", "Raspberry Pi", "Sensors & Actuators"],
    other: ["Git/GitHub", "Trello"],
};

// Experience
interface Experience {
    title: string;
    company: string;
    description: string[];
}

export const experiences: Experience[] = [
    {
        title: "Freelance Full-Stack Developer",
        company: "HereAfter, Pal",
        description: [
            "Developed a scalable digital memorial platform using Next.js and Node.js with Firebase backend",
            "Integrated ElevenLabs API to generate AI voice clones for interactive audio tributes",
            "Implemented secure payment processing via PayMongo",
        ],
    },
    {
        title: "Freelance Mobile App Developer",
        company: "PillPal",
        description: [
            "Engineered the mobile ecosystem for an IoT-enabled healthcare device",
            "Delivered a cross-platform Flutter app that communicates seamlessly with embedded systems (ESP32)",
            "Manages medication schedules and user alerts",
        ],
    },
    {
        title: "Project-Based Mobile App Developer",
        company: "NavCane",
        description: [
            "Developed a safety tracking app for an assistive technology research project using Flutter and Mapbox",
            "Engineered real-time communication between the app and an ESP32 smart cane via Firebase Realtime Database",
        ],
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
