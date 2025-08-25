import type { PropsWithChildren } from "react";
import { ShineBorder } from "./ui/ShineBorder";
import { TiltCard } from "./ui/TiltCard";

type Project = {
  title: string;
  description: string;
  href?: string;
  tags?: string[];
  image?: string;
};

export function ProjectCard({
  project,
}: PropsWithChildren<{ project: Project }>) {
  return (
    <TiltCard className="group glow-card bg-card relative z-0 overflow-hidden rounded-lg">
      <ShineBorder
        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        duration={12}
        borderWidth={1}
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_30%,oklch(0.9_0.1_300/.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {project.image ? (
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg">
          <img
            src={project.image}
            alt={project.title}
            className="max-h-80 w-auto object-contain"
          />
        </div>
      ) : (
        <div className="bg-muted aspect-video w-full" />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold tracking-tight">
          <span className="relative inline-flex items-center gap-2">
            {project.title}
            <span className="text-muted-foreground inline-flex translate-y-0.5 scale-75 rounded-full border px-1.5 py-0.5 text-[10px] font-medium opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              {project.tags?.[0] ?? "App"}
            </span>
          </span>
        </h3>
        <p className="text-muted-foreground mt-1 text-sm">
          {project.description}
        </p>
        {project.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-muted-foreground/80 hover:text-foreground/95 hover:bg-background/50 rounded-full border px-2 py-0.5 text-xs transition-all duration-300 hover:scale-105"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {project.href && (
          <a
            href={project.href}
            className="text-foreground/80 mt-4 inline-flex items-center gap-1 text-xs font-medium hover:underline"
          >
            Explore <span aria-hidden>→</span>
          </a>
        )}
      </div>
    </TiltCard>
  );
}
