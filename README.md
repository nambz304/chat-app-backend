# Chat App — Backend

A real-time chat REST API and WebSocket server built with **Node.js**, **Express**, **TypeORM**, **Socket.IO**, and **PostgreSQL**. Supports Google OAuth authentication

---

## Features

- **Google OAuth 2.0** — sign in with Google, JWT issued on success
- **Real-time DM** — direct messaging via Socket.IO 

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 |
| Web Framework | Express 5 |
| Language | TypeScript 5 |
| ORM | TypeORM 0.3 |
| Database | PostgreSQL |
| Real-time | Socket.IO 4 |
| Auth | Google OAuth 2.0 + JWT |
| Validation | Zod |
| Logging | Winston |
| Containerisation | Docker |

---

## Project Structure

```
src/
├── service.ts              # Entry point — Express + HTTP server bootstrap
├── config/
│   ├── db.ts               # TypeORM DataSource
│   └── socket.ts           # Socket.IO initialisation & event handlers
├── feature/
│   ├── auth/               # Google OAuth controller & router
│   ├── chat/               # Chat controller, router & Message entity
│   ├── group/              # Group entity
│   └── user/               # User controller, router & User entity
└── common/
    ├── middlewares/logger/ # Winston logger middleware
    └── utils/validation/   # Zod validation helpers
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL instance
- Google OAuth 2.0 credentials ([console.cloud.google.com](https://console.cloud.google.com))

### Installation

```bash
git clone <repo-url>
cd chat-app-backend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=8080

# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/chatapp

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8080/auth/google/callback

# JWT
JWT_SECRET=your_jwt_secret

# Frontend URL (used for post-auth redirect)
FRONTEND_URL=http://localhost:5173
```

### Database Migrations

```bash
# Generate a new migration
npm run migration:generate

# Apply migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### Development

```bash
npm run dev
```

Runs the server with `nodemon` — automatically restarts on file changes.

---

## Docker

```bash
# Build image
docker build -t chat-app-backend .

# Run container
docker run -p 8080:8080 --env-file .env chat-app-backend
```

The multi-stage Dockerfile produces a minimal production image (Alpine, production deps only).

---

## License

ISC
