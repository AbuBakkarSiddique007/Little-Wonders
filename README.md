# Little Wonders 🧸
> Premium Educational Toys & Play Materials for Kids

<p align="center">
  <img src="assets/hero.png" alt="Little Wonders Hero Banner" width="480" style="border-radius: 20px;" />
</p>

## 🌟 Overview
**Little Wonders** is a premium, modern single-vendor e-commerce web application designed for selling high-quality educational toys, developmental puzzles, role-play costumes, and accessories for children. Built using **Next.js 15+ (App Router)**, **Tailwind CSS v4**, **DaisyUI v5**, and **MongoDB**, it features a kids-friendly aesthetic with modern animations, responsiveness, and clean layout patterns.

---

## 🚀 Key Features

*   🛍️ **Featured & All Products Catalog**: A fully dynamic product catalog fetching item data (prices, discounts, ratings, reviews, Q&As) from MongoDB.
*   🛒 **Interactive Shopping Cart**: Allows users to add items, modify quantities (capped at 10 items), and remove items with real-time feedback.
*   🎒 **Real-time Navbar Cart Badge**: A beautiful, dynamic numeric badge over the cart icon that updates instantly as items are added or removed.
*   💳 **Seamless Cash on Delivery (COD) Checkout**: A sleek delivery form retrieving authenticated user info automatically to place orders in MongoDB.
*   ✉️ **Automated Nodemailer Invoices**: Instantly sends high-fidelity HTML email invoices to the buyer's email address upon successful order creation.
*   👤 **Secure Authentication (Next-Auth)**: Built-in Credentials-based sign-in/registration as well as seamless Google OAuth provider sign-in.
*   📝 **Parenting & Play Blog**: A fully filterable (categories) and searchable blog containing curated educational articles with clean overlay popups for reading.
*   📞 **Functional Contact & Support Center**: Complete store coordinates (address, hotlines, emails, operating hours) alongside an interactive contact form powered by SweetAlert.
*   🎨 **Premium Pastel Theme**: Curated playful color harmony featuring warm sky-blue/teals, pastel corals, and soft sunny yellows designed for children's branding.

---

## 🛠️ Technology Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Database**: [MongoDB](https://www.mongodb.com/) (MongoClient driver)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Credentials & Google Providers)
*   **Emailing**: [Nodemailer](https://nodemailer.com/) (SMTP protocol transport)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI v5](https://daisyui.com/)
*   **Alerts & Feedback**: [SweetAlert2](https://sweetalert2.github.io/) & [React Hot Toast](https://react-hot-toast.com/)
*   **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Project Structure

```text
little-wonders/
├── src/
│   ├── action/             # Next.js Server Actions
│   │   └── server/
│   │       ├── auth.js     # User registration and authentication actions
│   │       ├── carts.js    # Cart management database actions
│   │       ├── order.js    # Order checkout & invoice email actions
│   │       └── products.js # Product retrieval actions
│   ├── app/                # Next.js App Router Routes
│   │   ├── api/            # API Route Handlers (NextAuth configurations)
│   │   ├── blog/           # Parenting Blog Page (Searchable & Filterable)
│   │   ├── cart/           # Shopping Cart Management Page
│   │   ├── checkout/       # Delivery Form & Checkout Summary Page
│   │   ├── contact/        # Contact Info & Message Submission Form
│   │   ├── products/       # Products Catalog Pages (Index & Details [id])
│   │   ├── globals.css     # CSS, Tailwind imports, and custom theme variables
│   │   ├── layout.jsx      # Global root page layout and context wrappers
│   │   └── page.jsx        # Landing homepage entry file
│   ├── components/         # Reusable React UI Components
│   │   ├── button/         # AddToCart, Auth, and NavLink components
│   │   ├── cart/           # Cart lists and checkout components
│   │   ├── home/           # Homepage Hero Banner and Products slider
│   │   ├── layouts/        # Global Navbar & Footer components
│   │   └── provider/       # NextAuth session providers
│   ├── lib/                # Database configurations & shared utilities
│   │   ├── authOption.js   # Next-Auth callbacks and credentials logic
│   │   ├── dbConnect.js    # MongoClient database connection config
│   │   ├── invoiceTemplate.js # HTML Invoice template for email
│   │   └── sendEmail.js    # Nodemailer transporter and sender config
│   └── fonts/              # Custom branding typeface assets
├── public/                 # Static media files and logo illustrations
├── .env.local              # Local environment credentials (git ignored)
└── package.json            # Dependencies and script definitions
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/AbuBakkarSiddique007/Little-Wonders.git
cd little-wonders
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and configure the following variables:
```env
# MongoDB Connection
MONGODB_URI="your-mongodb-connection-string"
DB_NAME="little-wonders"

# Authentication Secrets
NEXTAUTH_SECRET="your-generated-nextauth-secret-key"

# Google OAuth Credentials (Optional for Google Sign-in)
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# SMTP Nodemailer Credentials
EMAIL_USER="your-gmail-address@gmail.com"
EMAIL_PASSWORD="your-16-character-google-app-password"
```
> ⚠️ **Note**: Make sure to generate a Google App Password for `EMAIL_PASSWORD` if you are using Gmail SMTP (SMTP host `smtp.gmail.com`).

---

## 🏃 Run the Application Locally

To start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

To build the production bundle:
```bash
npm run build
npm run start
```