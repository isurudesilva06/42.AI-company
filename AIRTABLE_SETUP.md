# Airtable Integration Setup Guide

This project now includes Airtable integration to manage your projects dynamically. Follow these steps to set it up:

## 1. Create Your Airtable Base

1. Go to [Airtable](https://airtable.com) and create a new base
2. Create a table called "Projects" (or use a different name and update the env variable)
3. Add the following columns to your table:

### Required Columns:
- **Title** (Single line text)
- **Description** (Long text)
- **Technologies** (Single line text - comma separated, e.g., "React, Node.js, MongoDB")
- **Category** (Single select - options: Web Development, Mobile Development, UI/UX Design, Backend Development, DevOps)
- **Status** (Single select - options: Completed, In Progress, Planning)

### Optional Columns:
- **Short Description** (Long text - if not provided, will use first 150 chars of Description)
- **Client Name** (Single line text)
- **Project URL** (URL)
- **GitHub URL** (URL)
- **Image URL** (URL - for main project image)
- **Images** (Attachment - for multiple images)
- **Start Date** (Date)
- **End Date** (Date)
- **Featured** (Checkbox - to highlight important projects)
- **Tags** (Single line text - comma separated, e.g., "E-commerce, Full-Stack")
- **Created** (Created time - automatically added by Airtable)

## 2. Get Your Airtable Credentials

### API Key:
1. Go to [Airtable Account](https://airtable.com/create/tokens)
2. Click "Create new token"
3. Give it a name like "Website Projects"
4. Add the following scopes:
   - `data.records:read`
   - `data.records:write` (if you plan to update via API)
5. Add your base to the token
6. Click "Create token" and copy the generated key

### Base ID:
1. Open your Airtable base
2. Look at the URL - it will look like: `https://airtable.com/appXXXXXXXXXXXXXX/...`
3. The part that starts with `app` is your Base ID (e.g., `appABC123DEF456GHI`)

## 3. Configure Environment Variables

Create or update your `.env` file with:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your-airtable-api-key-here
AIRTABLE_BASE_ID=your-airtable-base-id-here
AIRTABLE_TABLE_NAME=Projects
```

## 4. Test the Integration

1. Restart your server: `npm run server:dev`
2. Visit your website - the Projects section should now show your Airtable data
3. Test the API directly:
   - `http://localhost:3001/api/projects` - Get all projects
   - `http://localhost:3001/api/projects/featured` - Get featured projects only

## 5. Sample Data Structure

Here's an example of how your Airtable records should look:

| Title | Description | Technologies | Category | Status | Featured | Client Name | Project URL |
|-------|-------------|-------------|----------|--------|----------|-------------|-------------|
| E-Commerce Platform | A full-stack e-commerce platform with React and Node.js | React, Node.js, MongoDB, Stripe | Web Development | Completed | ✓ | RetailCorp | https://example.com |
| Mobile Task App | Cross-platform mobile app for task management | React Native, Firebase, Redux | Mobile Development | Completed | ✓ | ProductiveTech | |

## 6. Troubleshooting

### Projects Not Loading?
- Check the browser console for any error messages
- Verify your API key and Base ID are correct
- Make sure your Airtable table is named "Projects" (or update AIRTABLE_TABLE_NAME)
- Check that your token has the correct permissions

### Sample Data Showing Instead?
- This happens when Airtable credentials are missing or invalid
- The system falls back to sample data to keep the site functional
- Add your credentials to see your actual projects

### Images Not Displaying?
- For single images, use the "Image URL" field with a direct link to the image
- For multiple images, use the "Images" attachment field
- Make sure image URLs are publicly accessible

## 7. Features

### Automatic Updates
- Projects update automatically when you modify your Airtable
- No need to rebuild or redeploy your website
- Changes appear immediately (API calls are made on each page load)

### Filtering
- Users can filter projects by Category and Status
- All filters are applied client-side for fast filtering

### Featured Projects
- Mark projects as "Featured" to highlight them
- Featured projects get a special badge and can be shown separately

### Project Details
- Click on any project to see full details in a modal
- Shows all project information, technologies, dates, and links

## 8. Advanced Configuration

### Custom Table Name
If you want to use a different table name, update the environment variable:
```bash
AIRTABLE_TABLE_NAME=YourCustomTableName
```

### Adding New Fields
To add new fields, modify the `server/airtableService.js` file to map the new Airtable columns to your project objects.

### Performance Optimization
Consider implementing caching for production environments to reduce API calls to Airtable.

## 9. Production Deployment

When deploying to production:
1. Add your environment variables to your hosting platform
2. Make sure your Airtable token has the correct permissions
3. Test the API endpoints work correctly
4. Consider implementing rate limiting and caching

## Need Help?

If you run into any issues, check:
1. Your Airtable token permissions
2. Base ID is correct
3. Table name matches your environment variable
4. Required columns exist in your table

The system is designed to gracefully fall back to sample data if there are any issues, so your website will always work! 