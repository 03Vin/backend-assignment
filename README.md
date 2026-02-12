# 🚀 Backend Developer Assignment

This project implements a scalable **REST API** with authentication and role-based access control, along with a connected **Frontend UI**.

It demonstrates secure backend development, modular architecture, REST principles, and scalability considerations.

---

## ✨ Features

### 🔐 Authentication
- **User Registration & Login**
- **Password hashing** using Bcrypt
- **JWT-based authentication**
- **Protected routes** using middleware

### 🛡 Role-Based Access Control
- **USER and ADMIN roles**
- **Middleware-based authorization**
- **Role validation** implemented in backend

### 📝 CRUD Operations (Notes)
- **Create Note**
- **Get All Notes** (User-specific)
- **Update Note**
- **Delete Note**
- All routes protected using **JWT**

### 🌐 Frontend UI
- Built with **React (Vite)**
- **Tailwind CSS** styling
- **Axios** for API communication
- **React Router** for routing
- **Context API** for authentication state management

### 📄 API Documentation
- **Swagger UI** available at:  
  `http://localhost:5000/api-docs`

---

## 🛠 Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB (Local)**
- **Mongoose**
- **JWT** (jsonwebtoken)
- **Bcrypt**
- **Joi** (Validation)
- **Swagger** (API Documentation)

### Frontend
- **React** (Vite)
- **Tailwind CSS**
- **Axios**
- **React Router**
- **Context API**

---

## 📂 Project Structure

```bash
client/
  ├── public/
  ├── src/
  │   ├── assets/
  │   ├── context/
  │   │   └── AuthContext.jsx
  │   ├── pages/
  │   │   ├── Dashboard.jsx
  │   │   ├── Login.jsx
  │   │   └── Register.jsx
  │   ├── App.jsx
  │   └── main.jsx
  ├── tailwind.config.js
  ├── vite.config.js
  └── package.json

server/
  ├── src/
  │   ├── middleware/
  │   │   └── auth.js
  │   ├── models/
  │   │   ├── User.js
  │   │   └── Note.js
  │   ├── routes/
  │   │   ├── auth.js
  │   │   └── notes.js
  │   └── index.js
  ├── package.json
  └── .env
```

---

## ⚙️ Setup & Run

### 🔹 Prerequisites
- **Node.js** installed
- **MongoDB** installed and running locally
- **Git** installed

### 🔹 Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** inside the `server` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/backend_assignment
   JWT_SECRET=your_secret_key
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   # or
   node src/index.js
   ```

   > **Backend runs at:** `http://localhost:5000`

### 🔹 Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   > **Frontend runs at:** `http://localhost:5173`

---

## 📌 API Endpoints

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Notes
| Method | Endpoint | Access |
| :--- | :--- | :--- |
| `GET` | `/api/notes` | Authenticated user |
| `POST` | `/api/notes` | Authenticated user |
| `PUT` | `/api/notes/:id` | Owner |
| `DELETE` | `/api/notes/:id` | Owner / Admin |

---

## 🔒 Security Practices
- **JWT-based stateless authentication**
- **Password hashing** using Bcrypt
- **Request validation** using Joi
- **Role-based middleware authorization**
- **CORS enabled** for frontend communication
- **Environment variables** used for sensitive credentials

---

## 📈 Scalability & Architecture

### 🧩 Scalable Design
- **Modular backend structure** (Routes, Middleware, Models)
- **Stateless authentication** allows horizontal scaling
- **MongoDB indexing** (e.g., unique email fields)
- Easily extendable into **microservices** (Auth Service, Notes Service)

### Ready for:
- **Redis caching**
- **Load balancing** (Nginx / AWS ELB)
- **Docker containerization**
- **CI/CD integration**

### 🚀 Production Considerations
- Database **replication & sharding** for high traffic
- **Reverse proxy** configuration
- Centralized **logging**
- **Rate limiting** & **monitoring**

---

## 🎯 Conclusion

This project demonstrates:
- Secure authentication system implementation
- Role-based access control
- Clean and modular backend architecture
- RESTful API design principles
- Full frontend-backend integration

It reflects practical backend development skills suitable for **real-world scalable applications**.