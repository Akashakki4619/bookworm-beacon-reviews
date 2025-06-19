
# Book Review Platform - Backend API

This is the backend API for the Book Review Platform built with Node.js, Express, and MongoDB.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the server directory with:
   ```
   MONGODB_URI=mongodb://localhost:27017/bookreview
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

3. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - The application will create the database and collections automatically

4. **Run the Server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Books
- `GET /api/books` - Get all books (with pagination, search, filters)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book (admin only)
- `PUT /api/books/:id` - Update book (admin only)
- `DELETE /api/books/:id` - Delete book (admin only)

### Reviews
- `GET /api/reviews?bookId=:id` - Get reviews for a book
- `POST /api/reviews` - Create new review (protected)
- `PUT /api/reviews/:id` - Update review (protected)
- `DELETE /api/reviews/:id` - Delete review (protected)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (protected)
- `GET /api/users/:id/reviews` - Get user's reviews

## Features

- JWT Authentication
- Password hashing with bcrypt
- Input validation with express-validator
- MongoDB integration with Mongoose
- CORS enabled for frontend integration
- Error handling middleware
- Role-based access control (user/admin)
- Search functionality for books
- Pagination support
- Review system with rating calculations

## Database Schema

### User
- username, email, password (hashed)
- bio, role (user/admin), profileImage
- timestamps

### Book
- title, author, genre, description
- coverImage, publishedDate, isbn, pages
- avgRating, reviewCount, createdBy
- timestamps

### Review
- userId (ref), bookId (ref)
- rating (1-5), comment
- timestamps
- Unique constraint: one review per user per book

## Development Notes

- Server runs on port 5000 by default
- Database connection logs are displayed on startup
- All passwords are hashed before storage
- JWT tokens expire in 7 days
- Admin users can create/edit/delete books
- Regular users can create/edit/delete their own reviews
