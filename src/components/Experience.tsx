import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar } from "lucide-react";
import { staggerContainer, staggerItem, fadeInUp } from "@/hooks/useScrollAnimation";

const experiences = [
  {
    company: "Tata Consultancy Services (TCS)",
    role: "Backend Engineer",
    type: "Node.js, TypeScript, Microservices",
    period: "May 2025 – Present",
    points: [
      "Designed and developed scalable backend services using Node.js, Express.js, TypeScript, PostgreSQL, and MongoDB",
      "Improved API performance by 25% via query optimization and intelligent caching strategies",
      "Built and deployed containerized microservices using Docker, achieving 99.9% system uptime",
      "Automated internal cloud workflows using cron jobs and CI/CD pipelines, reducing manual operations by 30%",
    ],
  },
  {
    company: "Vashistha 360 Consulting Pvt. Ltd.",
    role: "Member of Technical Staff",
    type: "Backend Development & System Design",
    period: "Dec 2024 – May 2025",
    points: [
      "Built MentG from scratch — a mentoring platform serving 150+ mentors and 400+ mentees within 2 months",
      "Developed robust backend in Node.js, Express, PostgreSQL handling 2,000+ transactions/month",
      "Integrated AI-based matching algorithm improving mentor-mentee pairing accuracy by 40%",
      "Automated deployment with CI/CD pipelines (GitHub Actions), reducing release cycle time by 50%",
      "Deployed on AWS (LightSail + RDS) achieving scalability to 10,000+ users",
    ],
  },
  {
    company: "Appenius Technologies",
    role: "SDE Intern",
    type: "API Optimization & Backend Development",
    period: "July 2024 – Dec 2024",
    points: [
      "Enhanced full-stack web application collaborating with a team of 3 engineers",
      "Optimized 12+ REST APIs, reducing average response time from 300ms to 240ms (20% improvement)",
      "Improved backend architecture and database queries for better scalability",
    ],
  },
];

export const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="experience" className="relative overflow-hidden" ref={ref}>
      {/* Parallax accent */}
      <motion.div 
        className="absolute -right-1/4 top-1/4 w-96 h-96 bg-glow-primary/5 rounded-full blur-3xl"
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
            Experience
          </span>
          <h2 className="text-headline">Where I've worked</h2>
        </motion.div>

        <motion.div 
          className="space-y-4 sm:space-y-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              variants={staggerItem}
              className="group relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl bg-card border border-border/50 card-hover"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-2">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="truncate">{exp.type}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-semibold text-foreground mb-1">{exp.role}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{exp.company}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm shrink-0">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-3">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
