
class AmazonSearchPage {
    elements = {
        searchInput: "#twotabsearchtextbox",
        searchButton: "#nav-search-submit-button",
        sortDropdown: "#s-result-sort-select",

        productCards: '[data-component-type="s-search-result"]',
        productTitle: '[data-cy="title-recipe"] h2',
        productLink: '[data-cy="title-recipe"] a',
        productPrice: '[data-cy="price-recipe"] .a-price .a-offscreen',
        sponsoredLabel: '[data-component-type="s-sponsored-label-marker"]',

        freeShippingFilter: '#p_n_is_free_shipping\\/10236242011',

    };
}

export default new AmazonSearchPage();
