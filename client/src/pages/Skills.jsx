import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Shield, Code } from 'lucide-react';
import { skillsAPI } from '../services/api';
import SectionTitle from '../components/SectionTitle';
import SkillBar from '../components/SkillBar';

const categoryIcons = {
  'Front-End': Code,
  'Back-End': Layers,
  Database: Database,
  'Dev-Ops & Security': Shield,
};

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

const categoryDescriptions = {
  'Front-End': 'The Visuals & Flash',
  'Back-End': 'The Getaway & Logistics',
  Database: 'The Stash Houses',
  'Dev-Ops & Security': 'Special Abilities',
};

const normalizeSkills = (data) => {
  if (!data?.length) return fallbackSkills;

  return data.map((group) => ({
    ...group,
    description: categoryDescriptions[group.category] || 'Core Capability',
  }));
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getAll();
        const normalized = normalizeSkills(response.data);
        setSkills(normalized);
        if (normalized.length > 0) {
          setActiveCategory(normalized[0].category);
        }
      } catch (error) {
        console.error('Failed to fetch skills:', error);
        setSkills(fallbackSkills);
        setActiveCategory(fallbackSkills[0].category);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-rajdhani text-gta-orange">Loading skills...</div>
      </div>
    );
  }

  const activeSkillSet = skills.find(s => s.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle 
          title="Skill Sheet" 
          subtitle="Character progression, loadouts, and special abilities"
        />

        <div className="relative mb-8 rounded-xl overflow-hidden border border-white/20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://media.gtaboom.com/media/images/3a/cf/Skill.jpg)' }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative z-10 p-6 md:p-8">
            <p className="font-rajdhani text-white/90 text-sm md:text-base uppercase tracking-widest">
              Inspired by GTA Skill Screen
            </p>
            <h3 className="font-bebas text-3xl md:text-5xl text-white mt-2">Mission Capabilities</h3>
            <p className="text-text-secondary mt-2 max-w-2xl">
              From high-performance front-end visuals to secure cloud deployments, this is the full skill tree built for high-stakes project execution.
            </p>
          </div>
        </div>

        {/* Category selector - Pause menu style */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => {
              const Icon = categoryIcons[skill.category] || Code;
              const isActive = activeCategory === skill.category;
              
              return (
                <motion.button
                  key={skill.category}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(skill.category)}
                  className={`relative group px-6 py-4 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? 'bg-black/85 border-gta-orange text-gta-orange'
                      : 'bg-black/60 border-white/20 text-white hover:text-gta-orange hover:border-gta-orange/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <span className="font-rajdhani font-semibold text-lg">
                      {skill.category}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 border border-gta-orange rounded-lg"
                      style={{ boxShadow: '0 0 20px rgba(255, 179, 92, 0.3)' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Skills display */}
        {activeSkillSet && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gta-card p-8"
          >
            <div className="mb-6 pb-4 border-b border-white/10">
              <h4 className="font-bebas text-3xl text-gta-orange">{activeSkillSet.category}</h4>
              <p className="font-rajdhani text-text-muted uppercase tracking-wider">{activeSkillSet.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
              {activeSkillSet.items.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SkillBar
                    name={item.name}
                    level={item.level}
                    delay={index * 0.1}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All skills overview */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, groupIndex) => {
            const Icon = categoryIcons[skillGroup.category] || Code;
            
            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.1 }}
                whileHover={{ y: -4 }}
                className="gta-card p-6 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-gta-orange group-hover:text-gta-teal transition-colors" />
                  <h3 className="font-bebas text-xl text-text-primary">
                    {skillGroup.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item.name}
                      className="tag-chip"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
