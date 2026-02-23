import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal, BadgeCheck, Filter, ExternalLink } from 'lucide-react';
import { achievementsAPI } from '../services/api';
import SectionTitle from '../components/SectionTitle';

const categoryIcons = {
  Certificate: BadgeCheck,
  Award: Trophy,
  Badge: Medal,
  License: BadgeCheck,
  Other: Award,
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await achievementsAPI.getAll();
        setAchievements(response.data);
      } catch (error) {
        console.error('Failed to fetch achievements:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const categories = ['all', ...new Set(achievements.map(a => a.category))];
  
  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === 'all') return true;
    return achievement.category === filter;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-rajdhani text-gta-orange">Loading trophies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle 
          title="Trophy Cabinet" 
          subtitle="Certifications and achievements unlocked"
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-text-muted">
            <Filter className="w-5 h-5" />
            <span className="font-rajdhani">Filter:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-rajdhani text-sm uppercase transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-gta-orange to-gta-peach text-gta-bg shadow-lg shadow-gta-orange/20'
                  : 'bg-gta-surface text-text-muted hover:text-gta-orange border border-gta-surfaceAlt'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Achievements grid */}
        {filteredAchievements.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement, index) => {
              const Icon = categoryIcons[achievement.category] || Award;
              
              return (
                <motion.div
                  key={achievement._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="gta-card overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gta-bg">
                    {achievement.imageUrl ? (
                      <img
                        src={achievement.imageUrl}
                        alt={achievement.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gta-bg to-gta-surface">
                        <Icon className="w-16 h-16 text-gta-orange/30" />
                      </div>
                    )}
                    
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-gta-bg/90 rounded flex items-center gap-2 border border-gta-orange/20">
                      <Icon className="w-4 h-4 text-gta-orange" />
                      <span className="font-rajdhani text-xs text-gta-orange uppercase">
                        {achievement.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bebas text-xl text-text-primary group-hover:text-gta-orange transition-colors mb-2">
                      {achievement.title}
                    </h3>
                    
                    <p className="font-rajdhani text-gta-teal text-sm mb-2">
                      {achievement.issuer}
                    </p>
                    
                    <p className="text-text-dim text-sm mb-4">
                      {formatDate(achievement.date)}
                    </p>

                    {achievement.description && (
                      <p className="text-text-muted text-sm mb-4 line-clamp-2">
                        {achievement.description}
                      </p>
                    )}

                    {achievement.credentialUrl && (
                      <a
                        href={achievement.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gta-orange text-sm hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Credential
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="font-rajdhani text-xl text-text-dim">
              No achievements with this filter.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
