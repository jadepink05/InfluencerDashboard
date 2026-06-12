# Influencer Performance Analytics Platform

This is a full-stack project for managing influencers, campaigns, campaign metrics, and CSV exports for Power BI. I built it as a practical final-year style project that can be explained clearly in interviews.

## Features

- Register and login with JWT authentication
- Protected dashboard routes
- Influencer CRUD with search, platform filter, and category filter
- Campaign CRUD with multiple influencer assignment
- Campaign delete and influencer delete cleanup
- Analytics charts using Recharts
- CSV export endpoint for Power BI Desktop
- Seed data for demo use

## Tech Stack

- Frontend: React.js, React Router, Axios, Recharts, plain CSS
- Backend: Node.js, Express.js, JWT, bcrypt
- Database: MongoDB Atlas with Mongoose
- Deployment: Vercel for frontend, Railway for backend
- Reporting: Power BI Desktop through CSV export

## Folder Structure

```text
InfluencerDashboard/
  frontend/
    src/components/
    src/services/api.js
    src/App.jsx
    src/main.jsx
    src/styles.css
  backend/
    src/models/
    src/controllers/
    src/routes/
    src/middleware/
    src/seed/
    src/server.js
    powerbi/influencer_export.csv
  powerbi/POWERBI_GUIDE.md
  PROJECT_EXPLANATION.md
  INTERVIEW_NOTES.md
```

## Installation Steps

Open two terminals from the project folder.

Backend:

```powershell
cd backend
copy .env.example .env
npm install
npm run seed
npm run dev
```

Frontend:

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account.
2. Create a free cluster.
3. Add a database user.
4. Allow your IP address in Network Access.
5. Copy the connection string.
6. Paste it into `backend/.env` as `MONGO_URI`.

## Running Locally

- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- Health check: `http://localhost:5000/health`

Seed login password for all demo users:

```text
Password123!
```

Example email:

```text
aarav@example.com
```

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/influencers`
- `POST /api/influencers`
- `PUT /api/influencers/:id`
- `DELETE /api/influencers/:id`
- `GET /api/campaigns`
- `POST /api/campaigns`
- `PUT /api/campaigns/:id`
- `DELETE /api/campaigns/:id`
- `GET /api/analytics`
- `GET /api/export`

## Vercel Deployment

1. Push the project to GitHub.
2. Import the `frontend` folder in Vercel.
3. Add `VITE_API_URL` with your Railway backend API URL.
4. Deploy.

## Railway Deployment

1. Create a Railway project from GitHub.
2. Select the `backend` folder.
3. Add environment variables from `.env.example`.
4. Set `CLIENT_URL` to your Vercel frontend URL.
5. Deploy the service.

## Power BI Setup

Use `GET /api/export` to download live CSV data, or open the website and click **Download CSV** to use the bundled Power BI sample file. Then follow `powerbi/POWERBI_GUIDE.md`.

## Future Improvements

- Add campaign budget vs reach analysis
- Add image uploads for influencer profiles
- Add user roles for analyst and manager permissions
- Add date range filters in analytics
- Add tests for controllers and protected routes
