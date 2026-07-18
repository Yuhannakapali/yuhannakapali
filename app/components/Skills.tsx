import { Reveal, Stagger, StaggerItem } from "./Reveal";

// Section in the Trailhead design language: no cards, no shadows, marigold
// category labels over clean typographic lists, with a quiet scroll-in.
const SKILL_GROUPS = [
  {
    name: "Backend",
    items: ["Node.js", "TypeScript", "REST APIs", "GraphQL", "PHP", "Go", "Python"],
  },
  {
    name: "Frontend",
    items: ["React", "Next.js", "Vue", "Nuxt", "Tailwind CSS"],
  },
  {
    name: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    name: "DevOps & Tools",
    items: ["AWS", "Docker", "Kubernetes", "Git", "CI/CD"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <h2 className="font-display text-[28px] font-semibold tracking-tight md:text-[32px]">
            What I work with
          </h2>
          <p className="mt-3 max-w-[40rem] text-[16px] leading-relaxed text-surface-muted">
            The tools I reach for across the stack, from services and data to the
            things people click.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <StaggerItem key={group.name}>
              <h3 className="text-[11px] uppercase tracking-[0.14em] text-marigold">
                {group.name}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[15px] text-surface-text">
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
