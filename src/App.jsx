import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  ChevronDown,
  ClipboardList,
  HeartHandshake,
  HelpCircle,
  Gavel as Judge, // lucide-react doesn't export "Judge"
  Mail,
  MapPin,
  Megaphone,
  Sparkles,
  Users,
} from "lucide-react";

// ✅ NEW LOGO (put the file at: src/assets/hookem-logo.png)
// If your filename is different, update it here.
import hookemLogo from "@/assets/hookem-logo.png";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const SITE = {
  name: "Hook 'Em Hacks",
  tagline: "We’re out exploring the Forty Acres — see you April 18–19, 2026!",
  subtag:
    "Follow our socials for updates and tell us what you’re interested in for the next UT Austin hackathon.",
  dateLine: "April 18–19, 2026 • UT Austin Campus",
  email: "team@hookemhacks.com",
  location: "The University of Texas at Austin",
  socials: [
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Twitter/X", href: "#" },
    { name: "TikTok", href: "#" },
  ],
};

const orange = "#BF5700"; // UT Burnt Orange

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SocialIcon({ name }) {
  const label = useMemo(() => {
    const map = {
      Instagram: "IG",
      Facebook: "f",
      "Twitter/X": "X",
      TikTok: "t",
    };
    return map[name] ?? "@";
  }, [name]);

  return (
    <span
      aria-hidden
      className="grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white/90 backdrop-blur"
    >
      {label}
    </span>
  );
}

function MlhBadge() {
  return (
    <div className="w-[120px] rounded-2xl border border-white/10 bg-white/10 p-3 text-center backdrop-blur">
      <div className="text-xs font-semibold tracking-wide text-white/80">MLH</div>
      <div className="mt-1 text-[11px] text-white/70">OFFICIAL</div>
      <div className="mt-2 rounded-xl bg-white/10 px-2 py-2 text-xs font-semibold text-white">
        2026
        <div className="text-[10px] font-medium text-white/70">SEASON</div>
      </div>
    </div>
  );
}

