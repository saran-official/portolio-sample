export const PROFILE = {
  name: "Saran Kumar",
  firstName: "Saran",
  roles: [
    "Software Developer",
    "AI Full Stack Developer",
    "Data Analyst",
    "Digital Marketer",
    "Freelancer",
    "Problem Solver",
  ],
  tagline:
    "I design and build intelligent, editorial-grade products — where software, AI and marketing meet a considered aesthetic.",
  location: "Tiruchirappalli, Tamil Nadu, India",
  email: "saranofficial210506@gmail.com",
  introVideoUrl: "/assets/intro.mp4",
  introPosterUrl: "/assets/intro-poster.jpg",
  resumeUrl: "/assets/resume.pdf",
  socials: {
    github: "https://github.com/saran-official",
    linkedin: "https://www.linkedin.com/in/saran-kumar-8443a22a4",
    instagram:
      "https://www.instagram.com/saran_official_2105/?utm_source=qr&r=nametag",
    email: "mailto:saranofficial210506@gmail.com",
  },
};

export const STATS = [
  { label: "Years learning & building", value: "3+" },
  { label: "Projects shipped", value: "6" },
  { label: "Certifications", value: "5" },
  { label: "Domains", value: "AI · Web · IoT" },
];

export type SkillGroup = {
  title: string;
  items: { name: string; level: number; status?: "core" | "learning" }[];
};

export const SKILLS: SkillGroup[] = [
  {
    title: "Languages & Core",
    items: [
      { name: "Python", level: 88, status: "core" },
      { name: "C", level: 82, status: "core" },
      { name: "TypeScript", level: 78, status: "core" },
      { name: "JavaScript", level: 80, status: "core" },
      { name: "SQL", level: 70, status: "core" },
    ],
  },
  {
    title: "Web & UI",
    items: [
      { name: "React", level: 75, status: "learning" },
      { name: "Tailwind CSS", level: 82, status: "learning" },
      { name: "HTML / CSS", level: 92, status: "core" },
      { name: "Framer / Motion", level: 65, status: "learning" },
      { name: "Figma", level: 70, status: "core" },
    ],
  },
  {
    title: "AI, Cloud & Data",
    items: [
      { name: "AI Tools for Marketing", level: 85, status: "core" },
      { name: "Google Gemini", level: 72, status: "learning" },
      { name: "Microsoft Azure", level: 74, status: "core" },
      { name: "Data Analysis", level: 78, status: "core" },
      { name: "Flask", level: 60, status: "learning" },
    ],
  },
  {
    title: "IoT & Embedded",
    items: [
      { name: "ARM / STM32", level: 78, status: "core" },
      { name: "Sensors & MCUs", level: 82, status: "core" },
      { name: "Delta PLC", level: 70, status: "core" },
      { name: "Industrial Automation", level: 72, status: "core" },
    ],
  },
  {
    title: "Digital Marketing",
    items: [
      { name: "Content Strategy", level: 82, status: "core" },
      { name: "SEO Fundamentals", level: 74, status: "core" },
      { name: "Analytics", level: 78, status: "core" },
      { name: "Personal Branding", level: 85, status: "core" },
    ],
  },
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  category: "Web" | "AI" | "IoT" | "Software";
  year: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "Futurole",
    tagline: "AI-assisted career discovery for students",
    description:
      "A React + Flask + MongoDB platform that recommends career paths, courses and skill roadmaps using generative AI and structured student profiles.",
    tags: ["React", "Flask", "MongoDB", "Gemini"],
    demo: "https://futurole.vercel.app/",
    image: "/assets/futurole-cover.png",
    category: "AI",
    year: "2026",
    featured: true,
  },
  {
    title: "Interactive motel work",
    tagline: "Premium hospitality landing experience",
    description:
      "A modern, conversion-focused hotel website with elegant typography, immersive imagery and a booking-ready journey.",
    tags: ["Web", "React", "Tailwind", "UI/UX"],
    demo: "https://hotelsrees.lovable.app/",
    image: "/assets/interactive-motel-cover.png",
    category: "Web",
    year: "2026",
    featured: true,
  },
  {
    title: "Fix Campus Now",
    tagline: "Campus problem-fixing platform for students",
    description:
      "A student-first platform that lets campus residents report issues, track resolution progress and engage with facility management in real time.",
    tags: ["Web", "React", "Student Tools", "UI/UX"],
    demo: "https://fix-campus-now.lovable.app/",
    image: "/assets/fix-campus-now-cover.png",
    category: "Web",
    year: "2026",
    featured: true,
  },
  {
    title: "Smart Rental Management",
    tagline: "Rentals, tenants and payments in one place",
    description:
      "A rental operations platform with tenant onboarding, lease tracking, automated reminders and clear analytics for landlords.",
    tags: ["Full Stack", "React", "REST API", "MongoDB"],
    image: "/assets/smart-rental-cover.png",
    demo: "https://trichy-smart-rent.lovable.app",
    category: "Software",
    year: "2025",
  },
  {
    title: "Filmovault",
    tagline: "A cinematic movie discovery experience",
    description:
      "An editorial movie platform with curated collections, watchlists and a premium browsing feel built around large imagery and typography.",
    tags: ["React", "TypeScript", "TMDB", "UI/UX"],
    demo: "https://filmovault.vercel.app/",
    image: "/assets/filmovault-cover.jpg",
    category: "Web",
    year: "2026",
    featured: true,
  },
];

