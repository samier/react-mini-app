# React Project Dashboard

A modern, responsive project management dashboard built with React 18, TypeScript, and Vite. This mini-app demonstrates best practices for state management, routing, testing, and accessibility.

## :movie_camera: Demo
![Demo](./public/demo.gif)

## 🚀 Features

- **Project List View**: Display all projects with search/filter functionality
- **Project Detail View**: Detailed view of individual projects with team information and progress tracking
- **Real-time Search**: Filter projects by name, description, or team members
- **Dark/Light/System Theme**: Beautiful theme toggle with smooth transitions (bottom-right corner)
- **Smooth Animations**: Professional shimmer effects, fade-in, and slide animations
- **Responsive Design**: Beautiful UI that works on all screen sizes
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Custom Hooks**: Clean state management with `useProjects` hook
- **Routing**: Client-side routing with React Router v6
- **Testing**: Comprehensive test coverage with Vitest and React Testing Library

## 📦 Tech Stack

- **React 18+** - Modern React with hooks
- **TypeScript** - Type-safe code
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **next-themes** - Theme management (dark/light/system mode)
- **Vitest** - Fast unit testing
- **React Testing Library** - User-centric testing
- **Lucide React** - Beautiful icon library

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProjectCard.tsx  # Individual project card with shimmer effects
│   ├── ProjectList.tsx  # Grid of project cards
│   ├── SearchBar.tsx    # Search input component
│   ├── TaskList.tsx     # Task list component
│   ├── ThemeToggle.tsx  # Dark/light/system theme switcher
│   └── ui/              # shadcn/ui components
├── hooks/              # Custom React hooks
│   └── useProjects.ts  # Project data management
├── pages/              # Route pages
│   ├── ListPage.tsx    # Main project list view
│   ├── DetailPage.tsx  # Project detail view
│   └── NotFound.tsx    # 404 page
├── __tests__/          # Test files
│   └── ProjectsList.test.tsx
└── App.tsx             # Main app component with routing and theme provider
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm installed
- Git (optional)

### Installation

1. Clone the repository (or download the code):
```bash
git clone <repository-url>
cd vite-react-mini-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## 🧪 Testing

The project includes comprehensive tests using Vitest and React Testing Library. Tests cover:

- Component rendering
- Search/filter functionality
- Empty states
- Accessibility features
- User interactions

Run tests with:
```bash
npm run test
```

## ♿ Accessibility Features

- Semantic HTML elements (`<main>`, `<header>`, `<nav>`)
- ARIA labels for interactive elements
- ARIA live regions for dynamic content updates
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Theme toggle with accessible dropdown menu
- Color scheme attributes for proper browser rendering

## 🎨 Design System

The app uses a modern design system with:

- **Standard Professional Colors**: Blue primary, green success, amber warning, red destructive
- **Dark/Light Mode**: Full theme support with system preference detection
- **Smooth Animations**: Shimmer hover effects, fade-in, and slide animations
- **Card-based Layouts**: Consistent card sizing with subtle shadows and borders
- **Status-based Colors**: Visual indicators matching project status (active=blue, completed=green, on-hold=gray)
- **Responsive Grid System**: Perfectly aligned cards across all screen sizes
- **Consistent Spacing**: Professional typography and spacing system

## 📱 Responsive Design

The dashboard is fully responsive and works beautifully on:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1400px+)

## 🔄 State Management

State is managed using React hooks and a custom `useProjects` hook that:

- Provides mock project data
- Implements filtering logic
- Exposes helper functions (getProjectById)
- Uses memoization for performance

## 🚦 Routing Structure

- `/` - Main project list view
- `/project/:id` - Individual project detail view
- `*` - 404 Not Found page

## 🎯 Key Implementation Details

### Custom Hook Pattern

The `useProjects` hook encapsulates all project data logic:

```typescript
const { projects, getProjectById, filterProjects } = useProjects();
```

### Controlled Components

All form inputs are controlled components with proper state management:

```typescript
<SearchBar value={searchQuery} onChange={setSearchQuery} />
```

### Performance Optimization

- Memoized filter results with `useMemo`
- Efficient re-renders with proper dependency arrays
- Optimized theme transitions (no flickering)
- Staggered animations for better perceived performance
- CSS-based animations for smooth 60fps performance

### Theme Management

The app uses `next-themes` for seamless theme switching:

```typescript
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {/* Your app */}
</ThemeProvider>
```

- **Light Mode**: Clean, professional white backgrounds
- **Dark Mode**: Modern dark slate backgrounds with proper contrast
- **System Mode**: Automatically follows OS preference
- **Smooth Transitions**: Fast, flicker-free theme changes

## ✨ Animations & Interactions

The app features smooth, professional animations:

- **Shimmer Effects**: Elegant hover shimmer on project cards and detail cards
- **Entrance Animations**: Fade-in and slide-up animations for cards and components
- **Staggered Animations**: Sequential animations for list items (50ms delay per item)
- **Hover Interactions**: Scale effects on buttons, badges, and icons
- **Smooth Transitions**: 300ms duration for all interactive elements
- **Theme Transitions**: Fast, flicker-free theme switching (150ms)

## 📚 Learning Resources

This project demonstrates several React best practices:

1. **Functional Components** - Modern React without classes
2. **Custom Hooks** - Reusable stateful logic
3. **TypeScript** - Type safety and better DX
4. **Testing** - User-centric testing approach
5. **Accessibility** - Building inclusive applications
6. **Performance** - Optimizing render cycles
7. **Theme Management** - Dark/light mode implementation
8. **Animations** - CSS-based smooth animations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or as a template for your own applications.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Theme management with [next-themes](https://github.com/pacocoursey/next-themes)

---

**Note**: This is a demonstration project built as part of a React assessment. The project data is mocked and stored in memory. In a production application, you would connect to a real backend API.
