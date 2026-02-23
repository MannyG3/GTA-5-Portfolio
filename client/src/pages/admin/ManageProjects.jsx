import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, Save, Loader2, Edit2, X, Star, ExternalLink, Github } from 'lucide-react';
import toast from 'react-hot-toast';
import { projectsAPI } from '../../services/api';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      shortDesc: '',
      fullDesc: '',
      tags: '',
      difficulty: 3,
      objectives: '',
      challenges: '',
      role: 'Full Stack Developer',
      outcome: '',
      screenshots: '',
      thumbnailUrl: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      status: 'completed',
    },
  });

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data) => {
    setSaving(true);
    
    // Convert string arrays
    const formattedData = {
      ...data,
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      objectives: data.objectives ? data.objectives.split('\n').filter(Boolean) : [],
      challenges: data.challenges ? data.challenges.split('\n').filter(Boolean) : [],
      screenshots: data.screenshots ? data.screenshots.split('\n').filter(Boolean) : [],
      difficulty: parseInt(data.difficulty),
    };

    try {
      if (editingId) {
        await projectsAPI.update(editingId, formattedData);
        toast.success('Project updated!');
      } else {
        await projectsAPI.create(formattedData);
        toast.success('Project created!');
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setShowForm(true);
    reset({
      title: project.title,
      shortDesc: project.shortDesc,
      fullDesc: project.fullDesc || '',
      tags: project.tags?.join(', ') || '',
      difficulty: project.difficulty,
      objectives: project.objectives?.join('\n') || '',
      challenges: project.challenges?.join('\n') || '',
      role: project.role || '',
      outcome: project.outcome || '',
      screenshots: project.screenshots?.join('\n') || '',
      thumbnailUrl: project.thumbnailUrl || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured,
      status: project.status,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    
    try {
      await projectsAPI.delete(id);
      toast.success('Project deleted!');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    reset({
      title: '',
      shortDesc: '',
      fullDesc: '',
      tags: '',
      difficulty: 3,
      objectives: '',
      challenges: '',
      role: 'Full Stack Developer',
      outcome: '',
      screenshots: '',
      thumbnailUrl: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      status: 'completed',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-rajdhani text-gta-orange">Loading projects...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bebas text-4xl text-white tracking-wider mb-2">
            Manage Projects
          </h1>
          <p className="font-rajdhani text-gray-400">
            Add and edit your mission portfolio
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="gta-btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gta-card p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bebas text-2xl text-gta-orange">
              {editingId ? 'Edit Project' : 'New Project'}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Title*</label>
                <input {...register('title')} className="gta-input" required />
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Role</label>
                <input {...register('role')} className="gta-input" />
              </div>
            </div>

            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Short Description*</label>
              <input {...register('shortDesc')} className="gta-input" maxLength={200} required />
            </div>

            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Full Description</label>
              <textarea {...register('fullDesc')} rows={4} className="gta-input resize-none" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Tags (comma separated)</label>
                <input {...register('tags')} className="gta-input" placeholder="React, Node.js, MongoDB" />
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Difficulty (1-5)</label>
                <select {...register('difficulty')} className="gta-input">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Status</label>
                <select {...register('status')} className="gta-input">
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Objectives (one per line)</label>
                <textarea {...register('objectives')} rows={3} className="gta-input resize-none" />
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Challenges (one per line)</label>
                <textarea {...register('challenges')} rows={3} className="gta-input resize-none" />
              </div>
            </div>

            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Outcome</label>
              <textarea {...register('outcome')} rows={2} className="gta-input resize-none" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">GitHub URL</label>
                <input {...register('githubUrl')} className="gta-input" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Live URL</label>
                <input {...register('liveUrl')} className="gta-input" placeholder="https://..." />
              </div>
            </div>

            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Thumbnail URL</label>
              <input {...register('thumbnailUrl')} className="gta-input" />
            </div>

            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Screenshots (one URL per line)</label>
              <textarea {...register('screenshots')} rows={3} className="gta-input resize-none" />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" {...register('featured')} id="featured" className="w-4 h-4" />
              <label htmlFor="featured" className="font-rajdhani text-gray-400">Featured Project</label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="gta-btn-primary flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {editingId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={resetForm} className="gta-btn">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gta-card p-4"
          >
            {project.thumbnailUrl && (
              <div className="h-32 mb-3 rounded overflow-hidden bg-gta-bg">
                <img src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-bebas text-xl text-white">{project.title}</h4>
              {project.featured && (
                <span className="px-2 py-0.5 text-xs bg-gta-orange text-gta-bg rounded font-rajdhani">
                  Featured
                </span>
              )}
            </div>
            
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.shortDesc}</p>
            
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`w-4 h-4 ${n <= project.difficulty ? 'text-gta-yellow fill-gta-yellow' : 'text-gray-600'}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 text-gta-teal hover:bg-gta-teal/10 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 text-gta-red hover:bg-gta-red/10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {projects.length === 0 && !showForm && (
        <div className="text-center py-16 text-gray-500">
          No projects yet. Add your first mission!
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
