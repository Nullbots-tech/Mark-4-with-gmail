# NULLBOTS Portfolio - Full Stack Application

A modern, full-stack portfolio website for NULLBOTS with MongoDB integration, built with React, Node.js, Express, and MongoDB Atlas.

## 🚀 Features

### Frontend
- **Modern React Application** with TypeScript
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** with Framer Motion
- **Interactive Particle Effects**
- **Custom Cursor** for desktop
- **SEO Optimized**

### Backend
- **RESTful API** with Express.js
- **MongoDB Atlas** integration for global scalability
- **Contact Form** with email notifications
- **Newsletter Subscription** system
- **Analytics Tracking** for user behavior
- **Project Management** system
- **Rate Limiting** and security features

### Database Models
- **Contact Messages** - Store and manage contact form submissions
- **Projects** - Dynamic project portfolio with categories and analytics
- **Newsletter** - Email subscription management
- **Analytics** - Track user interactions and page views

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Nodemailer for email services
- Helmet for security
- Rate limiting for API protection

### Database
- MongoDB Atlas (Cloud Database)
- Global distribution ready
- Automatic scaling
- Built-in security features

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Gmail account (for email services)

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd nullbots-portfolio
npm install
```

### 2. MongoDB Atlas Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Whitelist your IP address (or use 0.0.0.0/0 for global access)

### 3. Environment Configuration
1. Copy `.env.example` to `.env`
2. Update the following variables:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nullbots-portfolio?retryWrites=true&w=majority

# JWT Secret (generate a strong secret)
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Frontend API URL
VITE_API_URL=http://localhost:5000/api
```

### 4. Gmail App Password Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this app password in the `EMAIL_PASS` variable

### 5. Seed Initial Data
```bash
# Seed projects data to MongoDB
node server/scripts/seedProjects.js
```

### 6. Run the Application
```bash
# Development mode (runs both frontend and backend)
npm run dev:full

# Or run separately:
# Backend only
npm run server

# Frontend only (in another terminal)
npm run dev
```

## 🌐 Deployment on AWS

### Option 1: AWS Elastic Beanstalk
1. Install AWS CLI and EB CLI
2. Configure AWS credentials
3. Initialize Elastic Beanstalk:
```bash
eb init
eb create production
eb deploy
```

### Option 2: AWS EC2 with PM2
1. Launch an EC2 instance (Ubuntu recommended)
2. Install Node.js, PM2, and Nginx
3. Clone your repository
4. Set up environment variables
5. Use PM2 for process management:
```bash
pm2 start server/index.js --name "nullbots-api"
pm2 start npm --name "nullbots-frontend" -- run build && serve -s dist
```

### Option 3: AWS Amplify (Frontend) + Lambda (Backend)
1. Deploy frontend to AWS Amplify
2. Convert backend to serverless functions
3. Use AWS API Gateway for routing

## 📊 API Endpoints

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/all` - Get all contacts (admin)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/projects/meta/categories` - Get project categories
- `POST /api/projects/:id/like` - Like a project

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/stats` - Get newsletter statistics

### Analytics
- `POST /api/analytics/track` - Track user events
- `GET /api/analytics/dashboard` - Get analytics dashboard data

### Health
- `GET /api/health` - Health check endpoint

## 🔒 Security Features

- **Rate Limiting** - Prevents spam and abuse
- **Helmet.js** - Sets security headers
- **CORS Protection** - Configured for specific origins
- **Input Validation** - Mongoose schema validation
- **Email Sanitization** - Prevents injection attacks
- **Environment Variables** - Sensitive data protection

## 📈 Analytics & Monitoring

The application includes built-in analytics to track:
- Page views
- Project views
- Contact form submissions
- Newsletter signups
- User interactions

## 🚀 Performance Optimizations

- **MongoDB Indexing** - Optimized database queries
- **Image Optimization** - Using Pexels CDN
- **Code Splitting** - React lazy loading
- **Caching Headers** - Browser caching optimization
- **Compression** - Gzip compression enabled

## 🔧 Customization

### Adding New Projects
1. Use the admin interface (to be built)
2. Or directly add to MongoDB via the API
3. Or modify `server/scripts/seedProjects.js`

### Styling
- Modify `tailwind.config.js` for theme changes
- Update color schemes in CSS variables
- Customize animations in component files

### Email Templates
- Modify email templates in `server/routes/contact.js`
- Add HTML templates for better formatting

## 📝 License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Email: nullbots.tech@gmail.com
- Create an issue in the repository
- Contact through the website contact form

---

Built with ❤️ by the NULLBOTS team