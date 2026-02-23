import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Crosshair, User, MapPin } from 'lucide-react';
import { profileAPI } from '../services/api';

const Home = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI.get();
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center min-h-screen px-4">
        {/* Sunset gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gta-orange/5 via-gta-bg to-gta-bg" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Sunset glow */}
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,179,92,0.15) 0%, rgba(255,122,89,0.08) 40%, transparent 70%)',
            }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Teal accent */}
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gta-teal/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          
          {/* Orange accent left */}
          <motion.div
            className="absolute top-1/3 left-10 w-64 h-64 bg-gta-orange/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 7, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gta-teal/30 bg-gta-surface/50 backdrop-blur-sm mb-6"
          >
            <MapPin className="w-4 h-4 text-gta-teal" />
            <span className="font-rajdhani text-gta-teal text-sm tracking-widest uppercase">
              Welcome to Los Santos
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-bebas text-6xl md:text-8xl lg:text-9xl tracking-wider mb-6"
          >
            <span className="glitch gta-title" data-text={profile?.name || 'YOUR NAME'}>
              {profile?.name || 'YOUR NAME'}
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-rajdhani text-xl md:text-2xl text-text-muted mb-12"
          >
            {profile?.tagline || 'Full Stack Developer | MERN | AI | Robotics'}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/projects" className="gta-btn-primary flex items-center gap-2 group">
              <Crosshair className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              Start Mission
            </Link>
            <Link to="/about" className="gta-btn-secondary flex items-center gap-2 group">
              <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Open Profile
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gta-orange/50"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>

        {/* Corner decorations - now with gradient colors */}
        <div className="absolute top-20 left-4 md:left-8 w-20 h-20 border-l-2 border-t-2 border-gta-orange/30" />
        <div className="absolute top-20 right-4 md:right-8 w-20 h-20 border-r-2 border-t-2 border-gta-teal/30" />
        <div className="absolute bottom-20 left-4 md:left-8 w-20 h-20 border-l-2 border-b-2 border-gta-teal/30" />
        <div className="absolute bottom-20 right-4 md:right-8 w-20 h-20 border-r-2 border-b-2 border-gta-orange/30" />
        
        {/* City silhouette at bottom */}
        <div className="city-silhouette" />
      </section>
    </div>
  );
};

export default Home;
