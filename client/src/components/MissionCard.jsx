import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const MissionCard = ({ project, index = 0 }) => {
  const {
    code,
    codename,
    title,
    slug,
    shortDesc,
    tags = [],
    difficulty = 3,
    thumbnailUrl,
    featured,
    status,
    progress,
  } = project;

  const normalizedProgress = typeof progress === 'number'
    ? Math.max(0, Math.min(1, progress))
    : status === 'completed'
      ? 1
      : status === 'in-progress'
        ? 0.6
        : featured
          ? 0.9
          : 0;

  const statusLabel = featured ? 'FEATURED' : status === 'in-progress' ? 'IN PROGRESS' : 'COMPLETED';
  const statusBadgeClass = featured
    ? 'bg-gradient-to-r from-gta-orange to-gta-peach text-gta-bg'
    : status === 'in-progress'
      ? 'bg-gta-teal/90 text-gta-bg'
      : 'bg-white/15 text-white/85 border border-white/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        x: 2,
        y: -8,
        rotateX: 2,
        rotateY: 1,
      }}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      className="mission-card group"
    >
      <Link to={`/projects/${slug}`}>
        <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-gta-orange/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 z-20" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-gta-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 z-20" />

        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-gta-bg">
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gta-bg via-gta-surface to-gta-surfaceAlt">
              <span className="font-bebas text-4xl text-gta-orange/20">MISSION</span>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gta-bg via-gta-bg/50 to-transparent" />
          
          {/* Top gradient for badges */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-gta-bg/60 to-transparent" />
          
          <div className={`absolute top-3 right-3 px-3 py-1 font-rajdhani font-bold text-xs uppercase tracking-wider ${statusBadgeClass}`}>
            {statusLabel}
          </div>

          {/* Difficulty stars */}
          <div className="absolute bottom-3 right-3 flex gap-0.5 p-1.5 rounded bg-gta-bg/60 backdrop-blur-sm">
            {[1, 2, 3, 4, 5].map((level) => (
              <Star
                key={level}
                className={`w-3.5 h-3.5 ${
                  level <= difficulty
                    ? 'text-gta-yellow fill-gta-yellow'
                    : 'text-gta-surfaceAlt'
                }`}
                style={level <= difficulty ? { filter: 'drop-shadow(0 0 4px #FFD93D)' } : {}}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 relative">
          {code && (
            <p className="font-rajdhani text-xs uppercase tracking-[0.25em] text-gta-orange/80 mb-1">
              {code}
            </p>
          )}

          <h3 className="font-bebas text-2xl text-text-primary group-hover:text-gta-orange transition-colors duration-300 mb-2 tracking-wide">
            {title}
          </h3>

          {codename && (
            <p className="font-rajdhani text-sm uppercase tracking-wide text-text-dim mb-2">
              {codename}
            </p>
          )}
          
          <p className="text-text-muted text-sm line-clamp-2 mb-4 leading-relaxed">
            {shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag-chip">
                {tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-1 text-xs font-rajdhani text-text-dim">
                +{tags.length - 4}
              </span>
            )}
          </div>

          <div className="mt-4">
            <div className="h-1.5 w-full rounded-full bg-gta-bg/70 border border-gta-surfaceAlt/60 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${featured ? 'mission-progress-glow' : 'bg-gta-teal'}`}
                style={{ width: `${normalizedProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 border-2 border-gta-orange/0 group-hover:border-gta-orange/50 transition-all duration-500 pointer-events-none"
             style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }} />
      </Link>
    </motion.div>
  );
};

export default MissionCard;
