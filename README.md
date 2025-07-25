# Soil Dashboard

A comprehensive web application for monitoring soil health and plant nutrition through Brix readings and various soil metrics.

## Features

### 🌱 Soil Health Dashboard

- **Compaction Score**: Monitor soil compaction levels
- **Brix Score**: Track plant nutrient density
- **Carbon to Nitrogen Ratio**: Essential for soil fertility
- **PLFA Analysis**: Microbial community assessment
- **NPK Profile**: Nitrogen, Phosphorus, Potassium levels
- **Microscopy Sample**: Visual soil analysis

### 📊 Brix Logs (New!)

- **Plant-Specific Tracking**: Log Brix readings for different plant types
- **Comprehensive Plant Database**: 40+ garden plants with healthy Brix ranges
- **Interactive Charts**: Visualize reading history with Recharts
- **Real-time Status**: Instant feedback on reading quality
- **Notes & Documentation**: Add context to each reading
- **API Integration**: Full backend support with PostgreSQL

### 🛒 Microgreen Store

- Browse and purchase microgreens
- Product catalog with detailed information

## Tech Stack

### Frontend

- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Spring** for animations

### Backend (Brix Logs API)

- **Express.js** REST API
- **PostgreSQL** database
- **Node.js** runtime
- **CORS** enabled for cross-origin requests

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (for Brix Logs API)
- npm or pnpm

### Frontend Setup

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development server**:

   ```bash
   pnpm dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:3000`

### Backend Setup (Brix Logs API)

1. **Navigate to API directory**:

   ```bash
   cd api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment**:

   ```bash
   cp env.example .env
   ```

   Edit `.env` with your database credentials:

   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   PORT=3001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the API server**:

   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:3001`

## Brix Logs Feature

### Plant Categories

The system includes comprehensive plant data across 9 categories:

- **Leafy Greens**: Spinach, Kale, Lettuce, Arugula, Swiss Chard, Collard Greens
- **Brassicas**: Broccoli, Cauliflower, Cabbage, Brussels Sprouts
- **Root Vegetables**: Carrots, Beets, Radishes, Turnips, Parsnips
- **Nightshades**: Tomatoes, Bell Peppers, Eggplant, Potatoes
- **Legumes**: Green Beans, Peas, Snap Peas
- **Alliums**: Onions, Garlic, Leeks
- **Cucurbits**: Cucumbers, Zucchini, Winter Squash, Pumpkins
- **Herbs**: Basil, Parsley, Cilantro, Mint
- **Microgreens**: Sunflower, Pea Shoots, Radish, Broccoli Microgreens

### Key Components

#### BrixBar Component

A modified version of NutrientBar specifically designed for Brix readings:

- Threshold-based indicators (≥ X Brix)
- Color-coded status (Poor, Fair, Good, Excellent)
- Animated value display
- Gradient background showing quality levels

#### BrixLogEntry Component

Form for adding new readings:

- Plant type selection with 40+ options
- Real-time validation and status feedback
- Date picker with default to today
- Optional notes field
- Expandable/collapsible interface

#### BrixLogsChart Component

Interactive chart using Recharts:

- Multi-line chart for multiple plants
- Date-based X-axis
- Brix value Y-axis (0-20%)
- Tooltips with detailed information
- Legend for plant identification
- Summary statistics

### API Endpoints

#### Brix Readings

- `GET /api/brix/readings` - Get all readings
- `GET /api/brix/readings/:id` - Get specific reading
- `POST /api/brix/readings` - Create new reading
- `PUT /api/brix/readings/:id` - Update reading
- `DELETE /api/brix/readings/:id` - Delete reading

#### Plant Reference

- `GET /api/brix/plants` - Get all plants
- `GET /api/brix/plants/:name` - Get specific plant

#### Statistics

- `GET /api/brix/stats` - Get reading statistics

### Database Schema

#### brix_readings

| Column       | Type         | Constraints    |
| ------------ | ------------ | -------------- |
| id           | UUID         | PRIMARY KEY    |
| plant_name   | VARCHAR(100) | NOT NULL       |
| brix_value   | DECIMAL(4,1) | NOT NULL, 0-30 |
| reading_date | DATE         | NOT NULL       |
| notes        | TEXT         | NULL           |
| created_at   | TIMESTAMP    | DEFAULT NOW    |
| updated_at   | TIMESTAMP    | DEFAULT NOW    |

#### plant_reference

| Column           | Type         | Constraints      |
| ---------------- | ------------ | ---------------- |
| id               | UUID         | PRIMARY KEY      |
| plant_name       | VARCHAR(100) | UNIQUE, NOT NULL |
| category         | VARCHAR(50)  | NOT NULL         |
| healthy_brix_min | DECIMAL(4,1) | NOT NULL         |
| healthy_brix_max | DECIMAL(4,1) | NOT NULL         |
| description      | TEXT         | NULL             |
| created_at       | TIMESTAMP    | DEFAULT NOW      |

## Project Structure

```
soil-dashboard/
├── app/                          # Next.js App Router
│   ├── components/               # React components
│   │   ├── BrixBar.tsx          # Brix reading indicator
│   │   ├── BrixLogEntry.tsx     # Add reading form
│   │   ├── BrixLogsChart.tsx    # Chart component
│   │   └── ...                  # Other components
│   ├── data/                    # Static data
│   │   └── plantBrixData.ts     # Plant reference data
│   ├── services/                # API services
│   │   └── brixApi.ts           # Brix API client
│   ├── brix-logs/               # Brix Logs page
│   │   └── page.tsx             # Main Brix Logs page
│   └── ...                      # Other pages
├── api/                         # Express.js backend
│   ├── routes/                  # API routes
│   │   └── brix.js             # Brix endpoints
│   ├── database.js              # Database setup
│   ├── server.js                # Express server
│   ├── package.json             # Backend dependencies
│   └── README.md                # API documentation
└── ...                          # Other files
```

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables if needed
3. Deploy automatically on push to main branch

### Backend (Railway/Render/Heroku)

1. Set up PostgreSQL database
2. Configure environment variables
3. Deploy Express.js application
4. Update frontend API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License
