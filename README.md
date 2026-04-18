# Coding Platform

Full-stack coding practice platform with problem solving, online judge integration, leaderboard, discussion forum, and AI doubt support.

## What This Project Includes

- Problem solving with multi-language code editor (C++, Java, JavaScript, Python)
- Code run and submit flow through Judge0 API
- Authentication with email/password and Google OAuth
- User profile with score/rank and solved problem tracking
- Discussion forum with posts and comments
- Real-time notifications using Socket.IO
- Admin-only problem management (create/update/delete, video link upload)

## Tech Stack

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Redis
- JWT auth via httpOnly cookies
- Socket.IO
- Cloudinary (image uploads)
- Judge0 (code execution)
- Google Generative AI (AI chat)

### Frontend

- React 19 + Vite
- React Router
- Tailwind CSS
- Monaco Editor
- Axios + Fetch API
- Socket.IO client

## Repository Structure

```text
.
|- Backend/
|  |- problemsJSON/           # seed/problem data examples
|  |- src/
|  |  |- config/              # db, redis, cloudinary
|  |  |- controllers/         # auth, problems, submissions, discussions, rank, notifications, AI chat
|  |  |- middleware/          # user/admin/guest auth, multer upload
|  |  |- models/              # user, problem, submission, post/comment/notification
|  |  |- routes/              # express route modules
|  |  |- services/            # socket + notification helpers
|  |  |- utils/
|  |  |- index.js             # app + socket bootstrap
|  |- uploads/
|  |- .env.templete
|  |- package.json
|- Frontend/
|  |- public/
|  |- src/
|  |  |- api/                 # frontend API wrappers
|  |  |- components/          # shared UI components
|  |  |- context/             # Auth + Theme providers
|  |  |- InnerComponents/     # admin pages/components
|  |  |- pages/               # app routes
|  |  |- socket/              # socket client
|  |  |- App.jsx
|  |  |- main.jsx
|  |- .env
|  |- package.json
|- README.md
```

## Backend Environment Variables

Create `Backend/.env` and define:

```env
PORT=4000
DB_CONNECT_STRING=mongodb://...
JWT_KEY=...
REDIS_PASS=...
JUDGE0_KEY=...

# Optional/feature-specific variables used in codebase
REDIS_HOST=localhost
REDIS_PORT=6379
CLOUD_NAME=...
CLOUD_API_KEY=...
CLOUD_API_SECRET=...
GOOGLE_CLIENT_ID=...
AICHAT_API=...
```

Notes:

- `Backend/.env.templete` currently contains core keys only.
- Redis connect errors are logged and ignored by startup code, but features depending on Redis may degrade.

## Frontend Environment Variables

`Frontend/.env` currently uses:

```env
VITE_GOOGLE_CLIENT_ID=...
```

For better maintainability, move API base URLs to env variables in future (`VITE_API_BASE_URL`, `VITE_SOCKET_URL`).

## Local Development Setup

## 1) Install Dependencies

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

## 2) Start Backend

Important: backend `package.json` does not currently define `start`/`dev` scripts.

Run directly:

```bash
cd Backend
node src/index.js
```

Optional improvement for contributors:

```json
"scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
}
```

## 3) Start Frontend

```bash
cd Frontend
npm run dev
```

Frontend scripts available:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## API Overview

Base server mount is in `Backend/src/index.js`:

- `/user`
- `/problem`
- `/submission`
- `/api` (rank)
- `/api/notifications`
- `/discussion`
- `/ai`

### Auth/User

- `POST /user/register`
- `POST /user/login`
- `POST /user/google`
- `POST /user/logout` (auth required)
- `POST /user/admin/register` (admin required)
- `POST /user/deleteProfile` (auth required)
- `GET /user/getProfile` (auth required)
- `POST /user/updateProfile` (auth required)
- `POST /user/uploadProfile` (auth required, multipart key: `image`)
- `POST /user/uploadCoverImage` (auth required, multipart key: `image`)
- `GET /user/leaderboard`

### Problems

- `POST /problem/create` (admin)
- `PUT /problem/update/:id` (admin)
- `PUT /problem/upload/:id` (admin)
- `DELETE /problem/delete/:id` (admin)
- `GET /problem/getAllProblem`
- `GET /problem/problemById/:id`
- `GET /problem/problemSolvedByUser` (auth)
- `GET /problem/submittedProblem/:pid` (auth)

### Submissions

- `POST /submission/run/:id` (guest middleware)
- `POST /submission/submit/:id` (auth)

### Discussion

- `POST /discussion/create` (auth)
- `GET /discussion`
- `GET /discussion/:postId`
- `DELETE /discussion/:postId` (auth)
- `POST /discussion/:postId/comment` (auth)
- `GET /discussion/:postId/comments`

### Rank + Notifications + AI

- `GET /api/rank` (auth)
- `GET /api/notifications` (auth)
- `GET /api/notifications/unread-count` (auth)
- `PUT /api/notifications/read` (auth)
- `POST /ai/chat` (auth)

## Frontend Route Map

- `/`
- `/login`
- `/register`
- `/problems` and `/problem`
- `/problems/:id`
- `/contests`
- `/leaderboard`
- `/discuss`
- `/profile`
- `/dashboard`
- `/admin`
- `/admin/create`
- `/admin/delete`
- `/admin/update`
- `/admin/video`

## Data Model Snapshot

- `user`: identity, role, solved problems, score, profile/cover images
- `problem`: statement, visible/hidden tests, starter code, reference solutions
- `submission`: user/problem/language/code with status/runtime/memory and pass counts
- `post` + `comment`: discussion content
- `notification`: user notification records

## Real-Time Features

Socket server is attached in backend startup. Frontend socket client currently points to:

- `http://localhost:4000` in `Frontend/src/socket/socket.js`

Used for engagement + notifications in discussion-related flows.

## Important Contributor Notes

- Backend CORS allows `http://localhost:5173` and one deployed Vercel URL.
- Frontend API layer currently mixes Axios and Fetch.
- Frontend API base URL is hardcoded to Render in multiple files:
    - `Frontend/src/api/axiosInstance.js`
    - `Frontend/src/api/problem.api.js`
    - `Frontend/src/api/submission.api.js`
- If working locally, switch base URL(s) to `http://localhost:4000`.
- Keep `withCredentials` enabled when using cookie auth.

## Recommended Next Improvements

- Add backend `start`/`dev` scripts
- Add `.env.example` for both apps
- Move all URLs to environment variables
- Add API documentation (OpenAPI/Swagger)
- Add tests (unit + integration)


### Live Link : https://coding-platform-cyan.vercel.app/