"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-center"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base mb-4 block">
            05. What's Next?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Get In Touch
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
            I'm always open to new opportunities and interesting conversations.
            Whether you have a project in mind or just want to connect, feel
            free to reach out!
          </p>

          <a
            href="mailto:yuhannakapali@gmail.com"
            className="inline-flex items-center px-8 py-4 border border-cyan-500 text-cyan-600 dark:text-cyan-400 rounded hover:bg-cyan-500/10 transition-colors font-mono text-sm tracking-wide"
          >
            Say Hello
          </a>

          <div className="mt-16 flex justify-center gap-8 md:hidden">
            <a
              href="#"
              className="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
