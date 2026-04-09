# GOLD CMS Backend

A scalable, modular CMS backend designed for enterprise-level content management in mining and logistics platforms. This system enables dynamic content delivery through RESTful APIs, removing the need for hardcoded frontend data.

---

## Overview

The GOLD CMS Backend is an API-first content management system built to manage website content such as services, projects, news, leadership, offices, investor resources, SEO metadata, and site settings through a centralized backend.

It is designed with scalability, maintainability, and production-style backend practices in mind.

---

## Features

- Modular CMS architecture supporting 16+ content modules
- RESTful API design
- JWT-based authentication
- Role-based access control (Admin / Super Admin)
- SEO-friendly slug-based routing
- Cloudinary integration for media uploads
- Soft delete mechanism using `isActive`
- Clean MVC architecture
- Frontend-ready API responses

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cloudinary

---

## Architecture

The project follows a clean MVC structure:

- **Models** — MongoDB schemas and data structure definitions  
- **Controllers** — Business logic and request handling  
- **Routes** — API endpoint definitions  
- **Middleware** — Authentication and authorization logic  
- **Config** — Centralized configuration  

### Design Highlights

- Modular structure for easy expansion  
- Separation of concerns for maintainability  
- API-first design for frontend decoupling  
- Scalable backend organization  

---

## Authentication and Authorization

The system uses JWT for authentication and middleware-based route protection.

### Roles

- Admin  
- Super Admin  

### Protected Route Header

```bash
Authorization: Bearer <JWT_TOKEN>
API Overview
Public Endpoints
Services
GET /api/services
GET /api/services/:slug
Projects
GET /api/projects
GET /api/projects/:slug
News
GET /api/news
GET /api/news/:slug
Leadership & Offices
GET /api/leadership
GET /api/offices
Investor Relations
GET /api/investors/overview
GET /api/investors/resources
Other Content
GET /api/esg
GET /api/site/settings
GET /api/navigation
GET /api/seo/:pageKey
Admin Endpoints (Protected)
Services
POST /api/services
PUT /api/services/:id
DELETE /api/services/:id
Projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id

Additional modules follow similar CRUD patterns.

Media Handling

This backend integrates with Cloudinary for media uploads and storage.

Optimized image delivery via CDN
Stores and returns full asset URLs
Scalable media management
API Testing

A Postman collection is included:

GOLD_CMS_Postman_Collection.json

Use it to test all endpoints quickly.

Getting Started
1. Clone the Repository
git clone https://github.com/endangered1/gold-cms-backend.git
cd gold-cms-backend
2. Install Dependencies
npm install
3. Create Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
4. Run the Server
npm run dev

Server runs at:
http://localhost:5000

Project Notes
Only active content is returned (isActive: true)
Slugs are used for SEO-friendly routing
Media is served via Cloudinary URLs
Responses are frontend-ready
Future Improvements
Rate limiting and security enhancements
Redis caching
Admin dashboard frontend
Unit and integration testing
Logging and monitoring