function SectionHeading({ icon: Icon, kicker, title, desc }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
        {Icon ? <Icon className="size-4" /> : null}
        <span className="font-medium">{kicker}</span>
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-pretty text-base leading-relaxed text-white/70 md:text-lg">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function InterestForm({ defaultRole = "participant" }) {
  // ✅ 1) Put your Formspree endpoint here
  // Example: "https://formspree.io/f/abcdwxyz"
  const FORMSPREE_URL = "https://formspree.io/f/mykgwbzy";

  const [role, setRole] = useState(defaultRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | saved | error

  async function save(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          role,
          message: message.trim(),
          source: "Hook 'Em Hacks website",
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("saved");
      setName("");
      setEmail("");
      setMessage("");
      setRole(defaultRole);

      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-white/80">Name (optional)</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Longhorn Legend"
            className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white/80">Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@utexas.edu"
            type="email"
            required
            className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white/80">I’m interested as</Label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {[
            { id: "participant", label: "Participant" },
            { id: "mentor", label: "Mentor" },
            { id: "judge", label: "Judge" },
            { id: "volunteer", label: "Volunteer" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setRole(opt.id)}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-medium transition",
                role === opt.id
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white/80">Message (optional)</Label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you’re excited about (AI, fintech, healthcare, climate, etc.)"
          className="min-h-24 resize-none border-white/10 bg-white/5 text-white placeholder:text-white/40"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={status === "sending"}
          className="rounded-2xl px-6"
          style={{ backgroundColor: orange }}
        >
          {status === "sending"
            ? "Sending..."
            : status === "saved"
            ? "Sent!"
            : status === "error"
            ? "Failed — try again"
            : "Submit interest"}
        </Button>

        <div className="text-sm text-white/60">
          Prefer email? <span className="text-white/80">hookemhacks@gmail.com</span>
        </div>
      </div>

      <p className="text-xs leading-relaxed text-white/45">
        Submissions are emailed to hookemhacks@gmail.com.
      </p>
    </form>
  );
}

export default function App() {
  const nav = [
    { id: "about", label: "About" },
    { id: "participants", label: "Participants" },
    { id: "mentors", label: "Mentors" },
    { id: "judges", label: "Judges" },
    { id: "volunteers", label: "Volunteers" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <div className="min-h-screen bg-[#070A17] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle at center, ${orange}33, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,10,23,0.2),rgba(7,10,23,1))]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070A17]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo replaces UT box + clickable scroll to top */}
          <button
            onClick={() => scrollToId("top")}
            className="group inline-flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-white/5"
            aria-label="Go to top"
          >
            <img
              src={hookemLogo}
              alt="Hook 'Em Hacks logo"
              className="h-10 w-auto select-none"
              style={{
                filter:
                  "drop-shadow(0 0 10px rgba(191,87,0,0.35)) drop-shadow(0 0 28px rgba(191,87,0,0.18))",
              }}
              draggable={false}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{SITE.name}</div>
              <div className="text-xs text-white/60">UT Austin Hackathon</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="rounded-xl px-3 py-2 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="hidden rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 md:inline-flex"
              onClick={() => scrollToId("interest")}
            >
              I’m Interested
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              className="rounded-2xl"
              style={{ backgroundColor: orange }}
              onClick={() => scrollToId("sponsors")}
            >
              Sponsor Us
            </Button>
          </div>
        </div>
      </header>

{/* Hero */}
<main id="top" className="relative min-h-screen">
  <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col justify-start px-4 pt-0 pb-6 md:pt-1 md:pb-8">
    {/* MLH badge - top right, no overlap */}
    <div className="mb-2 flex justify-center md:justify-end">
      <MlhBadge />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mt-0 space-y-3 text-center"
    >
      {/* BIG logo, pulled UP more */}
      <motion.img
        src={hookemLogo}
        alt="Hook 'Em Hacks Logo"
        className="mx-auto -mt-12 h-36 w-auto md:-mt-14 md:h-44 lg:h-52 select-none"
        style={{
          filter:
            "drop-shadow(0 0 18px rgba(191,87,0,0.55)) drop-shadow(0 0 52px rgba(191,87,0,0.28))",
        }}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.55 },
          y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.55 },
        }}
        onClick={() => scrollToId("top")}
        role="button"
        tabIndex={0}
        draggable={false}
      />




      {/* BIG centered headline, tighter line height */}
      <h1 className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
        {SITE.tagline}
      </h1>

      {/* Slightly smaller subtext so it fits without scroll */}
      <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
        {SITE.subtag}
      </p>

      {/* Centered buttons */}
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button
          className="rounded-2xl px-7"
          style={{ backgroundColor: orange }}
          onClick={() => scrollToId("interest")}
        >
          I’m Interested
          <ArrowRight className="ml-2 size-4" />
        </Button>
        <Button
          variant="secondary"
          className="rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
          onClick={() => scrollToId("about")}
        >
          Learn more
          <ChevronDown className="ml-2 size-4" />
        </Button>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap justify-center gap-3 pt-1 text-sm text-white/70">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <Calendar className="size-4" /> {SITE.dateLine}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
          <MapPin className="size-4" /> {SITE.location}
        </span>
      </div>

      {/* Socials */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        {SITE.socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            className="group inline-flex items-center gap-2 rounded-2xl px-2 py-2 text-white/80 transition hover:bg-white/5 hover:text-white"
            aria-label={s.name}
          >
            <SocialIcon name={s.name} />
            <span className="hidden text-sm md:inline">{s.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
  </section>

        {/* Divider */}
        <div className="relative">
          <svg
            viewBox="0 0 1440 120"
            className="block w-full"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M0,96L120,80C240,64,480,32,720,42.7C960,53,1200,107,1320,133.3L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
              fill="rgba(255,255,255,0.04)"
            />
          </svg>
        </div>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={Megaphone}
            kicker="What this is"
            title="A UT Austin weekend of building, learning, and meeting incredible people"
            desc="Hack with friends (or find a team on-site), learn from mentors, and demo your project to judges — all in a supportive, beginner-friendly environment."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "For all skill levels",
                desc: "First hackathon? You’ll have workshops, mentors, and plenty of starter ideas. Experienced? Build something bold.",
              },
              {
                icon: HeartHandshake,
                title: "Mentorship & community",
                desc: "Industry + student mentors help you unblock, brainstorm, and polish your demo.",
              },
              {
                icon: Judge,
                title: "Judging & prizes",
                desc: "Showcase your work, tell a great story, and compete for prizes across fun categories.",
              },
            ].map((c) => (
              <Card key={c.title} className="rounded-3xl border-white/10 bg-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div
                      className="grid size-10 place-items-center rounded-2xl"
                      style={{ backgroundColor: `${orange}22`, border: `1px solid ${orange}44` }}
                    >
                      <c.icon className="size-5" style={{ color: orange }} />
                    </div>
                    {c.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-white/70">{c.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="size-4" /> Dates
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                April 18–19, 2026. Applications and the full schedule will be posted as we get closer.
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="size-4" /> Location
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                Hosted on the UT Austin campus.
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="size-4" /> Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white/70">
                For partnerships, mentors, and questions:{" "}
                <span className="text-white/90">{SITE.email}</span>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Participants */}
        <section id="participants" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={Users}
            kicker="Participants"
            title="Build something you’re proud to demo"
            desc="Join as a hacker/participant to learn, ship, and present. We’ll have beginner workshops, tracks, and a friendly team-matching vibe."
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">What you’ll get</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/70">
                <ul className="list-inside list-disc space-y-2">
                  <li>Workshops (web dev, AI, design, pitching) — curated for UT students and beyond</li>
                  <li>Mentor office hours to debug and brainstorm</li>
                  <li>Food, swag, and late-night energy (final details TBD)</li>
                  <li>Project expo + judging + prizes</li>
                </ul>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-white/90">
                    <HelpCircle className="size-4" /> Beginner-friendly
                  </div>
                  <p className="mt-2 text-white/70">
                    You don’t need prior hackathon experience. Bring curiosity — we’ll help with the rest.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Register your interest</CardTitle>
              </CardHeader>
              <CardContent>
                <InterestForm defaultRole="participant" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mentors */}
        <section id="mentors" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={HeartHandshake}
            kicker="Mentorship"
            title="Help teams unblock, learn faster, and ship"
            desc="Mentors support participants with technical guidance, product thinking, and demo storytelling. You can mentor for an hour or for the full event."
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Mentor expectations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/70">
                <ul className="list-inside list-disc space-y-2">
                  <li>Be friendly, encouraging, and inclusive</li>
                  <li>Guide teams with questions and suggestions (not doing the work for them)</li>
                  <li>Support basics: debugging, APIs, pitching, design, and project scoping</li>
                  <li>Optional: lead a short workshop</li>
                </ul>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium text-white/90">Skills we love</div>
                    <div className="mt-2 text-white/70">
                      Frontend, backend, ML/AI, mobile, security, product, UX
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium text-white/90">Time commitment</div>
                    <div className="mt-2 text-white/70">Flexible — 1–2 hours or a full day</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Mentor interest</CardTitle>
              </CardHeader>
              <CardContent>
                <InterestForm defaultRole="mentor" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Judges */}
        <section id="judges" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={Judge}
            kicker="Judging"
            title="Celebrate strong ideas and great demos"
            desc="Judges watch demos, ask questions, and recognize projects that shine in creativity, execution, impact, and storytelling."
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Judging flow (placeholder)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/70">
                <ul className="list-inside list-disc space-y-2">
                  <li>Project expo style demos (teams present at their tables)</li>
                  <li>Short Q&A focused on problem, approach, and impact</li>
                  <li>Rubric-based scoring (we’ll publish categories later)</li>
                  <li>Final deliberation + awards</li>
                </ul>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium text-white/90">We value</div>
                  <div className="mt-2 text-white/70">
                    Clarity, empathy, technical ambition, thoughtful tradeoffs, and a compelling demo.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Judge interest</CardTitle>
              </CardHeader>
              <CardContent>
                <InterestForm defaultRole="judge" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Volunteers */}
        <section id="volunteers" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={Users}
            kicker="Volunteers"
            title="Make the weekend run smoothly"
            desc="Volunteers keep things moving — check-in, directing teams, food runs, workshop support, and general good vibes."
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Volunteer roles (placeholder)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/70">
                <ul className="list-inside list-disc space-y-2">
                  <li>Registration & check-in</li>
                  <li>Room monitors & wayfinding</li>
                  <li>Workshop AV + logistics</li>
                  <li>Food + supply coordination</li>
                  <li>Hacker support desk</li>
                </ul>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium text-white/90">Perks</div>
                  <div className="mt-2 text-white/70">
                    Swag + food (TBD), and a front-row seat to the projects.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Volunteer interest</CardTitle>
              </CardHeader>
              <CardContent>
                <InterestForm defaultRole="volunteer" />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={HelpCircle}
            kicker="FAQ"
            title="Questions? We’ve got you"
            
          />

          <Card className="rounded-3xl border-white/10 bg-white/5">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1" className="border-white/10">
    <AccordionTrigger className="text-left text-white/90">
      Who can participate? Do I need experience?
    </AccordionTrigger>
    <AccordionContent className="text-white/70">
      Hook ’Em Hacks is open to students of all skill levels. Beginners are welcome, and no prior
      hackathon experience is required. We’ll have workshops and mentors to help you get started.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2" className="border-white/10">
    <AccordionTrigger className="text-left text-white/90">
      What is the hackathon format?
    </AccordionTrigger>
    <AccordionContent className="text-white/70">
      Hook ’Em Hacks is a 24-hour, in-person hackathon on the UT Austin campus. Teams build over the
      weekend and demo projects in a science-fair-style expo.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3" className="border-white/10">
    <AccordionTrigger className="text-left text-white/90">
      What can I build? Is there a theme?
    </AccordionTrigger>
    <AccordionContent className="text-white/70">
      There is no required theme. You’re free to build anything — web apps, mobile apps, AI projects,
      games, or experimental ideas.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4" className="border-white/10">
    <AccordionTrigger className="text-left text-white/90">
      How does judging work?
    </AccordionTrigger>
    <AccordionContent className="text-white/70">
      Teams demo their projects live to judges in short, casual conversations. Judges focus on
      creativity, execution, impact, and clear explanations.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-5" className="border-white/10">
    <AccordionTrigger className="text-left text-white/90">
      What do mentors and volunteers do?
    </AccordionTrigger>
    <AccordionContent className="text-white/70">
      Mentors help teams with technical questions, ideas, and demos. Volunteers support check-in,
      workshops, logistics, and overall event operations.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-6" className="border-white/10">
    <AccordionTrigger className="text-left text-white/90">
      How can companies sponsor or get involved?
    </AccordionTrigger>
    <AccordionContent className="text-white/70">
      Sponsors can support the event through funding, prizes, workshops, or APIs. To get involved,
      email hookemhacks@gmail.com.
    </AccordionContent>
  </AccordionItem>
