import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, RotateCcw } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gta-bg px-4">
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="grain-overlay" />
      <div className="vignette-overlay" />
      
      {/* Red overlay for WASTED effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="fixed inset-0 bg-red-900 pointer-events-none"
      />

      <div className="relative z-10 text-center">
        {/* WASTED text */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 10
          }}
        >
          <h1 
            className="font-bebas text-8xl md:text-[12rem] text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 tracking-wider"
            style={{
              textShadow: '0 0 40px rgba(255, 0, 0, 0.5), 0 0 80px rgba(255, 0, 0, 0.3)',
              WebkitTextStroke: '2px rgba(255, 0, 0, 0.5)'
            }}
          >
            WASTED
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-rajdhani text-xl md:text-2xl text-text-muted mb-4"
        >
          Error 404 — Page Not Found
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-text-dim mb-8"
        >
          Looks like you took a wrong turn in Los Santos
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="gta-btn-primary flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Respawn Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="gta-btn-secondary flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Go Back
          </button>
        </motion.div>

        {/* Hospital fee joke */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-text-dim text-sm font-rajdhani"
        >
          Hospital fees: $500 (just kidding, it's free)
        </motion.p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-gta-orange/20" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-gta-teal/20" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-gta-teal/20" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-gta-orange/20" />
    </div>
  );
};

export default NotFound;
