import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  ExternalLink, 
  Github, 
  Target, 
  AlertTriangle,
  User,
  Trophy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { projectsAPI } from '../services/api';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [missionAccepted, setMissionAccepted] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectsAPI.getBySlug(slug);
        setProject(response.data);
        
        // Mission accepted animation
        setTimeout(() => setMissionAccepted(true), 500);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-rajdhani text-gta-orange">Loading mission details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-bebas text-4xl text-gta-red mb-4">Mission Not Found</h1>
        <Link to="/projects" className="gta-btn">
          Back to Missions
        </Link>
      </div>
    );
  }

  const screenshots = project.screenshots || [];
  const hasScreenshots = screenshots.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      {/* Mission Accepted overlay */}
      {missionAccepted && (
        <motion.div
          initial={{ opacity: 1, scale: 1.2 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gta-bg pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h2 className="font-bebas text-6xl md:text-8xl text-gta-orange tracking-wider">
              MISSION ACCEPTED
            </h2>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        {/* Back button */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-text-muted hover:text-gta-orange transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-rajdhani">Back to Missions</span>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-bebas text-5xl md:text-6xl text-text-primary mb-2">
                {project.title}
              </h1>
              <p className="font-rajdhani text-xl text-text-muted">
                {project.shortDesc}
              </p>
            </div>
            
            {/* Difficulty */}
            <div className="flex flex-col items-end">
              <span className="font-rajdhani text-sm text-text-dim mb-1">Difficulty</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Star
                    key={level}
                    className={`w-6 h-6 ${
                      level <= project.difficulty
                        ? 'text-gta-yellow fill-gta-yellow'
                        : 'text-gta-surfaceAlt'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="tag-chip"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gta-btn-primary flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gta-btn flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Screenshots carousel */}
            {hasScreenshots && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="gta-card overflow-hidden"
              >
                <div className="relative aspect-video bg-gta-bg">
                  <img
                    src={screenshots[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {screenshots.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-gta-bg/80 rounded-full text-text-primary hover:bg-gta-orange hover:text-gta-bg transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gta-bg/80 rounded-full text-text-primary hover:bg-gta-orange hover:text-gta-bg transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {screenshots.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex
                                ? 'bg-gta-orange'
                                : 'bg-gta-surfaceAlt hover:bg-text-dim'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Full description */}
            {project.fullDesc && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="gta-card p-6"
              >
                <h3 className="font-bebas text-2xl text-gta-orange mb-4">Mission Briefing</h3>
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {project.fullDesc}
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Role */}
            {project.role && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="gta-card p-5"
              >
                <div className="flex items-center gap-2 text-gta-teal mb-2">
                  <User className="w-5 h-5" />
                  <span className="font-rajdhani font-semibold">Your Role</span>
                </div>
                <p className="text-text-primary font-rajdhani">{project.role}</p>
              </motion.div>
            )}

            {/* Objectives */}
            {project.objectives?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="gta-card p-5"
              >
                <div className="flex items-center gap-2 text-gta-orange mb-4">
                  <Target className="w-5 h-5" />
                  <span className="font-rajdhani font-semibold">Objectives</span>
                </div>
                <ul className="space-y-2">
                  {project.objectives.map((obj, index) => (
                    <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                      <span className="text-gta-orange mt-1">▸</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Challenges */}
            {project.challenges?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="gta-card p-5"
              >
                <div className="flex items-center gap-2 text-gta-orange mb-4">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-rajdhani font-semibold">Challenges</span>
                </div>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-2 text-text-secondary text-sm">
                      <span className="text-gta-orange mt-1">▸</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Outcome */}
            {project.outcome && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="gta-card p-5"
              >
                <div className="flex items-center gap-2 text-gta-teal mb-2">
                  <Trophy className="w-5 h-5" />
                  <span className="font-rajdhani font-semibold">Outcome</span>
                </div>
                <p className="text-text-secondary text-sm">{project.outcome}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
