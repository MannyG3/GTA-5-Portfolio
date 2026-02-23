import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Save, Loader2, Edit2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { skillsAPI } from '../../services/api';

const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      category: 'Frontend',
      items: [{ name: '', level: 80, icon: '' }],
      order: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const fetchSkills = async () => {
    try {
      const response = await skillsAPI.getAll();
      setSkills(response.data);
    } catch (error) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (editingId) {
        await skillsAPI.update(editingId, data);
        toast.success('Skill category updated!');
      } else {
        await skillsAPI.create(data);
        toast.success('Skill category created!');
      }
      resetForm();
      fetchSkills();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    reset({
      category: skill.category,
      items: skill.items,
      order: skill.order || 0,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill category?')) return;
    
    try {
      await skillsAPI.delete(id);
      toast.success('Deleted!');
      fetchSkills();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    reset({
      category: 'Frontend',
      items: [{ name: '', level: 80, icon: '' }],
      order: 0,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-rajdhani text-gta-orange">Loading skills...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-white tracking-wider mb-2">
          Manage Skills
        </h1>
        <p className="font-rajdhani text-gray-400">
          Add and organize your skill categories
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="gta-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bebas text-xl text-gta-orange">
              {editingId ? 'Edit Category' : 'Add Category'}
            </h3>
            {editingId && (
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Category</label>
                <select {...register('category')} className="gta-input">
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Order</label>
                <input type="number" {...register('order', { valueAsNumber: true })} className="gta-input" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-rajdhani text-sm text-gray-400">Skills</label>
                <button
                  type="button"
                  onClick={() => append({ name: '', level: 80, icon: '' })}
                  className="text-gta-orange text-sm flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </button>
              </div>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      {...register(`items.${index}.name`)}
                      placeholder="Skill name"
                      className="gta-input flex-1"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      {...register(`items.${index}.level`, { valueAsNumber: true })}
                      className="gta-input w-20"
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-gta-red hover:bg-gta-red/10 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="gta-btn-primary w-full flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {editingId ? 'Update' : 'Create'}
            </button>
          </form>
        </motion.div>

        {/* List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {skills.map((skill) => (
            <div key={skill._id} className="gta-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bebas text-xl text-white">{skill.category}</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 text-gta-teal hover:bg-gta-teal/10 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-2 text-gta-red hover:bg-gta-red/10 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item.name}
                    className="px-3 py-1 text-sm bg-gta-bg border border-gta-surfaceAlt rounded text-text-secondary"
                  >
                    {item.name} ({item.level}%)
                  </span>
                ))}
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No skills added yet
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ManageSkills;
