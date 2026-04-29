# FinFlow Setup Guide

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized setup)

## 🚀 Getting Started

### Option 1: Docker Compose (Recommended for beginners)

1. **Navigate to project directory**
   ```bash
   cd c:\Users\Kshitiz\Desktop\FinFlow
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - Health Check: http://localhost:3000/api/health

4. **Stop services**
   ```bash
   docker-compose down
   ```

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Redis (if not using Docker)**
   - On Windows: Download and run Redis from https://github.com/microsoftarchive/redis/releases
   - Or use WSL: `wsl redis-server`

4. **Create .env file**
   ```bash
   cp .env.example .env
   ```

5. **Start backend**
   ```bash
   npm run dev
   ```

   Backend will be running at `http://localhost:3000`

#### Frontend Setup (in another terminal)

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Start frontend**
   ```bash
   npm run dev
   ```

   Frontend will be running at `http://localhost:5173`

## ✅ Verify Installation

1. **Check backend health**
   ```bash
   curl http://localhost:3000/api/health
   ```

   Expected response:
   ```json
   {
     "status": "healthy",
     "timestamp": "2024-01-15T10:30:00Z",
     "subscribers": 0
   }
   ```

2. **Check frontend**
   Open http://localhost:5173 in your browser
   You should see the FinFlow dashboard with market data

## 🔧 Common Issues

### Redis Connection Error
**Problem**: Backend fails to connect to Redis
**Solution**: 
- Ensure Redis is running
- Check REDIS_HOST and REDIS_PORT in .env
- Verify firewall isn't blocking port 6379

### Port Already in Use
**Problem**: "Port 3000 is already in use"
**Solution**:
- Kill process: `lsof -i :3000` and `kill <PID>`
- Or change PORT in .env: `PORT=3001`

### Frontend Can't Reach Backend
**Problem**: Frontend shows "Failed to fetch market data"
**Solution**:
- Ensure backend is running on port 3000
- Check VITE_API_URL in frontend .env
- Check browser console for CORS errors

### Docker Issues
**Problem**: Docker build fails
**Solution**:
- Clear Docker cache: `docker system prune`
- Rebuild: `docker-compose up --build`
- Check Docker is running

## 📦 Build for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Outputs to dist/
npm run preview  # Preview production build
```

## 🧪 Run Tests

### Backend Tests
```bash
cd backend
npm test
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

## 📊 Project Structure

```
FinFlow/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── services/     # Business logic
│   │   ├── controllers/  # HTTP handlers
│   │   ├── models/       # Types and schemas
│   │   ├── routes/       # API routes
│   │   └── index.ts      # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/             # React + Vite
│   ├── src/
│   │   ├── api/          # API client
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── store/        # Zustand store
│   │   └── utils/        # Utilities
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── docker-compose.yml    # Container orchestration
├── README.md             # Project documentation
└── .github/workflows/    # CI/CD pipelines
```

## 🎯 Next Steps

1. **Explore the API**
   - Get market data: `GET http://localhost:3000/api/market/data?symbols=AAPL,GOOGL,MSFT`
   - Subscribe to stream: `GET http://localhost:3000/api/market/stream` (SSE)

2. **Modify Components**
   - Add new chart types in `frontend/src/components/`
   - Create new API endpoints in `backend/src/routes/`

3. **Add Features**
   - User authentication
   - Database persistence
   - More technical indicators
   - Mobile app

4. **Deploy**
   - Frontend to Vercel/Netlify
   - Backend to Render/Railway/AWS

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Zustand Store Documentation](https://github.com/pmndrs/zustand)
- [Docker Documentation](https://docs.docker.com)

## 💡 Tips

- Use `npm run dev` for development with hot reload
- Check logs: `docker-compose logs -f backend` or `docker-compose logs -f frontend`
- Use Postman or curl to test API endpoints
- Enable TypeScript strict mode to catch errors early

## 🆘 Need Help?

- Check the README.md for overview
- Review backend/src/index.ts for server setup
- Check frontend/src/App.tsx for React setup
- Look at docker-compose.yml for container configuration

Happy building! 🚀
