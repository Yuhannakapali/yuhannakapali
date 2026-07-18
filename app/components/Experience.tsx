import { Reveal } from "./Reveal";

// Timeline in the Trailhead design language: a thin vertical rule with marigold
// nodes, Fraunces roles, quiet Inter details. Entries reveal on scroll.
const EXPERIENCES = [
  {
    company: "GoGroup",
    role: "Senior Software Engineer",
    period: "Jan 2024 - Present",
    description: [
      "Backend development using Node.js and TypeScript, designing and implementing robust REST APIs and service components to support core operational workflows.",
      "Architect, deploy, and maintain services in AWS, ensuring scalable, resilient environments for production-grade railway operations.",
      "Collaborate with cross-functional teams to optimize performance, improve data flow reliability, and support continuous delivery in a monolithic application handling complex domain logic.",
      "Improve system observability and operational efficiency through feature enhancements, bug fixes, and performance tuning based on real usage patterns and internal metrics.",
    ],
  },
  {
    company: "Moichor",
    role: "Software Engineer",
    period: "Jul 2022 - Aug 2023",
    description: [
      "Built and deployed a full-stack web application using Node.js (backend) and React (frontend) to support key features of Moichor's diagnostic platform.",
      "Leveraged Webpack and Babel to optimize bundling and ensure efficient, performant client-side execution.",
      "Designed and implemented RESTful APIs using Node.js and Express, enabling reliable data access and integration with diagnostic services and platform workflows.",
      "Developed serverless functions on Lambda, enhancing scalability and reducing operational overhead for event-driven processes.",
    ],
  },
  {
    company: "Kotuko",
    role: "Software Engineer",
    period: "Apr 2021 - Jun 2022",
    description: [
      "Worked within a cross-functional Agile team, contributing to the design, development, and delivery of scalable web applications using TypeScript, GraphQL, React, Next.js, PostgreSQL, and NoSQL technologies.",
      "Applied functional programming principles to enhance code readability, modularity, and maintainability across the backend and frontend codebase.",
      "Implemented real-time features using WebSockets, enabling live updates and interactive experiences for end users.",
      "Structured data access with clean, maintainable patterns that improved development velocity and reduced technical debt.",
    ],
  },
  {
    company: "Kodiary",
    role: "Software Engineer",
    period: "Jul 2020 - Mar 2021",
    description: [
      "Worked with agile methodology using technologies: JavaScript, TypeScript, REST, MySQL, Vue, Nuxt, PHP, SOAP.",
      "Applied functional programming principles to improve code clarity, predictability, and long-term maintainability across the application.",
      "Implemented widget-driven development to ensure optimized data flow.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <h2 className="font-display text-[28px] font-semibold tracking-tight md:text-[32px]">
          Where I have worked
        </h2>

        <div className="relative mt-12 ml-2 space-y-12 border-l border-line">
          {EXPERIENCES.map((exp, idx) => (
            <Reveal key={exp.company} className="relative pl-8" delay={idx * 80}>
              {/* Marigold timeline node */}
              <span
                aria-hidden="true"
                className="absolute -left-[6.5px] top-[6px] h-3 w-3 rounded-full bg-marigold ring-4 ring-surface"
              />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-[19px] font-semibold tracking-tight text-surface-text">
                  {exp.role}
                  <span className="text-marigold"> · {exp.company}</span>
                </h3>
                <span className="text-[13px] text-surface-faint">{exp.period}</span>
              </div>

              <ul className="mt-4 space-y-2">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-[15px] leading-relaxed text-surface-muted"
                  >
                    <span aria-hidden="true" className="mt-[3px] text-marigold">
                      &#8250;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
