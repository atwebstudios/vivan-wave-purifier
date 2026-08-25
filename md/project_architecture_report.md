# Vivaan Wave - Project Architecture & Implementation Report

This document provides a detailed breakdown of the project's folder structure, implemented features, and the internal architecture of the application.

## 1. Core Architecture & Tech Stack

- **Framework:** Next.js 15 utilizing the modern **App Router** (`src/app` directory).
- **Language:** TypeScript for strong typing across the entire codebase.
- **Styling:** Tailwind CSS v4 for utility-first styling.
- **Icons:** `lucide-react` and `@remixicon/react` for scalable SVG icons.
- **State Management:** React Context API (`CartProvider`) is used for global state management (specifically the shopping cart).

## 2. What's Been Implemented (Features & Content)

### A. Static "Database" (`src/data/`)
Because there is no external database hooked up yet, all the core data is hardcoded and stored centrally in TypeScript files:
- **`products.ts`**: The main product catalog containing all items (like "50L Whole House Water Softener"). It supports complex variants (e.g., FRP Vessel vs. SS 304 Stainless Steel Vessel), pricing, specifications, and descriptions.
- **`categories.ts`**: Defines product categories (Water Softeners, RO Systems, etc.) to help structure the store.
- **`faqs.ts`, `testimonials.ts`, `policies.ts`**: Content for the FAQ accordion, customer reviews, and legal/store policy pages.

### B. Page Routes (`src/app/`)
The routing uses Next.js folder-based routing conventions:
- **`/` (Home)**: The landing page. It's built by stacking modular components from `src/components/home` (e.g., `Hero`, `CategoryGrid`, `Benefits`, `Testimonials`, `FaqAccordion`).
- **`/products`**: The main shop page and individual product pages. This uses dynamic routes (like `[slug]`) to render specific products based on the data in `products.ts`.
- **`/cart` & `/checkout`**: Pages for reviewing the cart and proceeding to checkout.
- **Informational Pages**: `/about`, `/contact`, `/faq`, `/policies`, `/service-network`.

### C. Modular Components (`src/components/`)
The UI is broken down into highly modular, reusable pieces:
- **`layout/`**: Global elements like the `Header`, `Footer`, `Logo`, `SearchBox`, and a floating `WhatsAppButton`.
- **`ui/`**: Generic, foundational elements like `Button`, `Container`, `Price` displays, and `QuantityStepper`.
- **`product/`**: Reusable blocks for products, such as `ProductCard` (for grid views), `ProductImage`, and `AddToCartButton`.
- **`cart/`**: Contains the `CartDrawer`, a slide-out sidebar that lets users manage their cart without leaving their current page.

## 3. How It All Connects

1. **Global State Injection:** 
   In Next.js, `src/app/layout.tsx` is the root wrapper for the whole site. It wraps the entire application in a `<CartProvider>` (defined in `src/lib/cart-context.tsx`). This is crucial because it makes the shopping cart "global"—accessible from any page or component.
   
2. **Data Flow:**
   When a page like the homepage or products page loads, it directly imports data from `src/data/products.ts` or `src/data/categories.ts`. The page then passes this data down to smaller components (like a `ProductCard`) as "props" (properties) to render the images, titles, and prices.

3. **User Interaction & State Updates (The Cart Flow):**
   - When a user views a product and clicks an `<AddToCartButton />` (inside `src/components/product`), the button triggers a function from the global cart context (`useCart()`).
   - This function updates the cart state (adding the item, increasing the quantity, recalculating the subtotal).
   - Because the `<Header />` also listens to this same global `useCart()` context, the little cart icon in the top right instantly updates its counter (e.g., from `0` to `1`).
   - The user can then click the cart icon in the header, which toggles the `CartDrawer` open, allowing them to review their items and proceed to the `/checkout` route.

## Summary

The project is a fully structured, statically-driven e-commerce frontend. The local static data acts as the backend, the Context API acts as the central nervous system for shopping state, and the modular component architecture ensures the UI is highly reusable and easy to scale.
