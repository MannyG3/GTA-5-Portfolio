import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../services/api';

const fallbackSkills = [
  {
    category: 'Front-End',
    order: 1,
    description: 'The Visuals & Flash',
    items: [
      { name: 'React.js', level: 96 },
      { name: 'Redux / Context API', level: 92 },
      { name: 'Tailwind CSS / Material UI', level: 94 },
      { name: 'Next.js', level: 88 },
    ],
  },
  {
    category: 'Back-End',
    order: 2,
    description: 'The Getaway & Logistics',
    items: [
      { name: 'Node.js & Express', level: 94 },
      { name: 'Python (Django/Flask)', level: 90 },
      { name: 'RESTful APIs', level: 96 },
      { name: 'Socket.io', level: 89 },
    ],
  },
  {
    category: 'Database',
    order: 3,
    description: 'The Stash Houses',
    items: [
      { name: 'MongoDB', level: 93 },
      { name: 'PostgreSQL / MySQL', level: 90 },
      { name: 'Redis', level: 86 },
    ],
  },
  {
    category: 'Dev-Ops & Security',
    order: 4,
    description: 'Special Abilities',
    items: [
      { name: 'Cyber Security & Ethical Hacking', level: 91 },
      { name: 'Docker & Kubernetes', level: 88 },
      { name: 'AWS / Azure', level: 84 },
      { name: 'Git / GitHub', level: 97 },
    ],
  },
];

const SOFT_SKILLS = [
  { name: 'Leadership', level: 92 },
  { name: 'Communication', level: 94 },
  { name: 'Mentorship', level: 96 },
  { name: 'Problem Solving', level: 95 },
];

const TOTAL_SEGMENTS = 18;

const SegmentedBar = ({ level }) => {
  const filledSegments = Math.round((Math.max(0, Math.min(100, level)) / 100) * TOTAL_SEGMENTS);

  return (
    <div className="flex gap-[2px]">
      {Array.from({ length: TOTAL_SEGMENTS }).map((_, index) => {
        const filled = index < filledSegments;
        return (
          <div
            key={index}
            className={`h-3 w-3 md:w-3.5 ${filled ? 'bg-[#3A86FF]' : 'bg-[#18283B]'}`}
            style={filled ? { boxShadow: '0 0 6px rgba(58, 134, 255, 0.65)' } : undefined}
          />
        );
      })}
    </div>
  );
};

const SkillRow = ({ name, level, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="group grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-4 py-2"
  >
    <div className="px-2 py-1 text-xs md:text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors group-hover:bg-white group-hover:text-black">
      {name}
    </div>
    <SegmentedBar level={level} />
  </motion.div>
);

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getAll();
        setSkills(response.data?.length ? response.data : fallbackSkills);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
        setSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-sans text-white uppercase tracking-[0.18em]">Loading skills...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-[0.16em] font-sans">Skills</h2>
          <p className="text-white/70 mt-2 text-xs md:text-sm uppercase tracking-[0.14em] font-sans">Lifestyle Menu</p>
        </div>

        <div className="border border-white/25 bg-black/90 p-4 md:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-4 border-b border-white/20 pb-3 mb-3">
            <div className="text-white/70 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em]">Skill</div>
            <div className="text-white/70 text-[11px] md:text-xs font-semibold uppercase tracking-[0.16em]">Level</div>
          </div>

          {skills.map((group) => (
            <div key={group.category} className="mb-5 last:mb-0">
              <div className="mb-2 text-[#3A86FF] text-xs md:text-sm font-semibold uppercase tracking-[0.18em]">
                {group.category}
              </div>
              <div className="space-y-1">
                {group.items.map((item, index) => (
                  <SkillRow key={`${group.category}-${item.name}`} name={item.name} level={item.level} delay={index * 0.03} />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6 border-t border-white/20 pt-4">
            <div className="mb-2 text-[#3A86FF] text-xs md:text-sm font-semibold uppercase tracking-[0.18em]">
              Soft Skills
            </div>
            <div className="space-y-1">
              {SOFT_SKILLS.map((item, index) => (
                <SkillRow key={`soft-${item.name}`} name={item.name} level={item.level} delay={index * 0.03} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
