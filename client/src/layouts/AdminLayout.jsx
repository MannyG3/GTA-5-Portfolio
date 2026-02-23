import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  Code, 
  FolderKanban, 
  Briefcase, 
  Award, 
  MessageSquare,
  LogOut,
  Menu,
  X,
  Home,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/admin/profile', label: 'Profile', icon: User },
  { path: '/admin/skills', label: 'Skills', icon: Code },
  { path: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { path: '/admin/experience', label: 'Experience', icon: Briefcase },
  { path: '/admin/achievements', label: 'Achievements', icon: Award },
  { path: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, admin } = useAuth();

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gta-bg flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed left-0 top-0 h-full bg-gta-surface border-r border-gta-orange/20 transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gta-orange/20">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gta-orange rounded-lg flex items-center justify-center">
              <span className="font-bebas text-gta-bg text-xl">LS</span>
            </div>
            {sidebarOpen && (
              <span className="font-bebas text-xl text-gta-orange tracking-wider">
                ADMIN PANEL
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path, link.exact);
              
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? 'bg-gta-orange/20 text-gta-orange'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={!sidebarOpen ? link.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <span className="font-rajdhani">{link.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gta-orange/20 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-text-muted hover:text-gta-teal transition-colors"
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span className="font-rajdhani">View Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-gta-red transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-rajdhani">Logout</span>}
          </button>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-gta-surface border border-gta-orange/30 rounded-full flex items-center justify-center text-gta-orange hover:bg-gta-orange hover:text-gta-bg transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gta-surface border-b border-gta-orange/20 z-40 flex items-center justify-between px-4">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gta-orange rounded-lg flex items-center justify-center">
            <span className="font-bebas text-gta-bg">LS</span>
          </div>
          <span className="font-bebas text-lg text-gta-orange">ADMIN</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 text-gta-orange"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 bg-gta-surface border-r border-gta-orange/20 z-50"
            >
              <div className="p-4 border-b border-gta-orange/20 flex justify-between items-center">
                <span className="font-bebas text-xl text-gta-orange">ADMIN PANEL</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.path, link.exact);
                    
                    return (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            active
                              ? 'bg-gta-orange/20 text-gta-orange'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-rajdhani">{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gta-orange/20 space-y-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-2 text-text-muted hover:text-gta-teal"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-rajdhani">View Site</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-gta-red w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-rajdhani">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } pt-16 lg:pt-0`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
