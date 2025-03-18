# Transformers E-commerce Platform

A full-stack e-commerce website for a business specializing in transformers, UPS systems, and other power solutions.

## Features

- **Authentication**: User registration, login, and password reset functionality
- **Product Management**: Categorized product listings with search and filter options
- **Quotation System**: Request quotes and upload requirement documents
- **Shopping Cart & Checkout**: Add-to-cart functionality with secure payment integration
- **Admin Dashboard**: Manage products, orders, and users
- **Customer Dashboard**: Track orders and manage wishlist
- **Gallery**: Product images and project installations

## Tech Stack

- **Frontend**: Next.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT with bcrypt
- **Payment Gateway**: Razorpay/Stripe

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm run install:all
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

The project follows a monorepo structure with separate frontend and backend directories:

- `frontend/`: Next.js application
- `backend/`: Express.js API server

## License

ISC
