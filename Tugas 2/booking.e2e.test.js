const path = require("path");
const request = require("supertest");
const { expect } = require("chai");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const bookingData = require("./booking.json");

const baseUrl = "https://restful-booker.herokuapp.com";

let token;
let bookingId;

describe("RESTful Booker API E2E Test", () => {

    // 1. AUTH
    it("should authenticate successfully", async () => {
    const response = await request(baseUrl)
        .post("/auth")
        .send({
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        });

    expect(response.statusCode).to.equal(200);

    token = response.body.token;
});

    // 2. CREATE BOOKING
    it("should create a new booking successfully", async () => {
        const response = await request(baseUrl)
            .post("/booking")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send(bookingData);

        expect(response.statusCode).to.equal(200);

        expect(response.body.booking).to.deep.equal(bookingData);

        bookingId = response.body.bookingid;
    });

        // 3. GET BOOKING
    it("should get the created booking successfully", async () => {
        const response = await request(baseUrl)
            .get(`/booking/${bookingId}`)
            .set("Accept", "application/json");

        expect(response.statusCode).to.equal(200);

        expect(response.body).to.deep.equal(bookingData);
    });

    // 4. DELETE BOOKING
    it("should delete the created booking successfully", async () => {
        const response = await request(baseUrl)
            .delete(`/booking/${bookingId}`)
            .set("Cookie", `token=${token}`);

        expect(response.statusCode).to.equal(201);
    });

});