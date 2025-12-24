// mjmlTemplates.js - Library of premade MJML templates

const MJML_PREMADE_TEMPLATES = [
  {
    name: "Simple Welcome",
    mjml: `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" color="#e56a54">Welcome to our newsletter!</mj-text>
        <mj-button background-color="#e56a54" color="#fff" href="https://example.com">Learn More</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    name: "Product Promo",
    mjml: `<mjml>
  <mj-body>
    <mj-section background-color="#f4f4f4">
      <mj-column>
        <mj-image src="https://via.placeholder.com/300x100" alt="Product" />
        <mj-text font-size="18px">Check out our new product!</mj-text>
        <mj-button background-color="#007bff" color="#fff" href="https://example.com/product">Shop Now</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    name: "Event Invitation",
    mjml: `<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="22px" color="#333">You're Invited!</mj-text>
        <mj-text font-size="16px">Join us for our annual event on January 15th.</mj-text>
        <mj-button background-color="#28a745" color="#fff" href="https://example.com/event">RSVP</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  },
  {
    name: "Newsletter Layout",
    mjml: `<mjml>
  <mj-body>
    <mj-section>
      <mj-column width="60%">
        <mj-text font-size="20px">Latest News</mj-text>
        <mj-text>Here's what's new this month...</mj-text>
      </mj-column>
      <mj-column width="40%">
        <mj-image src="https://via.placeholder.com/120" alt="News" />
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-divider border-color="#e56a54" />
        <mj-text font-size="14px" color="#888">You received this email because you subscribed to our newsletter.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
  }
];

// Export for usage in the editor
if (typeof window !== 'undefined') {
  window.MJML_PREMADE_TEMPLATES = MJML_PREMADE_TEMPLATES;
}
