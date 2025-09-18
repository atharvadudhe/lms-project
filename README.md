# LMS Project

A full-stack Learning Management System built using Next.js, MongoDB, Tailwind CSS, and NextAuth.js.

## Features
- Authentication using NextAuth.js (JWT)
- Admin and Student dashboards
- Modular reusable UI components (Navbar, CourseCard)
- MongoDB backend for storing users and courses

## Tech Stack
- Next.js (App Router)
- MongoDB via Mongoose
- Tailwind CSS
- JavaScript

## Setup Instructions
```bash
cd lms-project
npm install
npm run dev
```

## Create .env.local with:
```bash
NEXTAUTH_SECRET=<your_secret>
MONGODB_URI=<your_mongodb_uri>
NEXTAUTH_URL=http://localhost:3000
```


---

