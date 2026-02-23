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
      name: 'Mayur Gund',
      role: 'Full Stack Developer | Educator | AI Enthusiast',
      location: 'Pune, India',
      bio: 'Welcome to my portfolio, homie! Passionate Computer Engineer and Full Stack Developer skilled in MERN Stack, Data Structures and Algorithms, and Python. Experienced in teaching programming and guiding students as a lecturer and mentor. Adept at building scalable web applications, integrating AI tools, and delivering hands-on learning experiences.',
      tagline: 'Building stuff & mentoring devs. Currently Available.',
      stats: [
        { label: 'Full Stack', value: 92 },
        { label: 'Teaching', value: 88 },
        { label: 'Backend', value: 85 },
        { label: 'AI/ML', value: 75 },
        { label: 'Mentorship', value: 90 }
      ],
      socials: {
        github: 'https://github.com/MannyG3',
        linkedin: 'https://www.linkedin.com/in/mayurgund99/',
        twitter: '',
        instagram: '',
        email: 'mayurgund3333@gmail.com'
      },
      profileImageUrl: ''
    });
    console.log('📋 Profile created');

    // Create Skills
    await Skill.insertMany([
      {
        category: 'Frontend',
        order: 1,
        items: [
          { name: 'React', level: 92, icon: 'react' },
          { name: 'JavaScript', level: 90, icon: 'javascript' },
          { name: 'TypeScript', level: 85, icon: 'typescript' },
          { name: 'HTML5', level: 95, icon: 'html5' },
          { name: 'CSS3', level: 90, icon: 'css3' },
          { name: 'TailwindCSS', level: 88, icon: 'tailwind' },
          { name: 'Bootstrap', level: 80, icon: 'bootstrap' }
        ]
      },
      {
        category: 'Backend',
        order: 2,
        items: [
          { name: 'Node.js', level: 88, icon: 'nodejs' },
          { name: 'Express.js', level: 85, icon: 'express' },
          { name: 'Python', level: 82, icon: 'python' },
          { name: 'GraphQL', level: 70, icon: 'graphql' }
        ]
      },
      {
        category: 'Database',
        order: 3,
        items: [
          { name: 'MongoDB', level: 85, icon: 'mongodb' },
          { name: 'PostgreSQL', level: 80, icon: 'postgresql' },
          { name: 'MySQL', level: 75, icon: 'mysql' },
          { name: 'SQLite', level: 70, icon: 'sqlite' }
        ]
      },
      {
        category: 'Tools',
        order: 4,
        items: [
          { name: 'Git', level: 90, icon: 'git' },
          { name: 'Socket.IO', level: 80, icon: 'socketio' },
          { name: 'REST APIs', level: 88, icon: 'api' },
          { name: 'TensorFlow', level: 65, icon: 'tensorflow' }
        ]
      }
    ]);
    console.log('🛠️ Skills created');

    // Create Projects
    await Project.insertMany([
      {
        title: 'Space Traffic Dashboard',
        slug: 'space-traffic-dashboard',
        shortDesc: 'Real-time satellite monitoring and collision detection system with interactive world map.',
        fullDesc: 'Built a comprehensive satellite tracking dashboard featuring live satellite positions, collision detection alerts, and an interactive world map with WebSocket updates for real-time data streaming.',
        tags: ['React', 'Node.js', 'Socket.IO', 'WebSocket', 'MapBox'],
        difficulty: 5,
        objectives: [
          'Live satellite tracking visualization',
          'Collision detection alerts',
          'Interactive world map integration',
          'Real-time WebSocket updates'
        ],
        challenges: [
          'Processing large volumes of satellite data',
          'Optimizing map rendering performance',
          'Implementing accurate collision prediction'
        ],
        role: 'Full Stack Developer',
        outcome: 'Successfully deployed dashboard providing real-time orbital monitoring.',
        screenshots: [],
        githubUrl: '',
        liveUrl: 'https://space-traffic-dashboard.vercel.app',
        featured: true,
        status: 'completed'
      },
      {
        title: 'Crop & Fertilizer Recommendation',
        slug: 'crop-fertilizer-recommendation',
        shortDesc: 'ML-powered system for optimal crop and fertilizer recommendations.',
        fullDesc: 'Developed a machine learning system that recommends optimal crops and fertilizers based on soil nutrients, pH levels, moisture content, and climate data to help farmers maximize yield.',
        tags: ['Python', 'Machine Learning', 'Scikit-learn', 'Flask', 'Pandas'],
        difficulty: 4,
        objectives: [
          'Analyze soil nutrient composition',
          'Process climate and weather data',
          'Train ML models for predictions',
          'Build user-friendly interface'
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
        title: 'Kettle',
        slug: 'kettle',
        shortDesc: 'Full-stack TypeScript application with PostgreSQL-backed logic.',
        fullDesc: 'Built a production-ready TypeScript-first application with PostgreSQL database, featuring clean architecture and production deployment on Vercel.',
        tags: ['TypeScript', 'PostgreSQL', 'Node.js', 'React', 'Prisma'],
        difficulty: 4,
        objectives: [
          'TypeScript-first architecture',
          'PostgreSQL-backed data layer',
          'Production deployment setup',
          'Clean code patterns'
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
        liveUrl: '',
        featured: false,
        status: 'completed'
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
