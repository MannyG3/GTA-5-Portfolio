import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const experiences = [
  {
    id: 'exp1',
    status: 'CURRENT',
    years: '2024 - Present',
    role: 'Fullstack Developer (MERN) & Training + Placement Officer (TPO)',
    org: 'RIT Polytechnic, Pune',
    summary:
      'Leading development and student career outcomes in parallel — building internal systems, mentoring students, and driving placement readiness.',
    bullets: [
      'Built and maintained college-level web solutions using MERN with clean, scalable architecture',
      'Delivered hands-on training in OOP with Python, Client-Side Scripting, and Data Structures',
      'Designed industry-oriented practical sessions, mini-projects, and real-world assignments',
      'Planned and organized placement drives, aptitude training, and interview preparation sessions',
      'Managed the RedHat Lab (20 PCs + network infrastructure) and ensured smooth operations',
      'Conducted AI-focused events, workshops, and technical bootcamps for student upskilling',
    ],
  },
  {
    id: 'exp2',
    status: 'PAST',
    years: '2022 - 2023',
    role: 'Full Stack Developer Intern',
    org: 'ByteEagle Infotech',
    summary:
      'Built production-style features in a team setting and strengthened full-stack engineering discipline.',
    bullets: [
      'Built web apps using React, Node.js, Express, and MongoDB (MERN stack)',
      'Developed and integrated RESTful APIs with proper validation and error handling',
      'Created reusable React components to improve UI consistency and developer speed',
      'Worked in an agile team with sprint planning, task tracking, and code reviews',
      'Focused on scalability, performance, and clean code practices',
    ],
  },
];

const Experience = () => {
  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle
          title="Career Story"
          subtitle="Two chapters. One mission-driven trajectory."
        />

        <div className="relative">
          <div className="hidden md:block absolute left-[33.1%] top-0 bottom-0 w-px bg-gradient-to-b from-gta-orange via-gta-teal to-gta-orange/40" />

          <div className="space-y-6 md:space-y-8">
            {experiences.map((experience, index) => {
              const chapter = `Chapter ${String(index + 1).padStart(2, '0')}`;
              const isCurrent = experience.status === 'CURRENT';

              return (
                <motion.article
                  key={experience.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  whileHover={{ x: 2 }}
                  className="grid grid-cols-1 md:grid-cols-[220px_48px_1fr] gap-4 md:gap-6"
                >
                  <div className="gta-card border border-[#263040] bg-gta-surface/75 backdrop-blur-md p-4 md:p-5">
                    <p className="font-rajdhani text-[11px] uppercase tracking-[0.25em] text-gta-orange/80 mb-3">
                      {chapter}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 text-[11px] font-rajdhani font-bold tracking-wider uppercase bg-gta-surfaceAlt/80 text-text-secondary border border-[#263040]">
                        Story
                      </span>
                      <span
                        className={`px-2.5 py-1 text-[11px] font-rajdhani font-bold tracking-wider uppercase ${
                          isCurrent
                            ? 'bg-gta-orange text-gta-bg'
                            : 'bg-gta-teal/85 text-gta-bg'
                        }`}
                      >
                        {experience.status}
                      </span>
                    </div>
                    <p className="font-rajdhani text-sm text-text-dim mt-3">{experience.years}</p>
                  </div>

                  <div className="relative hidden md:flex items-start justify-center">
                    <span className="mt-6 h-4 w-4 rounded-full border-2 border-gta-orange bg-gta-bg shadow-[0_0_0_4px_rgba(25,194,199,0.12),0_0_12px_rgba(255,179,92,0.35)]" />
                  </div>

                  <div className="gta-card border border-[#263040] bg-gta-surface/70 backdrop-blur-md p-5 md:p-6 hover:border-gta-orange/40 transition-all duration-300">
                    <h3 className="font-bebas text-2xl md:text-3xl text-text-primary tracking-wide leading-tight mb-1">
                      {experience.role}
                    </h3>
                    <p className="font-rajdhani text-gta-teal text-base mb-1">{experience.org}</p>
                    <p className="font-rajdhani text-xs uppercase tracking-[0.25em] text-text-dim mb-4">
                      {experience.years}
                    </p>

                    <p className="text-text-secondary leading-relaxed mb-4">{experience.summary}</p>

                    <ul className="space-y-2.5">
                      {experience.bullets.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-gta-orange mt-1">▸</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 gta-card border border-[#263040] bg-gta-surface/75 backdrop-blur-md p-6 md:p-8 text-center"
        >
          <h3 className="font-bebas text-3xl md:text-4xl text-text-primary tracking-wide mb-2">
            Want to work together?
          </h3>
          <p className="font-rajdhani text-text-muted text-lg mb-6">
            I'm always open to new opportunities
          </p>
          <Link to="/contact" className="gta-btn-primary inline-flex">
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
