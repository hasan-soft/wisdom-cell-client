# WisdomCell — Digital Life Lesson Platform

WisdomCell is a full-stack lesson-sharing and reflection platform where users can create, explore, and save meaningful life lessons focused on personal growth, mindset, career, and emotional well-being. The platform supports both free and premium content with role-based access for users and admins.

---

## 🌐 Live Links

| | URL |
|---|---|
| **Client** | https://wisdomcell-auth.web.app |
| **Server** | https://wisdom-cell-server.vercel.app |

---

## ✨ Key Features

1. Users can create, edit, and manage their own lessons with privacy and access control (public/private, free/premium).
2. Advanced lesson browsing with category, emotional tone, search, sorting, and pagination support.
3. Users can save favorite lessons and track their contributions through a personalized dashboard with analytics.
4. Admin panel to manage lessons, users, reported content, and monitor platform-wide analytics.
5. Dynamic dashboards for both users and admins, including statistics, recent activity, and growth charts.
6. **[NEW]** Dark Mode — full light/dark theme toggle with localStorage persistence.
7. **[NEW]** Demo Login — one-click access without registration for easy exploration.
8. **[NEW]** Stripe Payment Integration — one-time Premium membership purchase with secure checkout.

---

## 🆕 New Features

### 1. Dark Mode
Users can switch between light and dark themes. Preference is saved in `localStorage` and persists across sessions.
- **Why chosen:** 70%+ of users prefer dark mode. Reduces eye strain, improves accessibility, and is an industry standard in modern web applications.
- **How it improves the project:** Enhances user experience across different environments. Uses DaisyUI's built-in `data-theme` system — no extra libraries required. Theme persists via `localStorage` so users never need to re-select their preference.

### 2. Demo Login
A one-click login button on the Login and SignUp pages that authenticates users instantly without any credentials.
- **Why chosen:** Project reviewers and new visitors need a frictionless way to explore all features without going through registration. Reduces the barrier to entry significantly.
- **How it improves the project:** Instantly showcases premium features to reviewers. Demo account has `isPremium: true` so all locked content and dashboard analytics are visible. Uses the existing `signIn()` hook — no extra code complexity.

### 3. Advanced Search & Filter System
Real-time search by title, category filter, emotional tone filter, sort options (Newest/Most Saved), and pagination on the Public Lessons page.
- **Why chosen:** As content grows, users need precise discovery tools to find lessons relevant to their emotional state and interests. Basic listing is not scalable.
- **How it improves the project:** Users can filter by emotional tone (Motivational, Reflective, Sad, Gratitude) — a feature unique to WisdomCell. Pagination prevents performance issues. All filtering is handled server-side with MongoDB queries for optimal performance.

---

## 🔬 Stripe Payment Integration

Stripe is integrated for secure one-time Premium membership purchases (৳1500 for lifetime access).

- **Why chosen:** Stripe is the industry standard for online payments — used by Amazon, Google, and Shopify. It is PCI DSS compliant, meaning card data is never stored on WisdomCell servers. It offers a pre-built, secure checkout experience with excellent developer documentation and test mode support.
- **How it improves the project:** Transforms WisdomCell from a CRUD application into a real SaaS product with genuine monetization. Demonstrates a complete full-stack payment flow — checkout session creation, Stripe-hosted payment page, success/cancel callbacks, and database update on confirmation.

---

## 🧩 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| React Router | Client-side routing |
| TailwindCSS + DaisyUI | Styling + component library |
| Firebase Authentication | User auth + Google OAuth |
| TanStack Query | Data fetching + caching |
| Axios | HTTP client |
| Recharts | Dashboard analytics charts |
| Swiper.js | Carousel components |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | REST API server |
| MongoDB Atlas | Cloud database |
| Firebase Admin SDK | Token verification |
| Stripe | Payment processing |
| JWT | Secure route protection |

### Hosting
| Service | Purpose |
|---|---|
| Firebase Hosting | Frontend deployment |
| Vercel | Backend deployment |
| MongoDB Atlas | Database hosting |

---

## 🚀 Run Locally

### Client
```bash
git clone https://github.com/hasan-soft/wisdom-cell-client.git
cd wisdom-cell-client
npm install
npm run dev
```

### Server
```bash
git clone https://github.com/hasan-soft/wisdom-cell-server.git
cd wisdom-cell-server
npm install
npm run dev
```