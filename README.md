# Korea & Japan Travel Itinerary 2025

A modern, responsive travel itinerary application for a 15-day Korea and Japan trip (October 9-23, 2025).

## Features

- **Three-panel layout** inspired by Timepage app
- **Calendar view** with countdown timer and trip highlights
- **Detailed day planning** with activities, times, costs, and tips
- **Birthday celebrations** highlighted for special days
- **Search functionality** to find specific activities
- **Responsive design** that works on mobile, tablet, and desktop
- **Auto-scroll** to selected days
- **Rich activity details** including addresses, costs, pro tips, and fun facts

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Vite** for development and building

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
├── src/                    # Source code
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   │       ├── button.tsx
│   │       ├── sheet.tsx
│   │       └── utils.ts
│   └── styles/
│       └── globals.css    # Tailwind CSS configuration
├── dist/                  # Build output (generated)
├── index.html             # HTML entry point
└── README.md
```

## Trip Highlights

- 🏮 **Seoul** - Traditional hanoks, libraries, markets, and K-culture
- 🦌 **Osaka & Nara** - Deer park, Universal Studios Japan, amazing food
- 🏯 **Kyoto** - Temples, whisky distillery, bullet train experience  
- 🗼 **Tokyo** - Sumo, shopping, digital art, Mount Fuji adventure
- 🎂 **Special celebrations** - Two birthdays during the trip!

## Responsive Design

The app adapts to different screen sizes:
- **Desktop**: Three-panel layout with sidebar calendar and detail panel
- **Tablet/Mobile**: Collapsible sheets for calendar and details
- **Touch-friendly** interactions throughout

## License

Private project for personal travel planning.