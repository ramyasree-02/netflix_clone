# Netflix Clone

A Netflix-style streaming platform built with **React**, **TypeScript**, and **Tailwind CSS** featuring a modern dark UI, smooth animations, and responsive design.

---


## Features

- **Authentication**: Secure signup/login and profile management  
- **Content Catalog**: Browse movies/shows by categories like Trending, Originals, and My List  
- **Video Player**: Full-featured player with controls and fullscreen  
- **Search & Discovery**: Real-time search with suggestions  
- **Responsive Design**: Optimized for desktop, tablet, and mobile  

---


## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite  
- **Icons**: Lucide React  
- **Tools**: ESLint, PostCSS, Autoprefixer

---
  
## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AuthPage.tsx     # Authentication interface
│   ├── Header.tsx       # Navigation header with search
│   ├── HeroBanner.tsx   # Featured content banner
│   ├── MovieCard.tsx    # Individual movie/show cards
│   ├── MovieModal.tsx   # Detailed content information
│   ├── MovieRow.tsx     # Horizontal content carousels
│   ├── ProfileModal.tsx # User profile management
│   ├── SearchResults.tsx# Search results display
│   └── VideoPlayer.tsx  # Full-featured video player
├── context/             # React context providers
│   └── AuthContext.tsx  # Authentication state management
├── data/               # Static data and mock content
│   └── movies.ts       # Sample movie/show data
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

---

## Quick Start

```bash
git clone <repository-url>
cd netflix-clone
npm install
npm run dev
Open http://localhost:5173 to view the app.



