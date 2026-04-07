# GOLD CMS Backend

A CMS-style backend system for a corporate mining & logistics website.

This backend allows all website content (services, projects, news, etc.) to be managed dynamically through APIs instead of hardcoding.

---

## Features

- Modular CMS architecture (16+ content modules)
- RESTful API design
- JWT authentication
- Role-based access control (admin / superadmin)
- Slug-based routing (SEO-friendly URLs)
- Cloudinary integration for media uploads
- Soft delete using `isActive`
- Clean MVC structure

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary
- JWT Authentication

---

## 📡 API Overview

### Public APIs


GET /api/services
GET /api/services/:slug

GET /api/projects
GET /api/projects/:slug

GET /api/news
GET /api/news/:slug

GET /api/leadership
GET /api/offices

GET /api/investors/overview
GET /api/investors/resources

GET /api/esg
GET /api/site/settings
GET /api/navigation
GET /api/seo/:pageKey


---

### Admin APIs (Protected)


POST /api/services
PUT /api/services/:id
DELETE /api/services/:id

POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id


Requires:

Authorization: Bearer <JWT_TOKEN>


---

## Postman Collection

Included in the repository:

GOLD_CMS_Postman_Collection.json


Use it to test all endpoints quickly.

---

## Setup & Run

### 1. Install dependencies

npm install


### 2. Create `.env` file

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


### 3. Run server

npm run dev


---

##  Notes

- All GET endpoints return only active content (`isActive: true`)
- Slugs are used for detail pages
- Images are returned as full URLs (Cloudinary)

---

##  Purpose

This project demonstrates how to build a scalable backend for a corporate CMS with proper structure, authentication, and frontend-ready APIs.

---