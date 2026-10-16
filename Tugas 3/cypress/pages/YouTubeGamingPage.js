
class YouTubeGamingPage {
  elements = {
    guideButton: "#start > #guide-button",
  };

  openSidebar() {
    cy.get(this.elements.guideButton)
      .should("be.visible")
      .click();
  }

  showMore() {
    cy.contains("tp-yt-paper-item", "Show more")
      .filter(":visible")
      .first()
      .should("be.visible")
      .click();
  }

  openGaming() {
    cy.contains("tp-yt-paper-item", "Gaming")
      .filter(":visible")
      .first()
      .should("be.visible")
      .click();

    cy.url().should("include", "/gaming");
  }

  openTrendingVideos() {
    cy.contains(
      "ytd-rich-list-header-renderer #title",
      "Trending videos"
    )
      .should("be.visible")
      .scrollIntoView()
      .closest("ytd-horizontal-card-list-renderer")
      .within(() => {
        cy.contains("a, button", /View All/i)
          .filter(":visible")
          .click();
      });

    cy.url().should("include", "/gaming/trending");
  }

  selectThirdTrendingVideo() {
    cy.get("ytd-grid-video-renderer")
      .filter(":visible")
      .should("have.length.at.least", 3)
      .eq(2)
      .scrollIntoView()
      .then(($video) => {
        const title =
          $video.find("#video-title").attr("title") ||
          $video.find("#video-title").text().trim();

        const channel = $video
          .find("#channel-name")
          .text()
          .trim();

        expect(title, "Video title").to.not.be.empty;
        expect(channel, "Channel name").to.not.be.empty;

        cy.wrap(title).as("expectedTitle");
        cy.wrap(channel).as("expectedChannel");

        cy.wrap($video)
          .find("a#thumbnail")
          .filter(":visible")
          .first()
          .click();
      });
  }

  verifyVideoDetails(expectedTitle, expectedChannel) {
    cy.get("h1.ytd-watch-metadata")
      .should("be.visible")
      .invoke("text")
      .then((title) => {
        expect(title.trim()).to.equal(expectedTitle);
      });

    cy.get("#owner #channel-name")
      .should("be.visible")
      .invoke("text")
      .then((channel) => {
        expect(channel.trim()).to.equal(expectedChannel);
      });
  }
}

export default new YouTubeGamingPage();
