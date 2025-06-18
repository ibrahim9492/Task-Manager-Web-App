# 📝 Task Manager Web App

A simple full-stack task manager built with Node.js, Express, SQLite (TypeORM), and React.js.

## 🔧 Tech Stack
- Backend: Node.js, Express.js, TypeORM, SQLite
- Frontend: React.js, Tailwind CSS

## 📦 Setup

### Backend
```bash

cd server

npm install

npm start

Frontend

bash

Copy

Edit

cd client

npm install

npm run dev

🌐 API

GET /tasks – List tasks

POST /tasks – Add task

PUT /tasks/:id – Update task

DELETE /tasks/:id – Delete task

Make sure to set API URL in frontend/.env.local:

NEXT_PUBLIC_API_URL=http://localhost:3000
