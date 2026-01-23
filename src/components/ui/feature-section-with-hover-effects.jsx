import { cn } from "@/lib/utils";
import {
    IconUsers,
    IconHeartHandshake,
    IconTrophy,
    IconCalendar,
    IconMapPin,
    IconMail,
    IconCode,
    IconBulb,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects({ email = "hookemhacks@gmail.com" }) {
    const features = [
        {
            title: "For all skill levels",
            description:
                "First hackathon? You'll have workshops, mentors, and plenty of starter ideas. Experienced? Build something bold.",
            icon: <IconUsers />,
        },
        {
            title: "Mentorship & community",
            description:
                "Industry + student mentors help you unblock, brainstorm, and polish your demo.",
            icon: <IconHeartHandshake />,
        },
        {
            title: "Judging & prizes",
            description:
                "Showcase your work, tell a great story, and compete for prizes across fun categories.",
            icon: <IconTrophy />,
        },
        {
            title: "Build anything",
            description:
                "No required theme — build web apps, mobile apps, AI projects, games, or experimental ideas.",
            icon: <IconCode />,
        },
        {
            title: "April 18–19, 2026",
            description:
                "Save the date! Applications and the full schedule will be posted as we get closer.",
            icon: <IconCalendar />,
        },
        {
            title: "UT Austin campus",
            description:
                "Join us on the Forty Acres for a weekend of building, learning, and meeting incredible people.",
            icon: <IconMapPin />,
        },
        {
            title: "Workshops & resources",
            description:
                "Learn web dev, AI, design, and pitching — curated sessions for UT students and beyond.",
            icon: <IconBulb />,
        },
        {
            title: "Get in touch",
            description: (
                <>
                    For partnerships, mentors, and questions:{" "}
                    <a href={`mailto:${email}`} className="font-medium text-foreground hover:underline">{email}</a>
                </>
            ),
            icon: <IconMail />,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
}

function Feature({ title, description, icon, index }) {
    const isFirstCol = index === 0 || index === 4;
    return (
        <div
            className={cn(
                "flex flex-col py-10 px-10 relative group/feature transition-colors duration-200 lg:border-r border-border",
                (index === 0 || index === 4) && "lg:border-l",
                index < 4 && "lg:border-b",
                isFirstCol && "border-l-2 border-border hover:border-primary",
                !isFirstCol && "hover:bg-secondary/10"
            )}
        >
            <div className="mb-4 text-muted-foreground">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 font-heading text-foreground">
                {title}
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
                {description}
            </p>
        </div>
    );
}

export default FeaturesSectionWithHoverEffects;
