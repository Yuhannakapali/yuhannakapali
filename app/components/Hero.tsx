"use client";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { SITE, SOCIAL_LINKS } from "@/app/lib/constants";

export function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center pt-16 bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-cyan-600 dark:text-cyan-400 font-mono text-lg mb-2 block">
              Hi, my name is
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
              {SITE.name}.
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-500 dark:text-slate-400">
              {SITE.title}.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            Backend-focused Software Engineer with 5+ years of experience
            designing, building, and maintaining scalable web applications.
            Strong expertise in Node.js, TypeScript, REST APIs, databases, and
            cloud-native environments. Currently building reliable systems at{" "}
            <span className="text-cyan-600 dark:text-cyan-400">GoGroup</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white dark:text-slate-950 font-semibold rounded-md transition-colors flex items-center gap-2"
            >
              Check out my work <ArrowRight size={18} />
            </a>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.name === "GitHub" ? Github : Linkedin;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 relative"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div className="absolute inset-0 border-2 border-cyan-500 rounded-lg translate-x-4 translate-y-4"></div>
            <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-300">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero.jpg`}
                alt="Portrait"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
