import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gta-bg relative overflow-x-hidden">
      {/* Los Santos Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ 
          backgroundImage: 'url(/images/gta-bg.jpg)',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-gta-bg/75 pointer-events-none" />
      
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-gta-purple/20 via-transparent to-gta-teal/10 pointer-events-none" />
      
      {/* Grid background */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Vignette */}
      <div className="vignette-overlay" />

      {/* Chromatic aberration */}
      <div className="chromatic-aberration" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="relative z-10">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
