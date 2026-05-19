# surgeonslab-Task-Manager
# Task Management System

A full-stack **Task Management System** with **JWT-based authentication** and **role-based access control (Admin & User)**.  
This project is built as part of a technical assignment.

---

## Objective

To build a simple task management system where:
- Admin manages users and tasks
- Users manage their assigned tasks

---

## 👥 Roles & Features

### Admin
- Secure login using JWT
- Create new users
- Create tasks
- Assign tasks to users
- View all tasks and their statuses

### User
- Secure login using JWT
- View assigned tasks
- Update task status:
  - Pending
  - In Progress
  - Completed

---

## Tech Stack

### Frontend
- React.js (or your chosen framework)
- Axios (for API calls)
- CSS / Bootstrap / Tailwind (for UI)

### Backend
- Node.js / Express (or FastAPI / Flask / Django)
- JWT for authentication
- RESTful APIs

### Database
- MongoDB / PostgreSQL / MySQL / SQLite

---

## Authentication System

- JWT-based login system
- Protected routes using middleware
- Role-based authorization (Admin / User)

---



## Auth APIs
- `POST /login` → User login

### User APIs
- `POST /users` → Create user (Admin only)
- `GET /users` → Get all users (Admin only)

### Task APIs
- `POST /tasks` → Create task (Admin only)
- `POST /tasks/assign` → Assign task to user (Admin only)
- `GET /tasks` → Get tasks (Admin sees all, User sees assigned only)
- `PUT /tasks/:id` → Update task status (User only)

---

## UI Screens

### Admin Panel
- Login Page
- Admin Dashboard
- User Management Screen
- Task Creation & Assignment Screen
- Task Overview Table

### User Panel
- Login Page
- User Dashboard
- Assigned Tasks List
- Update Task Status Option

---

## 🚀 How to Run the Project
Frontend setup

cd frontend
npm install
npm start

Backend Setup

cd backend
npm install
npm start


Explantion Video:


### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
