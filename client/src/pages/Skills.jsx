import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Database, Wrench, Code } from 'lucide-react';
import { skillsAPI } from '../services/api';
import SectionTitle from '../components/SectionTitle';
import SkillBar from '../components/SkillBar';

const categoryIcons = {
  Frontend: Code,
  Backend: Layers,
  Database: Database,
  Tools: Wrench,
  Other: Code,
};

const categoryColors = {
  Frontend: 'gta-teal',
  Backend: 'gta-orange',
  Database: 'gta-peach',
  Tools: 'gta-yellow',
  Other: 'gta-blue',
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsAPI.getAll();
        setSkills(response.data);
        if (response.data.length > 0) {
          setActiveCategory(response.data[0].category);
        }
      } catch (error) {
        console.error('Failed to fetch skills:', error);
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
          title="Skill Inventory" 
          subtitle="Weapons of choice for building digital experiences"
        />

        {/* Category selector - Weapon wheel style */}
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
                  className={`relative group px-6 py-4 rounded-lg border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gta-orange/20 border-gta-orange text-gta-orange'
                      : 'bg-gta-surface border-gta-surfaceAlt text-text-muted hover:border-gta-teal/50 hover:text-gta-teal'
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
                      className="absolute inset-0 border-2 border-gta-orange rounded-lg"
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
