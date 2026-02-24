import { z } from 'zod';

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

// Profile schemas
export const profileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  role: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  bio: z.string().max(2000).optional(),
  tagline: z.string().max(200).optional(),
  stats: z.array(z.object({
    label: z.string().min(1),
    value: z.number().min(0).max(100)
  })).optional(),
  socials: z.object({
    github: z.string().url().or(z.literal('')).optional(),
    linkedin: z.string().url().or(z.literal('')).optional(),
    twitter: z.string().url().or(z.literal('')).optional(),
    instagram: z.string().url().or(z.literal('')).optional(),
    email: z.string().email().or(z.literal('')).optional(),
    resume: z.string().url().or(z.literal('')).optional()
  }).optional(),
  profileImageUrl: z.string().url().or(z.literal('')).optional()
});

// Skill schemas
export const skillSchema = z.object({
  category: z.enum(['Frontend', 'Backend', 'Database', 'Tools', 'Other']),
  items: z.array(z.object({
    name: z.string().min(1).max(50),
    level: z.number().min(0).max(100),
    icon: z.string().optional()
  })),
  order: z.number().optional()
});

// Project schemas
export const projectSchema = z.object({
  code: z.string().max(30).optional(),
  codename: z.string().max(100).optional(),
  type: z.string().max(50).optional(),
  location: z.string().max(100).optional(),
  rewardXp: z.number().min(0).max(1000000).optional(),
  title: z.string().min(1).max(100),
  shortDesc: z.string().min(1).max(200),
  fullDesc: z.string().max(5000).optional(),
  tags: z.array(z.string()).optional(),
  difficulty: z.number().min(1).max(5).optional(),
  objectives: z.array(z.string()).optional(),
  intel: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  role: z.string().max(100).optional(),
  outcome: z.string().max(1000).optional(),
  screenshots: z.array(z.string().url()).optional(),
  thumbnailUrl: z.string().url().or(z.literal('')).optional(),
  githubUrl: z.string().url().or(z.literal('')).optional(),
  liveUrl: z.string().url().or(z.literal('')).optional(),
  featured: z.boolean().optional(),
  progress: z.number().min(0).max(1).optional(),
  status: z.enum(['completed', 'in-progress', 'planned']).optional()
});

// Experience schemas
export const experienceSchema = z.object({
  title: z.string().min(1).max(100),
  org: z.string().min(1).max(100),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).nullable().optional(),
  description: z.string().max(2000).optional(),
  highlights: z.array(z.string()).optional(),
  type: z.enum(['Job', 'Internship', 'Freelance', 'Education', 'Club', 'Volunteer']).optional(),
  location: z.string().max(100).optional(),
  logoUrl: z.string().url().or(z.literal('')).optional()
});

// Achievement schemas
export const achievementSchema = z.object({
  title: z.string().min(1).max(100),
  issuer: z.string().min(1).max(100),
  date: z.string().or(z.date()),
  imageUrl: z.string().url().or(z.literal('')).optional(),
  category: z.enum(['Certificate', 'Award', 'Badge', 'License', 'Other']).optional(),
  credentialUrl: z.string().url().or(z.literal('')).optional(),
  description: z.string().max(500).optional()
});

// Message schemas
export const messageSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000)
});

// Validation middleware factory
export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }
    next(error);
  }
};
