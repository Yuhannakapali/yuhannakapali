import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { SocialLinks } from "./components/SocialLinks";
import { SITE } from "./lib/constants";

export default function App() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-600 dark:text-slate-300 selection:bg-cyan-300 selection:text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />

      {/* Side Socials - Desktop Only */}
      <div className="hidden md:block fixed left-10 bottom-0 z-50">
        <div className="flex flex-col items-center gap-6 after:content-[''] after:block after:w-px after:h-24 after:bg-slate-400 after:mt-6">
          <SocialLinks direction="column" size={20} />
        </div>
      </div>

      {/* Side Email - Desktop Only */}
      <div className="hidden md:block fixed right-10 bottom-0 z-50">
        <div className="flex flex-col items-center gap-6 after:content-[''] after:block after:w-px after:h-24 after:bg-slate-400 after:mt-6">
          <a
            href={`mailto:${SITE.email}`}
            className="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 font-mono text-sm tracking-widest hover:-translate-y-1 transition-all duration-300"
            style={{ writingMode: "vertical-rl" }}
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </div>
  );
}
