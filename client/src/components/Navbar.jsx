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
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation - GTA Pause Menu Style */}
      <nav className="fixed top-4 right-20 z-50 hidden lg:block">
        <button
          onClick={() => setIsDesktopOpen((prev) => !prev)}
          className="mb-3 ml-auto flex items-center gap-2 px-3 py-2 bg-black/55 border border-white/25 rounded-[12px] text-white hover:text-gta-orange hover:border-gta-orange/60 transition-colors duration-200"
        >
          {isDesktopOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="font-rajdhani text-xs uppercase tracking-[0.22em]">Pause</span>
        </button>

        <AnimatePresence>
          {isDesktopOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 backdrop-blur-[2px] bg-black/10 -z-10"
              />

              <motion.div
                initial={{ opacity: 0, x: 26, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 26, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="relative"
              >
                <div className="pause-panel rounded-[18px] p-4 w-60">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/15">
                    <Map className="w-4 h-4 text-white/90" />
                    <span className="pause-title text-white">PAUSE MENU</span>
                  </div>

                  <ul className="space-y-1">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.path);

                      return (
                        <li key={link.path}>
                          <Link to={link.path} className={`pause-menu-row ${active ? 'active' : ''}`}>
                            <span className={`pause-left-bar ${active ? 'on' : ''}`} />
                            <Icon className={`w-4 h-4 transition-colors duration-200 ${active ? 'text-gta-orange' : 'text-white/85'}`} />
                            <span className="pause-item-text">{link.label}</span>
                            <span className={`pause-dot ${active ? 'on' : ''}`} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4 pt-3 border-t border-white/15">
                    <WantedLevel />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
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
                        className={`pause-menu-row ${active ? 'active' : ''}`}
                      >
                        <span className={`pause-left-bar ${active ? 'on' : ''}`} />
                        <Icon className={`w-5 h-5 ${active ? 'text-gta-orange' : 'text-white/85'}`} />
                        <span className="pause-item-text text-base">{link.label}</span>
                        <span className={`pause-dot ${active ? 'on' : ''}`} />
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
