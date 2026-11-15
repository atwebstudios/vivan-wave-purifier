export interface Policy {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

/**
 * Official legal policies for Vivan Wave.
 */
export const policies: Policy[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    intro:
      "These terms govern your use of the Vivanwave website and the purchase of our products and services.",
    sections: [
      { heading: "Orders & advance payment", body: "Orders are confirmed on payment of a minimum 10% advance. The balance is payable at delivery or installation unless stated otherwise." },
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
    title: "Vivan Wave – Cancellation & Refund Policy",
    intro: "Our policy for pre-dispatch cancellations, delivery refusal, and returns.",
    sections: [
      {
        heading: "1. Pre-Dispatch Cancellation",
        body: "You can cancel your order anytime before it leaves our warehouse. Once shipped, orders cannot be canceled. To cancel, contact us immediately via Email (vivanwave@gmail.com) or Phone (+91 9310 880635). Pre-dispatch cancellations receive a full refund (minus payment gateway fees) within 3–4 business days.",
      },
      {
        heading: "2. Refusing Delivery (Post-Dispatch)",
        body: "If you refuse delivery after dispatch, a partial refund will be processed under these conditions: The package must return to us completely unopened and sealed. Deductions: Gateway fees, packaging costs, and two-way courier charges will be subtracted from the refund amount. The balance will be refunded after inspection.",
      },
      {
        heading: "3. Post-Delivery (No Returns / No Refunds)",
        body: "Once the package is accepted and opened, no returns or refunds are allowed under any circumstances (even if unused).",
      },
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
