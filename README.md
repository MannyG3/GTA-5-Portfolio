# GTA 5 Themed Portfolio

A cinematic, game-inspired personal portfolio built with the MERN stack. Features a dark neon UI with GTA 5 aesthetics including mission cards, wanted level indicators, loading screens, and interactive animations.

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green)

## Features

- **GTA 5 Themed UI** - Dark neon colors, mission cards, wanted level, scanlines, glitch effects
- **Full Admin Panel** - Manage all content without touching code
- **Responsive Design** - Works on all devices
- **Dynamic Content** - All data served from MongoDB
- **Image Uploads** - Cloudinary integration for media
- **Secure Auth** - JWT-based admin authentication
- **Animations** - Framer Motion page transitions and effects

## Tech Stack

### Frontend
- React 18 + Vite
- TailwindCSS with custom GTA theme
- Framer Motion animations
- React Router DOM
- React Hook Form + Zod validation
- Axios for API calls

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary for uploads
- Helmet + CORS + Rate limiting

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Public and admin pages
│   │   └── services/       # API service layer
│   └── ...
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # DB and Cloudinary config
│   │   ├── middleware/     # Auth and validation
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   └── index.js        # Server entry
│   └── ...
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gta-5-portfolio.git
cd gta-5-portfolio
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gta-portfolio
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Admin seed credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword123

# Client URL for CORS
CLIENT_URL=http://localhost:5173
```

Seed the database:

```bash
npm run seed
```

Start the server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **API**: http://localhost:5000/api

Default admin credentials (from seed):
- Email: `admin@example.com`
- Password: `admin123`

## API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get profile |
| GET | `/api/skills` | Get all skills |
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:slug` | Get project by slug |
| GET | `/api/experience` | Get experience |
| GET | `/api/achievements` | Get achievements |
| POST | `/api/messages` | Submit contact form |

### Protected (Admin)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Admin logout |
| GET | `/api/auth/me` | Get current admin |
| PUT | `/api/profile` | Update profile |
| POST | `/api/skills` | Create skill category |
| PUT | `/api/skills/:id` | Update skill category |
| DELETE | `/api/skills/:id` | Delete skill category |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/upload` | Upload image |

## Deployment

### Option 1: Render.com (Recommended)

#### Backend

1. Create a new Web Service
2. Connect your GitHub repo
3. Set root directory to `server`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables

#### Frontend

1. Create a new Static Site
2. Connect your GitHub repo
3. Set root directory to `client`
4. Build Command: `npm install && npm run build`
5. Publish Directory: `dist`
6. Add environment variable: `VITE_API_URL=https://your-api.onrender.com/api`

### Option 2: Railway

1. Create new project
2. Add MongoDB from Railway's marketplace
3. Deploy backend with `server` as root
4. Deploy frontend with `client` as root

### Option 3: VPS (Manual)

```bash
# Build frontend
cd client
npm run build

# Move build to server
mv dist ../server/public

# In server, add static serving
# app.use(express.static('public'))

# Start with PM2
cd ../server
pm2 start src/index.js --name portfolio
```

## Customization

### Colors

Edit `client/tailwind.config.js`:

```js
colors: {
  'gta-dark': '#0a0a0a',
  'gta-green': '#39ff14',
  'gta-cyan': '#00d4ff',
  'gta-pink': '#e83e8c',
  'gta-yellow': '#ffd700',
  'gta-red': '#ff1744',
}
```

### Fonts

The app uses:
- **Bebas Neue** - Titles
- **Rajdhani** - UI labels
- **Orbitron** - Stats/numbers
- **Inter** - Body text

Loaded via Google Fonts in `index.html`.

## Admin Panel Features

- **Dashboard** - Overview stats, quick actions
- **Profile** - Edit bio, avatar, stats, social links
- **Skills** - Manage skill categories with items
- **Projects** - Full CRUD with tags, screenshots, links
- **Experience** - Timeline entries with highlights
- **Achievements** - Certificates and awards
- **Messages** - View and manage contact submissions

## Scripts

### Server

```bash
npm run dev      # Start dev server with nodemon
npm start        # Start production server
npm run seed     # Seed database with sample data
```

### Client

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## License

MIT License - feel free to use for your own portfolio!

## Credits

- Inspired by GTA 5's UI design
- Built with ❤️ using the MERN stack