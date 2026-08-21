export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Rohan Mehta",
    location: "Pune, Maharashtra",
    rating: 5,
    quote:
      "The softener fixed our hard-water scaling completely. Booking with just 20% advance made it easy to decide.",
  },
  {
    name: "Anjali Verma",
    location: "Bhopal, MP",
    rating: 5,
    quote:
      "Installation team was professional and did a water test before fitting. Skin and hair feel much better now.",
  },
  {
    name: "Suresh Iyer",
    location: "Chennai, TN",
    rating: 4,
    quote:
      "RO purifier tastes great and the mineral cartridge is a nice touch. Balance payment on delivery was convenient.",
  },
  {
    name: "Farah Khan",
    location: "Hyderabad, TS",
    rating: 5,
    quote:
      "Ordered a tank filter for our flat — no more sediment in the taps. Great value for the price.",
  },
];
