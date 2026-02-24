import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, FolderKanban, Briefcase, Award, Mail, Map } from 'lucide-react';
import WantedLevel from './WantedLevel';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About', icon: User },
  { path: '/skills', label: 'Skills', icon: Code },
  { path: '/projects', label: 'Missions', icon: FolderKanban },
  { path: '/experience', label: 'Story', icon: Briefcase },
  { path: '/achievements', label: 'Trophies', icon: Award },
  { path: '/contact', label: 'Contact', icon: Mail },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation - GTA Pause Menu Style */}
      <nav className="fixed top-4 right-4 z-50 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="bg-black/65 backdrop-blur-sm border border-white/20 p-4 w-56 shadow-2xl">
            {/* Header with glow */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/15">
              <Map className="w-4 h-4 text-white" />
              <span className="font-rajdhani text-sm text-white uppercase tracking-widest">
                Pause Menu
              </span>
            </div>

            {/* Nav links */}
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                        active
                          ? 'bg-white/10 text-gta-orange'
                          : 'text-white hover:text-gta-orange hover:bg-white/10'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-gta-orange' : ''}`} />
                      <span className="font-rajdhani text-sm tracking-wide">{link.label}</span>
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-gta-orange shadow-lg"
                          style={{ boxShadow: '0 0 10px #FFB35C' }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Wanted Level */}
            <div className="mt-4 pt-3 border-t border-white/15">
              <WantedLevel />
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-black/75 backdrop-blur-sm border-b border-white/20">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <Link to="/" className="font-bebas text-2xl tracking-wider">
              <span className="text-white">GRAND</span>
              <span className="text-gta-orange ml-1">PORTFOLIO</span>
            </Link>

            {/* Wanted Level (mobile) */}
            <div className="flex items-center gap-4">
              <WantedLevel compact />
              
              {/* Menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white hover:text-gta-orange hover:bg-white/10 rounded-lg transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-black/90 backdrop-blur-sm border-b border-white/20"
            >
              <ul className="px-4 py-4 space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  
                  return (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          active
                            ? 'bg-white/10 text-gta-orange'
                            : 'text-white hover:text-gta-orange hover:bg-white/10'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${active ? 'text-gta-orange' : ''}`} />
                        <span className="font-rajdhani text-lg tracking-wide">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
