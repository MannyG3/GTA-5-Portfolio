import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  Code, 
  Briefcase, 
  Award, 
  MessageSquare,
  User,
  TrendingUp,
  Clock
} from 'lucide-react';
import { 
  projectsAPI, 
  skillsAPI, 
  experienceAPI, 
  achievementsAPI, 
  messagesAPI 
} from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    achievements: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experience, achievements, messages] = await Promise.all([
          projectsAPI.getAll(),
          skillsAPI.getAll(),
          experienceAPI.getAll(),
          achievementsAPI.getAll(),
          messagesAPI.getAll(),
        ]);

        setStats({
          projects: projects.data.length,
          skills: skills.data.reduce((acc, cat) => acc + cat.items.length, 0),
          experience: experience.data.length,
          achievements: achievements.data.length,
          unreadMessages: messages.data.unreadCount || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'gta-orange', link: '/admin/projects' },
    { label: 'Skills', value: stats.skills, icon: Code, color: 'gta-teal', link: '/admin/skills' },
    { label: 'Experience', value: stats.experience, icon: Briefcase, color: 'gta-peach', link: '/admin/experience' },
    { label: 'Achievements', value: stats.achievements, icon: Award, color: 'gta-yellow', link: '/admin/achievements' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: MessageSquare, color: 'gta-red', link: '/admin/messages' },
  ];

  const quickActions = [
    { label: 'Edit Profile', icon: User, link: '/admin/profile', color: 'gta-orange' },
    { label: 'Add Project', icon: FolderKanban, link: '/admin/projects', color: 'gta-teal' },
    { label: 'View Messages', icon: MessageSquare, link: '/admin/messages', color: 'gta-peach' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-rajdhani text-gta-orange">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-white tracking-wider mb-2">
          Dashboard
        </h1>
        <p className="font-rajdhani text-gray-400">
          Welcome back to the control center
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={stat.link}
                className="gta-card p-5 block hover:border-gta-orange/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-6 h-6 text-${stat.color}`} />
                  <TrendingUp className="w-4 h-4 text-gray-600" />
                </div>
                <p className={`font-bebas text-3xl text-${stat.color}`}>
                  {stat.value}
                </p>
                <p className="font-rajdhani text-sm text-gray-400">
                  {stat.label}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-bebas text-2xl text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Link
                  to={action.link}
                  className={`gta-card p-6 flex items-center gap-4 hover:border-${action.color}/50 transition-all group`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-${action.color}/20 flex items-center justify-center group-hover:bg-${action.color}/30 transition-colors`}>
                    <Icon className={`w-6 h-6 text-${action.color}`} />
                  </div>
                  <span className="font-rajdhani text-lg text-text-primary group-hover:text-gta-orange transition-colors">
                    {action.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="gta-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gta-orange" />
          <h2 className="font-bebas text-2xl text-white">System Status</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400">API Server</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gta-orange animate-pulse" />
              <span className="text-gta-orange text-sm">Online</span>
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-800">
            <span className="text-gray-400">Database</span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gta-orange animate-pulse" />
              <span className="text-gta-orange text-sm">Connected</span>
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-400">Last Updated</span>
            <span className="text-gray-500 text-sm">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
