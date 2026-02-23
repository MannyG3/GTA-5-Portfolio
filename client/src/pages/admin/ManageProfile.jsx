import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Loader2, Plus, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { profileAPI, uploadAPI } from '../../services/api';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  tagline: z.string().optional(),
  profileImageUrl: z.string().optional(),
  stats: z.array(z.object({
    label: z.string().min(1, 'Label is required'),
    value: z.number().min(0).max(100),
  })),
  socials: z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    email: z.string().optional(),
    resume: z.string().optional(),
  }),
});

const ManageProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      stats: [],
      socials: {},
    },
  });

  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({
    control,
    name: 'stats',
  });

  const profileImageUrl = watch('profileImageUrl');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI.get();
        reset(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await profileAPI.update(data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadAPI.single(file);
      setValue('profileImageUrl', response.data.url);
      toast.success('Image uploaded!');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="font-rajdhani text-gta-orange">Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-white tracking-wider mb-2">
          Manage Profile
        </h1>
        <p className="font-rajdhani text-gray-400">
          Update your character information
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gta-card p-6"
          >
            <h3 className="font-bebas text-xl text-gta-orange mb-4">Profile Image</h3>
            
            <div className="aspect-square rounded-lg overflow-hidden bg-gta-bg mb-4 relative">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
            </div>

            <label className="gta-btn w-full flex items-center justify-center gap-2 cursor-pointer">
              {uploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </motion.div>

          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 gta-card p-6"
          >
            <h3 className="font-bebas text-xl text-gta-orange mb-4">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Name</label>
                <input {...register('name')} className="gta-input" />
                {errors.name && <p className="mt-1 text-sm text-gta-red">{errors.name.message}</p>}
              </div>
              
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Role</label>
                <input {...register('role')} className="gta-input" />
              </div>
              
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Location</label>
                <input {...register('location')} className="gta-input" />
              </div>
              
              <div>
                <label className="block font-rajdhani text-sm text-gray-400 mb-2">Tagline</label>
                <input {...register('tagline')} className="gta-input" placeholder="Full Stack Developer | MERN | AI" />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Bio</label>
              <textarea {...register('bio')} rows={4} className="gta-input resize-none" />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gta-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bebas text-xl text-gta-orange">Character Stats</h3>
            <button
              type="button"
              onClick={() => appendStat({ label: '', value: 50 })}
              className="gta-btn text-sm py-2 px-4 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Stat
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block font-rajdhani text-sm text-gray-400 mb-2">Label</label>
                  <input {...register(`stats.${index}.label`)} className="gta-input" />
                </div>
                <div className="w-24">
                  <label className="block font-rajdhani text-sm text-gray-400 mb-2">Value</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    {...register(`stats.${index}.value`, { valueAsNumber: true })}
                    className="gta-input"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="p-3 text-gta-red hover:bg-gta-red/10 rounded transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gta-card p-6"
        >
          <h3 className="font-bebas text-xl text-gta-orange mb-4">Social Links</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">GitHub</label>
              <input {...register('socials.github')} className="gta-input" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">LinkedIn</label>
              <input {...register('socials.linkedin')} className="gta-input" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Twitter</label>
              <input {...register('socials.twitter')} className="gta-input" placeholder="https://twitter.com/..." />
            </div>
            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Instagram</label>
              <input {...register('socials.instagram')} className="gta-input" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Email</label>
              <input {...register('socials.email')} className="gta-input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block font-rajdhani text-sm text-gray-400 mb-2">Resume URL</label>
              <input {...register('socials.resume')} className="gta-input" placeholder="https://..." />
            </div>
          </div>
        </motion.div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="gta-btn-primary flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageProfile;
