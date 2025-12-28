import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem, slideInLeft, slideInRight } from "@/hooks/useScrollAnimation";

export const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" className="relative overflow-hidden" ref={ref}>
      {/* Subtle parallax background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent"
        style={{ y: backgroundY }}
      />
      
      <div className="section-line" />
      <div className="section-container relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-24 items-start"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={slideInLeft}>
            <span className="text-sm text-muted-foreground uppercase tracking-widest mb-4 block">
              About Me
            </span>
            <h2 className="text-headline mb-6">
              Engineering systems<br />that scale.
            </h2>
          </motion.div>

          <motion.div variants={slideInRight}>
            <p className="text-body mb-6">
              Backend Engineer specializing in building high-performance, distributed systems. 
              I design scalable microservices architectures using Node.js, Express, TypeScript, 
              and PostgreSQL - with a strong focus on API optimization, caching strategies, and system reliability.
            </p>
            <p className="text-body">
              From containerized deployments with Docker to automated CI/CD pipelines, 
              I bring DevOps best practices to every project. Currently at TCS, 
              I build backend services that handle thousands of transactions while maintaining 99.9% uptime.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-12 md:mt-16 pt-12 md:pt-16 border-t border-border/50"
        >
          {[
            { value: "25%", label: "API Performance Boost" },
            { value: "2000+", label: "Monthly Transactions" },
            { value: "99.9%", label: "System Uptime" },
            { value: "1000+", label: "DSA Problems Solved" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="text-center lg:text-left"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-foreground mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-caption text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
