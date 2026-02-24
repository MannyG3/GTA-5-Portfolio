import { motion } from 'framer-motion';

const LoadingScreen = ({ onStart }) => {
  const panels = ['/images/gta-bg.jpg', '/images/gta-bg.jpg', '/images/gta-bg.jpg'];

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="loading-art-strip"
        animate={{ x: ['0%', '-33.3333%', '-66.6666%'] }}
        transition={{ duration: 14, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
      >
        {panels.map((panel, index) => (
          <div
            key={`${panel}-${index}`}
            className="loading-art-panel"
            style={{ backgroundImage: `url(${panel})` }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-black/55" />
      
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Vignette */}
      <div className="vignette-overlay" />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-15" />
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* GTA style loading text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="font-bebas text-6xl md:text-8xl tracking-tight mb-2 text-white">
            GRAND THEFT AUTO
          </h1>
          <p className="font-rajdhani text-xl md:text-2xl text-text-muted tracking-[0.3em] uppercase">
            Portfolio Mode
          </p>
        </motion.div>

        {/* Loading bar */}
        <div className="loading-bar-container mt-10">
          <motion.div
            className="loading-bar-fill"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Loading tips */}
        <motion.p
          className="mt-8 text-text-dim text-sm font-inter tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Press Start to enter Los Santos
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          onClick={onStart}
          className="mt-6 px-8 py-3 bg-black/70 border border-white/40 text-white font-rajdhani uppercase tracking-wider hover:border-gta-orange hover:text-gta-orange transition-colors"
        >
          Start Experience
        </motion.button>
      </div>

      <div className="loading-spinner" aria-hidden="true" />

      {/* Corner decorations - Pink/Teal */}
      <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-gta-orange/30" />
      <div className="absolute top-6 right-6 w-20 h-20 border-r-2 border-t-2 border-gta-teal/30" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-gta-teal/30" />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-gta-orange/30" />
    </motion.div>
  );
};

export default LoadingScreen;
