# Blog Portfolio

A modern, production-ready blog portfolio application built with React, TypeScript, and cutting-edge web technologies.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**:
  - Redux Toolkit (global UI state)
  - TanStack Query (server state, caching, infinite scrolling)
- **Form Management**: TanStack Form
- **Routing**: React Router DOM
- **API Mocking**: MSW (Mock Service Worker)
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## Architecture

This project follows **Clean Architecture** principles with a **Feature-Based Structure**:

```
src/
├── app/              # Application-wide setup
│   ├── store/        # Redux store configuration
│   ├── router/       # Routing setup
│   └── providers/    # React providers
├── core/             # Core utilities and infrastructure
│   ├── api/          # API client setup
│   ├── constants/    # App constants
│   ├── hooks/        # Custom hooks
│   ├── utils/        # Utility functions
│   └── types/        # Shared types
├── features/         # Feature modules
│   └── blog/         # Blog feature
│       ├── api/      # API calls
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       ├── store/
│       ├── schemas/
│       └── types/
├── shared/           # Shared components and utilities
│   ├── components/
│   ├── layouts/
│   ├── ui/           # Reusable UI components
│   └── assets/
└── mocks/            # MSW mock setup
    ├── handlers/
    └── data/
```

## Key Features

### 🎨 Modern UI/UX
- Responsive design for all screen sizes
- Dark/Light mode toggle with persistence
- Smooth animations and transitions
- Skeleton loading states
- Toast notifications
- Modal confirmations

### 📝 Blog Management
- Infinite scrolling blog list
- Search and filter functionality
- Sort by date or title
- Create, edit, and delete blog posts
- Form validation with TanStack Form

### 🔄 State Management
- **Redux Toolkit**: Theme mode, notifications, global loading, auth
- **TanStack Query**: Server state, caching, background updates, infinite scrolling

### 🧪 Testing
- Unit tests with Vitest
- Component testing with React Testing Library
- MSW for API mocking in tests

### 📦 Development
- Hot module replacement (HMR)
- ESLint and Prettier integration
- Pre-commit hooks with Husky
- Lint-staged for staged files

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## Project Structure Details

### App Layer (`src/app/`)
- **Store**: Redux store configuration with slices for theme, auth, notifications, and loading
- **Router**: React Router configuration
- **Providers**: Combines Redux, TanStack Query, and Router providers

### Core Layer (`src/core/`)
- **API**: Axios client setup with interceptors
- **Constants**: App-wide constants (categories, sort options, etc.)
- **Hooks**: Custom hooks like `useAppDispatch`, `useAppSelector`, `useIntersectionObserver`
- **Utils**: Utility functions (date formatting, class merging, debouncing)
- **Types**: Shared TypeScript types and interfaces

### Features Layer (`src/features/`)
Each feature is self-contained with:
- **API**: API service functions
- **Components**: Feature-specific components
- **Pages**: Page components
- **Hooks**: Feature-specific custom hooks
- **Services**: Business logic
- **Schemas**: Validation schemas
- **Types**: Feature-specific types

### Shared Layer (`src/shared/`)
- **UI Components**: Reusable UI primitives (Button, Input, Modal, Toast, etc.)
- **Layouts**: Layout components (MainLayout)
- **Assets**: Static assets

### Mocks Layer (`src/mocks/`)
- **Handlers**: MSW request handlers
- **Data**: Mock data generation
- **Browser**: MSW browser setup

## Redux vs TanStack Query

This project uses both state management libraries for different purposes:

### Redux Toolkit
Used for **global UI state**:
- Theme mode (dark/light)
- User authentication state
- Toast notifications
- Global loading states

**Why Redux?**
- Centralized UI state
- Predictable state updates
- DevTools for debugging
- Persistence for theme preference

### TanStack Query
Used for **server state**:
- Blog data fetching
- Caching and stale-while-revalidate
- Infinite scrolling
- Mutation (create/update/delete)
- Background updates

**Why TanStack Query?**
- Built-in caching
- Automatic background updates
- Optimistic updates
- Infinite scrolling support
- Error handling and retries
- DevTools

## API Endpoints

Mock API endpoints (MSW):
- `GET /blogs` - Get paginated blogs
- `GET /blogs?page=1&limit=10&search=...&category=...&sort=...` - Filtered blogs
- `GET /blogs/:id` - Get single blog
- `POST /blogs` - Create blog
- `PUT /blogs/:id` - Update blog
- `DELETE /blogs/:id` - Delete blog

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint files
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI

## License

MIT
