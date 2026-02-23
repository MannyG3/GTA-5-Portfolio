import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background with tropical gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gta-sky/20 via-gta-bg to-gta-purple/20" />
      
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Vignette */}
      <div className="vignette-overlay" />
      
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-15" />
      
      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Vice City style loading text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1 className="font-bebas text-6xl md:text-8xl tracking-tight mb-2">
            <span className="text-gta-pink" style={{ textShadow: '0 0 30px rgba(232, 164, 184, 0.5)' }}>VICE</span>
            <span className="text-gta-teal ml-3" style={{ textShadow: '0 0 30px rgba(107, 191, 181, 0.5)' }}>CITY</span>
          </h1>
          <p className="font-rajdhani text-xl md:text-2xl text-text-muted tracking-[0.3em] uppercase">
            Loading Portfolio
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
          Welcome to Vice City, enjoy the sunshine...
        </motion.p>
      </div>

      {/* Corner decorations - Pink/Teal */}
      <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-gta-pink/30" />
      <div className="absolute top-6 right-6 w-20 h-20 border-r-2 border-t-2 border-gta-teal/30" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-gta-teal/30" />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-gta-pink/30" />
    </motion.div>
  );
};

export default LoadingScreen;
