# Finance SaaS Platform

A modern, full-stack finance management SaaS application built with cutting-edge technologies. Track your income, expenses, and financial health with powerful analytics and data visualization.

🚀 **Live Demo**: [finance-saa-s.vercel.app](https://finance-saa-s.vercel.app/sign-in?redirect_url=https%3A%2F%2Ffinance-saa-s.vercel.app%2F)

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - High-quality UI components built on Radix UI
- **Lucide React** - Beautiful, customizable icons
- **Next Themes** - Dark/light mode support

### Backend & API
- **Hono** - Ultra-fast web framework for API routes
- **Clerk** - Complete authentication and user management
- **Drizzle ORM** - Type-safe database ORM
- **Neon Database** - Serverless PostgreSQL
- **Zod** - Schema validation

### Data Visualization & Analytics
- **Recharts** - Powerful charting library
- **React CountUp** - Animated counters
- **Date-fns** - Modern date utility library

### State Management & Forms
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management
- **React Hook Form** - Performant forms with validation
- **TanStack Table** - Headless table library

### Development Tools
- **ESLint** - Code linting
- **Drizzle Kit** - Database migrations and studio
- **Bun** - Fast package manager and runtime

## ✨ Features

- **Dashboard Overview** - Financial summary with income, expenses, and remaining balance
- **Transaction Management** - Create, edit, delete, and categorize transactions
- **Account Management** - Multiple account support
- **Category System** - Organize transactions by custom categories
- **Data Visualization** - Interactive charts (line, bar, area, pie charts)
- **Date & Account Filtering** - Filter data by date ranges and accounts
- **CSV Import/Export** - Bulk transaction management
- **Dark/Light Mode** - Full theme support
- **Authentication** - Secure user management with Clerk
- **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd finance-saas
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install

   # Using bun (recommended)
   bun install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="your_neon_database_url"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
   NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
   ```

4. **Database Setup**
   ```bash
   # Generate database schema
   bun run db:generate

   # Run migrations
   bun run db:migrate

   # Seed the database (optional)
   bun run db:seed
   ```

5. **Start Development Server**
   ```bash
   # Using npm
   npm run dev

   # Using bun (recommended)
   bun dev
   ```

6. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Management

```bash
# Open Drizzle Studio for database management
bun run db:studio

# Generate new migrations after schema changes
bun run db:generate

# Apply migrations
bun run db:migrate
```

### Build & Deploy

```bash
# Build for production
npm run build
# or
bun run build

# Start production server
npm start
# or
bun start

# Lint code
npm run lint
# or
bun run lint
```

## 📱 Application Structure

```
finance-saas/
├── app/
│   ├── (auth)/                # Authentication pages
│   ├── (dashboard)/           # Main application pages
│   │   ├── accounts/          # Account management
│   │   ├── categories/        # Category management
│   │   ├── transactions/      # Transaction management
│   │   └── page.tsx          # Dashboard overview
│   ├── api/                  # API routes (Hono)
│   └── layout.tsx            # Root layout
├── components/               # Reusable UI components
├── lib/                     # Utilities and configurations
├── db/                      # Database schema and migrations
└── public/                  # Static assets
```

## 🔧 Settings & Configuration

### Settings Page (Future Enhancement)
The application will include a comprehensive settings page featuring:

- **Profile Management** - Update user information and preferences
- **Account Preferences** - Default currency, date format, fiscal year settings
- **Notification Settings** - Email alerts, spending limits, budget notifications
- **Data Export/Import** - Bulk data management options
- **Theme Customization** - Advanced theming options
- **Security Settings** - Two-factor authentication, session management

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in page URL | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up page URL | Yes |

## 🔮 Upcoming Features & Fixes

### Planned Enhancements
- **Settings Page** - Comprehensive user preferences and configuration
- **Budget Management** - Set and track budgets by category
- **Recurring Transactions** - Automatic recurring income/expenses
- **Financial Goals** - Set and monitor financial objectives
- **Advanced Analytics** - Detailed financial insights and trends
- **Multi-currency Support** - Handle multiple currencies
- **Mobile App** - React Native companion app
- **API Documentation** - Comprehensive API docs with Swagger

### Known Issues & Fixes
- **Performance Optimization** - Improve chart rendering for large datasets
- **Enhanced Mobile UX** - Better responsive design for mobile devices
- **Error Handling** - More robust error messages and recovery
- **Data Validation** - Enhanced client-side validation
- **Accessibility** - Improved WCAG compliance
- **Testing Suite** - Comprehensive unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Clerk](https://clerk.com/) for seamless authentication
- [Neon](https://neon.tech/) for serverless PostgreSQL
- [Vercel](https://vercel.com/) for hosting and deployment

---

