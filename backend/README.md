# LeadFlow CRM Backend

The backend for LeadFlow CRM, built with Node.js, Express, and MongoDB.

## Features
- **MVC Architecture**: Clean separation of models, views (controllers), and routes.
- **Authentication**: JWT and bcrypt based authentication.
- **Authorization**: Role-based access control (Admin vs Member).
- **Security**: Helmet, CORS, Rate Limiting.
- **Validation**: `express-validator` for request validation.
- **Testing**: Jest & Supertest for robust API testing.

## Installation

1. Clone the repository and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file from the `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Ensure you provide a valid `MONGODB_URI`.

## Running the App

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

## Testing

```bash
npm test
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get current user profile (Protected)
- `PUT /api/auth/profile` - Update current user profile (Protected)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Leads (Protected)
- `GET /api/leads` - Get all leads (Supports search, pagination, and sorting)
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Notes (Protected)
- `GET /api/notes/:leadId` - Get notes for a lead
- `POST /api/notes` - Add a note to a lead

### Activities (Protected)
- `GET /api/activities/:leadId` - Get activities for a lead (Automatically logged on lead creation, update, and note addition)
