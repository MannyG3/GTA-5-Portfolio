import { Github, Linkedin, Twitter, Instagram, Mail, FileText } from 'lucide-react';

const SocialLinks = ({ socials, size = 'md' }) => {
  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  const buttonSize = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  }[size];

  const socialConfig = [
    { key: 'github', icon: Github, label: 'GitHub', hoverColor: 'hover:text-gta-orange hover:border-gta-orange/60 hover:shadow-[0_0_15px_rgba(255,179,92,0.3)]' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', hoverColor: 'hover:text-gta-teal hover:border-gta-teal/60 hover:shadow-[0_0_15px_rgba(25,194,199,0.3)]' },
    { key: 'twitter', icon: Twitter, label: 'Twitter', hoverColor: 'hover:text-gta-blue hover:border-gta-blue/60 hover:shadow-[0_0_15px_rgba(45,125,255,0.3)]' },
    { key: 'instagram', icon: Instagram, label: 'Instagram', hoverColor: 'hover:text-gta-peach hover:border-gta-peach/60 hover:shadow-[0_0_15px_rgba(255,122,89,0.3)]' },
    { key: 'email', icon: Mail, label: 'Email', isEmail: true, hoverColor: 'hover:text-gta-orange hover:border-gta-orange/60 hover:shadow-[0_0_15px_rgba(255,179,92,0.3)]' },
    { key: 'resume', icon: FileText, label: 'Resume', hoverColor: 'hover:text-gta-teal hover:border-gta-teal/60 hover:shadow-[0_0_15px_rgba(25,194,199,0.3)]' },
  ];

  const getHref = (config, value) => {
    if (config.isEmail) return `mailto:${value}`;
    return value;
  };

  return (
    <div className="flex flex-wrap gap-3">
      {socialConfig.map((config) => {
        const value = socials?.[config.key];
        if (!value) return null;

        const Icon = config.icon;
        
        return (
          <a
            key={config.key}
            href={getHref(config, value)}
            target={config.isEmail ? undefined : '_blank'}
            rel={config.isEmail ? undefined : 'noopener noreferrer'}
            className={`${buttonSize} bg-gta-surface border border-gta-surfaceAlt rounded-lg
              text-text-dim ${config.hoverColor}
              transition-all duration-300 hover:scale-110`}
            title={config.label}
          >
            <Icon className={iconSize} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
