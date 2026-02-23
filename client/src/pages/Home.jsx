import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Crosshair, User, MapPin, Palmtree } from 'lucide-react';
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
        {/* Vice City tropical gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gta-sky/10 via-transparent to-gta-purple/10" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Tropical sunset glow */}
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(232,164,184,0.15) 0%, rgba(107,191,181,0.08) 40%, transparent 70%)',
            }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Teal water reflection */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gta-teal/10 to-transparent"
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          
          {/* Pink accent right */}
          <motion.div
            className="absolute top-1/4 right-10 w-80 h-80 bg-gta-pink/8 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gta-pink/30 bg-gta-surface/50 backdrop-blur-sm mb-6"
          >
            <MapPin className="w-4 h-4 text-gta-pink" />
            <span className="font-rajdhani text-gta-pink text-sm tracking-widest uppercase">
              Welcome to Vice City
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
            className="text-gta-teal/50"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>

        {/* Corner decorations - Vice City colors */}
        <div className="absolute top-20 left-4 md:left-8 w-20 h-20 border-l-2 border-t-2 border-gta-pink/30" />
        <div className="absolute top-20 right-4 md:right-8 w-20 h-20 border-r-2 border-t-2 border-gta-teal/30" />
        <div className="absolute bottom-20 left-4 md:left-8 w-20 h-20 border-l-2 border-b-2 border-gta-teal/30" />
        <div className="absolute bottom-20 right-4 md:right-8 w-20 h-20 border-r-2 border-b-2 border-gta-pink/30" />
        
        {/* Palm tree silhouettes would go here */}
      </section>
    </div>
  );
};

export default Home;
