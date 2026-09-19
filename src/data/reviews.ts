import type { CategorySlug, Product } from "@/lib/types";

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number; // 1–5
  date: string; // display date
  title: string;
  body: string;
  /** Categories this review is relevant to (empty = generic, shown anywhere). */
  categories?: CategorySlug[];
  /** Optional customer / installation photo path. */
  photo?: string;
  verified?: boolean;
}

/**
 * Placeholder customer reviews — realistic Indian names, cities and wording.
 * ⚠️ Replace with the client's real reviews & photos before launch.
 * Photos in /public/reviews are AI-generated placeholders.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Rohan Mehta",
    city: "Pune, MH",
    rating: 5,
    date: "12 Aug 2026",
    title: "Hard-water scaling gone completely",
    body: "We had white scaling on every tap and geyser. After the Vivanwave softener, it's completely gone and the water feels so much smoother. Booking with just 10% advance made the decision easy.",
    categories: ["water-softeners", "dual-combo"],
    photo: "/reviews/install-softener-brine.webp",
    verified: true,
  },
  {
    id: "r2",
    name: "Anjali Verma",
    city: "Bhopal, MP",
    rating: 5,
    date: "28 Jul 2026",
    title: "Skin and hair feel much better",
    body: "The installation team did a water-hardness test before fitting and explained everything. A month in, my hair fall has reduced and skin feels less dry. Very happy with the service.",
    categories: ["water-softeners", "aqua-clean", "dual-combo"],
    photo: "/reviews/happy-customer.webp",
    verified: true,
  },
  {
    id: "r3",
    name: "Suresh Iyer",
    city: "Chennai, TN",
    rating: 5,
    date: "05 Aug 2026",
    title: "Clean install, professional team",
    body: "Neat wall-mounted installation with proper PVC piping. The technician was on time and tidy. Water pressure is unaffected and the filtration is noticeably better.",
    categories: ["tank-filters", "aqua-clean", "iron-removers"],
    photo: "/reviews/install-wall-3stage.webp",
    verified: true,
  },
  {
    id: "r4",
    name: "Farah Khan",
    city: "Hyderabad, TS",
    rating: 5,
    date: "19 Jul 2026",
    title: "No more sediment in the taps",
    body: "Ordered a tank filter for our flat and the muddy sediment during monsoon is gone. Great value for the price and the whole-house coverage is exactly what we needed.",
    categories: ["tank-filters", "iron-removers", "spare-filters"],
    verified: true,
  },
  {
    id: "r5",
    name: "Vikram Singh",
    city: "Jaipur, RJ",
    rating: 5,
    date: "02 Aug 2026",
    title: "Iron staining finally fixed",
    body: "Our borewell water left reddish-brown stains on the sink and clothes. The Pro Iron Remover has made a huge difference — no more staining and the metallic smell is gone.",
    categories: ["iron-removers", "tank-filters"],
    photo: "/reviews/install-technician.webp",
    verified: true,
  },
  {
    id: "r6",
    name: "Priya Nair",
    city: "Kochi, KL",
    rating: 4,
    date: "22 Jul 2026",
    title: "Great water, easy process",
    body: "The RO + Ionizer water tastes clean and fresh, and the touchscreen is simple to use. Paying the balance on delivery was convenient. Would have liked slightly faster delivery.",
    categories: ["ro-ionizers"],
    verified: true,
  },
  {
    id: "r7",
    name: "Nikhil Patel",
    city: "Ahmedabad, GJ",
    rating: 5,
    date: "10 Aug 2026",
    title: "Whole system, one package",
    body: "Went for the dual vessel combo — Aqua Clean plus softener plus brine tank. One clean setup handled both filtration and softening. Appliances are running better already.",
    categories: ["dual-combo", "water-softeners"],
    verified: true,
  },
  {
    id: "r8",
    name: "Neha Sharma",
    city: "Lucknow, UP",
    rating: 5,
    date: "30 Jul 2026",
    title: "Value for money",
    body: "Affordable, genuine spares available, and the team guided me on which filter suits our water. Very transparent pricing with no hidden costs.",
    categories: ["spare-filters", "tank-filters", "aqua-clean", "ro-ionizers"],
    verified: true,
  },
  {
    id: "r9",
    name: "Karthik Reddy",
    city: "Bengaluru, KA",
    rating: 5,
    date: "07 Aug 2026",
    title: "Better washing, less detergent",
    body: "Soft water means the washing machine uses far less detergent and clothes come out softer. The SS304 vessel looks premium too. Highly recommend.",
    categories: ["water-softeners", "dual-combo"],
    verified: true,
  },
  {
    id: "r10",
    name: "Meera Joshi",
    city: "Nagpur, MH",
    rating: 4,
    date: "16 Jul 2026",
    title: "Reliable filtration",
    body: "The Aqua Clean vessel has improved the taste and clarity of our water noticeably. Simple maintenance and the low-maintenance design is a plus.",
    categories: ["aqua-clean", "tank-filters", "ro-ionizers", "spare-filters"],
    verified: true,
  },
];

/**
 * Deterministically pick reviews relevant to a product (category match preferred),
 * ordered stably by the product id so SSR and client render identically.
 */
export function getProductReviews(product: Product, limit = 6): Review[] {
  const matches = reviews.filter(
    (r) => !r.categories || r.categories.includes(product.category),
  );
  const pool = matches.length >= 3 ? matches : reviews;

  // Stable rotation seeded by product id.
  let seed = 0;
  for (let i = 0; i < product.id.length; i++) seed = (seed * 31 + product.id.charCodeAt(i)) >>> 0;
  const offset = seed % pool.length;
  const rotated = [...pool.slice(offset), ...pool.slice(0, offset)];
  return rotated.slice(0, limit);
}

/** A few reviews that include a photo — used for the "real installations" strip. */
export function getPhotoReviews(limit = 4): Review[] {
  return reviews.filter((r) => r.photo).slice(0, limit);
}
