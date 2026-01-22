import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  ChevronDown,
  ClipboardList,
  Download,
  HelpCircle,
  Mail,
  MapPin,
  Megaphone,
} from "lucide-react";

import hookemLogo from "@/assets/hookem-logo.png";
import sponsorshipPdf from "@/assets/Sponsorship.pdf";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

// Custom components
import { SectionHeading } from "@/components/SectionHeading";
import { RegistrationHub } from "@/components/RegistrationHub";
import { MobileNav } from "@/components/MobileNav";
import { SplineHero } from "@/components/SplineHero";

const SITE = {
  name: "Hook 'Em Hacks",
  tagline: "We're out exploring the Forty Acres — see you April 18–19, 2026!",
  subtag:
    "Follow our socials for updates and tell us what you're interested in for the next UT Austin hackathon.",
  dateLine: "April 18–19, 2026 • UT Austin Campus",
  email: "hookemhacks@gmail.com",
  location: "The University of Texas at Austin",
  socials: [
    { name: "Instagram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Twitter/X", href: "#" },
    { name: "TikTok", href: "#" },
  ],
};

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
      className="grid size-10 place-items-center rounded-full border border-border bg-secondary text-sm font-semibold"
    >
      {label}
    </span>
  );
}

export default function App() {
  const nav = [
    { id: "about", label: "About" },
    { id: "register", label: "Register" },
    { id: "faq", label: "FAQ" },
    { id: "sponsors", label: "Sponsors" },
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => scrollToId("top")}
            className="group inline-flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-secondary"
            aria-label="Go to top"
          >
            <img
              src={hookemLogo}
              alt="Hook 'Em Hacks logo"
              className="h-10 w-auto select-none drop-shadow-[0_0_10px_hsl(var(--primary)/0.35)]"
              draggable={false}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">{SITE.name}</div>
              <div className="text-xs text-muted-foreground">UT Austin Hackathon</div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="hidden rounded-2xl md:inline-flex"
              onClick={() => scrollToId("register")}
            >
              I'm Interested
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              className="rounded-2xl"
              onClick={() => scrollToId("sponsors")}
            >
              Sponsor Us
            </Button>
            <MobileNav items={nav} onNavigate={scrollToId} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="relative">
        <section className="relative">
          <SplineHero site={SITE} scrollToId={scrollToId} />
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
        <section id="about" className="mx-auto max-w-7xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={Megaphone}
            kicker="What this is"
            title="A UT Austin weekend of building, learning, and meeting incredible people"
            desc="Hack with friends (or find a team on-site), learn from mentors, and demo your project to judges — all in a supportive, beginner-friendly environment."
          />

          <FeaturesSectionWithHoverEffects email={SITE.email} />
        </section>

        {/* Register - Unified Registration Hub */}
        <section id="register" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={ClipboardList}
            kicker="Get Involved"
            title="Join Hook 'Em Hacks 2026"
            desc="Whether you want to build, mentor, judge, or help run the event — we'd love to have you."
          />

          <RegistrationHub defaultRole="participant" />
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-14 md:py-18">
          <SectionHeading
            icon={HelpCircle}
            kicker="FAQ"
            title="Questions? We've got you"
          />

          <Card className="rounded-3xl">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Who can participate? Do I need experience?
                  </AccordionTrigger>
                  <AccordionContent>
                    Hook 'Em Hacks is open to students of all skill levels. Beginners are welcome, and no prior
                    hackathon experience is required. We'll have workshops and mentors to help you get started.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    What is the hackathon format?
                  </AccordionTrigger>
                  <AccordionContent>
                    Hook 'Em Hacks is a 24-hour, in-person hackathon on the UT Austin campus. Teams build over the
                    weekend and demo projects in a science-fair-style expo.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    What can I build? Is there a theme?
                  </AccordionTrigger>
                  <AccordionContent>
                    There is no required theme. You're free to build anything — web apps, mobile apps, AI projects,
                    games, or experimental ideas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    How does judging work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Teams demo their projects live to judges in short, casual conversations. Judges focus on
                    creativity, execution, impact, and clear explanations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    What do mentors and volunteers do?
                  </AccordionTrigger>
                  <AccordionContent>
                    Mentors help teams with technical questions, ideas, and demos. Volunteers support check-in,
                    workshops, logistics, and overall event operations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">
                    How can companies sponsor or get involved?
                  </AccordionTrigger>
                  <AccordionContent>
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

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-3xl">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-lg font-semibold">Why sponsor</h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                  <li>Recruiting: meet motivated engineers, designers, and product thinkers</li>
                  <li>Brand: showcase your tools to hundreds of builders</li>
                  <li>Impact: help fund a free, inclusive student event</li>
                </ul>
                <div className="rounded-2xl border bg-secondary/50 p-4">
                  <div className="font-medium">Sponsor packet</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Download our sponsor packet to learn about sponsorship levels, benefits, and audience statistics.
                  </div>
                  <a
                    href={sponsorshipPdf}
                    download="Sponsorship.pdf"
                    className="inline-flex"
                  >
                    <Button
                      variant="secondary"
                      className="mt-4 rounded-2xl"
                    >
                      Download PDF
                      <Download className="ml-2 size-4" />
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="mt-4 ml-2 rounded-2xl"
                    onClick={() => scrollToId("register")}
                  >
                    Get in touch
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl">
              <CardContent className="space-y-4 p-6">
                <h3 className="text-lg font-semibold">Sponsor contact</h3>
                <div className="rounded-2xl border bg-secondary/50 p-4 text-sm text-muted-foreground">
                  Email us at <span className="text-foreground">{SITE.email}</span> with your name,
                  company, and what kind of partnership you're interested in.
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-secondary/50 p-4">
                    <div className="text-sm font-medium">Workshop sponsor</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Lead a hands-on session and provide APIs/credits.
                    </div>
                  </div>
                  <div className="rounded-2xl border bg-secondary/50 p-4">
                    <div className="text-sm font-medium">Prize sponsor</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Fund a category and help judge the winners.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-background/50">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-lg font-semibold">{SITE.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">
                  UT Austin collegiate hackathon • April 18–19, 2026
                </div>
                <div className="mt-4 flex items-center gap-3">
                  {SITE.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="rounded-2xl p-1 transition hover:bg-secondary"
                      aria-label={s.name}
                    >
                      <SocialIcon name={s.name} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <div className="font-medium">Quick links</div>
                <div className="mt-3 grid gap-2 text-muted-foreground">
                  {nav.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => scrollToId(n.id)}
                      className="text-left hover:text-foreground"
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <div className="font-medium">Contact</div>
                <div className="mt-3 space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" /> <span>{SITE.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4" /> <span>{SITE.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
              <div>
                © {new Date().getFullYear()} {SITE.name}. Hook 'em.
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1">
                  <BadgeCheck className="size-3.5" /> Code of Conduct (add link later)
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1">
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
