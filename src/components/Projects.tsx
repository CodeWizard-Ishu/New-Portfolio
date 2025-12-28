import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/hooks/useScrollAnimation";

const projects = [
  {
    title: "MentG",
    description: "Production-grade mentoring platform built from scratch. Features secure JWT authentication, AI-powered matching algorithm, session scheduling via Google Calendar API, and CI/CD automated deployments. Scaled to handle 2000+ monthly transactions.",
    tech: ["Node.js", "Express", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    live: "https://mentg.in",
    github: "https://github.com/CodeWizard-Ishu/MentG",
  },
  {
    title: "E-Commerce Backend",
    description: "Full-stack e-commerce solution with RESTful API architecture, PassportJS authentication, Redux state management, product catalog APIs, cart system, and admin dashboard with role-based access control.",
    tech: ["Node.js", "Express", "MongoDB", "REST API", "Redux"],
    github: "https://github.com/CodeWizard-Ishu/E-Commerce-Website",
  },
];

export const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="projects" className="relative overflow-hidden" ref={ref}>
      {/* Parallax accent */}
      <motion.div 
        className="absolute -left-1/4 top-1/3 w-80 h-80 bg-glow-secondary/5 rounded-full blur-3xl"
        style={{ y: backgroundY }}
      />
      
      <div className="section-line" />
      <div className="section-container relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest mb-4 block">
            Projects
          </span>
          <h2 className="text-headline">Featured work</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl bg-card border border-border/50 card-hover glow-effect overflow-hidden"
            >
              {/* Project content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((t) => (
                    <span key={t} className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full bg-secondary text-secondary-foreground border border-border/50 transition-all duration-200 hover:bg-accent hover:border-border">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover arrow indicator */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects link */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/CodeWizard-Ishu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            View all projects on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
