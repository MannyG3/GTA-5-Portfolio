import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, Save, Loader2, Edit2, X, Award, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { achievementsAPI } from '../../services/api';

const categories = ['Certificate', 'Award', 'Badge', 'License', 'Other'];

const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      issuer: '',
      date: '',
      imageUrl: '',
      category: 'Certificate',
      credentialUrl: '',
      description: '',
    },
  });

  const fetchAchievements = async () => {
    try {
      const response = await achievementsAPI.getAll();
      setAchievements(response.data);
    } catch (error) {
      toast.error('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const formatDateForInput = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const onSubmit = async (data) => {
    setSaving(true);

    try {
      if (editingId) {
        await achievementsAPI.update(editingId, data);
        toast.success('Achievement updated!');
      } else {
        await achievementsAPI.create(data);
        toast.success('Achievement created!');
      }
      resetForm();
      fetchAchievements();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (achievement) => {
    setEditingId(achievement._id);
    setShowForm(true);
    reset({
      title: achievement.title,
      issuer: achievement.issuer,
      date: formatDateForInput(achievement.date),
      imageUrl: achievement.imageUrl || '',
      category: achievement.category,
      credentialUrl: achievement.credentialUrl || '',
      description: achievement.description || '',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this achievement?')) return;
    
    try {
      await achievementsAPI.delete(id);
      toast.success('Deleted!');
      fetchAchievements();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    reset({
      title: '',
      issuer: '',
      date: '',
      imageUrl: '',
      category: 'Certificate',
      credentialUrl: '',
      description: '',
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-rajdhani text-gta-orange">Loading achievements...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bebas text-4xl text-white tracking-wider mb-2">
            Manage Achievements
          </h1>
          <p className="font-rajdhani text-gray-400">
            Add your certifications and awards
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="gta-btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Achievement
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
              {editingId ? 'Edit Achievement' : 'New Achievement'}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Title*</label>
                <input {...register('title')} className="gta-input" required />
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Issuer*</label>
                <input {...register('issuer')} className="gta-input" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Category</label>
                <select {...register('category')} className="gta-input">
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Date*</label>
                <input type="date" {...register('date')} className="gta-input" required />
              </div>
            </div>

            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Description</label>
              <textarea {...register('description')} rows={2} className="gta-input resize-none" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Image URL</label>
                <input {...register('imageUrl')} className="gta-input" />
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Credential URL</label>
                <input {...register('credentialUrl')} className="gta-input" />
              </div>
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

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gta-card p-4"
          >
            {achievement.imageUrl && (
              <div className="h-32 mb-3 rounded overflow-hidden bg-gta-bg">
                <img src={achievement.imageUrl} alt={achievement.title} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-gta-yellow" />
              <span className="text-xs text-gta-yellow font-rajdhani">{achievement.category}</span>
            </div>
            
            <h4 className="font-bebas text-lg text-white mb-1">{achievement.title}</h4>
            <p className="text-gta-teal text-sm mb-1">{achievement.issuer}</p>
            <p className="text-gray-500 text-xs mb-3">{formatDate(achievement.date)}</p>

            <div className="flex items-center justify-between">
              {achievement.credentialUrl ? (
                <a
                  href={achievement.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gta-orange text-sm flex items-center gap-1 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </a>
              ) : (
                <span />
              )}
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(achievement)}
                  className="p-2 text-gta-teal hover:bg-gta-teal/10 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(achievement._id)}
                  className="p-2 text-gta-red hover:bg-gta-red/10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {achievements.length === 0 && !showForm && (
        <div className="text-center py-16 text-gray-500">
          No achievements yet
        </div>
      )}
    </div>
  );
};

export default ManageAchievements;
