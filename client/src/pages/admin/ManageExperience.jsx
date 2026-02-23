import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, Save, Loader2, Edit2, X, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { experienceAPI } from '../../services/api';

const types = ['Job', 'Internship', 'Freelance', 'Education', 'Club', 'Volunteer'];

const ManageExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: '',
      org: '',
      startDate: '',
      endDate: '',
      description: '',
      highlights: '',
      type: 'Job',
      location: '',
      logoUrl: '',
    },
  });

  const fetchExperiences = async () => {
    try {
      const response = await experienceAPI.getAll();
      setExperiences(response.data);
    } catch (error) {
      toast.error('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const formatDateForInput = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const onSubmit = async (data) => {
    setSaving(true);
    
    const formattedData = {
      ...data,
      highlights: data.highlights ? data.highlights.split('\n').filter(Boolean) : [],
      endDate: data.endDate || null,
    };

    try {
      if (editingId) {
        await experienceAPI.update(editingId, formattedData);
        toast.success('Experience updated!');
      } else {
        await experienceAPI.create(formattedData);
        toast.success('Experience created!');
      }
      resetForm();
      fetchExperiences();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setShowForm(true);
    reset({
      title: exp.title,
      org: exp.org,
      startDate: formatDateForInput(exp.startDate),
      endDate: formatDateForInput(exp.endDate),
      description: exp.description || '',
      highlights: exp.highlights?.join('\n') || '',
      type: exp.type,
      location: exp.location || '',
      logoUrl: exp.logoUrl || '',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this experience?')) return;
    
    try {
      await experienceAPI.delete(id);
      toast.success('Deleted!');
      fetchExperiences();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    reset({
      title: '',
      org: '',
      startDate: '',
      endDate: '',
      description: '',
      highlights: '',
      type: 'Job',
      location: '',
      logoUrl: '',
    });
  };

  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-rajdhani text-gta-orange">Loading experiences...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bebas text-4xl text-white tracking-wider mb-2">
            Manage Experience
          </h1>
          <p className="font-rajdhani text-gray-400">
            Add your career timeline entries
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="gta-btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Experience
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
              {editingId ? 'Edit Experience' : 'New Experience'}
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
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Organization*</label>
                <input {...register('org')} className="gta-input" required />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Type</label>
                <select {...register('type')} className="gta-input">
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Location</label>
                <input {...register('location')} className="gta-input" />
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Start Date*</label>
                <input type="date" {...register('startDate')} className="gta-input" required />
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">End Date</label>
                <input type="date" {...register('endDate')} className="gta-input" />
                <p className="text-xs text-gray-500 mt-1">Leave empty for current</p>
              </div>
            </div>

            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Description</label>
              <textarea {...register('description')} rows={3} className="gta-input resize-none" />
            </div>

            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Highlights (one per line)</label>
              <textarea {...register('highlights')} rows={3} className="gta-input resize-none" />
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

      {/* List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <motion.div
            key={exp._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gta-card p-5"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 text-xs rounded font-rajdhani ${
                    exp.type === 'Job' ? 'bg-gta-orange/20 text-gta-orange' :
                    exp.type === 'Education' ? 'bg-gta-peach/20 text-gta-peach' :
                    'bg-gta-teal/20 text-gta-teal'
                  }`}>
                    {exp.type}
                  </span>
                  <h4 className="font-bebas text-xl text-white">{exp.title}</h4>
                </div>
                <p className="font-rajdhani text-gta-teal mb-2">{exp.org}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 text-gta-teal hover:bg-gta-teal/10 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="p-2 text-gta-red hover:bg-gta-red/10 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {experiences.length === 0 && !showForm && (
        <div className="text-center py-16 text-gray-500">
          No experience entries yet
        </div>
      )}
    </div>
  );
};

export default ManageExperience;
