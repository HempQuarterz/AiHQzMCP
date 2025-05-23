# Industrial Hemp Information Hub

## 🌿 Project Overview
The Industrial Hemp Information Hub is a comprehensive database and knowledge platform dedicated to industrial hemp. It serves as a central resource for researchers, businesses, consumers, policymakers, and other stakeholders in the industrial hemp ecosystem.

Our mission is to create the most complete, accurate, and accessible source of information on industrial hemp uses, applications, companies, regulations, research, and historical significance.

## ✨ Current Status
- **Live Database**: Connected to Supabase with 12 categories and 39+ products
- **Frontend**: Modern React + TypeScript application with Tailwind CSS
- **Data**: Real hemp products across Seeds, Leaves, Bast Fibers, Construction, Automotive, and more

## 🏗️ Architecture

### **Database Schema**
```
categories (12 records)
├── id (UUID)
├── name (Seeds, Leaves, Bast Fibers, etc.)
├── description
├── image_url
└── created_at/updated_at

products (39+ records)
├── id (UUID)
├── title
├── description  
├── image_url
├── category_id → categories(id)
└── created_at/updated_at

hemp_parts, hemp_products, hemp_uses (for future expansion)
```

### **Technology Stack**

#### Frontend (`/hemp-hub/web/`)
- **React 19.1.0** with **TypeScript**
- **Vite** for development and building
- **Tailwind CSS** + **Radix UI** for styling
- **React Router** for navigation
- **TanStack Query** for server state management
- **Supabase JS** for database integration
- **Framer Motion** for animations

#### Backend/Database
- **Supabase** (PostgreSQL) with Row Level Security
- **Full-text search** with GIN indexes
- **UUID** primary keys throughout
- **Automatic timestamps** for audit trails

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HempQuarterz/AiHQzMCP.git
   cd AiHQzMCP/hemp-hub/web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env` file in `/hemp-hub/web/`:
   ```bash
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Generate TypeScript types** (optional)
   ```bash
   npm run generate-types
   ```

## 📊 Current Data

### Categories
- **Seeds**: Hemp seeds, hemp hearts, hemp protein powder, hemp seed oil
- **Leaves**: CBD extract, hemp tea, medicinal tinctures  
- **Bast Fibers**: Hemp fabric, hemp rope, hemp paper
- **Construction**: Hempcrete blocks, hemp insulation
- **Automotive**: Composite materials, interior panels
- **Biofuel**: Hemp biodiesel, biomass energy
- **Paper**: Industrial paper, packaging materials
- **Textiles**: Hemp clothing, home textiles
- **And more...**

### Products (39+ live products)
Real hemp products with descriptions, images, and category associations covering the entire hemp value chain.

## 🛠️ Development

### Project Structure
```
hemp-hub/web/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Route components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, API, Supabase config
│   ├── types/              # TypeScript type definitions
│   └── assets/             # Static assets
├── public/                 # Public assets
└── supabase/
    └── migrations/         # Database migrations
```

### Key Files
- **`src/lib/api.ts`** - API functions for all database operations
- **`src/hooks/useApi.ts`** - React hooks for data fetching
- **`src/types/database.ts`** - TypeScript interfaces
- **`src/lib/supabase.ts`** - Supabase client configuration

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run generate-types` - Generate TypeScript types from Supabase

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- ✅ Database schema and data
- ✅ React frontend with routing
- ✅ Category and product browsing
- ✅ Search functionality
- ✅ Responsive design

### Phase 2: Enhanced Features
- [ ] User authentication and profiles
- [ ] Advanced filtering and search
- [ ] Product submission portal
- [ ] Admin dashboard
- [ ] API documentation

### Phase 3: Advanced Platform
- [ ] Research paper integration
- [ ] Company directory
- [ ] Regulatory information hub
- [ ] Market intelligence dashboard
- [ ] Interactive visualizations

## 🔧 Database Management

### Supabase Connection
The project uses Supabase project: **Ai-HQZ-Database**
- Project ID: `lnclfnomfnoaqpatmqhj`
- Region: `us-west-1`
- Database: PostgreSQL 15.8

### Schema Updates
Migration files are in `/hemp-hub/supabase/migrations/`. The latest migration `20250523000000_actual_hemp_hub_schema` reflects the current live database structure.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Documentation

- [Planning Document](./planning-document.md) - High-level project vision and architecture
- [Task Document](./task-document.md) - Current development tasks and priorities
- [API Documentation](./docs/api.md) - API endpoints and usage (coming soon)

## 🚨 Important Notes

- **Database Schema**: The live database uses `categories` and `products` tables, not the `plant_types` originally planned
- **Data Populated**: 12 categories and 39+ products are already live in the database
- **Frontend Updated**: All React components now use the correct table names and API endpoints
- **Type Safety**: Full TypeScript coverage with auto-generated Supabase types

## 📞 Contact

For questions or suggestions about the Industrial Hemp Information Hub:
- Open an issue in this repository
- Email: hempquarterz@gmail.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with 🌿 for the industrial hemp community**