import { motion } from 'framer-motion';

const SectionTitle = ({ 
  title, 
  subtitle, 
  alignment = 'left',
  glitch = false 
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[alignment];

  return (
    <div className={`mb-12 ${alignClass}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`gta-title ${glitch ? 'glitch' : ''}`}
        data-text={title}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="gta-subtitle text-text-muted mt-3"
        >
          {subtitle}
        </motion.p>
      )}
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`mt-4 h-0.5 bg-gradient-to-r from-gta-orange via-gta-peach to-transparent ${alignment === 'center' ? 'mx-auto max-w-xs' : alignment === 'right' ? 'ml-auto max-w-xs' : 'max-w-xs'}`}
        style={{ originX: alignment === 'right' ? 1 : 0 }}
      />
    </div>
  );
};

export default SectionTitle;
