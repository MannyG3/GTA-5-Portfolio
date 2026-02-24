import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-gta-teal/10 bg-gta-bg/90 backdrop-blur-md">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gta-pink/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="font-bebas text-2xl tracking-wider group flex items-center gap-1">
            <span className="text-gta-pink group-hover:text-gta-coral transition-colors">LOS</span>
            <span className="text-gta-teal group-hover:text-gta-tealLight transition-colors">SANTOS</span>
            <span className="text-text-muted ml-1">PORTFOLIO</span>
          </Link>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-text-dim hover:text-gta-teal transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(107,191,181,0.5)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-text-dim hover:text-gta-pink transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(232,164,184,0.5)]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:you@example.com"
              className="text-text-dim hover:text-gta-coral transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(245,149,122,0.5)]"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-text-dim text-sm flex items-center gap-1.5 font-rajdhani">
            © {currentYear} Made with 
            <Heart className="w-4 h-4 text-gta-pink animate-pulse" style={{ animationDuration: '2s' }} /> 
            in Los Santos
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