</Accordion>

            </CardContent>
          </Card>
        </section>

        {/* Sponsors */}
        <section id="sponsors" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={BadgeCheck}
            kicker="Sponsors"
            title="Partner with UT Austin builders"
            desc="Sponsor to support student innovation, meet talent, run a workshop, or provide APIs and prizes."
          />

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Why sponsor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/70">
                <ul className="list-inside list-disc space-y-2">
                  <li>Recruiting: meet motivated engineers, designers, and product thinkers</li>
                  <li>Brand: showcase your tools to hundreds of builders</li>
                  <li>Impact: help fund a free, inclusive student event</li>
                </ul>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium text-white/90">Sponsor packet</div>
                  <div className="mt-2 text-white/70">
                    Add a PDF link later (levels, benefits, audience stats). This card can become your download CTA.
                  </div>
                  <Button
                    variant="secondary"
                    className="mt-4 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                    onClick={() => scrollToId("interest")}
                  >
                    Get in touch
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white">Sponsor contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  Email us at <span className="text-white/90">{SITE.email}</span> with your name,
                  company, and what kind of partnership you’re interested in.
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-medium text-white/90">Workshop sponsor</div>
                    <div className="mt-2 text-sm text-white/70">
                      Lead a hands-on session and provide APIs/credits.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-medium text-white/90">Prize sponsor</div>
                    <div className="mt-2 text-sm text-white/70">
                      Fund a category and help judge the winners.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Interest anchor */}
        <section id="interest" className="mx-auto max-w-6xl px-4 pb-20 pt-4">
          <Card className="rounded-3xl border-white/10 bg-white/5">
            <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_0.9fr] md:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  <ClipboardList className="size-4" />
                  All roles welcome
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  Tell us what you want to do
                </h3>
                <p className="mt-2 text-white/70">
                  Participant, mentor, judge, or volunteer — we’ll reach out when signups open.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Participants", d: "Hack, learn, and demo." },
                    { t: "Mentors", d: "Guide and unblock." },
                    { t: "Judges", d: "Score and celebrate." },
                    { t: "Volunteers", d: "Run the show." },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm font-medium text-white/90">{x.t}</div>
                      <div className="mt-1 text-sm text-white/70">{x.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <InterestForm defaultRole="participant" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/30">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-lg font-semibold">{SITE.name}</div>
                <div className="mt-1 text-sm text-white/60">
                  UT Austin collegiate hackathon • April 18–19, 2026
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {SITE.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="rounded-2xl p-1 transition hover:bg-white/5"
                      aria-label={s.name}
                    >
                      <SocialIcon name={s.name} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-sm text-white/70">
                <div className="font-medium text-white/90">Quick links</div>
                <div className="mt-3 grid gap-2">
                  {nav.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => scrollToId(n.id)}
                      className="text-left text-white/70 hover:text-white"
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-sm text-white/70">
                <div className="font-medium text-white/90">Contact</div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" /> <span>{SITE.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" /> <span>{SITE.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center">
              <div>
                © {new Date().getFullYear()} {SITE.name}. Hook ’em.
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <BadgeCheck className="size-3.5" /> Code of Conduct (add link later)
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  <BadgeCheck className="size-3.5" /> Privacy (add link later)
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