export const SERVICES = [
  { title: "Website Development", body: "Bespoke marketing sites and web apps built with a premium editorial feel." },
  { title: "AI Applications", body: "LLM-powered tools, assistants and internal workflows tuned for real outcomes." },
  { title: "Landing Pages", body: "High-conversion pages with strong typography, motion and clear narrative." },
  { title: "Portfolio Design", body: "Personal brands and portfolios that feel considered, not templated." },
  { title: "Video Editing", body: "Polished cuts, pacing and visual storytelling for content that holds attention." },
  { title: "Content Writer", body: "Clear, engaging copy for web, social and campaigns that sounds like you." },
  { title: "Digital Marketing", body: "Paid, social and content strategies grounded in data and creative craft." },
  { title: "Automation", body: "Removing repetitive work with tidy scripts, APIs and workflow tools." },
  { title: "UI Design", body: "Interfaces with clarity, hierarchy and micro-interactions that feel right." },
];

export const EXPERIENCE = [
  {
    role: "AI Tools for Digital Marketing",
    org: "Self-Driven Learning",
    period: "2024 — Present",
    points: [
      "Explore and apply AI tools to improve digital marketing performance and automation.",
      "Analyse customer engagement and campaign data to inform strategy.",
    ],
  },
  {
    role: "Implant Training",
    org: "TANGEDCO",
    period: "2024",
    points: [
      "Practical exposure to electrical systems and industrial power operations.",
      "Observed maintenance and functioning of power distribution systems.",
    ],
  },
];

export const EDUCATION = [
  {
    degree: "B.E. Electrical, Electronics & Communication Engineering",
    school: "K. Ramakrishnan College of Engineering",
    period: "2023 — 2027",
    detail: "CGPA: 8.0",
  },
  {
    degree: "Higher Secondary (Maths & Computer Science)",
    school: "Raj Vidya Bhavan",
    period: "2021 — 2023",
    detail: "Score: 90%",
  },
  {
    degree: "Bachelor's in Hindi Language & Literature",
    school: "Dakshina Bharat Hindi Prachar Sabha",
    period: "2014 — 2018",
    detail: "",
  },
];

export const CERTIFICATIONS = [
  { title: "Cloud Computing", issuer: "NPTEL" },
  { title: "Python for Data Science", issuer: "NPTEL" },
  { title: "Microsoft Azure Fundamentals", issuer: "Microsoft" },
  { title: "Create Social Media Content with Prezi", issuer: "Coursera" },
  { title: "ARM & STM32 Microcontrollers", issuer: "Introduction Course" },
];

export const WORKSHOPS = [
  "Industrial Automation — SARA Controls & Automation",
  "IoT, ML & AI for Smart Crop Protection — Anna University (BIT Campus)",
  "Workshop on IoT — KPR College of Engineering",
  "IoT, Drones & Robotics — Village School of Technology",
];

export const LANGUAGES = [
  { name: "Tamil", level: "Fluent" },
  { name: "English", level: "Advanced" },
  { name: "Hindi", level: "Intermediate" },
  { name: "German", level: "Beginner" },
];

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];