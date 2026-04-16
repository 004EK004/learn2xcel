import { useEffect, useState } from "react";
import appwriteClient, {
  account,
  avatars,
  databases,
  storage,
} from "./lib/appwrite";

const navLinks = [
  { label: "Why Learn2XCEL", href: "#why" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "Instructors", href: "#instructors" },
  { label: "FAQ", href: "#faq" },
  { label: "Resources", href: "#resources" },
];

const benefits = [
  {
    title: "Fast, measurable wins",
    description:
      "Master the 20% of Excel that drives 80% of real-world impact with focused weekly sprints.",
  },
  {
    title: "Portfolio-ready projects",
    description:
      "Build executive dashboards, automated trackers, and CFO-level models you can showcase.",
  },
  {
    title: "Lifetime access + community",
    description:
      "Keep every template, recording, and update. Get peer support and live office hours.",
  },
  {
    title: "Career-ready certification",
    description:
      "Graduate with a verified certificate and a skill map aligned to modern analyst roles.",
  },
];

const stats = [
  { value: "32k+", label: "Learners leveling up" },
  { value: "4.9/5", label: "Avg. cohort rating" },
  { value: "18", label: "Capstone templates" },
  { value: "6 weeks", label: "To Excel mastery" },
];

const curriculum = [
  {
    level: "Beginner Foundations",
    timeline: "Weeks 1-2",
    topics: [
      "Excel fundamentals + layout mastery",
      "Core formulas & logical functions",
      "Formatting systems & error-proofing",
    ],
  },
  {
    level: "Intermediate Analysis",
    timeline: "Weeks 3-4",
    topics: [
      "Pivot tables & dynamic dashboards",
      "Lookup stacks (XLOOKUP, INDEX/MATCH)",
      "Data cleaning workflows",
    ],
  },
  {
    level: "Advanced Automation",
    timeline: "Week 5",
    topics: [
      "Power Query transformations",
      "Automation with macros + VBA",
      "Performance optimization",
    ],
  },
  {
    level: "Pro-Level Insights",
    timeline: "Week 6",
    topics: [
      "Data visualization & storytelling",
      "Power BI integration",
      "Executive-ready reporting packs",
    ],
  },
];

const projects = [
  {
    title: "Executive KPI Dashboard",
    description: "Design a board-ready performance hub with slicers and storytelling visuals.",
    tags: ["Pivot Tables", "Slicers", "Data Viz"],
  },
  {
    title: "Finance Forecasting Model",
    description: "Build a flexible 12-month forecast with scenario toggles and sensitivity tables.",
    tags: ["What-If", "Functions", "Modeling"],
  },
  {
    title: "Operations Automation Hub",
    description: "Automate weekly reports with Power Query pipelines and smart refresh logic.",
    tags: ["Power Query", "Automation", "Dashboards"],
  },
];

const testimonials = [
  {
    name: "Jade Morin",
    role: "Operations Analyst, Nimbus Health",
    quote:
      "I went from basic formulas to shipping dashboards in two weeks. The templates alone are gold.",
  },
  {
    name: "Luis Park",
    role: "Marketing Manager, Arcflow",
    quote:
      "Learn2XCEL made Excel feel like a product stack. The automation module saved me 8 hours/week.",
  },
  {
    name: "Priya Singh",
    role: "Finance Associate, Cloudline",
    quote:
      "Every lesson felt premium. The cohort feedback and live sessions pushed my skills to pro level.",
  },
];

const pricing = [
  {
    name: "Free Bootcamp",
    price: "$0",
    description: "Perfect to get momentum fast and test drive the methodology.",
    features: [
      "Week 1 foundations",
      "Starter templates pack",
      "Community access",
      "Progress tracker preview",
    ],
    cta: "Start Free Bootcamp",
  },
  {
    name: "Premium Bootcamp",
    price: "$349",
    description: "Everything you need to become a certified Excel pro.",
    features: [
      "Full 6-week curriculum",
      "Live mentor reviews",
      "Lifetime access + updates",
      "Certificate + portfolio",
    ],
    cta: "Unlock Premium",
  },
];

const instructors = [
  {
    name: "Alicia Wu",
    role: "Former Lead Analyst @ Orion Labs",
    focus: "Data modeling + dashboards",
  },
  {
    name: "Samir Patel",
    role: "Automation Specialist",
    focus: "Power Query + VBA workflows",
  },
  {
    name: "Renee Collins",
    role: "BI Consultant",
    focus: "Storytelling + executive reports",
  },
];

