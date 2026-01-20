# 🥷 Code Ninjas Session Reporting & Management

A modern web application for Code Ninjas franchises to manage student sessions, track progress, and facilitate communication between Senseis, Directors, and Parents.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

### 👨‍🏫 Sensei Dashboard
- Create and manage session cards for students
- Track student progress and belt levels
- Add notes and observations for each session

### 📊 Director Dashboard
- Overview of all dojo activities
- Staff management and scheduling
- Performance analytics and reports

### 👨‍👩‍👧 Parent Portal
- View child's session history and progress
- Real-time updates on achievements
- Communication with Senseis

### 🛡️ Admin Panel
- User management across all roles
- Multi-dojo support for franchise owners
- System configuration and settings

### 📰 News & Announcements
- Dojo-wide announcements
- Belt promotion celebrations
- Event notifications

### 🎮 Project Gallery
- Showcase student MakeCode Arcade projects
- IMPACT program integration
- Shareable project links

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Frontend:** React 19, TailwindCSS 4
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Authentication:** Supabase Auth with Row Level Security
- **Deployment:** Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, signup, password reset
│   ├── (dashboard)/     # Protected dashboard routes
│   │   ├── admin/       # Admin user management
│   │   ├── director/    # Director dashboard
│   │   ├── sensei/      # Sensei session management
│   │   ├── parent/      # Parent portal
│   │   ├── gallery/     # Project gallery
│   │   └── news/        # Announcements
│   └── api/             # API routes
├── components/          # Reusable UI components
├── utils/               # Utility functions & Supabase client
└── db/                  # Database schemas & migrations
```

## 🔧 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/codeninjasfl/session-reporting-app.git
cd session-reporting-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 🔐 User Roles

| Role | Access Level |
|------|--------------|
| **Parent** | View child's sessions, progress, and announcements |
| **Sensei** | Create sessions, manage students, view news |
| **Director** | Full dojo access, staff management, analytics |
| **Franchise Owner** | Multi-dojo access, global oversight |
| **Admin** | Full system access, user management |

## 📜 License

Proprietary - Code Ninjas Franchise Use Only

---

Built with ❤️ for Code Ninjas
