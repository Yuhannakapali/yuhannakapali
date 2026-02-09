"use client";
import { Github, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/app/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
};

interface SocialLinksProps {
  direction?: "row" | "column";
  size?: number;
  className?: string;
}

export function SocialLinks({
  direction = "row",
  size = 20,
  className = "",
}: SocialLinksProps) {
  return (
    <div
      className={`flex items-center gap-6 ${direction === "column" ? "flex-col" : "flex-row"} ${className}`}
    >
      {SOCIAL_LINKS.map((link) => {
        const Icon = iconMap[link.name];
        if (!Icon) return null;
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300"
            aria-label={link.name}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
