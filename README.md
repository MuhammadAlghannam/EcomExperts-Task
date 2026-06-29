# EcomExperts Task — Security System Builder

A React + TypeScript bundle builder for Wyze-style security products. Shoppers configure cameras, plans, sensors, and accessories in a step-by-step builder, see a live review panel with pricing, and can save their system to return later.

## Live Demo

The project is deployed on Vercel for quick review:

[https://ecom-experts-task-phi.vercel.app](https://ecom-experts-task-phi.vercel.app)

## Tech Stack

| Category | Tools |
| -------- | ----- |
| **Core** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS 4, custom Gilroy & TT Norms Pro fonts |
| **UI** | shadcn/ui, Base UI, Lucide React |
| **State** | React Context + `useReducer` |
| **Persistence** | `localStorage` |
| **UX** | Sonner (toasts) |
| **Linting** | Oxlint |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MuhammadAlghannam/EcomExperts-Task.git
cd EcomExperts-Task
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run preview` | Preview production build |
