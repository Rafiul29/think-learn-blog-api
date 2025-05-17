# 🧠 StudyStream / BrainWave / ThinkLearn - Blog REST API

A secure and scalable Blog REST API application enabling authenticated users to manage articles and comments, while allowing public read access. Built for simplicity, flexibility, and administrative control.

---

## 🚀 Features

- **User Authentication**
  - Register and login securely
  - JWT or session-based authentication

- **User Management (Admin Only)**
  - Create, update, delete users
  - Change user passwords
  - View user list

- **Article Management**
  - Create, update, delete articles (authenticated users)
  - Public access to view articles
  - Admin override for content moderation
  - Upload optional cover photo

- **Commenting**
  - Comment on articles (authenticated users)
  - Public read access to comments

- **Cover Photo Management**
  - Upload, update, delete article cover photos

---

## 📦 Tech Stack

- **Backend:** Express 
- **Database:** MongoDB
- **Authentication:** JWT / Laravel Sanctum / Passport

---

## 📜 API Documentation

> You can access full API documentation via [Postman Collection](#) *(replace with your actual link)*

### Authentication

| Method | Endpoint         | Description       |
|--------|------------------|-------------------|
| POST   | `/api/register`  | Register a user   |
| POST   | `/api/login`     | Login a user      |

### Articles

| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| GET    | `/api/articles`    | List all articles         |
| GET    | `/api/articles/:id`| Get article by ID         |
| POST   | `/api/articles`    | Create article (auth)     |
| PUT    | `/api/articles/:id`| Update article (auth)     |
| DELETE | `/api/articles/:id`| Delete article (auth)     |

*(Add endpoints for comments, cover photo, and user management as needed.)*

---

## 🛠️ Installation

```bash
# Clone the repository
https://github.com/Rafiul29/think-learn-blog-api.git
cd think-learn-blog-api

# Install dependencies
npm install       # Node.js

# Set up environment
cp .env.example .env

# Run Command
npm run dev
