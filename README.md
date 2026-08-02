# 🌿 Trishul EcoHomestays — Direct Booking Engine

A full-stack MERN (MongoDB, Express, React, Node) eco-tourism direct booking platform for Kumaon Himalayan homestays. Built for zero-commission, host-first, sustainable travel.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🏡 Homestay Listings | Browse curated eco-stays with gallery, filters, ratings |
| 🔍 Realtime Search | Filter by location, price range, amenities, ratings |
| 📅 Availability Checker | Visual date-based room availability |
| 📋 Booking Engine | Secure booking form with dynamic pricing, guest validation |
| 🤖 AI Trip Planner | Gemini AI generates eco-conscious, structured itineraries |
| 🔐 Auth (JWT + Google OAuth) | Secure login, register, and Google sign-in |
| 📊 Dashboard | View profile info and booking history |
| 🌙 Dark/Light Theme | Full dark mode support |
| 📱 Responsive | Mobile-first, works on all screen sizes |

---

## 🗂️ Project Structure

```
trishul-ecohomestays/
├── backend/                    # Node.js + Express API
│   ├── config/
│   │   ├── db.js               # MongoDB Atlas connection
│   │   └── passport.js         # Google OAuth strategy
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── homestayController.js
│   │   └── aiController.js
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT requireAuth guard
│   ├── models/
│   │   ├── User.js
│   │   ├── Homestay.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── homestayRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── aiRoutes.js
│   ├── scripts/
│   │   └── seed.js             # Database seeder
│   ├── services/
│   │   ├── geminiService.js    # Gemini AI integration
│   │   └── huggingFaceService.js # HF fallback
│   └── server.js               # Express entry point
│
├── src/                        # React (Vite) frontend
│   ├── components/
│   │   ├── ui/                 # Button, Input, Modal
│   │   ├── Navbar.jsx          # Sticky, responsive navbar
│   │   ├── Footer.jsx          # Eco-themed footer
│   │   ├── ErrorBoundary.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with search, FAQs
│   │   ├── About.jsx           # Company story, team, timeline
│   │   ├── Homestays.jsx       # Listings with filters
│   │   ├── HomestayDetail.jsx  # Gallery, reviews, booking
│   │   ├── Booking.jsx         # Booking form + summary
│   │   ├── Availability.jsx    # Date availability checker
│   │   ├── AITripPlanner.jsx   # Gemini AI itinerary planner
│   │   ├── Contact.jsx         # Contact form + info
│   │   ├── Policies.jsx        # Privacy + Terms pages
│   │   ├── Login.jsx           # JWT + Google OAuth login
│   │   ├── Register.jsx        # Account registration
│   │   ├── Dashboard.jsx       # Profile + bookings
│   │   ├── Profile.jsx         # Redirects to /dashboard
│   │   ├── OAuthSuccess.jsx    # OAuth token handler
│   │   └── NotFound.jsx        # 404 fallback page
│   ├── services/
│   │   └── api.js              # Axios instance + interceptors
│   ├── main.jsx                # React Router + app entry
│   └── index.css               # Tailwind CSS v4 styles
│
├── vercel.json                 # Vercel SPA routing config
├── vite.config.js              # Vite build configuration
└── package.json                # Frontend dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **MongoDB Atlas** account (free tier works)
- **Google Cloud Console** project (for OAuth)
- **Google AI Studio** API key (for Gemini AI)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/trishul-ecohomestays.git
cd trishul-ecohomestays
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/trishul
JWT_SECRET=your_super_secret_jwt_key_here
GEMINI_API_KEY=your_google_gemini_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Dynamic URLs (set these for production)
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

**Seed the database** (first run):

```bash
node scripts/seed.js
```

**Start the backend server:**

```bash
npm run dev
# or
node server.js
```

---

### 3. Frontend Setup

```bash
# From the project root
npm install
```

Create a `.env` file at the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

**Start the development server:**

```bash
npm run dev
```

The app will open at `http://localhost:5173`.

---

## 🌐 Production Deployment

### Frontend → Vercel

1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Set **Build Command**: `npm run build`
3. Set **Output Directory**: `dist`
4. Add **Environment Variable**: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy! The `vercel.json` handles SPA routing automatically.

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com).
2. Connect your GitHub repo and set **Root Directory** to `backend`.
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add the following **Environment Variables**:

| Variable | Value |
|---|---|
| `PORT` | `5000` (Render auto-assigns) |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A strong random secret |
| `GEMINI_API_KEY` | Your Google AI Studio key |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `BACKEND_URL` | `https://your-service.onrender.com` |
| `FRONTEND_URL` | `https://your-site.vercel.app` |

---

## 🔑 API Reference

### Auth Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login with email/password |
| GET | `/api/auth/google` | Initiate Google OAuth |
| GET | `/api/auth/google/callback` | Google OAuth callback |
| GET | `/api/auth/me` | Get current user (protected) |

### Homestay Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/homestays` | List all homestays |
| GET | `/api/homestays/:id` | Get single homestay |
| GET | `/api/homestays/search?q=` | Search by keyword/location |

### Booking Endpoints (Protected)

| Method | Path | Description |
|---|---|---|
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings/my` | Get user's bookings |
| DELETE | `/api/bookings/:id` | Cancel a booking |

### AI Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/ai/tripplanner` | Generate AI itinerary |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4 |
| **Routing** | React Router DOM v7 |
| **HTTP Client** | Axios (with JWT interceptor) |
| **Notifications** | React Hot Toast |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas + Mongoose |
| **Authentication** | JWT, Passport.js (Google OAuth) |
| **AI** | Google Gemini 2.5 Flash (`@google/genai`) |
| **AI Fallback** | Hugging Face Inference API |

---

## 📄 License

This project is part of the TBI (Technology Business Incubator) internship program. All rights reserved.

---

> 🌱 _Travel light. Leave no trace. Book directly._