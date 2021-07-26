import { mount } from "@cypress/vue";
import HeadlineCard from "../components/HeadlineCard.vue";

describe("Headline Card", () => {
  it("Renders the card component correctly", () => {
    mount(HeadlineCard, {
      propsData: {
        headline: {
          title: "Card Test",
          urlToImage:
            "https://cdn.arstechnica.net/wp-content/uploads/2020/10/iPhone-12-Pro-760x380.jpg",
          publishedAt: "Mon, 26 Jul 2021 18:55:40 GMT",
        },
      },
    });

    cy.get("v-card").should("be.visible");
    // Verify we have the date we supplied
    cy.get("v-card-title").should("contain.text", "Card Test");
    cy.get("v-card-subtitle").should(
      "contain.text",
      "Mon, 26 Jul 2021 18:55:40 GMT"
    );
    // Check if the card actions buttons are visible
    cy.get("v-btn").first().should("be.visible").should("contain.text", "Edit");
    cy.get("v-btn").eq(1).should("be.visible").should("contain.text", "More");
  });
});
