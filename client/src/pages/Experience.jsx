import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap, Users } from 'lucide-react';
import { experienceAPI } from '../services/api';
import SectionTitle from '../components/SectionTitle';

const typeIcons = {
  Job: Briefcase,
  Internship: Briefcase,
  Freelance: Briefcase,
  Education: GraduationCap,
  Club: Users,
  Volunteer: Users,
};

const typeStyles = {
  Job: 'bg-gta-orange/20 text-gta-orange',
  Internship: 'bg-gta-teal/20 text-gta-teal',
  Freelance: 'bg-gta-yellow/20 text-gta-yellow',
  Education: 'bg-gta-peach/20 text-gta-peach',
  Club: 'bg-gta-blue/20 text-gta-blue',
  Volunteer: 'bg-gta-teal/20 text-gta-teal',
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await experienceAPI.getAll();
        setExperiences(response.data);
      } catch (error) {
        console.error('Failed to fetch experiences:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-rajdhani text-gta-orange">Loading story mode...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle 
          title="Story Mode" 
          subtitle="Journey through the career timeline"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gta-orange via-gta-teal to-gta-peach" />

          {experiences.map((exp, index) => {
            const Icon = typeIcons[exp.type] || Briefcase;
            const badgeClass = typeStyles[exp.type] || 'bg-gta-orange/20 text-gta-orange';
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 mb-12`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gta-bg border-2 border-gta-orange z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="gta-card p-6"
                  >
                    {/* Type badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-rajdhani mb-4 ${badgeClass}`}>
                      <Icon className="w-4 h-4" />
                      {exp.type}
                    </div>

                    {/* Title & Org */}
                    <h3 className="font-bebas text-2xl text-text-primary mb-1">
                      {exp.title}
                    </h3>
                    <p className="font-rajdhani text-gta-teal mb-3">
                      {exp.org}
                    </p>

                    {/* Date & Location */}
                    <div className="flex flex-wrap gap-4 text-sm text-text-muted mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                        </span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p className="text-text-secondary text-sm mb-4">
                        {exp.description}
                      </p>
                    )}

                    {/* Highlights */}
                    {exp.highlights?.length > 0 && (
                      <ul className="space-y-1">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                            <span className="text-gta-orange mt-1">▸</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>

        {experiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="font-rajdhani text-xl text-text-dim">
              No experience entries yet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Experience;
