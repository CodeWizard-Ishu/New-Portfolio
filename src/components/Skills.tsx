import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem, fadeInUp, scaleIn } from "@/hooks/useScrollAnimation";

const skillCategories = [
  {
    title: "Backend & Databases",
    skills: ["Node.js", "Express.js", "TypeScript", "PostgreSQL", "MongoDB", "Prisma", "Redis", "JWT Auth"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (EC2, RDS, LightSail)", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Vercel"],
  },
  {
    title: "System Design",
    skills: ["Microservices", "REST APIs", "Caching", "Rate Limiting", "Load Balancing", "Message Queues"],
  },
  {
    title: "Tools & Languages",
    skills: ["Git", "Postman", "JMeter", "Grafana", "Linux CLI", "Java", "JavaScript", "SQL"],
  },
];

export const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section id="skills" className="relative overflow-hidden" ref={ref}>
      {/* Parallax accent */}
      <motion.div 
        className="absolute right-0 top-1/2 w-72 h-72 bg-glow-primary/5 rounded-full blur-3xl"
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
            Skills
          </span>
          <h2 className="text-headline">Technologies I work with</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerItem}
            >
              <h3 className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mb-3 sm:mb-4 font-display">
                {category.title}
              </h3>
              <motion.div 
                className="flex flex-wrap gap-1.5 sm:gap-2"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-full bg-secondary text-secondary-foreground border border-border/50 transition-all duration-200 hover:bg-accent hover:border-border"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
