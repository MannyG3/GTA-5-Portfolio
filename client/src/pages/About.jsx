import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Code, Palette, Server, Brain } from 'lucide-react';
import { profileAPI } from '../services/api';
import SectionTitle from '../components/SectionTitle';
import SocialLinks from '../components/SocialLinks';
import SkillBar from '../components/SkillBar';

const fallbackProfile = {
  name: 'Mayur Mahadev Gund',
  role: 'Full Stack Developer & Training & Placement Officer',
  location: 'Pune (The "Los Santos" of Tech)',
  profileImageUrl: '/images/profile-mayur.png',
  bio: `The Specialist

Operating out of the AIML Department, Mayur isn't just managing the lab; he's the "Mastermind" behind the infrastructure. As a Training and Placement Officer, he's the one who scouts the talent and sets up the "heists"—connecting high-potential developers with top-tier industry players.

When he isn't optimizing Full Stack architectures or securing the network, he's deep into Ethical Hacking and Cyber Security. Much like a high-level character in Los Santos, he lives by the Atomic Habits code: constant improvement, tactical precision, and a relentless focus on the next big mission.`,
  socials: {
    github: 'https://github.com/MannyG3',
    linkedin: 'https://www.linkedin.com/in/mayurgund99/',
    email: 'mayurgund3333@gmail.com',
  },
  stats: [
    { label: 'Full Stack Development Expert', value: 100 },
    { label: 'Placement & Strategy Mastermind', value: 95 },
    { label: 'Cyber Security Ghost Mode', value: 93 },
    { label: 'AIML Operations Commander', value: 96 },
    { label: 'Tactical Scaling', value: 98 },
  ],
};

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI.get();
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setProfile(fallbackProfile);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-rajdhani text-gta-orange">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle 
          title="Character Profile" 
          subtitle="Get to know the developer behind the code"
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="gta-card p-6 sticky top-24">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="aspect-square rounded-lg overflow-hidden bg-gta-bg border-2 border-gta-orange/30">
                  {profile?.profileImageUrl ? (
                    <img
                      src={profile.profileImageUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gta-bg to-gta-surface">
                      <span className="font-bebas text-6xl text-gta-orange/30">
                        {profile?.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
                {/* Status indicator */}
                <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-gta-bg/90 px-3 py-1 rounded-full border border-gta-teal/30">
                  <div className="w-2 h-2 rounded-full bg-gta-teal animate-pulse" />
                  <span className="text-xs font-rajdhani text-gta-teal">Available for High-Stakes Projects</span>
                </div>
              </div>

              {/* Name & Role */}
              <h2 className="font-bebas text-3xl text-text-primary mb-1">
                {profile?.name || fallbackProfile.name}
              </h2>
              <p className="font-rajdhani text-gta-teal mb-4">
                {profile?.role || fallbackProfile.role}
              </p>

              {/* Location */}
              <div className="flex items-center gap-2 text-text-muted mb-6">
                <MapPin className="w-4 h-4 text-gta-orange" />
                <span className="text-sm">{profile?.location || fallbackProfile.location}</span>
              </div>

              {/* Social Links */}
              <SocialLinks socials={profile?.socials || fallbackProfile.socials} />
            </div>
          </motion.div>

          {/* Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Bio */}
            <div className="gta-card p-6">
              <h3 className="font-bebas text-2xl text-gta-orange mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Biography
              </h3>
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {profile?.bio || fallbackProfile.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="gta-card p-6">
              <h3 className="font-bebas text-2xl text-gta-orange mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Character Stats
              </h3>
              <div className="grid md:grid-cols-2 gap-x-8">
                {(profile?.stats || fallbackProfile.stats).map((stat, index) => (
                  <SkillBar
                    key={stat.label}
                    name={stat.label}
                    level={stat.value}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="grid sm:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="gta-card p-4 text-center group"
              >
                <Code className="w-8 h-8 text-gta-orange mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-rajdhani text-text-muted text-sm">Clean Code</p>
                <p className="font-bebas text-2xl text-text-primary">Advocate</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="gta-card p-4 text-center group"
              >
                <Palette className="w-8 h-8 text-gta-teal mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-rajdhani text-text-muted text-sm">UI/UX</p>
                <p className="font-bebas text-2xl text-text-primary">Enthusiast</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                className="gta-card p-4 text-center group"
              >
                <Server className="w-8 h-8 text-gta-peach mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-rajdhani text-text-muted text-sm">Backend</p>
                <p className="font-bebas text-2xl text-text-primary">Expert</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
