
import YouTubeGamingPage from "../pages/YouTubeGamingPage";

describe("YouTube Gaming E2E", () => {
  it("should open Trending videos from Gaming page", () => {
    cy.visit(Cypress.expose("youtubeBaseUrl"));

    YouTubeGamingPage.openSidebar();
    YouTubeGamingPage.showMore();
    YouTubeGamingPage.openGaming();
    YouTubeGamingPage.openTrendingVideos();
    YouTubeGamingPage.selectThirdTrendingVideo();

    cy.get("@expectedTitle").then((title) => {
      cy.get("@expectedChannel").then((channel) => {
        YouTubeGamingPage.verifyVideoDetails(title, channel);
      });
    });
  });
});
