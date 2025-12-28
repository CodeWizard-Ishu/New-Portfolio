import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Trophy, Award } from "lucide-react";

const achievements = [
  { icon: Trophy, text: "1000+ DSA problems solved across LeetCode, GFG, CodeChef & HackerRank" },
  { icon: Award, text: "Built production systems handling 2000+ transactions/month" },
  { icon: Award, text: "Achieved 99.9% uptime on deployed microservices" },
];

export const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative" ref={ref}>
      <div className="section-line" />
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-muted-foreground uppercase tracking-widest mb-4 block">
              Education
            </span>
            <div className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-card border border-border/50">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 rounded-xl bg-secondary shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-semibold text-foreground mb-1">
                    B.Tech in Computer Science
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-2">
                    Madan Mohan Malaviya University of Technology, Gorakhpur
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span>CGPA: 7.58</span>
                    <span className="hidden sm:inline">•</span>
                    <span>2020 – 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-sm text-muted-foreground uppercase tracking-widest mb-4 block">
              Achievements
            </span>
            <div className="space-y-2 sm:space-y-3">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card border border-border/50"
                >
                  <div className="p-1.5 sm:p-2 rounded-lg bg-secondary shrink-0">
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground" />
                  </div>
                  <span className="text-sm sm:text-base text-muted-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Coding profiles */}
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
              <a
                href="https://leetcode.com/utkarsh1726"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-badge"
              >
                LeetCode
              </a>
              <a
                href="https://www.geeksforgeeks.org/user/ishujaiswal527"
                target="_blank"
                rel="noopener noreferrer"
                className="pill-badge"
              >
                GeeksforGeeks
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
