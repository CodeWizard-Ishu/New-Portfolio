import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient spotlight background with parallax (dark mode) */}
      <motion.div className="hero-gradient dark:block hidden" style={{ y: y1 }} />

      <motion.div
        className="absolute top-0 right-0 w-[800px] h-[800px] hidden light:block dark:hidden"
        style={{ y: y1 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-[hsl(var(--blob-1))] via-[hsl(var(--blob-2))] to-[hsl(var(--blob-3))] opacity-60 blur-3xl rounded-full transform translate-x-1/4 -translate-y-1/4" />
      </motion.div>

      {/* Light mode gradient blob using CSS class */}
      <motion.div
        className="gradient-blob"
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid pattern with parallax (dark mode only) */}
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] dark:opacity-100 opacity-0"
        style={{ y: y2 }}
      />

      {/* Animated gradient orbs with enhanced parallax (dark mode) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-primary/10 rounded-full blur-3xl dark:block hidden"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-secondary/10 rounded-full blur-3xl dark:block hidden"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 250]) }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 text-left"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-display mb-6"
        >
          Hello, I'm Utkarsh.
          <br />
          <span className="text-foreground/60">Backend Engineer.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-body max-w-xl md:max-w-2xl mb-6 md:mb-8"
        >
          I architect scalable microservices and high-performance APIs using Node.js, TypeScript, and PostgreSQL.
          Currently building enterprise-grade backend systems at TCS with 99.9% uptime.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-body max-w-xl md:max-w-2xl mb-10 md:mb-12"
        >
          I value <strong className="text-foreground">system reliability</strong>,{" "}
          <strong className="text-foreground">clean architecture</strong>, and{" "}
          <strong className="text-foreground">performance optimization</strong>. From containerized deployments to CI/CD
          automation - I build systems that scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-all duration-200"
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="https://drive.google.com/file/d/1n7CyWb5IS82HsdA8zPeMi_f6e2k5tS_r/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 bg-secondary/50 border border-border/50 text-foreground rounded-lg font-medium hover:bg-secondary hover:border-border transition-all duration-200"
          >
            <FileDown className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border/50 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
