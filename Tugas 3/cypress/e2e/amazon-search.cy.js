
import AmazonSearchPage from "../pages/AmazonSearchPage";

const normalizePrice = (price) => {
  const match = price.match(
    /(\$|IDR)\s*([\d,]+)(?:\.(\d{2}))?/i
  );

  expect(match, `Invalid price format: ${price}`).not.to.be.null;

  return {
    currency: match[1].toUpperCase() === "$" ? "USD" : "IDR",
    wholeAmount: Number(match[2].replace(/,/g, "")),
  };
};

const selectRightmostProductInFirstRow = (elements) => {
  return cy.get(elements.productCards).then(($cards) => {
    const cards = [...$cards]
      .map((card) => ({
        card,
        rect: card.getBoundingClientRect(),
      }))
      .filter(({ rect }) => rect.width > 0 && rect.height > 0)
      .sort((a, b) => {
        if (Math.abs(a.rect.top - b.rect.top) > 20) {
          return a.rect.top - b.rect.top;
        }

        return a.rect.left - b.rect.left;
      });

    expect(cards.length, "Visible product cards").to.be.greaterThan(0);

    const firstRowTop = cards[0].rect.top;

    const firstRow = cards.filter(
      ({ rect }) => Math.abs(rect.top - firstRowTop) <= 20
    );

    const eligibleProducts = firstRow
      .filter(({ card }) => {
        const title = card.querySelector(elements.productTitle);
        const link = card.querySelector(elements.productLink);
        const price = card.querySelector(elements.productPrice);
        const sponsored = card.querySelector(elements.sponsoredLabel);

        return (
          !sponsored &&
          Boolean(title?.innerText.trim()) &&
          Boolean(link?.getAttribute("href")?.includes("/dp/")) &&
          Boolean(price?.innerText.trim())
        );
      })
      .sort((a, b) => b.rect.right - a.rect.right);

    expect(
      eligibleProducts.length,
      "Eligible non-sponsored products in the first row"
    ).to.be.greaterThan(0);

    const selectedCard = eligibleProducts[0].card;

    const title = selectedCard.querySelector(elements.productTitle);
    const link = selectedCard.querySelector(elements.productLink);
    const price = selectedCard.querySelector(elements.productPrice);

    return {
      title: title.innerText.trim(),
      price: price.innerText.trim(),
      href: link.getAttribute("href"),
    };
  });
};

describe("Amazon Product Search", () => {
  const elements = AmazonSearchPage.elements;

  beforeEach(() => {
    cy.viewport(
      Number(Cypress.expose("amazonViewportWidth")),
      Number(Cypress.expose("amazonViewportHeight"))
    );

    cy.visit(Cypress.expose("amazonBaseUrl"));
  });

  it("should search, sort, select, and verify an Amazon product", () => {
    const keyword = Cypress.expose("amazonSearchKeyword");

    // Step 1: Search for a product
    cy.get(elements.searchInput)
      .should("be.visible")
      .clear()
      .type(keyword);

    cy.get(elements.searchButton).click();

    cy.url().should("include", `k=${keyword}`);

    cy.get(elements.productCards).should("have.length.greaterThan", 0);

    // Step 2: Sort by highest price
    cy.get(elements.sortDropdown)
      .should("be.visible")
      .select("price-desc-rank", { force: true })
      .should("have.value", "price-desc-rank");

    // Step 3: Apply the free shipping filter when necessary
    cy.get(elements.freeShippingFilter)
      .should("exist")
      .within(() => {
        cy.get('input[type="checkbox"]')
          .should("exist")
          .then(($checkbox) => {
            if (!$checkbox.prop("checked")) {
              cy.get("a.s-navigation-item").click();
            }
          });
      });

    cy.location("search").should("include", "rnid=");

    cy.get(elements.productCards).should("have.length.greaterThan", 0);

    // Step 4: Select the rightmost eligible product in the first row
    selectRightmostProductInFirstRow(elements).then((product) => {
      expect(product.title).not.to.be.empty;
      expect(product.price).not.to.be.empty;
      expect(product.href).to.include("/dp/");

      const productUrl = new URL(
        product.href,
        Cypress.expose("amazonBaseUrl")
      ).href;

      // Step 5: Open the selected product detail page
      cy.visit(productUrl);

      cy.location("pathname", { timeout: 15000 }).should(
        "match",
        /\/dp\//
      );

      // Step 6: Verify the product name
      cy.get("#productTitle", { timeout: 15000 })
        .should("be.visible")
        .invoke("text")
        .then((detailTitle) => {
          expect(detailTitle.trim()).to.equal(product.title);
        });

      // Step 7: Verify the product price in whole currency units
      cy.get("#corePrice_feature_div .a-offscreen", {
        timeout: 15000,
      })
        .should("exist")
        .then(($prices) => {
          const priceTexts = [...$prices].map((element) =>
            (
              element.innerText ||
              element.textContent ||
              element.getAttribute("aria-label") ||
              ""
            ).trim()
          );

          const detailPriceText = priceTexts.find((price) =>
            /(?:\$|IDR)\s*[\d,]+(?:\.\d{2})?/i.test(price)
          );

          expect(detailPriceText, "Product detail price").to.exist;

          const searchPrice = normalizePrice(product.price);
          const detailPrice = normalizePrice(detailPriceText);

          expect(detailPrice.currency).to.equal(searchPrice.currency);

          expect(detailPrice.wholeAmount).to.equal(
            searchPrice.wholeAmount
          );
        });
    });
  });
});
