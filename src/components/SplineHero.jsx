import React from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Calendar,
    ChevronDown,
    MapPin,
} from "lucide-react";

import hookemLogo from "@/assets/hookem-logo.png";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/splite";

export function SplineHero({ site, scrollToId }) {
    return (
        <div className="relative min-h-[85vh] overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[85vh]">
                {/* Left content - Hero text and CTAs */}
                <div className="flex-1 px-6 md:px-12 lg:px-16 py-8 relative z-10 flex flex-col justify-center max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-5"
                    >
                        {/* Logo - static, no bounce */}
                        <img
                            src={hookemLogo}
                            alt="Hook 'Em Hacks Logo"
                            className="h-28 md:h-36 lg:h-44 w-auto select-none drop-shadow-[0_0_24px_hsl(var(--primary)/0.4)]"
                            draggable={false}
                        />

                        {/* Tagline */}
                        <h1 className="font-heading text-balance text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                            {site.tagline}
                        </h1>

                        {/* Subtitle */}
                        <p className="max-w-xl text-pretty text-base md:text-lg leading-relaxed text-muted-foreground">
                            {site.subtag}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
                            <Button
                                className="rounded-xl px-7 py-6 text-base"
                                onClick={() => scrollToId("register")}
                            >
                                I'm Interested
                                <ArrowRight className="ml-2 size-5" />
                            </Button>
                            <Button
                                variant="secondary"
                                className="rounded-lg px-6 py-6 text-base"
                                onClick={() => scrollToId("about")}
                            >
                                Learn more
                                <ChevronDown className="ml-2 size-5" />
                            </Button>
                        </div>

                        {/* Date/Location */}
                        <div className="flex flex-wrap gap-3 pt-2 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-1.5">
                                <Calendar className="size-4" /> {site.dateLine}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-1.5">
                                <MapPin className="size-4" /> {site.location}
                            </span>
                        </div>

                        {/* Social links - text only */}
                        <div className="flex flex-wrap items-center gap-4 pt-1">
                            {site.socials.map((s) => (
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
                    </motion.div>
                </div>

                {/* Right content - Spline 3D scene */}
                <div className="flex-[1.4] relative min-h-[400px] lg:min-h-0 lg:-mr-20">
                    <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="w-full h-full scale-110 lg:scale-125"
                    />
                </div>
            </div>
        </div>
    );
}
