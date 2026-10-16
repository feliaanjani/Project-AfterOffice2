
const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve(__dirname, ".env"),
});

module.exports = defineConfig({
    e2e: {
        specPattern: "cypress/e2e/**/*.cy.js",
        supportFile: false,
    },

    video: true,
    screenshotOnRunFailure: true,

    reporter: "mochawesome",
    reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: false,
    },

    // Public configuration
    expose: {
    // AGODA Flight Booking Configuration
    baseUrl: process.env.BASE_URL,
    origin: process.env.ORIGIN,
    destination: process.env.DESTINATION,
    airline: process.env.AIRLINE,
    tripType: process.env.TRIP_TYPE,
    dateOffsetDays: Number(process.env.DATE_OFFSET_DAYS || 1),
    passengerTitle: process.env.PASSENGER_TITLE,
    passengerFirstName: process.env.PASSENGER_FIRST_NAME,
    passengerLastName: process.env.PASSENGER_LAST_NAME,
    passengerEmail: process.env.PASSENGER_EMAIL,
    passengerPhone: process.env.PASSENGER_PHONE,

    // AMAZON Automation Configuration
    amazonBaseUrl: process.env.AMAZON_BASE_URL,
    amazonSearchKeyword: process.env.AMAZON_SEARCH_KEYWORD,
    amazonViewportWidth: Number(
        process.env.AMAZON_VIEWPORT_WIDTH || 1920
    ),
    amazonViewportHeight: Number(
        process.env.AMAZON_VIEWPORT_HEIGHT || 1080
    ),

    // YOUTUBE Gaming Automation Configuration
    youtubeBaseUrl: process.env.YOUTUBE_BASE_URL,
    viewportWidth: 1365,
    viewportHeight: 900,
},
});
