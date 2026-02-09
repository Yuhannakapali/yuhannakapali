import React from "react";

export function Footer() {
  return (
    <footer className="py-6 bg-slate-100 dark:bg-slate-950 text-slate-500 text-center text-sm font-mono">
      <div className="mb-2">
        <a
          href="#"
          className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          Designed & Built by Yuhanna Kapali
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
}
