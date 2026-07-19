# 🏠 RentNest API

A modern rental property management backend built with **Node.js**, **Express**, **TypeScript**, **Prisma**, **PostgreSQL**, and **Stripe**.

RentNest simplifies the rental process by allowing landlords to list properties, tenants to submit rental requests, and both parties to securely complete payments through Stripe Checkout.

---

## ✨ Features

### Authentication & Authorization

- JWT Authentication
- HTTP Only Cookie support
- Password hashing with bcrypt
- Role-based authorization
- Protected routes

### User Management

- Register new users
- Login & Logout
- Get current user profile
- Update profile
- Change password
- Admin user management

### Property Management

- Create rental property
- Update property information
- Soft delete property
- Property details
- Advanced filtering
- Search by title
- Pagination
- Sorting
- Property categories

### Rental Request System

- Submit rental request
- Prevent duplicate requests
- Landlord approval
- Landlord rejection
- Track request status
- View tenant requests
- View landlord requests

### Reviews

- Add property review
- Rating system
- Review comments
- View property reviews

### Payments

- Stripe Checkout integration
- Secure online payment
- Webhook verification
- Automatic payment confirmation
- Payment history
- Prevent duplicate payment processing

### Admin Features

- Manage users
- Manage properties
- Manage categories
- Soft delete support

---

# Tech Stack

| Category         | Technology         |
| ---------------- | ------------------ |
| Runtime          | Node.js            |
| Framework        | Express.js         |
| Language         | TypeScript         |
| Database         | PostgreSQL         |
| ORM              | Prisma             |
| Validation       | Zod                |
| Authentication   | JWT + HTTP Cookies |
| Password Hashing | bcryptjs           |
| Payment Gateway  | Stripe Checkout    |
| Environment      | dotenv             |

---

# Project Structure

```
root
├── src
│   ├── config
│   ├── lib
│   ├── middleware
│   ├── modules
│   ├── modules
│   │   ├── admin
│   │   ├── auth
│   │   ├── categories
│   │   ├── landlord
│   │   ├── rental-payment
│   │   ├── rental-request
│   │   └── review
│   ├── utils
│   └── validator
│   ├── app.ts
│   ├── index.ts
├── prisma

```

---

# Database Models

- User
- Property
- Category
- RentalRequest
- Payment
- Review

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to the project directory

```bash
cd rentnest
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000
APP_URL=
DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=

JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

BCRYPT_SALT_ROUNDS=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=


```

---

# Prisma Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# Running the Project

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Production

```bash
npm start
```

---

# Stripe Webhook

Run the Stripe webhook listener

```bash
npm run stripe:webhook
```

This forwards Stripe events to:

```
http://localhost:5000/api/payments/confirm
```

---

# API Features

## Authentication

- Register
- Login
- Refresh Token
- Get Profile

---

## Users

- Get all users
- Get single user
- Update user
- Delete user

---

## Categories

- Create category
- Update category
- Delete category
- Get categories

---

## Properties

- Create property
- Update property
- Delete property
- Get property
- Get all properties
- Search
- Filter
- Sort
- Pagination

---

## Rental Requests

- Submit request
- Cancel request
- Approve request
- Reject request
- View landlord requests
- View tenant requests

---

## Payments

- Create Stripe Checkout Session
- Stripe Webhook Confirmation
- Payment History

---

## Reviews

- Add review
- Get property reviews

---

# Validation

The project uses **Zod** for request validation.

Validation includes:

- Request body

---

# Security

- JWT Authentication
- Role-based Authorization
- Password Hashing
- HTTP Only Cookies
- Stripe Webhook Signature Verification
- Input Validation
- Soft Delete Strategy

---

# Error Handling

Centralized error handling for:

- Prisma Errors
- Zod Validation Errors
- JWT Errors
- Stripe Errors
- Custom Application Errors

---

# Scripts

| Command                  | Description                |
| ------------------------ | -------------------------- |
| `npm run dev`            | Run development server     |
| `npm run build`          | Compile TypeScript         |
| `npm start`              | Start production server    |
| `npm run stripe:webhook` | Listen for Stripe webhooks |

---

# Future Improvements

- Email notifications
- logout
- update profile
- Property image upload
- Wishlist/Favorites
- Property availability calendar
- Rental agreement generation
- Dashboard analytics
- Notification system
- Redis caching
- Docker support
- Unit & Integration testing
- CI/CD pipeline

---

---

# Author

**Naymur Rahman**

Junior Full Stack Developer

---
