"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

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
              Yuhanna Kapali.
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-500 dark:text-slate-400">
              Backend Developer.
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
              <a
                href="#"
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.437-.103.25-.13.599-.13.948v5.42h-3.554s.047-8.733 0-9.655h3.554v1.368c.43-.664 1.199-1.61 2.920-1.61 2.135 0 3.733 1.39 3.733 4.38v5.517zm-15.864-11.07c-1.141 0-1.889-.757-1.889-1.704 0-.962.748-1.704 1.93-1.704s1.888.742 1.905 1.704c0 .947-.748 1.704-1.946 1.704zm1.518 11.07h-3.037V10.797h3.037v8.655zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 002.856-3.915 9.957 9.957 0 01-2.828.856 4.957 4.957 0 00-8.618-4.53 4.944 4.944 0 00-1.6 6.811 14.046 14.046 0 01-10.17-5.141 4.934 4.934 0 001.529 6.61 4.903 4.903 0 01-2.231-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 19.54a13.94 13.94 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
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
                src="/hero.jpg"
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
