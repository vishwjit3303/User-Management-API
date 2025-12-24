# User Management API

A Node.js/Express.js API for user management and todo functionality with JWT authentication.

## Features

- User registration and login with JWT authentication
- User profile management (get and update profile)
- Todo creation and retrieval with search and pagination
- Password hashing with bcrypt
- MongoDB database integration with Mongoose
- CORS support for cross-origin requests

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Other**: dotenv, cors

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

## Project Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/user-management-api
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

   > **Note**: Replace `your-super-secret-jwt-key-here` with a strong, unique secret key for JWT token signing.

4. **Start MongoDB**
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGO_URI` accordingly.

5. **Run the application**
   ```bash
   # For development with nodemon
   npm run dev

   # Or for production
   npm start
   ```

6. **Verify the setup**
   Open your browser and navigate to `http://localhost:5000`. You should see "API is running...".

## Environment Variables Usage

The application uses the following environment variables:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing (keep this secure!)
- `PORT`: Port number for the server (defaults to 5000 if not set)

## API Endpoints

### Authentication Routes (`/api/auth`)

- **POST /api/auth/register**
  - Register a new user
  - Body: `{ "name": "Vishwajeet Pawar", "email": "vp@gmail.com", "password": "password123" }`

- **POST /api/auth/login**
  - Login user
  - Body: `{ "email": "vp@gmail.com", "password": "password123" }`

### User Routes (`/api/users`) - Protected

- **GET /api/users/profile**
  - Get user profile (requires authentication)

- **PUT /api/users/profile**
  - Update user profile
  - Body: `{ "name": "Updated Name", "email": "updatedvp@gmail.com" }`

### Todo Routes (`/api/todos`) - Protected

- **POST /api/todos**
  - Create a new todo
  - Body: `{ "title": "My Todo Item" }`

- **GET /api/todos**
  - Get todos with optional search and pagination
  - Query params: `?page=1&limit=10&search=todo`

## API Testing Instructions

### Using Postman

1. **Import the Postman Collection**
   - Download or copy the following JSON and import it into Postman:

   ```json
   {
     "info": {
       "name": "User Management API",
       "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
     },
     "item": [
       {
         "name": "Register User",
         "request": {
           "method": "POST",
           "header": [
             {
               "key": "Content-Type",
               "value": "application/json"
             }
           ],
           "body": {
             "mode": "raw",
             "raw": "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"password123\"}"
           },
           "url": {
             "raw": "{{base_url}}/api/auth/register",
             "host": ["{{base_url}}"],
             "path": ["api", "auth", "register"]
           }
         }
       },
       {
         "name": "Login User",
         "request": {
           "method": "POST",
           "header": [
             {
               "key": "Content-Type",
               "value": "application/json"
             }
           ],
           "body": {
             "mode": "raw",
             "raw": "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
           },
           "url": {
             "raw": "{{base_url}}/api/auth/login",
             "host": ["{{base_url}}"],
             "path": ["api", "auth", "login"]
           }
         }
       },
       {
         "name": "Get Profile",
         "request": {
           "method": "GET",
           "header": [
             {
               "key": "Authorization",
               "value": "Bearer {{token}}"
             }
           ],
           "url": {
             "raw": "{{base_url}}/api/users/profile",
             "host": ["{{base_url}}"],
             "path": ["api", "users", "profile"]
           }
         }
       },
       {
         "name": "Update Profile",
         "request": {
           "method": "PUT",
           "header": [
             {
               "key": "Authorization",
               "value": "Bearer {{token}}"
             },
             {
               "key": "Content-Type",
               "value": "application/json"
             }
           ],
           "body": {
             "mode": "raw",
             "raw": "{\"name\":\"Updated Name\"}"
           },
           "url": {
             "raw": "{{base_url}}/api/users/profile",
             "host": ["{{base_url}}"],
             "path": ["api", "users", "profile"]
           }
         }
       },
       {
         "name": "Create Todo",
         "request": {
           "method": "POST",
           "header": [
             {
               "key": "Authorization",
               "value": "Bearer {{token}}"
             },
             {
               "key": "Content-Type",
               "value": "application/json"
             }
           ],
           "body": {
             "mode": "raw",
             "raw": "{\"title\":\"My Todo Item\"}"
           },
           "url": {
             "raw": "{{base_url}}/api/todos",
             "host": ["{{base_url}}"],
             "path": ["api", "todos"]
           }
         }
       },
       {
         "name": "Get Todos",
         "request": {
           "method": "GET",
           "header": [
             {
               "key": "Authorization",
               "value": "Bearer {{token}}"
             }
           ],
           "url": {
             "raw": "{{base_url}}/api/todos?page=1&limit=10&search=todo",
             "host": ["{{base_url}}"],
             "path": ["api", "todos"],
             "query": [
               {
                 "key": "page",
                 "value": "1"
               },
               {
                 "key": "limit",
                 "value": "10"
               },
               {
                 "key": "search",
                 "value": "todo"
               }
             ]
           }
         }
       }
     ],
     "variable": [
       {
         "key": "base_url",
         "value": "http://localhost:5000"
       },
       {
         "key": "token",
         "value": ""
       }
     ]
   }
   ```

2. **Set Environment Variables in Postman**
   - Create a new environment in Postman
   - Add variables: `base_url` = `http://localhost:5000`, `token` = (leave empty initially)

3. **Testing Flow**
   - Start with "Register User" or "Login User" to get a token
   - Copy the token from the response and set it in the environment variable
   - Test protected routes using the token

### Using cURL

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login User:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Profile (replace TOKEN with actual token):**
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

**Create Todo:**
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Todo Item"}'
```

**Get Todos:**
```bash
curl -X GET http://localhost:5000/api/todos \
  -H "Authorization: Bearer TOKEN"
```

## Project Structure

```
user-management-api/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── userController.js  # User management
│   └── todoController.js  # Todo operations
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── User.js            # User model
│   └── Todo.js            # Todo model
├── routes/
│   ├── authRoutes.js      # Auth routes
│   ├── userRoutes.js      # User routes
│   └── todoRoutes.js      # Todo routes
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
├── server.js              # Main application file
└── README.md              # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
