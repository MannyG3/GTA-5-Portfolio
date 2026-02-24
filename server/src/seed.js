import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import Profile from './models/Profile.js';
import Skill from './models/Skill.js';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Achievement from './models/Achievement.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🎮 Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Profile.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Achievement.deleteMany({})
    ]);
    console.log('🗑️ Cleared existing data');

    // Create Admin
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@losantos.com',
      passwordHash: process.env.ADMIN_PASSWORD || 'GTA5Admin123!'
    });
    await admin.save();
    console.log('👤 Admin created');

    // Create Profile
    await Profile.create({
      name: 'Mayur Mahadev Gund',
      role: 'Full Stack Developer & Training & Placement Officer',
      location: 'Pune (The "Los Santos" of Tech)',
      bio: `The Specialist

Operating out of the AIML Department, Mayur isn't just managing the lab; he's the "Mastermind" behind the infrastructure. As a Training and Placement Officer, he's the one who scouts the talent and sets up the "heists"—connecting high-potential developers with top-tier industry players.

When he isn't optimizing Full Stack architectures or securing the network, he's deep into Ethical Hacking and Cyber Security. Much like a high-level character in Los Santos, he lives by the Atomic Habits code: constant improvement, tactical precision, and a relentless focus on the next big "mission"—whether that's a Gen Z-focused tech project or his own personal health journey.

Skill Tree & Assets
- Technical Gear: Proficient in AI/ML frameworks and Full Stack deployment.
- Network: Direct access to industry leads and placement pipelines.
- Special Ability: "Tactical Scaling" — The ability to move from high-level management to deep-code execution instantly.`,
      tagline: 'Available for High-Stakes Projects',
      stats: [
        { label: 'Full Stack Development Expert', value: 100 },
        { label: 'Placement & Strategy Mastermind', value: 95 },
        { label: 'Cyber Security Ghost Mode', value: 93 },
        { label: 'AIML Operations Commander', value: 96 },
        { label: 'Tactical Scaling', value: 98 }
      ],
      socials: {
        github: 'https://github.com/MannyG3',
        linkedin: 'https://www.linkedin.com/in/mayurgund99/',
        twitter: '',
        instagram: '',
        email: 'mayurgund3333@gmail.com'
      },
      profileImageUrl: '/images/profile-mayur.png'
    });
    console.log('📋 Profile created');

    // Create Skills
    await Skill.insertMany([
      {
        category: 'Front-End',
        order: 1,
        items: [
          { name: 'React.js', level: 96, icon: 'react' },
          { name: 'Redux / Context API', level: 92, icon: 'redux' },
          { name: 'Tailwind CSS / Material UI', level: 94, icon: 'tailwind' },
          { name: 'Next.js', level: 88, icon: 'nextjs' }
        ]
      },
      {
        category: 'Back-End',
        order: 2,
        items: [
          { name: 'Node.js & Express', level: 94, icon: 'nodejs' },
          { name: 'Python (Django/Flask)', level: 90, icon: 'python' },
          { name: 'RESTful APIs', level: 96, icon: 'api' },
          { name: 'Socket.io', level: 89, icon: 'socketio' }
        ]
      },
      {
        category: 'Database',
        order: 3,
        items: [
          { name: 'MongoDB', level: 93, icon: 'mongodb' },
          { name: 'PostgreSQL / MySQL', level: 90, icon: 'postgresql' },
          { name: 'Redis', level: 86, icon: 'redis' }
        ]
      },
      {
        category: 'Dev-Ops & Security',
        order: 4,
        items: [
          { name: 'Cyber Security & Ethical Hacking', level: 91, icon: 'security' },
          { name: 'Docker & Kubernetes', level: 88, icon: 'docker' },
          { name: 'AWS / Azure', level: 84, icon: 'cloud' },
          { name: 'Git / GitHub', level: 97, icon: 'git' }
        ]
      }
    ]);
    console.log('🛠️ Skills created');

    // Create Projects
    await Project.insertMany([
      {
        code: 'MISSION 01',
        codename: 'Operation: ORBITAL WATCH',
        title: 'Space Traffic Dashboard',
        type: 'Dashboard',
        location: 'Los Santos HQ',
        rewardXp: 5000,
        slug: 'space-traffic-dashboard',
        shortDesc: 'A live satellite-tracking command center. Monitor objects in orbit, visualize risk zones, and keep collisions from turning into chaos.',
        fullDesc: 'A live satellite-tracking command center. Monitor objects in orbit, visualize risk zones, and keep collisions from turning into chaos.',
        tags: ['FastAPI', 'WebSockets', 'Dashboard UI', 'Vercel'],
        difficulty: 5,
        objectives: [
          'Track satellites and live positions',
          'Visualize risk zones and alerts',
          'Deliver a responsive real-time dashboard'
        ],
        intel: [
          'Live updates powered by WebSockets',
          'Clean dashboard UI with responsive layout'
        ],
        challenges: [
          'Processing large volumes of satellite data',
          'Optimizing map rendering performance',
          'Implementing accurate collision prediction'
        ],
        role: 'Full Stack Developer',
        outcome: 'Successfully deployed dashboard providing real-time orbital monitoring.',
        screenshots: [],
        githubUrl: 'https://github.com/MannyG3/space-traffic-dashboard',
        liveUrl: 'https://space-traffic-dashboard.vercel.app',
        featured: true,
        progress: 0.9,
        status: 'completed'
      },
      {
        code: 'MISSION 03',
        codename: 'Operation: GREEN YIELD',
        title: 'Crop & Fertilizer Recommendation',
        type: 'ML System',
        location: 'Rural Ops',
        rewardXp: 4500,
        slug: 'crop-fertilizer-recommendation',
        shortDesc: 'Turn raw soil data into smart decisions. Recommend the best crop and fertilizer plan — fast, accurate, and easy to use.',
        fullDesc: 'Turn raw soil data into smart decisions. Recommend the best crop and fertilizer plan — fast, accurate, and easy to use.',
        tags: ['Python', 'Machine Learning', 'Flask/Streamlit', 'Pandas'],
        difficulty: 4,
        objectives: [
          'Recommend best crop using input conditions',
          'Suggest suitable fertilizers',
          'Show clear results with a simple UI'
        ],
        intel: [
          'ML-based recommendation workflow',
          'Simple results UI for quick decisions'
        ],
        challenges: [
          'Handling diverse soil types',
          'Integrating multiple data sources',
          'Optimizing prediction accuracy'
        ],
        role: 'ML Engineer',
        outcome: 'Achieved 85%+ accuracy in crop recommendations.',
        screenshots: [],
        githubUrl: 'https://github.com/MannyG3/Crop-and-fertilizer-recommendation',
        liveUrl: '',
        featured: true,
        progress: 1,
        status: 'completed'
      },
      {
        title: 'Face Mask Detector',
        slug: 'face-mask-detector',
        shortDesc: 'Real-time face mask detection using webcam with TensorFlow.',
        fullDesc: 'Created a real-time face mask detection system using webcam feed with Haar Cascade classifier and TensorFlow model. Provides alerts when no mask is detected for public safety monitoring.',
        tags: ['Python', 'TensorFlow', 'OpenCV', 'Haar Cascade', 'Deep Learning'],
        difficulty: 4,
        objectives: [
          'Real-time webcam video processing',
          'Face detection implementation',
          'Mask/No-mask classification',
          'Alert system integration'
        ],
        challenges: [
          'Optimizing detection speed',
          'Handling various lighting conditions',
          'Reducing false positives'
        ],
        role: 'AI/ML Developer',
        outcome: 'High accuracy real-time detection suitable for public spaces.',
        screenshots: [],
        githubUrl: 'https://github.com/MannyG3/Mask-Detector',
        liveUrl: '',
        featured: true,
        status: 'completed'
      },
      {
        code: 'MISSION 02',
        codename: 'Operation: KETTLE HEAT',
        title: 'Kettle',
        type: 'Web App',
        location: 'Downtown Studio',
        rewardXp: 4200,
        slug: 'kettle',
        shortDesc: 'A premium brand launch in the city — clean UI, smooth flow, and fast performance. Build the identity, ship the site, keep it sharp.',
        fullDesc: 'A premium brand launch in the city — clean UI, smooth flow, and fast performance. Build the identity, ship the site, keep it sharp.',
        tags: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
        difficulty: 4,
        objectives: [
          'Premium landing + responsive layout',
          'Clean information architecture',
          'Deploy-ready structure with smooth UX'
        ],
        intel: [
          'Performance-focused Next.js setup',
          'Brand-first UI with mobile responsiveness'
        ],
        challenges: [
          'Type-safe database operations',
          'Complex query optimization',
          'Production deployment config'
        ],
        role: 'Full Stack Developer',
        outcome: 'Deployed production application with type-safe codebase.',
        screenshots: [],
        githubUrl: 'https://github.com/MannyG3/Kettle',
        liveUrl: 'https://usekettle.vercel.app/',
        featured: false,
        progress: 0.6,
        status: 'in-progress'
      },
      {
        title: 'Be My Valentine',
        slug: 'be-my-valentine',
        shortDesc: 'A fun Valentine-themed web app with interactive UI.',
        fullDesc: 'Created a playful Valentine-themed interactive web application with engaging animations and user interactions. Deployed on Vercel for easy sharing.',
        tags: ['React', 'CSS', 'Framer Motion', 'Vercel'],
        difficulty: 2,
        objectives: [
          'Interactive UI elements',
          'Smooth animations',
          'Mobile responsive design',
          'Quick deployment'
        ],
        challenges: [
          'Making interactions feel natural',
          'Cross-browser compatibility'
        ],
        role: 'Frontend Developer',
        outcome: 'Viral success shared widely on social media.',
        screenshots: [],
        githubUrl: '',
        liveUrl: 'https://beemyvalentine.vercel.app',
        featured: false,
        status: 'completed'
      },
      {
        title: 'Pokemon Search App',
        slug: 'pokemon-search-app',
        shortDesc: 'Interactive Pokemon search application with PokeAPI integration.',
        fullDesc: 'Built a fun Pokemon search application that fetches data from PokeAPI, displaying Pokemon details, stats, and abilities with a clean interface.',
        tags: ['React', 'PokeAPI', 'CSS', 'REST API'],
        difficulty: 2,
        objectives: [
          'API integration with PokeAPI',
          'Search functionality',
          'Display Pokemon stats',
          'Responsive design'
        ],
        challenges: [
          'Handling API rate limits',
          'Caching responses efficiently'
        ],
        role: 'Frontend Developer',
        outcome: 'Fun project for learning API integration.',
        screenshots: [],
        githubUrl: '',
        liveUrl: 'https://pokemonsearchapp-sandy.vercel.app',
        featured: false,
        status: 'completed'
      }
    ]);
    console.log('🎯 Projects created');

    // Create Experience
    await Experience.insertMany([
      {
        title: 'Lecturer & TPO',
        org: 'Engineering College',
        startDate: new Date('2023-01-01'),
        endDate: null,
        description: 'Teaching programming subjects and managing training & placement activities. Designing industry-oriented practical sessions.',
        highlights: [
          'Teaching OOP in Python, Client-Side Scripting, Data Structures',
          'Organizing placement drives and aptitude training',
          'Conducted AI-focused events and workshops'
        ],
        type: 'Job',
        location: 'Pune, India'
      },
      {
        title: 'Full Stack Developer Intern',
        org: 'Acumen AiTech',
        startDate: new Date('2022-06-01'),
        endDate: new Date('2022-12-31'),
        description: 'Built web applications with modern tech stack. Created reusable components and integrated AI tools.',
        highlights: [
          'Built web apps with React, Node.js, Express, MongoDB',
          'Created reusable React components for better UX',
          'AI Integrations and automation'
        ],
        type: 'Internship',
        location: 'Pune, India'
      },
      {
        title: 'Technical Trainer & Mentor',
        org: 'Freelance',
        startDate: new Date('2021-06-01'),
        endDate: null,
        description: 'Mentoring students in web development and programming. Creating custom learning paths and guiding students to build portfolio-ready projects.',
        highlights: [
          'Mentored students to build portfolio-ready React apps',
          'Created custom learning paths and project assignments',
          'Hands-on training in UI/UX, Frontend, and JavaScript'
        ],
        type: 'Freelance',
        location: 'Remote'
      },
      {
        title: 'B.E. Computer Engineering',
        org: 'University',
        startDate: new Date('2018-08-01'),
        endDate: new Date('2022-05-31'),
        description: 'Bachelor of Engineering in Computer Engineering. Focus on software development, data structures, and AI/ML.',
        highlights: [
          'Core CS fundamentals',
          'Data Structures and Algorithms',
          'Machine Learning projects'
        ],
        type: 'Education',
        location: 'Pune, India'
      }
    ]);
    console.log('💼 Experience created');

    // Create Achievements
    await Achievement.insertMany([
      {
        title: 'MERN Stack Mastery',
        issuer: 'Self-taught',
        date: new Date('2023-06-15'),
        category: 'Badge',
        description: 'Complete proficiency in MongoDB, Express.js, React, and Node.js development.'
      },
      {
        title: 'AI/ML Foundations',
        issuer: 'Online Course',
        date: new Date('2022-09-20'),
        category: 'Certificate',
        description: 'Completed comprehensive AI/ML course covering TensorFlow, Python, and ML algorithms.'
      },
      {
        title: 'Students Mentored',
        issuer: 'Teaching Recognition',
        date: new Date('2023-12-01'),
        category: 'Award',
        description: 'Successfully mentored 50+ students to build portfolio-ready applications.'
      },
      {
        title: 'Full Stack Development',
        issuer: 'Professional',
        date: new Date('2022-08-05'),
        category: 'Certificate',
        description: 'Professional certification in full-stack web development with MERN stack.'
      }
    ]);
    console.log('🏆 Achievements created');

    console.log(`
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║   🎮 DATABASE SEEDED SUCCESSFULLY!                       ║
    ║                                                           ║
    ║   Admin Credentials:                                      ║
    ║   Email: ${process.env.ADMIN_EMAIL || 'admin@losantos.com'}
    ║   Password: ${process.env.ADMIN_PASSWORD || 'GTA5Admin123!'}
    ║                                                           ║
    ║   Welcome to Los Santos, homie!                           ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
