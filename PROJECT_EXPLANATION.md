# Project Explanation

## Project Purpose

The platform helps a marketing team manage influencer data, plan campaigns, track performance metrics, and create CSV exports that can be used in Power BI Desktop.

## Folder Purpose

`frontend` contains the React application that users interact with.

`backend` contains the Express API, database models, authentication logic, and CSV export logic.

`backend/src/models` contains Mongoose schemas for users, influencers, campaigns, and performance metrics.

`backend/src/controllers` contains the business logic for each route.

`backend/src/routes` maps API URLs to controller functions.

`backend/src/middleware` contains the JWT route protection middleware.

`backend/src/seed` contains demo data for local testing.

`powerbi` contains the Power BI guide.

## Major Files

`frontend/src/App.jsx` defines all routes and protected pages.

`frontend/src/services/api.js` creates the Axios instance and adds the JWT token to requests.

`frontend/src/components/Influencers.jsx` handles influencer CRUD, search, and filters.

`frontend/src/components/Campaigns.jsx` handles campaign CRUD and assigning influencers.

`frontend/src/components/Analytics.jsx` shows Recharts charts and exports CSV data.

`backend/src/server.js` starts Express and connects routes.

`backend/src/models/Campaign.js` stores campaign information and references multiple influencers.

`backend/src/models/PerformanceMetric.js` stores likes, comments, shares, reach, and impressions.

## React to Express Communication

React uses Axios to call backend routes. For example, the Influencers page calls `GET /api/influencers` to show all influencers and `POST /api/influencers` to add a new one.

The JWT token is stored in localStorage after login. Axios reads that token and sends it as:

```text
Authorization: Bearer token_here
```

## Express to MongoDB Communication

Express controllers use Mongoose models to read and write MongoDB documents. For example, `Influencer.find()` gets influencer records and `Influencer.create()` adds a new influencer.

## JWT Authentication Flow

1. User registers or logs in.
2. Backend checks the credentials.
3. Backend creates a JWT token using the user ID.
4. Frontend stores the token in localStorage.
5. Protected requests send the token in the Authorization header.
6. Backend middleware verifies the token before allowing access.

## Power BI Integration Flow

1. Backend reads performance metric records.
2. Metrics are populated with influencer and campaign details.
3. Backend converts the data to CSV.
4. User downloads `influencer_export.csv`.
5. Power BI imports the CSV and builds dashboards from it.

## Engagement Rate Calculation

```text
((Likes + Comments + Shares) / Followers) * 100
```

This gives a simple percentage that helps compare creators with different audience sizes.
