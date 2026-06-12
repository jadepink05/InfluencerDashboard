# Power BI Guide

This project exports influencer campaign data as a CSV file so it can be loaded into Power BI Desktop.

## Export Data

1. Start the backend server.
2. Login from the frontend.
3. Open the Analytics page.
4. Click the export button or call `GET /api/export`.
5. Save the downloaded file as `influencer_export.csv`.

## Import Into Power BI Desktop

1. Open Power BI Desktop.
2. Click **Get Data**.
3. Select **Text/CSV**.
4. Choose `influencer_export.csv`.
5. Click **Load**.

## Useful DAX Measures

```DAX
Total Followers = SUM(influencer_export[Followers])
Average Engagement = AVERAGE(influencer_export[Engagement Rate])
Campaign Count = DISTINCTCOUNT(influencer_export[Campaign Name])
Total Reach = SUM(influencer_export[Reach])
Total Impressions = SUM(influencer_export[Impressions])
```

## Recommended Report Pages

- Executive Overview
- Influencer Performance
- Campaign Analytics
- Platform Insights

## Recommended Slicers

- Platform
- Campaign Name
- Category, if you add category to the export later
