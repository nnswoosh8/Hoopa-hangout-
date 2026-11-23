/*
 * ============================================================
 *  SITE CONFIG: the only file you normally need to edit.
 * ============================================================
 *
 *  OWNERREZ SETUP
 *  1. In OwnerRez go to Settings → Widgets (under "Websites") → Create Widget.
 *     Pick "Booking/Inquiry" (calendar + quote + book button) for The Hoopa Hangout.
 *  2. Under the widget's allowed domains, add:  thehoopahangout.com  and  www.thehoopahangout.com
 *  3. Copy the embed code OwnerRez gives you and paste it between the backticks
 *     in `bookingWidgetHtml` below, exactly as given (both the <div> and <script>).
 *  4. (Optional) Do the same for a Review widget → `reviewsWidgetHtml`.
 *  5. (Optional) `bookingUrl` is a fallback link, e.g. your OwnerRez hosted
 *     booking page or a channel listing, shown if no widget is pasted yet.
 */
window.SITE_CONFIG = {
  ownerrez: {
    propertyId: "360563", // The Hoopa Hangout in OwnerRez (for reference)

    bookingWidgetHtml: `
      <!-- PASTE OWNERREZ BOOKING/INQUIRY WIDGET EMBED CODE HERE -->
    `,

    reviewsWidgetHtml: `
      <!-- (optional) PASTE OWNERREZ REVIEW WIDGET EMBED CODE HERE -->
    `,

    bookingUrl: "" // e.g. "https://www.airbnb.com/rooms/XXXX" or your OwnerRez booking link
  },

  contact: {
    email: "",   // e.g. "stay@thehoopahangout.com"
    phone: ""    // e.g. "(209) 555-0123"
  },

  // Put photos in assets/img/ and list them here (first one is used large).
  gallery: [
    { src: "assets/img/hero.jpg",     alt: "Exterior of The Hoopa Hangout among the pines" },
    { src: "assets/img/living.jpg",   alt: "Living room with fireplace" },
    { src: "assets/img/kitchen.jpg",  alt: "Fully equipped kitchen" },
    { src: "assets/img/bedroom1.jpg", alt: "Primary bedroom" },
    { src: "assets/img/deck.jpg",     alt: "Deck with BBQ" },
    { src: "assets/img/bunk.jpg",     alt: "Bunk room" }
  ],

  // Shown if no OwnerRez review widget is configured. Paste real guest reviews.
  reviews: [
    // { quote: "Perfect cabin for our family reunion!", name: "Sarah", source: "Airbnb", stars: 5 },
  ]
};
