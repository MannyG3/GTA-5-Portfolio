import { motion } from 'framer-motion';

const SkillBar = ({ name, level, icon, delay = 0 }) => {
  const getBarColor = () => {
    if (level >= 80) return 'from-gta-teal via-gta-teal to-gta-teal/70';
    if (level >= 60) return 'from-gta-orange via-gta-peach to-gta-orange/70';
    return 'from-gta-blue via-gta-blue to-gta-blue/70';
  };

  return (
    <div className="mb-5 group">
      <div className="flex justify-between items-center mb-2">
        <span className="font-rajdhani font-semibold text-text-primary tracking-wide group-hover:text-gta-orange transition-colors">
          {name}
        </span>
        <span className="font-bebas text-gta-teal text-lg tracking-wider">
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className={`skill-bar-fill bg-gradient-to-r ${getBarColor()}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Glow effect */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80 shadow-glow" />
        </motion.div>
      </div>
    </div>
  );
};

export default SkillBar;
