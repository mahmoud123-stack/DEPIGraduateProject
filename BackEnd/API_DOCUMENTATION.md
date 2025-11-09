# CareerCraft Authentication API Documentation

## Base URL

```
http://localhost:3000/api/auth
```

## Authentication

Most endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Public Endpoints (No Authentication Required)

### 1. User Registration

**POST** `/signup`

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "phone": "+1234567890",
  "age": 25
}
```

**Response:**

```json
{
  "Message": "User Created Successfully"
}
```

### 2. User Login

**POST** `/login`

Authenticate user and receive JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "age": 25,
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 3. Logout

**POST** `/logout`

Clear authentication cookies.

**Response:**

```json
{
  "Message": "Logged Out Successfully"
}
```

### 4. Forgot Password

**POST** `/forgot-password`

Generate password reset token (in production, this would be sent via email).

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Password reset token generated",
  "resetToken": "abc123def456...",
  "expiresIn": "1 hour"
}
```

### 5. Reset Password

**POST** `/reset-password`

Reset password using the token from forgot password.

**Request Body:**

```json
{
  "token": "abc123def456...",
  "newPassword": "newsecurepassword123"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Password reset successfully"
}
```

### 6. Refresh Token

**POST** `/refresh-token`

Get a new JWT token using an existing valid token.

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**

```json
{
  "status": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## Protected Endpoints (Authentication Required)

### 7. Get Current User Profile

**GET** `/me`

Get the current authenticated user's profile.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "status": true,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "age": 25,
    "country": "USA",
    "education": [
      {
        "degree": "Bachelor of Science",
        "university": "MIT",
        "State": "Graduate"
      }
    ],
    "Skills": [
      {
        "Technical": {
          "name": "JavaScript",
          "Level": "Expert"
        },
        "NonTechnical": {
          "name": "Leadership",
          "Level": "Intermediate"
        }
      }
    ],
    "Interests": ["Web Development", "AI"],
    "Experience": ["Software Engineer at Tech Corp"],
    "Languages": ["English", "Spanish"],
    "Resume": "resume_url_here",
    "role": "user",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 8. Update User Profile

**PUT** `/profile`

Update the current user's profile information.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "John Smith",
  "phone": "+1987654321",
  "age": 26,
  "country": "Canada",
  "education": [
    {
      "degree": "Master of Science",
      "university": "Stanford",
      "State": "Graduate"
    }
  ],
  "Skills": [
    {
      "Technical": {
        "name": "React",
        "Level": "Expert"
      },
      "NonTechnical": {
        "name": "Communication",
        "Level": "Expert"
      }
    }
  ],
  "Interests": ["Frontend Development", "UX Design"],
  "Experience": ["Senior Developer at Startup"],
  "Languages": ["English", "French"],
  "Resume": "new_resume_url"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Profile updated successfully",
  "data": {
    // Updated user object
  }
}
```

### 9. Change Password

**PUT** `/change-password`

Change the current user's password.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Password changed successfully"
}
```

### 10. Delete Account

**DELETE** `/account`

Permanently delete the current user's account.

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "password": "currentpassword123"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Account deleted successfully"
}
```

---

## Error Responses

### Common Error Status Codes:

- `400` - Bad Request (invalid input)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

### Error Response Format:

```json
{
  "message": "Error description",
  "error": "Detailed error information (in development)"
}
```

---

## User Model Schema

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required),
  age: Number (required),
  country: String (optional),
  education: Array (optional),
  Skills: Array (optional),
  Interests: Array (optional),
  Experience: Array (optional),
  Languages: Array (optional),
  Resume: String (optional),
  role: String (default: "user", enum: ["user", "admin"]),
  resetPasswordToken: String (optional),
  resetPasswordExpires: Date (optional),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Tokens**: Secure token-based authentication
3. **Token Expiration**: Tokens expire after 7 days
4. **Password Reset**: Secure token-based password reset
5. **Input Validation**: All inputs are validated
6. **Error Handling**: Comprehensive error handling
7. **Role-based Access**: Support for user and admin roles

---

## Usage Examples

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

const profileData = await profileResponse.json();
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