const faqs = [
  {
    question: "How much time should I plan for each week?",
    answer:
      "Most learners spend 4-6 hours per week including projects. You can binge or pace it.",
  },
  {
    question: "Is this good for complete beginners?",
    answer:
      "Yes. We start from zero and quickly build confidence with guided templates and drills.",
  },
  {
    question: "Do I need Microsoft Excel installed?",
    answer:
      "Excel is recommended. You can also follow along with Excel Online for most lessons.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Premium members receive a verifiable certificate and portfolio guidance.",
  },
];

const resources = [
  {
    title: "Excel Formula Cheat Sheet",
    description: "The 50 formulas you will use every week.",
    action: "Download PDF",
  },
  {
    title: "Dashboard Design Kit",
    description: "Color palettes, grid layouts, and KPI widgets.",
    action: "Grab the kit",
  },
  {
    title: "Interview Prep Pack",
    description: "Real-world Excel tasks from top companies.",
    action: "View exercises",
  },
];

const progressSteps = [
  { label: "Foundations", value: 25 },
  { label: "Dashboards", value: 55 },
  { label: "Automation", value: 80 },
  { label: "Capstone", value: 100 },
];

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }
    const storedTheme = localStorage.getItem("learn2xcel-theme");
    return storedTheme ? storedTheme === "dark" : true;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const appwriteConfigured = Boolean(import.meta.env.VITE_APPWRITE_PROJECT_ID);
  const appwriteProjectName =
    import.meta.env.VITE_APPWRITE_PROJECT_NAME || "Learn2XCEL";
  const appwriteServicesReady = Boolean(
    appwriteClient && account && databases && storage && avatars
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      root.classList.remove("dark");
      document.body.classList.add("light");
    }
    localStorage.setItem("learn2xcel-theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-soft-white text-slate-900 transition-colors duration-300 dark:bg-midnight dark:text-soft-white">
      <div className="relative overflow-hidden bg-radial-glow">
        <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-midnight/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-electric-cyan/20 text-electric-cyan shadow-glow">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M4 5a2 2 0 0 1 2-2h9a3 3 0 0 1 3 3v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5zm4 2h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-electric-cyan">
                  Learn2XCEL
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Excel Bootcamp
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-6 text-sm font-medium lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDark((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-electric-cyan hover:text-electric-cyan dark:border-white/10 dark:text-slate-200"
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M12 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1zm10-6a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zM5 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm12.95-6.95a1 1 0 0 1 0 1.42l-1.4 1.4a1 1 0 0 1-1.42-1.4l1.4-1.42a1 1 0 0 1 1.42 0zM7.88 16.05a1 1 0 0 1 0 1.42l-1.4 1.4a1 1 0 1 1-1.42-1.42l1.4-1.4a1 1 0 0 1 1.42 0zm10.1 1.42a1 1 0 0 1-1.42 0l-1.4-1.4a1 1 0 0 1 1.42-1.42l1.4 1.4a1 1 0 0 1 0 1.42zM7.88 7.88a1 1 0 0 1-1.42 0l-1.4-1.4a1 1 0 0 1 1.42-1.42l1.4 1.4a1 1 0 0 1 0 1.42zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3a8.5 8.5 0 1 0 11.5 11.5z" />
                  </svg>
                )}
              </button>
              <a
                href="#pricing"
                className="hidden rounded-full bg-electric-cyan px-5 py-2 text-sm font-semibold text-midnight shadow-glow transition hover:-translate-y-0.5 lg:inline-flex"
              >
                Start Free Bootcamp
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-electric-cyan hover:text-electric-cyan dark:border-white/10 dark:text-slate-200 lg:hidden"
                aria-label="Toggle navigation menu"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                </svg>
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="border-t border-slate-200/70 bg-white/95 px-6 py-4 text-sm dark:border-white/10 dark:bg-midnight">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-slate-700 transition hover:text-electric-cyan dark:text-slate-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        <main className="mx-auto max-w-6xl px-6">
          <section id="hero" className="relative py-20 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="section-kicker">Excel Bootcamp</p>
                <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                  Master Excel from Zero to Pro – Real-World Skills in Weeks
                </h1>
                <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
                  Learn2XCEL is a premium, mentor-guided program that turns beginners into
                  confident Excel power users. Build dashboards, automate workflows, and
                  unlock data analysis superpowers.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#pricing"
                    className="rounded-full bg-electric-cyan px-6 py-3 text-sm font-semibold text-midnight shadow-glow transition hover:-translate-y-0.5"
                  >
                    Start Free Bootcamp
                  </a>
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-electric-cyan hover:text-electric-cyan dark:border-white/20 dark:text-slate-200"
                  >
                    Watch Preview
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-emerald-300/60 bg-emerald-300/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition hover:-translate-y-0.5 dark:border-emerald-400/40 dark:text-emerald-200"
                  >
                    Try Interactive Excel Demo
                  </button>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-2">
                  <div className="glass-card p-4">
                    <p className="text-sm text-slate-400">Next cohort</p>
                    <p className="mt-1 text-lg font-semibold">April 28 • 6-week sprint</p>
                  </div>
                  <div className="glass-card p-4">
                    <p className="text-sm text-slate-400">Appwrite-ready stack</p>
                    <p className="mt-1 text-lg font-semibold">
                      {appwriteConfigured
                        ? `${appwriteProjectName} workspace ready`
                        : "Connect Appwrite"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-electric-cyan">
                        Live Dashboard
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">Quarterly Revenue Pulse</h3>
                      <p className="text-sm text-slate-400">Updated 5 minutes ago</p>
                    </div>
                    <div className="rounded-full bg-excel-green/20 px-3 py-1 text-xs font-semibold text-excel-green">
                      +18.4%
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-4 gap-3">
                    {[65, 48, 72, 90].map((value) => (
                      <div
                        key={value}
                        className="flex h-28 items-end rounded-xl border border-white/10 bg-white/5 p-2"
                      >
                        <div
                          className="w-full rounded-lg bg-gradient-to-t from-electric-cyan to-excel-green"
                          style={{ height: `${value}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                  </div>
                </div>
                <div className="absolute -bottom-8 -left-6 hidden w-56 rounded-2xl border border-white/10 bg-midnight/80 p-4 shadow-glow lg:block">
                  <p className="text-xs uppercase tracking-[0.3em] text-electric-cyan">
                    Progress tracker
                  </p>
                  <p className="mt-2 text-sm font-semibold">Week 3: Pivot mastery</p>
                  <div className="mt-3 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-electric-cyan to-excel-green"></div>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">75% complete</p>
                </div>
              </div>
            </div>
          </section>

          <section id="why" className="py-16">
            <div className="text-center">
              <p className="section-kicker">Why Learn2XCEL</p>
              <h2 className="section-title mt-4">High-conversion results for real teams</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Designed for ambitious analysts, operators, and founders who want Excel to feel
                effortless.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="glass-card p-6 transition hover:-translate-y-1">
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-3 text-sm text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-6 text-center">
                  <p className="text-2xl font-semibold text-electric-cyan">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="curriculum" className="py-16">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-kicker">Learning Path</p>
                <h2 className="section-title mt-4">A guided roadmap from basics to automation</h2>
              </div>
              <div className="glass-card p-4 text-sm text-slate-400">
                Weekly projects • Live reviews • Lifetime access
              </div>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {curriculum.map((module) => (
                <div key={module.level} className="glass-card p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{module.level}</h3>
                    <span className="text-xs uppercase tracking-[0.3em] text-electric-cyan">
                      {module.timeline}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-400">
                    {module.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-excel-green"></span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="progress" className="py-16">
            <div className="glass-card p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="section-kicker">Progress Tracker</p>
                  <h2 className="section-title mt-4">See your Excel skills compound weekly</h2>
                  <p className="mt-3 text-sm text-slate-400">
                    Every lesson updates your mastery dashboard with measurable milestones.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-electric-cyan">
                    Live milestone
                  </p>
                  <p className="mt-2 text-lg font-semibold">Dashboard Storytelling</p>
                  <p className="text-sm text-slate-400">Week 4 · 62% complete</p>
                  <p className="mt-3 text-xs text-slate-500">
                    Appwrite services: {appwriteServicesReady ? "ready" : "pending"}
                  </p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-4">
                {progressSteps.map((step) => (
                  <div key={step.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm font-semibold">{step.label}</p>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-electric-cyan to-excel-green"
                        style={{ width: `${step.value}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{step.value}% mastery</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="py-16">
            <div className="text-center">
              <p className="section-kicker">Featured Projects</p>
              <h2 className="section-title mt-4">Build dashboards that look executive-ready</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Every module ends with a polished deliverable you can share with teams or clients.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <div key={project.title} className="glass-card p-6 transition hover:-translate-y-1">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm text-slate-400">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="resources" className="py-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="section-kicker">Free Resources</p>
                <h2 className="section-title mt-4">Download premium Excel assets today</h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                  Kickstart your learning with templates and cheat sheets used in the bootcamp.
                </p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {resources.map((resource) => (
                    <div key={resource.title} className="glass-card p-5">
                      <h3 className="text-base font-semibold">{resource.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{resource.description}</p>
                      <button
                        type="button"
                        className="mt-4 text-sm font-semibold text-electric-cyan hover:text-emerald-300"
                      >
                        {resource.action} →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-8">
                <p className="section-kicker">Newsletter</p>
                <h3 className="mt-4 text-2xl font-semibold">
                  Get weekly Excel breakthroughs
                </h3>
                <p className="mt-3 text-sm text-slate-400">
                  Exclusive templates, prompts, and automation tips delivered every Monday.
                </p>
                <form className="mt-6 flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-electric-cyan focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-electric-cyan px-6 py-3 text-sm font-semibold text-midnight shadow-glow transition hover:-translate-y-0.5"
                  >
                    Join the Newsletter
                  </button>
                  <p className="text-xs text-slate-500">
                    No spam. Unsubscribe anytime. Bonus workbook included.
                  </p>
                </form>
              </div>
            </div>
          </section>

          <section id="testimonials" className="py-16">
            <div className="text-center">
              <p className="section-kicker">Testimonials</p>
              <h2 className="section-title mt-4">Trusted by analysts, operators, and founders</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="glass-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-cyan/20 text-sm font-semibold text-electric-cyan">
                      {testimonial.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">“{testimonial.quote}”</p>
                </div>
              ))}
            </div>
          </section>

          <section id="pricing" className="py-16">
            <div className="text-center">
              <p className="section-kicker">Pricing</p>
              <h2 className="section-title mt-4">Choose the plan that fits your growth</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Flexible options for individuals and teams. Upgrade anytime.
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {pricing.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`rounded-3xl border p-8 ${
                    index === 1
                      ? "border-electric-cyan/50 bg-electric-cyan/10 shadow-glow"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
                  <p className="mt-6 text-4xl font-semibold text-electric-cyan">{plan.price}</p>
                  <ul className="mt-6 space-y-2 text-sm text-slate-300">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-excel-green"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="mt-8 w-full rounded-full bg-electric-cyan px-6 py-3 text-sm font-semibold text-midnight transition hover:-translate-y-0.5"
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section id="instructors" className="py-16">
            <div className="text-center">
              <p className="section-kicker">Instructors</p>
              <h2 className="section-title mt-4">Learn from Excel power users</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {instructors.map((instructor) => (
                <div key={instructor.name} className="glass-card p-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-electric-cyan">
                    {instructor.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{instructor.name}</h3>
                  <p className="text-sm text-slate-400">{instructor.role}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.3em] text-electric-cyan">
                    {instructor.focus}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="faq" className="py-16">
            <div className="text-center">
              <p className="section-kicker">FAQ</p>
              <h2 className="section-title mt-4">Answers to your top questions</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {faqs.map((faq) => (
                <div key={faq.question} className="glass-card p-6">
                  <h3 className="text-base font-semibold">{faq.question}</h3>
                  <p className="mt-3 text-sm text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16">
            <div className="rounded-3xl border border-electric-cyan/30 bg-electric-cyan/10 p-10 text-center shadow-glow">
              <p className="section-kicker">Ready to level up?</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Join the next Learn2XCEL cohort and ship a portfolio in weeks.
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-200">
                Live cohorts, expert reviews, and a premium learning experience.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="#pricing"
                  className="rounded-full bg-midnight px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-midnight"
                >
                  Enroll Now
                </a>
                <button
                  type="button"
                  className="rounded-full border border-midnight/30 px-6 py-3 text-sm font-semibold text-midnight transition hover:-translate-y-0.5 dark:border-white/40 dark:text-white"
                >
                  Book a consult
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-midnight/90">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-electric-cyan">Learn2XCEL</p>
              <p className="mt-4 text-sm text-slate-400">
                Premium Excel bootcamp for modern teams. Learn faster, automate more, and build
                dashboards that impress.
              </p>
            </div>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Explore</p>
              {navLinks.slice(0, 4).map((link) => (
                <a key={link.href} href={link.href} className="block hover:text-electric-cyan">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Contact</p>
              <p>hello@learn2xcel.com</p>
              <p>Weekly live support</p>
              <p>Powered by Appwrite</p>
            </div>
          </div>
          <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
            © 2026 Learn2XCEL. All rights reserved.
          </div>
        </footer>
      </div>

      <div className="sr-only">{appwriteClient ? "Appwrite ready" : "Appwrite missing"}</div>
    </div>
  );
}

export default App;
