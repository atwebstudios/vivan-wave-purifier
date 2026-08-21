export interface Policy {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

/**
 * Placeholder policy copy. Replace with the client's finalised legal text before launch —
 * Razorpay requires live Terms, Privacy, Refund and Shipping pages.
 */
export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    intro:
      "These terms govern your use of the Vivanwave website and the purchase of our products and services.",
    sections: [
      { heading: "Orders & advance payment", body: "Orders are confirmed on payment of a minimum 20% advance. The balance is payable at delivery or installation unless stated otherwise." },
      { heading: "Pricing", body: "All prices are shown in Indian Rupees and are inclusive of applicable taxes. Prices may change without prior notice." },
      { heading: "Service delivery", body: "Delivery and installation timelines vary by location and will be confirmed by our team after your order." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    intro:
      "We respect your privacy and only collect the information needed to process your order and provide service.",
    sections: [
      { heading: "Information we collect", body: "Your name, contact details and delivery address, provided during checkout, plus payment confirmation details from our payment partner." },
      { heading: "How we use it", body: "To process and deliver your order, provide installation and support, and send order-related communication." },
      { heading: "Data sharing", body: "We do not sell your data. Payment is handled securely by our payment gateway; we do not store card details." },
    ],
  },
  {
    slug: "refund",
    title: "Refund & Cancellation Policy",
    intro: "Our policy for cancellations, returns and refunds.",
    sections: [
      { heading: "Cancellations", body: "Orders can be cancelled before dispatch/installation. The advance may be refunded subject to any processing charges." },
      { heading: "Refunds", body: "Approved refunds are processed to the original payment method within a standard banking timeline." },
      { heading: "Service items", body: "Installation and AMC services, once rendered, are non-refundable." },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping & Delivery Policy",
    intro: "How we deliver and install your products.",
    sections: [
      { heading: "Delivery area", body: "We serve major cities across India. Availability for your location is confirmed after ordering." },
      { heading: "Timelines", body: "Delivery and installation are scheduled with you after order confirmation, typically within a few working days." },
      { heading: "Installation", body: "Professional installation is available and, for many products, includes a water-quality check." },
    ],
  },
];

export const policyBySlug = new Map(policies.map((p) => [p.slug, p]));
