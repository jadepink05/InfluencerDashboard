# Interview Notes

## Explain the Project Architecture

The project has a React frontend, an Express backend, and MongoDB Atlas as the database. React handles screens and user actions. Express exposes REST APIs. MongoDB stores users, influencers, campaigns, and metrics. The frontend and backend communicate using Axios.

## Why React?

React is useful for building dynamic dashboards because state changes can update forms, tables, and charts without reloading the page.

## Why Node.js?

Node.js works well with Express for REST APIs. It also lets the project use JavaScript on both frontend and backend, which makes it easier for a student to build and explain.

## Why MongoDB?

The data has flexible relationships. Campaigns can have many influencers, and performance records connect influencers with campaigns. MongoDB with Mongoose keeps this simple.

## Why JWT?

JWT is a common way to protect APIs. After login, the backend sends a signed token. The frontend sends that token with protected requests, and the backend verifies it.

## Explain CRUD Operations

CRUD means Create, Read, Update, and Delete. This project uses CRUD for influencers and campaigns. For example, users can add an influencer, view the list, edit details, and delete the influencer.

## Explain Axios

Axios is used to make HTTP requests from React to Express. The project has one Axios instance in `api.js`, so the token can be added automatically to every protected request.

## Explain Recharts

Recharts is a React charting library. It is used for bar charts, pie charts, and line charts on the Home and Analytics pages.

## Explain Power BI Integration

Power BI reads CSV data exported from the backend. The export endpoint creates rows with influencer name, platform, campaign name, followers, likes, comments, shares, reach, impressions, and engagement rate.

## Explain Engagement Rate Calculation

Engagement rate is calculated as:

```text
((Likes + Comments + Shares) / Followers) * 100
```

This helps compare influencers even if their follower counts are different.

## Explain Deployment Process

The frontend can be deployed on Vercel by setting `VITE_API_URL` to the backend URL. The backend can be deployed on Railway by adding `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` environment variables.

## Common Demo Flow

1. Register or login.
2. Show dashboard KPI cards.
3. Add or edit an influencer.
4. Create a campaign and assign multiple influencers.
5. Open Analytics and explain the charts.
6. Export the CSV for Power BI.
