# CareerCraft Authentication API

A comprehensive authentication system built with Node.js, Express, and MongoDB.

## 🚀 Features

- **User Registration & Login** with JWT authentication
- **Password Management** (change, reset, forgot)
- **Profile Management** (view, update)
- **Token Management** (refresh, logout)
- **Account Management** (delete)
- **Role-based Access Control** (user/admin)
- **Secure Password Hashing** with bcrypt
- **Comprehensive Error Handling**

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository and navigate to the BackEnd directory:**

   ```bash
   cd BackEnd
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create environment variables:**
   Create a `.env` file in the BackEnd directory with the following variables:

   ```env
   # Database Configuration
   DB_URL=mongodb://localhost:27017/careercraft

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here

   # Server Configuration
   PORT=5000
   ```

4. **Start the server:**

   ```bash
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
   ```

## 🧪 Testing the API

1. **Install axios for testing:**

   ```bash
   npm install axios
   ```

2. **Run the test script:**
   ```bash
   node test-auth-endpoints.js
   ```

This will test all authentication endpoints in sequence.

## 📚 API Endpoints

### Public Endpoints (No Authentication Required)

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| POST   | `/api/auth/signup`          | Register a new user       |
| POST   | `/api/auth/login`           | Login user                |
| POST   | `/api/auth/logout`          | Logout user               |
| POST   | `/api/auth/forgot-password` | Request password reset    |
| POST   | `/api/auth/reset-password`  | Reset password with token |
| POST   | `/api/auth/refresh-token`   | Refresh JWT token         |

### Protected Endpoints (Authentication Required)

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| GET    | `/api/auth/me`              | Get current user profile |
| PUT    | `/api/auth/profile`         | Update user profile      |
| PUT    | `/api/auth/change-password` | Change password          |
| DELETE | `/api/auth/account`         | Delete account           |

## 🔐 Authentication

Most protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📖 Usage Examples

### Using with JavaScript Fetch:

```javascript
// Login
const loginResponse = await fetch("/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "password123",
  }),
});

const loginData = await loginResponse.json();
const token = loginData.data.token;

// Get user profile
const profileResponse = await fetch("/api/auth/me", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

### Using with Axios:

```javascript
import axios from "axios";

// Set default headers
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

// Login
const loginResponse = await axios.post("/api/auth/login", {
  email: "user@example.com",
  password: "password123",
});

// Get profile
const profileResponse = await axios.get("/api/auth/me");
```

## 🏗️ Project Structure

```
BackEnd/
├── Src/
│   ├── controllers/
│   │   └── auth.controller.js      # Authentication controllers
│   ├── middlewares/
│   │   └── auth.middleware.js      # Authentication middleware
│   ├── models/
│   │   └── Users.model.js          # User model
│   ├── Routes/
│   │   └── auth.routes.js          # Authentication routes
│   ├── config/
│   │   └── DB.js                   # Database configuration
│   └── App.js                      # Express app setup
├── Server.js                       # Server entry point
├── package.json                    # Dependencies
├── test-auth-endpoints.js          # API test script
└── API_DOCUMENTATION.md            # Detailed API documentation
```

## 🔧 Configuration

### Environment Variables

- `DB_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `PORT`: Server port (default: 5000)

### Database Schema

The User model includes:

- Basic info (name, email, password, phone, age)
- Profile data (country, education, skills, interests, experience)
- Authentication fields (role, reset tokens)
- Timestamps

## 🚨 Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Tokens**: Secure token-based authentication
3. **Token Expiration**: Tokens expire after 7 days
4. **Password Reset**: Secure token-based password reset
5. **Input Validation**: All inputs are validated
6. **Error Handling**: Comprehensive error handling
7. **Role-based Access**: Support for user and admin roles

## 🐛 Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct
2. **JWT Secret Missing**: Make sure JWT_SECRET is set in your .env file
3. **Port Already in Use**: Change the PORT in .env or kill the process using the port

### Error Codes:

- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support, please open an issue in the repository or contact the development team.
