# Backend Developer Assignment

This project implements a scalable backend API with authentication and role-based access control, along with a basic frontend UI.

## Features

- **User Authentication**: Register and Login with JWT and password hashing.
- **Role-Based Access**: User and Admin roles (Admin not fully utilized in frontend but implemented in backend middleware).
- **CRUD Operations**: Manage "Notes" (Create, Read, Update, Delete). protected by JWT.
- **Frontend UI**: Built with React and Tailwind CSS.
- **API Documentation**: Swagger UI available at `/api-docs`.

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt
- **Frontend**: React (Vite), Tailwind CSS, Axios, React Router

## Setup & Run

### Prerequisites
- Node.js installed
- MongoDB installed and running locally

### Backend

1. Navigate to server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   # or
   node src/index.js
   ```
   Server runs on `http://localhost:5000`.

### Frontend

1. Navigate to client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:5173`.

## API Documentation

Access Swagger UI at `http://localhost:5000/api-docs` to view and test APIs.

## Scalability & Security Note

### Scalability
- **Microservices Ready**: The project is structured with separation of concerns (Routes, Controllers/Logic in Routes, Models). It can be easily broken down into microservices (e.g., Auth Service, Notes Service).
- **Database**: efficient indexing on MongoDB (unique emails/usernames). For high scale, sharding and replication sets would be used.
- **Caching**: Redis could be implemented to cache `GET /api/notes` for frequent access, invalidating on updates.
- **Load Balancing**: The stateless nature of JWT allows horizontal scaling of the backend behind a load balancer (Nginx/AWS ELB).

### Security
- **JWT**: Stateless authentication.
- **Bcrypt**: Password hashing.
- **Validation**: Joi used for request body validation.
- **CORS**: Enabled for frontend communication.
- **Environment Variables**: Sensitive data (Secrets, DB URI) stored in `.env`.

