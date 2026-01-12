<div align="center">

  <!-- ANIMATED HEADER -->
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Manrope&weight=700&size=35&duration=3000&pause=1000&color=1A4D2E&center=true&vCenter=true&width=600&lines=Ramu+Clinic+Management+System;Modern.+Bilingual.+Secure.;Streamlining+Healthcare+Appointment+Flow" alt="Typing SVG" />
  </a>

  <p align="center">
    <br />
    A comprehensive healthcare platform built for <strong>Ramu Clinic</strong> featuring a public patient portal and a secure administrative dashboard.
    <br />
  </p>

  <!-- BADGES -->
  <p align="center">
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </p>
</div>

<hr />

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Database Setup](#-database-setup)
- [Admin Access](#-admin-access)

---

## 🏥 Overview

**Ramu Clinic** is a full-stack web application designed to bridge the gap between patients and doctors. It provides a bilingual (English/Telugu) interface for patients to view services and book appointments, while offering a robust, responsive dashboard for the clinic administration to manage patient flow, export data, and track daily schedules.

---

## ✨ Key Features

### 🌍 **Patient Portal (Public)**
- **Bilingual Support:** Content tailored for local English and Telugu speaking community.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
- **Appointment Booking:** Easy-to-use form with date/time selection and validation.
- **Service Showcase:** Detailed list of medical services with iconography.
- **Location Integration:** Embedded Google Maps and one-click navigation.

### 🛡️ **Admin Dashboard (Protected)**
- **Secure Authentication:** Email/Password login via Supabase Auth.
- **Appointment Management:**
  - View all pending, confirmed, and cancelled appointments.
  - **Optimistic UI Updates:** Instant feedback when changing statuses or deleting records.
  - **One-Click Actions:** Confirm, Cancel, or Delete appointments instantly.
- **Productivity Tools:**
  - **CSV Export:** Download appointment data for Excel/Sheets.
  - **Print Mode:** Clean, printer-friendly layout for daily manifests.
  - **Advanced Filtering:** Filter by Date Range, Status, or Search by Name/Phone.
  - **Pagination:** Smooth handling of large datasets (10 items per page).

---

## 🛠 Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React.js, TypeScript, Vite |
| **Styling** | Tailwind CSS, Lucide React (Icons) |
| **State/Routing** | React Router DOM, React Hooks |
| **Backend/DB** | Supabase (PostgreSQL), Row Level Security (RLS) |
| **Notifications** | Sonner (Toasts) |
| **Deployment** | Vercel / Netlify Ready |

---

## 📂 Project Structure

```bash
src/
├── components/      # Reusable UI components (Buttons, Inputs, Navbar)
├── pages/           # Route components (Home, Admin, Contact, etc.)
├── services/        # API calls and Supabase configuration
├── types/           # TypeScript interfaces and constants
└── App.tsx          # Main application entry and routing logic

🚀 Getting Started
Prerequisites
-> Node.js (v16 or higher)
-> npm or yarn

Installation

1. Clone the repository
git clone https://github.com/yourusername/ramu-clinic.git
cd ramu-clinic
2. Install dependencies
npm install
3.Configure Environment
Update services/supabaseClient.ts with your credentials OR create a .env file:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
4.Run the Development Server
npm run dev
Open http://localhost:5173 in your browser.

🗄️ Database Setup (Supabase)
To make the app functional, run the following SQL in your Supabase SQL Editor:

-- 1. Create Appointments Table
create table appointments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text not null,
  email text,
  service text not null,
  preferred_date text not null,
  preferred_time text not null,
  message text,
  status text default 'pending'
);

-- 2. Enable Row Level Security (RLS)
alter table appointments enable row level security;

-- 3. Create Policy: Allow Public Insert (Booking)
create policy "Allow public inserts"
on appointments for insert
to public
with check (true);

-- 4. Create Policy: Allow Admin Full Access
-- (Assuming authenticated users are admins)
create policy "Enable all access for authenticated users"
on appointments for all
to authenticated
using (true)
with check (true);

🔐 Admin Access
To access the /admin route:
1. Go to your Supabase Auth dashboard.
2. Create a user (e.g., admin@ramuclinic.com).
3. Use these credentials on the /login page of the application.

<div align="center">
<p>Built with ❤️ for Ramu Clinic</p>
<p>© 2024 All Rights Reserved</p>
</div>
