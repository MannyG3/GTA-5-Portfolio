import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Experience from './pages/Experience';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageProfile from './pages/admin/ManageProfile';
import ManageSkills from './pages/admin/ManageSkills';
import ManageProjects from './pages/admin/ManageProjects';
import ManageExperience from './pages/admin/ManageExperience';
import ManageAchievements from './pages/admin/ManageAchievements';
import ManageMessages from './pages/admin/ManageMessages';

// Components
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AudioToggle from './components/AudioToggle';

// Context
import { AuthProvider } from './context/AuthContext';
import { ScrollProvider } from './context/ScrollContext';
import { useGlobalAudio } from './context/AudioContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { startAudio } = useGlobalAudio();

  const handleStartExperience = () => {
    startAudio();
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onStart={handleStartExperience} />;
  }

  return (
    <AuthProvider>
      <ScrollProvider>
        <Router>
          {/* Noise overlay for GTA effect */}
          <div className="noise-overlay" />
          <AudioToggle />
          
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0a0a0a',
                color: '#fff',
                border: '1px solid rgba(255, 179, 92, 0.35)',
              },
              success: {
                iconTheme: {
                  primary: '#ffb35c',
                  secondary: '#0a0a0a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff1744',
                  secondary: '#0a0a0a',
                },
              },
            }}
          />

          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ManageProfile />} />
              <Route path="skills" element={<ManageSkills />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="experience" element={<ManageExperience />} />
              <Route path="achievements" element={<ManageAchievements />} />
              <Route path="messages" element={<ManageMessages />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ScrollProvider>
    </AuthProvider>
  );
}

export default App;
