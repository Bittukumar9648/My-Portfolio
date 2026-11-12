import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Heart,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  Send,
  Sparkles,
  Target,
  Users,
  X,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/bittu-kumar-profile.png.asset.json";

const sections = ["Home", "About", "Skills", "Projects", "Achievements", "Contact"];

const skillGroups = [
  { name: "Languages", items: ["C", "C++", "Python", "JavaScript"] },
  { name: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Responsive Web Design"] },
  { name: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"] },
  { name: "Data & ORM", items: ["SQLite", "Prisma ORM"] },
  { name: "AI & Machine Learning", items: ["AI Fundamentals", "Machine Learning Fundamentals", "Data Analysis", "Exploratory Data Analysis", "NLP Fundamentals", "Dialogflow"] },
  { name: "Tools", items: ["Visual Studio Code", "Jupyter Notebook", "Git", "GitHub", "Vite", "Canva"] },
];

const achievements = [
  { number: "01", title: "First Rank", subtitle: "Spoken English & Personality Development", detail: "Secured first position in the course at SKAE.", icon: Award },
  { number: "02", title: "Best Volunteer", subtitle: "Hackathon", detail: "Recognized for volunteering and contribution during a hackathon.", icon: Heart },
  { number: "03", title: "Event Anchoring", subtitle: "SKAE Validation Ceremony", detail: "Hosted and anchored the ceremony on 26 October 2026.", icon: MessageCircle },
  { number: "04", title: "AI Samar Training", subtitle: "MMMUT", detail: "Participated in AI-related training at Madan Mohan Malaviya University of Technology.", icon: Sparkles },
  { number: "05", title: "Hackathon Team Leadership", subtitle: "Collaboration & ideation", detail: "Led a team during hackathon activities and collaborated on project ideas.", icon: Users },
  { number: "06", title: "Presentation & Public Speaking", subtitle: "Communication", detail: "Prepared presentation slides and confidently hosted a formal event.", icon: Lightbulb },
];

const certifications = [
  { title: "Graphic Designing", issuer: "Issuing organization not provided", icon: Palette },
  { title: "Aeromodelling", issuer: "Issuing organization not provided", icon: Target },
  { title: "AI Samar Training", issuer: "MMMUT", icon: Sparkles },
  { title: "Spoken English & Personality Development", issuer: "SKAE", icon: MessageCircle },
];

const interests = [
  ["Poetry writing", BookOpen], ["Painting", Palette], ["Chess", Target], ["Reading", BookOpen],
  ["Travel", MapPin], ["Cricket", Award], ["Swimming", Sparkles], ["Cooking", Heart],
  ["English movies", BriefcaseBusiness], ["English songs", MessageCircle], ["New technologies", Code2],
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(255, "Email must be 255 characters or fewer."),
  subject: z.string().trim().min(2, "Please add a subject.").max(120, "Subject must be 120 characters or fewer."),
  message: z.string().trim().min(10, "Please add a little more detail (at least 10 characters). ").max(1500, "Message must be 1,500 characters or fewer."),
});

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Bittu Kumar — Software Developer & AI/ML Enthusiast" },
      { name: "description", content: "Meet Bittu Kumar, a software developer and AI/ML enthusiast building thoughtful digital experiences in Gorakhpur, India." },
      { property: "og:title", content: "Bittu Kumar — Software Developer & AI/ML Enthusiast" },
      { property: "og:description", content: "Turning ideas into intelligent digital experiences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSkills, setActiveSkills] = useState("All");
  const [role, setRole] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.id) setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    document.querySelectorAll(".reveal, main section[id]").forEach((element) => observer.observe(element));
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const roles = ["Software Developer", "Full-Stack Developer", "AI/ML Enthusiast", "Creative Problem Solver"];
    const timer = window.setInterval(() => setRole((value) => (value + 1) % roles.length), 2500);
    return () => window.clearInterval(timer);
  }, []);

  const downloadResume = () => {
    const resume = [
      "BITTU KUMAR",
      "Software Developer | Full-Stack Developer | AI/ML Enthusiast",
      "Gorakhpur, Uttar Pradesh, India | bittukumar2162006@gmail.com",
      "LinkedIn: linkedin.com/in/bittu-kumar-452549386 | GitHub: github.com/Bittukumar9648",
      "",
      "PROFILE",
      "Computer Science graduate specializing in Artificial Intelligence and Machine Learning. Interested in building modern web applications, exploring AI/ML, and solving real-world problems through technology.",
      "",
      "EDUCATION",
      "Bachelor of Technology (B.Tech), Computer Science and Engineering",
      "Specialization: Artificial Intelligence and Machine Learning",
      "Deen Dayal Upadhyaya Gorakhpur University — Completed",
      "",
      "TECHNICAL SKILLS",
      ...skillGroups.map((group) => `${group.name}: ${group.items.join(", ")}`),
      "",
      "PROJECTS",
      "Brightloop — Subscription Management System: Full-stack subscription platform for customer management, plans, billing, invoicing, payment tracking, and revenue analytics. Stack: React, Vite, Tailwind CSS, Node.js, Express, SQLite, Prisma, JWT, Zod. Supplied project QA result: 25/25 tests across 15 categories.",
      "Smart Canteen Management System: Project concept developed for Smart India Hackathon preparation and internal participation, featuring a QR-based menu, digital ordering concept, and Dialogflow chatbot.",
      "",
      "SELECTED ACHIEVEMENTS",
      "First Rank — Spoken English & Personality Development, SKAE",
      "Best Volunteer Award — Hackathon",
      "Event Anchoring — SKAE Validation Ceremony, 26 October 2026",
      "AI Samar Training — MMMUT",
      "Hackathon team leadership; presentation and public speaking",
      "",
      "INTERPERSONAL SKILLS",
      "Public speaking, event anchoring, team leadership, group discussion, presentation, communication, collaboration, creative thinking, and problem solving.",
      "",
      "This profile summary uses only information provided by Bittu Kumar. Add dates, project links, and supporting documents when available.",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([resume], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "bittu-kumar-resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => { errors[String(issue.path[0])] = issue.message; });
      setFormErrors(errors);
      setFormStatus("");
      return;
    }
    setFormErrors({});
    const { name, email, subject, message } = result.data;
    const body = `From: ${name} (${email})\n\n${message}`;
    window.location.href = `mailto:bittukumar2162006@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormStatus("Your email app should open with a draft. The message has not been sent automatically.");
  };

  const roles = ["Software Developer", "Full-Stack Developer", "AI/ML Enthusiast", "Creative Problem Solver"];

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="Bittu Kumar, home"><span className="brand-dot" />BITTU KUMAR</a>
        <nav className={`primary-nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
          {sections.map((item) => {
            const id = item.toLowerCase();
            return <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setMenuOpen(false)}>{item}</a>;
          })}
          <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s Connect <ArrowUpRight aria-hidden="true" /></a>
        </nav>
        <Button className="mobile-menu-button" variant="ghost" size="icon" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-copy reveal">
            <div className="availability"><span /> AVAILABLE FOR OPPORTUNITIES</div>
            <p className="hero-kicker">SOFTWARE DEVELOPER <span>·</span> AI/ML ENTHUSIAST</p>
            <h1>Hi, I’m<br /><span className="hero-name">Bittu Kumar.</span></h1>
            <div className="typing-line"><span className="typing-prefix">I’m a </span><span key={role} className="typing-role">{roles[role]}</span><span className="typing-caret" aria-hidden="true">|</span></div>
            <p className="hero-description">I build modern digital experiences, scalable web applications, and intelligent solutions using technology and creativity.</p>
            <p className="hero-tagline">Turning ideas into intelligent digital experiences.</p>
            <div className="hero-actions">
              <Button asChild size="lg" className="button-primary"><a href="#projects">Explore my work <ArrowDownRight aria-hidden="true" /></a></Button>
              <Button size="lg" variant="outline" className="button-outline" onClick={downloadResume}>Download resume <ArrowDown aria-hidden="true" /></Button>
            </div>
            <div className="hero-socials" aria-label="Social profiles">
              <a href="https://github.com/Bittukumar9648" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
              <a href="https://www.linkedin.com/in/bittu-kumar-452549386" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
              <a href="mailto:bittukumar2162006@gmail.com" aria-label="Email Bittu"><Mail /></a>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="portrait-orbit orbit-one" aria-hidden="true" />
            <div className="portrait-orbit orbit-two" aria-hidden="true" />
            <div className="portrait-frame"><img src={profilePhoto.url} alt="Bittu Kumar wearing a navy cap and blue sweater" fetchPriority="high" /></div>
            <div className="portrait-label"><span className="label-index">01 / 04</span><span>BUILDING WITH CURIOSITY</span></div>
            <div className="float-chip chip-ai"><Sparkles aria-hidden="true" /><span>AI / ML<br /><small>Enthusiast</small></span></div>
            <div className="float-chip chip-stack"><Code2 aria-hidden="true" /><span>Full-stack<br /><small>Development</small></span></div>
            <div className="float-chip chip-creative"><Lightbulb aria-hidden="true" /><span>Creative<br /><small>Thinker</small></span></div>
            <div className="visual-coordinate">26°45′ N&nbsp; 83°22′ E</div>
          </div>
          <a className="scroll-hint" href="#about"><span>SCROLL TO EXPLORE</span><ChevronDown aria-hidden="true" /></a>
          <div className="hero-index" aria-hidden="true">BK / PORTFOLIO 2026</div>
        </section>

        <section id="about" className="content-section about-section">
          <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Get to know me" subtitle="A little about my journey, passion, and vision." number="01" />
          <div className="about-layout">
            <div className="about-copy reveal">
              <p className="lead-copy">Curiosity is where it starts. Building something useful is where it comes alive.</p>
              <p>I’m Bittu Kumar, a Computer Science graduate specializing in Artificial Intelligence and Machine Learning from Deen Dayal Upadhyaya Gorakhpur University.</p>
              <p>My journey in technology is driven by curiosity, creativity, and the desire to solve real-world problems. I enjoy developing web applications, exploring AI/ML concepts, and learning new technologies.</p>
              <p>I believe technical knowledge becomes more powerful when combined with communication, teamwork, leadership, and creativity. I continuously challenge myself to learn, build, experiment, and grow.</p>
              <div className="location-line"><MapPin aria-hidden="true" /> Gorakhpur, Uttar Pradesh, India</div>
            </div>
            <div className="about-cards">
              <InfoCard number="01" title="Technology enthusiast" text="Passionate about software development, AI, and emerging technologies." icon={<Code2 />} />
              <InfoCard number="02" title="Creative thinker" text="Turning creative ideas into practical digital solutions." icon={<Lightbulb />} />
              <InfoCard number="03" title="Continuous learner" text="Always exploring new skills, technologies, and opportunities." icon={<Sparkles />} />
            </div>
          </div>
        </section>

        <section id="education" className="content-section education-section">
          <SectionHeading eyebrow="THE FOUNDATION" title="My educational journey" subtitle="A foundation in computer science, with a focus on intelligent systems." number="02" />
          <div className="education-timeline reveal">
            <div className="timeline-marker"><GraduationCap aria-hidden="true" /></div>
            <div className="timeline-content">
              <div className="timeline-topline"><span>UNDERGRADUATE DEGREE</span><span className="status-badge"><span /> COMPLETED</span></div>
              <h3>Bachelor of Technology <span>(B.Tech)</span></h3>
              <p className="education-branch">Computer Science and Engineering</p>
              <div className="education-details"><span>Specialization</span><strong>Artificial Intelligence and Machine Learning</strong></div>
              <div className="education-details"><span>University</span><strong>Deen Dayal Upadhyaya Gorakhpur University</strong></div>
              <div className="education-location"><MapPin aria-hidden="true" /> Gorakhpur, Uttar Pradesh, India</div>
            </div>
          </div>
        </section>

        <section id="skills" className="content-section skills-section">
          <SectionHeading eyebrow="MY TOOLKIT" title="Technologies I work with" subtitle="A growing set of tools for building thoughtful digital solutions." number="03" />
          <div className="skill-filters" role="group" aria-label="Filter skills by category">
            {["All", ...skillGroups.map((group) => group.name)].map((name) => <Button key={name} size="sm" variant={activeSkills === name ? "default" : "outline"} className={activeSkills === name ? "filter-active" : "filter-button"} aria-pressed={activeSkills === name} onClick={() => setActiveSkills(name)}>{name}</Button>)}
          </div>
          <div className="skills-grid">
            {skillGroups.filter((group) => activeSkills === "All" || group.name === activeSkills).map((group, groupIndex) => (
              <article className="skill-card reveal" key={group.name}>
                <div className="skill-card-top"><span className="skill-index">0{groupIndex + 1}</span><Code2 aria-hidden="true" /></div>
                <h3>{group.name}</h3>
                <div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section projects-section">
          <SectionHeading eyebrow="SELECTED WORK" title="Featured projects" subtitle="Some of the things I’ve built and explored." number="04" />
          <div className="projects-list">
            <article className="project-card project-brightloop reveal">
              <div className="project-visual brightloop-visual">
                <div className="dashboard-window">
                  <div className="window-top"><span /><span /><span /><small>BRIGHTLOOP / OVERVIEW</small></div>
                  <div className="dashboard-body"><aside><b>B</b><i /><i /><i /><i /></aside><div className="dashboard-main"><div className="dashboard-heading"><small>GOOD MORNING, ADMIN</small><strong>Revenue overview</strong></div><div className="dashboard-stats"><div><small>MONTHLY REVENUE</small><b>Analytics</b></div><div><small>ACTIVE PLANS</small><b>Subscriptions</b></div><div><small>CUSTOMERS</small><b>Management</b></div></div><div className="chart-lines"><span /><span /><span /><span /><span /><span /><span /><span /></div></div></div>
                </div>
                <div className="project-visual-caption"><span>PROJECT 01</span><span>FULL-STACK SAAS</span></div>
              </div>
              <div className="project-info">
                <div className="project-overline"><span>01 / SUBSCRIPTION MANAGEMENT</span><span className="project-type">FULL-STACK SAAS</span></div>
                <h3>Brightloop<span>—</span><br />Subscription Management System</h3>
                <p>A platform concept for simplifying subscription operations, customer management, billing, invoicing, and payment tracking.</p>
                <div className="project-highlights"><span>Role-based access</span><span>Subscription lifecycle</span><span>Invoicing & payments</span><span>Revenue analytics</span></div>
                <div className="project-stack"><strong>STACK</strong><span>React · Vite · Tailwind · Node.js · Express · SQLite · Prisma · JWT · Zod</span></div>
                <div className="project-proof"><Check aria-hidden="true" /><span>25/25 QA tests passed across 15 testing categories, as reported for this project.</span></div>
                <div className="project-actions"><Button asChild variant="outline" className="button-outline"><a href="mailto:bittukumar2162006@gmail.com?subject=Brightloop%20project%20details">Request project details <ArrowUpRight aria-hidden="true" /></a></Button><a className="text-link" href="https://github.com/Bittukumar9648" target="_blank" rel="noreferrer">GitHub profile <ExternalLink aria-hidden="true" /></a></div>
              </div>
            </article>
            <article className="project-card project-canteen reveal">
              <div className="project-visual canteen-visual">
                <div className="canteen-phone"><div className="phone-top"><span>MENU / 01</span><span>≡</span></div><div className="canteen-hero"><small>FRESH · FAST · DIGITAL</small><b>Today’s<br />specials.</b><span>Explore the menu <ArrowUpRight /></span></div><div className="menu-row"><span className="food-dot food-one" /><span><b>Seasonal menu</b><small>Scan. Explore. Order.</small></span><ArrowUpRight /></div><div className="menu-row"><span className="food-dot food-two" /><span><b>Smart assistance</b><small>Chatbot powered</small></span><ArrowUpRight /></div><div className="qr-mark" aria-label="Illustrative QR pattern"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div></div>
                <div className="project-visual-caption"><span>PROJECT 02</span><span>SMART DIGITAL CONCEPT</span></div>
              </div>
              <div className="project-info">
                <div className="project-overline"><span>02 / DIGITAL CANTEEN</span><span className="project-type">PROJECT CONCEPT</span></div>
                <h3>Smart Canteen<br />Management System</h3>
                <p>A smart canteen management concept exploring a simpler digital food-ordering experience.</p>
                <div className="project-highlights"><span>QR-based menu</span><span>Digital ordering concept</span><span>Dialogflow chatbot</span><span>Canteen management</span></div>
                <div className="project-stack"><strong>TECHNOLOGIES</strong><span>QR menu · Dialogflow · Web technologies</span></div>
                <div className="project-proof"><Lightbulb aria-hidden="true" /><span>Developed as a project concept for Smart India Hackathon preparation and internal participation.</span></div>
                <div className="project-actions"><Button asChild variant="outline" className="button-outline"><a href="mailto:bittukumar2162006@gmail.com?subject=Smart%20Canteen%20project%20details">Ask about the project <ArrowUpRight aria-hidden="true" /></a></Button></div>
              </div>
            </article>
          </div>
        </section>

        <section id="achievements" className="content-section achievements-section">
          <SectionHeading eyebrow="MILESTONES & MOMENTS" title="Achievements that define my journey" subtitle="Learning, leading, and showing up for the work beyond code." number="05" />
          <div className="achievement-grid">
            {achievements.map(({ number, title, subtitle, detail, icon: Icon }) => <article className="achievement-card reveal" key={number}><div className="achievement-top"><span>{number}</span><Icon aria-hidden="true" /></div><p className="achievement-subtitle">{subtitle}</p><h3>{title}</h3><p className="achievement-detail">{detail}</p><span className="achievement-line" /></article>)}
          </div>
        </section>

        <section id="certifications" className="content-section certifications-section">
          <SectionHeading eyebrow="ALWAYS IN PROGRESS" title="Certifications & learning" subtitle="Milestones from courses, training, and hands-on exploration." number="06" />
          <div className="certification-grid">
            {certifications.map(({ title, issuer, icon: Icon }) => <article className="certificate-card reveal" key={title}><div className="certificate-art"><span className="certificate-stamp"><Icon aria-hidden="true" /></span><span className="certificate-watermark">LEARNING / BK</span><span className="certificate-caption">CERTIFICATE</span></div><div className="certificate-copy"><span className="certificate-label">CERTIFICATE</span><h3>{title}</h3><p>{issuer}</p><span className="certificate-note">Certificate image not provided</span></div></article>)}
          </div>
        </section>

        <section id="beyond" className="content-section beyond-section">
          <div className="beyond-heading reveal"><div><p className="section-eyebrow"><span>07</span> PEOPLE & PERSPECTIVE</p><h2>Beyond<br /><span>technology.</span></h2></div><p className="beyond-intro">The best ideas grow when people bring different strengths to the table.</p></div>
          <div className="soft-skills reveal">{["Public speaking", "Event anchoring", "Team leadership", "Group discussion", "Presentation skills", "Communication", "Team collaboration", "Creative thinking", "Problem solving"].map((skill, index) => <span key={skill}><small>0{index + 1}</small>{skill}</span>)}</div>
          <blockquote className="belief-quote reveal"><span className="quote-mark">“</span><p>I believe a great developer is not only someone who writes good code, but also someone who communicates ideas, collaborates with people, and creates meaningful solutions.</p><cite>BITTU KUMAR <span>·</span> PERSONAL BELIEF</cite></blockquote>
        </section>

        <section id="interests" className="content-section interests-section">
          <SectionHeading eyebrow="OFF-SCREEN, STILL CURIOUS" title="Things I love beyond coding" subtitle="A few of the things that keep my imagination moving." number="08" />
          <div className="interest-grid">{interests.map(([name, Icon], index) => <div className="interest-item reveal" key={name}><span className="interest-number">{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /><span>{name}</span><ArrowUpRight className="interest-arrow" aria-hidden="true" /></div>)}</div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-heading reveal"><p className="section-eyebrow"><span>09</span> OPEN TO GOOD CONVERSATIONS</p><h2>Let’s build something<br /><span>amazing together.</span></h2><p>Have an interesting project, collaboration opportunity, or just want to connect? I’d love to hear from you.</p></div>
          <div className="contact-layout">
            <div className="contact-details reveal">
              <span className="contact-label">FIND ME HERE</span>
              <a className="contact-detail" href="mailto:bittukumar2162006@gmail.com"><Mail aria-hidden="true" /><span><small>EMAIL</small>bittukumar2162006@gmail.com</span><ArrowUpRight aria-hidden="true" /></a>
              <a className="contact-detail" href="https://www.linkedin.com/in/bittu-kumar-452549386" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /><span><small>LINKEDIN</small>linkedin.com/in/bittu-kumar-452549386</span><ArrowUpRight aria-hidden="true" /></a>
              <a className="contact-detail" href="https://github.com/Bittukumar9648" target="_blank" rel="noreferrer"><Github aria-hidden="true" /><span><small>GITHUB</small>github.com/Bittukumar9648</span><ArrowUpRight aria-hidden="true" /></a>
              <div className="contact-detail contact-location"><MapPin aria-hidden="true" /><span><small>BASED IN</small>Gorakhpur, Uttar Pradesh, India</span></div>
              <p className="instagram-note">Instagram profile link not provided.</p>
            </div>
            <form className="contact-form reveal" onSubmit={submitContact} noValidate>
              <label>Full name<input name="name" autoComplete="name" maxLength={100} placeholder="Your name" aria-invalid={Boolean(formErrors.name)} aria-describedby={formErrors.name ? "name-error" : undefined} />{formErrors.name && <small id="name-error" className="form-error">{formErrors.name}</small>}</label>
              <label>Email address<input name="email" type="email" autoComplete="email" maxLength={255} placeholder="you@example.com" aria-invalid={Boolean(formErrors.email)} aria-describedby={formErrors.email ? "email-error" : undefined} />{formErrors.email && <small id="email-error" className="form-error">{formErrors.email}</small>}</label>
              <label>Subject<input name="subject" maxLength={120} placeholder="What would you like to discuss?" aria-invalid={Boolean(formErrors.subject)} aria-describedby={formErrors.subject ? "subject-error" : undefined} />{formErrors.subject && <small id="subject-error" className="form-error">{formErrors.subject}</small>}</label>
              <label>Your message<textarea name="message" rows={4} maxLength={1500} placeholder="Tell me a little about it…" aria-invalid={Boolean(formErrors.message)} aria-describedby={formErrors.message ? "message-error" : undefined} />{formErrors.message && <small id="message-error" className="form-error">{formErrors.message}</small>}</label>
              <div className="form-submit-row"><Button type="submit" size="lg" className="button-primary">Prepare email <Send aria-hidden="true" /></Button><span>No message is sent automatically.</span></div>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand footer-brand" href="#home"><span className="brand-dot" />BITTU KUMAR</a><p className="footer-tagline">Turning ideas into intelligent digital experiences.</p><div className="footer-socials"><a href="https://github.com/Bittukumar9648" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a><a href="https://www.linkedin.com/in/bittu-kumar-452549386" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a><a href="mailto:bittukumar2162006@gmail.com" aria-label="Email"><Mail /></a></div><p className="footer-credit">Designed & developed with <Heart aria-label="love" /> by Bittu Kumar <span>© {new Date().getFullYear()}</span></p></footer>
      {showTop && <Button className="back-to-top" variant="outline" size="icon" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowDown aria-hidden="true" /></Button>}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle, number }: { eyebrow: string; title: string; subtitle: string; number: string }) {
  return <div className="section-heading reveal"><p className="section-eyebrow"><span>{number}</span> {eyebrow}</p><div className="section-heading-row"><h2>{title}</h2><p>{subtitle}</p></div><span className="heading-rule" /></div>;
}

function InfoCard({ number, title, text, icon }: { number: string; title: string; text: string; icon: React.ReactNode }) {
  return <article className="info-card reveal"><div className="info-card-top"><span>{number}</span>{icon}</div><h3>{title}</h3><p>{text}</p></article>;
}