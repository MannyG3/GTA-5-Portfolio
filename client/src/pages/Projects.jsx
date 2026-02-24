import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { projectsAPI } from '../services/api';
import SectionTitle from '../components/SectionTitle';
import MissionCard from '../components/MissionCard';
import { fallbackMissions } from '../data/missions';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        const apiProjects = Array.isArray(response.data) ? response.data : [];
        setProjects(apiProjects.length > 0 ? apiProjects : fallbackMissions);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects(fallbackMissions);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-rajdhani text-gta-orange">Loading missions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Mission Board" 
          subtitle="Select a mission to view details"
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-text-muted">
            <Filter className="w-5 h-5" />
            <span className="font-rajdhani">Filter:</span>
          </div>
          {['all', 'featured', 'completed', 'in-progress'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 font-rajdhani text-sm uppercase transition-all duration-300 ${
                filter === f
                  ? 'bg-gradient-to-r from-gta-orange to-gta-peach text-gta-bg shadow-lg shadow-gta-orange/20'
                  : 'bg-gta-surface text-text-muted hover:text-gta-orange border border-gta-surfaceAlt hover:border-gta-orange/30'
              }`}
            >
              {f.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <MissionCard key={project._id || project.slug || index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="font-rajdhani text-xl text-text-dim">
              No missions available with this filter.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
