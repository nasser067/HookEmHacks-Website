import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  icon: Icon,
  kicker,
  title,
  desc,
  align = "center",
  kickerStyle = "badge",
  compact = false,
}) {
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "mx-auto mb-10 max-w-3xl",
        isLeft ? "text-left" : "text-center"
      )}
    >
      {kicker &&
        (kickerStyle === "badge" ? (
          <Badge
            variant="secondary"
            className="mb-3 gap-2 border-border bg-secondary text-secondary-foreground"
          >
            {Icon && <Icon className="size-4" />}
            <span className="font-medium">{kicker}</span>
          </Badge>
        ) : (
          <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {kicker}
          </span>
        ))}
      <h2
        className={cn(
          "font-heading text-balance font-semibold tracking-tight",
          compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
        )}
      >
        {title}
      </h2>
      {desc && (
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {desc}
        </p>
      )}
    </div>
  );
}
