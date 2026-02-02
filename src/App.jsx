import React from "react";
import {
  ArrowRight,
  ClipboardList,
  Download,
  Mail,
  MapPin,
  Megaphone,
} from "lucide-react";

import hookemLogo from "@/assets/hookem-logo.png";
import sponsorshipPdf from "@/assets/Sponsorship.pdf";
import lovableLogo from "@/assets/lovable-icon-bg-dark.png";
import featherlessLogo from "@/assets/featherless-color.png";
import bookpeopleLogo from "@/assets/BookPeople_Logo.png";
import auntieanneLogo from "@/assets/Auntie_Anne.png";
import vercelLogo from "@/assets/vercelLogo.png";
import tiffstreatsLogo from "@/assets/tiffs-treats.png";
import IBMLogo from "@/assets/IBMLogo.png";

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
    { name: "Instagram", href: "https://www.instagram.com/hookemhacks/" },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/hook-em-hacks/?viewAsMember=true",
    },
  ],
};

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const nav = [
    { id: "about", label: "About" },
    { id: "register", label: "Register" },
    { id: "faq", label: "FAQ" },
    { id: "sponsors", label: "Sponsors" },
  ];
  const sponsors = [
    {
      name: "Featherless AI",
      logo: featherlessLogo,
      description:
        "A high-performance inference platform that lets you run any open-source model via API with zero cold starts and no server management.",
    },
    {
      name: "Vercel",
      logo: vercelLogo,
      description:
        "The frontend cloud for developers, providing the speed and tools to deploy high-performance websites and incredible user experiences.",
    },
    {
      name: "Lovable",
      logo: lovableLogo,
      description:
        "An AI full-stack engineer that turns natural language into production-ready web apps, handling everything from UI design to backend logic.",
    },
    {
      name: "BookPeople",
      logo: bookpeopleLogo,
      description:
        "A legendary Austin landmark and Texas' largest independent bookstore, dedicated to community, conversation, and the joy of reading.",
    },
    {
      name: "Auntie Anne’s",
      logo: auntieanneLogo,
      description:
        "The gold standard of snack perfection, serving up hand-rolled soft pretzels that are always golden-brown and buttery-fresh.",
    },
    {
      name: "Tiff’s Treats",
      logo: tiffstreatsLogo,
      description:
        "The original warm-cookie delivery service, bringing fresh-from-the-oven treats and a little bit of magic right to your door.",
    },
    {
      name: "IBM",
      logo: IBMLogo,
      description:
        "A global technology leader providing innovative solutions in cloud computing, AI, and enterprise services to drive digital transformation.",
    },
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Subtle background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-60 left-1/2 h-[320px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <button
            onClick={() => scrollToId("top")}
            className="group inline-flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-secondary"
            aria-label="Go to top"
          >
            <img
              src={hookemLogo}
              alt="Hook 'Em Hacks logo"
              className="h-10 w-auto select-none drop-shadow-[0_0_10px_hsl(var(--primary)/0.35)]"
              draggable={false}
            />
            <div className="leading-tight">
              <div className="font-heading text-sm font-semibold tracking-tight">
                {SITE.name}
              </div>
              <div className="text-xs text-muted-foreground">
                UT Austin Hackathon
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="hidden rounded-lg md:inline-flex"
              onClick={() => scrollToId("register")}
            >
              I'm Interested
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              className="rounded-xl"
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
        <hr className="border-t border-border" />

        {/* About */}
        <section id="about" className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <SectionHeading
            icon={Megaphone}
            kicker="What this is"
            title="A UT Austin weekend of building, learning, and meeting incredible people"
            desc="Hack with friends (or find a team on-site), learn from mentors, and demo your project to judges — all in a supportive, beginner-friendly environment."
          />

          <FeaturesSectionWithHoverEffects email={SITE.email} />
        </section>

        {/* Register - Unified Registration Hub */}
        <section
          id="register"
          className="mx-auto max-w-5xl px-4 py-12 md:py-14"
        >
          <SectionHeading
            icon={ClipboardList}
            kicker="Get Involved"
            title="Join Hook 'Em Hacks 2026"
            desc="Whether you want to build, mentor, judge, or help run the event — we'd love to have you."
          />

          <RegistrationHub defaultRole="participant" />
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-5xl px-4 py-16">
          <SectionHeading
            kicker="FAQ"
            kickerStyle="text"
            align="left"
            compact
            title="Questions? We've got you"
          />

          <Card className="rounded-xl">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    Who can participate? Do I need experience?
                  </AccordionTrigger>
                  <AccordionContent>
                    Hook 'Em Hacks is open to students of all skill levels.
                    Beginners are welcome, and no prior hackathon experience is
                    required. We'll have workshops and mentors to help you get
                    started.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    What is the hackathon format?
                  </AccordionTrigger>
                  <AccordionContent>
                    Hook 'Em Hacks is a 24-hour, in-person hackathon on the UT
                    Austin campus. Teams build over the weekend and demo
                    projects in a science-fair-style expo.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    What can I build? Is there a theme?
                  </AccordionTrigger>
                  <AccordionContent>
                    There is no required theme. You're free to build anything —
                    web apps, mobile apps, AI projects, games, or experimental
                    ideas.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    How does judging work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Teams demo their projects live to judges in short, casual
                    conversations. Judges focus on creativity, execution,
                    impact, and clear explanations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    What do mentors and volunteers do?
                  </AccordionTrigger>
                  <AccordionContent>
                    Mentors help teams with technical questions, ideas, and
                    demos. Volunteers support check-in, workshops, logistics,
                    and overall event operations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">
                    How can companies sponsor or get involved?
                  </AccordionTrigger>
                  <AccordionContent>
                    Sponsors can support the event through funding, prizes,
                    workshops, or APIs. To get involved, email
                    hookemhacks@gmail.com.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Sponsors */}
        <section id="sponsors" className="mx-auto max-w-6xl px-4 py-12">
          <SectionHeading
            kicker="Sponsors"
            kickerStyle="text"
            align="left"
            compact
            title="Partner with UT Austin builders"
            desc="Sponsor to support student innovation, meet talent, run a workshop, or provide APIs and prizes."
          />
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3">
            {sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="relative flex flex-col items-center justify-center rounded-2xl border border-white bg-secondary/50 p-6 text-center transition hover:bg-secondary group"
              >
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="mb-4 h-16 w-auto object-contain"
                  draggable={false}
                />
                <div className="text-sm font-medium">{sponsor.name}</div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white opacity-0 transition-opacity group-hover:opacity-100 p-4 rounded-2xl text-sm">
                  {sponsor.description}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 mb-16 grid gap-6 lg:grid-cols-2">
            <Card className="rounded-xl">
              <CardContent className="space-y-5 p-6">
                <h3 className="font-heading text-lg font-semibold">
                  Why sponsor
                </h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
                  <li>
                    Recruiting: meet motivated engineers, designers, and product
                    thinkers
                  </li>
                  <li>Brand: showcase your tools to hundreds of builders</li>
                  <li>Impact: help fund a free, inclusive student event</li>
                </ul>
                <div className="border-t border-border pt-5">
                  <div className="font-medium">Sponsor packet</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Download our sponsor packet to learn about sponsorship
                    levels, benefits, and audience statistics.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={sponsorshipPdf}
                      download="Sponsorship.pdf"
                      className="inline-flex"
                    >
                      <Button variant="secondary" className="rounded-lg">
                        Download PDF
                        <Download className="ml-2 size-4" />
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => scrollToId("register")}
                    >
                      Get in touch
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl">
              <CardContent className="space-y-5 p-6">
                <h3 className="font-heading text-lg font-semibold">
                  Sponsor contact
                </h3>
                <p className="text-sm text-muted-foreground">
                  Email us at{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-foreground hover:underline"
                  >
                    {SITE.email}
                  </a>{" "}
                  with your name, company, and what kind of partnership you're
                  interested in.
                </p>
                <div className="border-t border-border pt-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium">
                        Workshop sponsor
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Lead a hands-on session and provide APIs/credits.
                      </p>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Prize sponsor</div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Fund a category and help judge the winners.
                      </p>
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
                <div className="mt-4 flex items-center gap-4">
                  {SITE.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                      aria-label={s.name}
                    >
                      {s.name}
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
                    <Mail className="size-4" />{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="hover:text-foreground hover:underline"
                    >
                      {SITE.email}
                    </a>
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
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
