import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { messagesAPI, profileAPI } from '../services/api';
import SectionTitle from '../components/SectionTitle';
import SocialLinks from '../components/SocialLinks';

const messageSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required').max(2000),
});

const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI.get();
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    setSending(true);
    try {
      await messagesAPI.send(data);
      toast.success('Message sent to HQ ✅', {
        icon: '📡',
        style: {
          background: '#12161C',
          color: '#FFB35C',
          border: '1px solid #FFB35C',
        },
      });
      reset();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <SectionTitle 
          title="Contact HQ" 
          subtitle="Get in touch - I don't bite (usually)"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Phone UI style contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="phone-ui">
              {/* Phone header */}
              <div className="bg-gta-surfaceAlt/60 px-4 py-3 flex items-center justify-between border-b border-gta-orange/10">
                <span className="text-xs text-text-dim">iFruit</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-text-dim" />
                  <div className="w-1 h-1 rounded-full bg-text-dim" />
                  <div className="w-1 h-1 rounded-full bg-text-dim" />
                </div>
                <span className="text-xs text-text-dim">100%</span>
              </div>

              {/* Phone content */}
              <div className="p-6">
                {/* Contact header */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gta-orange/20 border-2 border-gta-orange flex items-center justify-center">
                    <span className="font-bebas text-3xl text-gta-orange">
                      {profile?.name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <h3 className="font-bebas text-2xl text-text-primary">
                    {profile?.name || 'Developer'}
                  </h3>
                  <p className="font-rajdhani text-text-muted">
                    {profile?.role || 'Full Stack Developer'}
                  </p>
                </div>

                {/* Contact options */}
                <div className="space-y-4 mb-6">
                  {profile?.socials?.email && (
                    <a
                      href={`mailto:${profile.socials.email}`}
                      className="flex items-center gap-4 p-4 bg-gta-bg rounded-lg border border-gta-surfaceAlt hover:border-gta-orange transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gta-orange/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-gta-orange" />
                      </div>
                      <div>
                        <p className="text-xs text-text-dim">Email</p>
                        <p className="text-text-primary group-hover:text-gta-orange transition-colors">
                          {profile.socials.email}
                        </p>
                      </div>
                    </a>
                  )}

                  {profile?.location && (
                    <div className="flex items-center gap-4 p-4 bg-gta-bg rounded-lg border border-gta-surfaceAlt">
                      <div className="w-10 h-10 rounded-full bg-gta-teal/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-gta-teal" />
                      </div>
                      <div>
                        <p className="text-xs text-text-dim">Location</p>
                        <p className="text-text-primary">{profile.location}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social links */}
                <div className="flex justify-center">
                  <SocialLinks socials={profile?.socials} />
                </div>
              </div>

              {/* Phone footer */}
              <div className="bg-gta-surfaceAlt/60 px-4 py-3 flex justify-center border-t border-gta-orange/10">
                <div className="w-24 h-1 rounded-full bg-text-dim" />
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="gta-card p-6 md:p-8">
              <h3 className="font-bebas text-2xl text-gta-orange mb-6 flex items-center gap-2">
                <Send className="w-5 h-5" />
                Send a Message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block font-rajdhani text-sm text-text-muted mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="gta-input"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-gta-red">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-rajdhani text-sm text-text-muted mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="gta-input"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-gta-red">{errors.email.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-rajdhani text-sm text-text-muted mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    className="gta-input resize-none"
                    placeholder="What's on your mind?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-gta-red">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="gta-btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
