# Admin Dashboard Guide

## Overview
Your real estate admin dashboard is now ready! This system allows you to manage properties and control what appears on your website's home page.

## Getting Started

### Creating Your First Admin Account

1. Visit the Supabase Dashboard at: https://mdgnzpffyugfabuhsifx.supabase.co
2. Go to Authentication > Users
3. Click "Add User" and create an admin account with email and password
4. This account will be able to log in to the admin dashboard

### Accessing the Admin Dashboard

1. Go to `/admin/login` on your website
2. Enter your admin credentials
3. You'll be redirected to the dashboard

## Features

### Dashboard (`/admin/dashboard`)
- View all properties in a grid layout
- See property status (Available, Sold, Rented)
- Quick actions: Edit, Delete, Feature/Unfeature
- Visual indicators for featured properties

### Adding Properties (`/admin/properties/new`)
Fields available:
- Property Title
- Property Type (Villa, Apartment, Plot, Commercial)
- Description
- Price
- Location
- Bedrooms & Bathrooms
- Area (sq ft)
- Main Image URL
- Gallery URLs (comma-separated)
- Amenities (comma-separated)
- Status (Available, Sold, Rented)
- Featured toggle (shows on home page)

### Editing Properties
- Click the edit button on any property card
- Update any field
- Changes are saved immediately

### Deleting Properties
- Click the delete button
- Confirm the deletion
- Property is permanently removed

### Featured Properties
- Toggle the star button to feature/unfeature properties
- Featured properties appear on the home page
- Only properties with status "Available" show to public visitors
- You can have multiple featured properties

## Database Structure

### Properties Table
All property data is stored in Supabase with:
- Automatic timestamps
- Row Level Security enabled
- Admin users can manage all properties
- Public users can only view available properties

## Image URLs

For best results:
- Use high-quality images (1200x800px or larger)
- Supported services: Pexels, Unsplash, or your own hosting
- Main image is required
- Gallery images are optional (comma-separated URLs)

Example URLs:
```
Main Image: https://images.unsplash.com/photo-1600596542815-ffad4c1539a9
Gallery: https://images.unsplash.com/photo-1..., https://images.unsplash.com/photo-2...
```

## Tips

1. Always use the "Featured" toggle to highlight your best properties
2. Keep property descriptions concise but informative
3. Update property status to "Sold" or "Rented" instead of deleting
4. Use high-quality images for better presentation
5. Include relevant amenities to help buyers

## Security

- Only authenticated admin users can access the dashboard
- All database operations are protected by Row Level Security
- Public visitors can only view available properties
- Credentials are never exposed in the frontend

## Support

If you need to modify the database schema or add new features, you can:
1. Use Supabase migrations for database changes
2. Extend the Property type in `src/lib/supabase.ts`
3. Update the form in `src/pages/PropertyForm.tsx`
