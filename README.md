# 🛠️ Backend — Client Dashboard

This folder contains the backend API for the **Client Dashboard** application. It is built with **Express.js** and **Mongoose**, providing secure authentication, user management, and client CRUD operations.

---

## 📁 Folder Structure

```
client-dashboard/
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── src/
    ├── server.ts                # Entry point: Express app setup and server start
    ├── config/
    │   └── db.ts                # MongoDB connection logic
    ├── controllers/
    │   ├── authController.ts    # Auth logic: register, login, password reset
    │   └── clientController.ts  # Client CRUD logic
    ├── middleware/
    │   └── authMiddleware.ts    # JWT authentication and role-based access
    ├── models/
    │   ├── Client.ts            # Mongoose schema for clients
    │   └── User.ts              # Mongoose schema for users
    └── routes/
        ├── auth.ts              # Auth API routes
        └── clientRoutes.ts      # Client API routes
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up environment variables:**
   - Create a `.env` file in the root with:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=3001
     ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

---

## 🧩 Main Components

- **src/server.ts:**  
  Sets up Express, connects to MongoDB, and mounts all routes.

- **src/config/db.ts:**  
  Handles MongoDB connection.

- **src/controllers/authController.ts:**  
  Handles user registration, login, and password reset.

- **src/controllers/clientController.ts:**  
  Handles CRUD operations for client records.

- **src/middleware/authMiddleware.ts:**  
  Middleware for JWT authentication and role-based authorization.

- **src/models/User.ts:**  
  Mongoose schema/model for users.

- **src/models/Client.ts:**  
  Mongoose schema/model for clients.

- **src/routes/auth.ts:**  
  Auth-related API endpoints.

- **src/routes/clientRoutes.ts:**  
  Client CRUD API endpoints (protected, admin-only).

---

## 📚 API Overview

### 🔑 Auth
- `POST /api/auth/register` — Register a new user  
- `POST /api/auth/login` — Login  
- `POST /api/auth/forgot-password` — Request password reset  
- `POST /api/auth/reset-password/:token` — Reset password  

### 👥 Clients (Admin/Authenticated)
- `GET /api/clients` — List all clients  
- `POST /api/clients` — Create a client  
- `GET /api/clients/:id` — Get client by ID  
- `PUT /api/clients/:id` — Update client  
- `DELETE /api/clients/:id` — Delete client  

---

## 📄 Controllers Documentation

### **authController.ts**

Handles user authentication and password management.

- **registerUser**
  - **Route:** `POST /api/auth/register`
  - **Description:** Registers a new user with name, email, password, and optional role.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "role": "string (optional)"
    }
    ```
  - **Returns:** User info and JWT token.

- **loginUser**
  - **Route:** `POST /api/auth/login`
  - **Description:** Authenticates a user with email and password.
  - **Request Body:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```
  - **Returns:** User info and JWT token.

- **forgotPassword**
  - **Route:** `POST /api/auth/forgot-password`
  - **Description:** Generates a password reset token for the user and returns it (normally would be emailed).
  - **Request Body:**
    ```json
    {
      "email": "string"
    }
    ```
  - **Returns:** Reset token.

- **resetPassword**
  - **Route:** `POST /api/auth/reset-password/:token`
  - **Description:** Resets the user's password using a valid reset token.
  - **Request Body:**
    ```json
    {
      "password": "string"
    }
    ```
  - **Returns:** Success message.

---

### **clientController.ts**

Manages CRUD operations for client records.

- **createClient**
  - **Route:** `POST /api/clients`
  - **Description:** Creates a new client.  
  - **Access:** Private (authenticated users).  
  - **Request Body (required):**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "Company": "string"
    }
    ```
  - **Returns:**
    ```json
    {
      "_id": "clientId",
      "name": "string",
      "email": "string",
      "Company": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
    ```

- **getClients**
  - **Route:** `GET /api/clients`
  - **Description:** Retrieves all clients created by the authenticated user.
  - **Access:** Private.
  - **Returns:** Array of client objects.

- **getClientById**
  - **Route:** `GET /api/clients/:id`
  - **Description:** Retrieves a single client by ID.
  - **Access:** Private.
  - **Returns:** Client object.

- **updateClient**
  - **Route:** `PUT /api/clients/:id`
  - **Description:** Updates client details by ID.
  - **Access:** Private.
  - **Request Body (partial or full update):**
    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string",
      "Company": "string"
    }
    ```
  - **Returns:** Updated client object.

- **deleteClient**
  - **Route:** `DELETE /api/clients/:id`
  - **Description:** Deletes a client by ID.
  - **Access:** Private.
  - **Returns:** Success message.

---

## 🛡️ Security

- JWT-based authentication for all protected routes.  
- Role-based access control (admin/user).  
- Passwords are hashed using bcrypt.  

---

## 📝 Notes

- Make sure MongoDB is running and accessible.  
- All protected routes require a valid JWT in the `Authorization` header.  
- The `createClient` endpoint requires **name, email, password, and Company**.  
