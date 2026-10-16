
import FlightSearchPage from "../pages/FlightSearchPage";

describe("Agoda Flight Booking", () => {
    it("should search flights from Jakarta to Singapore", () => {
        cy.visit(Cypress.expose("baseUrl"));

        // Open Flights tab
        cy.get(FlightSearchPage.elements.flightsTab)
            .first()
            .should("be.visible")
            .click();

        // Select Jakarta as origin
        cy.get(FlightSearchPage.elements.originInput)
            .should("be.visible")
            .clear()
            .type(Cypress.expose("origin"));

        cy.get(FlightSearchPage.elements.originJakarta)
            .filter(":visible")
            .first()
            .should("be.visible")
            .click();

        // Select Singapore as destination
        cy.get(FlightSearchPage.elements.destinationInput)
            .should("be.visible")
            .clear()
            .type(Cypress.expose("destination"));

        cy.get(FlightSearchPage.elements.destinationSingapore)
            .filter(":visible")
            .first()
            .should("be.visible")
            .click();

        // Calculate departure date (H+1)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const day = tomorrow.getDate();
        const month = tomorrow.toLocaleString("en-US", {
            month: "long",
        });
        const year = tomorrow.getFullYear();

        const ordinal = (n) => {
            if (n >= 11 && n <= 13) return `${n}th`;

            switch (n % 10) {
                case 1:
                    return `${n}st`;
                case 2:
                    return `${n}nd`;
                case 3:
                    return `${n}rd`;
                default:
                    return `${n}th`;
            }
        };

        const departureTestId =
            `${tomorrow.toLocaleDateString("en-US", {
                weekday: "long",
            })}, ${month} ${ordinal(day)}, ${year}`;

        // Select departure date
        const departureSelector =
            `button[data-testid="${departureTestId}"]`;

        cy.get(departureSelector)
            .should("be.visible")
            .click();

        // Open passenger and cabin class dropdown
        cy.get(FlightSearchPage.elements.passengerSelector)
            .filter(":visible")
            .first()
            .should("be.visible")
            .click();

        // Inspect passenger and cabin class elements
        cy.get("body").then(($body) => {
            const passengerElements = $body.find(
                'div[data-component="flight-search-occupancy"]'
            );

            passengerElements.each((index, element) => {
            });

            const cabinButtons = $body.find(
                '[data-element-name="flight-cabin-class"]'
            );

            cabinButtons.each((index, button) => {
            });
        });

        // Close passenger and cabin class dropdown
        cy.get(FlightSearchPage.elements.passengerSelector)
            .filter(":visible")
            .first()
            .click();

        // Search for flights
        cy.get(FlightSearchPage.elements.searchButton)
            .should("be.visible")
            .and("contain.text", "SEARCH FLIGHTS")
            .click();


        // Wait for the flight results title to update
        cy.get('[data-component="mob-flight-result-title"]', {
            timeout: 30000,
        })
            .should("be.visible")
            .should(($title) => {
                expect($title.text().trim()).to.equal(
                    "Flights from Jakarta to Singapore"
                );
            });


        // Open airline filters
        cy.get(FlightSearchPage.elements.airlinesFilterHeader)
            .should("be.visible");

        cy.get(FlightSearchPage.elements.showAllAirlines)
            .should("be.visible")
            .click();


        // Select Malaysia Airlines
        cy.get(FlightSearchPage.elements.malaysiaAirlinesOption)
            .filter(":visible")
            .should("be.visible")
            .and("have.attr", "aria-selected", "false")
            .click();


        // Verify Malaysia Airlines filter is selected
        cy.get(FlightSearchPage.elements.malaysiaAirlinesOption)
            .should("have.attr", "aria-selected", "true")
            .find('input[type="checkbox"]')
            .should("be.checked");

        // Wait for airline flight results
            cy.get(
                `[data-testid="airline-logo"][alt="${Cypress.expose("airline")}"]`,
                { timeout: 30000 }
            ).should("have.length.greaterThan", 0);

        // Find unique Malaysia Airlines flights
        cy.get(FlightSearchPage.elements.departureTime)
            .should("have.length.greaterThan", 0)
            .then(($times) => {
                const uniqueCards = new Set();

                const flights = [...$times]
                    .map((timeElement) => {
                        let card = timeElement.parentElement;

                        // Find the ancestor containing the airline logo
                        while (
                            card &&
                            !card.querySelector(
                                FlightSearchPage.elements.airlineLogo
                            )
                        ) {
                            card = card.parentElement;
                        }

                        if (!card || uniqueCards.has(card)) {
                            return null;
                        }

                        const logo = card.querySelector(
                            FlightSearchPage.elements.airlineLogo
                        );

                        const airline = Cypress.expose("airline");

                        if (
                            !logo ||
                            logo.getAttribute("alt") !== airline
                        ) {
                            return null;
                        }

                        uniqueCards.add(card);

                        const departure = timeElement.innerText.trim();
                        const [hours, minutes] = departure.split(":").map(Number);

                        return {
                            departure,
                            minutes: hours * 60 + minutes,
                            card,
                        };
                    })
                    .filter(Boolean)
                    .sort((a, b) => a.minutes - b.minutes);

                flights.forEach((flight, index) => {
                });

                expect(flights.length).to.be.greaterThan(0);

                const earliestFlight = flights[0];

                const departure = earliestFlight.card
                    .querySelector('[data-testid="departure-time"]')
                    .innerText.trim();

                const arrival = earliestFlight.card
                    .querySelector('[data-testid="arrival-time"]')
                    .innerText.trim();

                cy.wrap(departure).as("selectedDepartureTime");
                cy.wrap(arrival).as("selectedArrivalTime");

                // Find the expand button within the selected flight card
                cy.wrap(earliestFlight.card)
                    .find('button[aria-label*="Expand flight details"]')
                    .filter(":visible")
                    .first()
                    .should("be.visible")
                    .and("have.attr", "aria-expanded", "false")
                    .click();


                // Select the expanded Malaysia Airlines flight
                cy.get(FlightSearchPage.elements.selectFlightButton, {
                    timeout: 15000,
                })
                    .filter(":visible")
                    .should("have.length.greaterThan", 0)
                    .first()
                    .should("be.enabled")
                    .click();

            });

        // Handle booking page opened in a new tab
        cy.window().then((win) => {
            cy.stub(win, "open").callsFake((url) => {
                win.location.href = url;
            });
        });

        // Wait for the booking page to load
        cy.get('[data-testid="flight-card-bookButton"]', {
            timeout: 30000
        }).should('not.exist');

        // Verify Contact Details section
        cy.contains("h3", "Contact details", {
            timeout: 30000
        }).should("be.visible");

        
        const passengerFirstName = Cypress.expose("passengerFirstName");
        const passengerLastName = Cypress.expose("passengerLastName");
        const passengerEmail = Cypress.expose("passengerEmail");
        const passengerPhone = Cypress.expose("passengerPhone");

        // Fill Contact Details
        cy.get(FlightSearchPage.elements.firstNameInput)
            .should("be.visible")
            .and("be.enabled")
            .clear()
            .type(passengerFirstName);

        cy.get(FlightSearchPage.elements.lastNameInput)
            .should("be.visible")
            .and("be.enabled")
            .clear()
            .type(passengerLastName);

        cy.get(FlightSearchPage.elements.emailInput)
            .should("be.visible")
            .and("be.enabled")
            .clear()
            .type(passengerEmail);

        cy.get(FlightSearchPage.elements.mobilePhoneInput)
            .should("be.visible")
            .and("be.enabled")
            .clear()
            .type(passengerPhone);


        // Select Gender: Female
        cy.get('label[data-testid="1"]')
            .should("be.visible")
            .click();

        cy.get('input[type="radio"][aria-label="Female"]')
            .should("be.checked");

        
        // Fill Passenger Given Name
        cy.get(FlightSearchPage.elements.passengerFirstName)
            .should("be.visible")
            .clear()
            .type(passengerFirstName)
            .should("have.value", passengerFirstName);

        // Fill Passenger Surname
        cy.get(FlightSearchPage.elements.passengerLastName)
            .should("be.visible")
            .clear()
            .type(passengerLastName)
            .should("have.value", passengerLastName);


        // Fill Date of Birth - Day
        cy.get(FlightSearchPage.elements.passengerBirthDay)
            .should("be.visible")
            .clear()
            .type("15")
            .should("have.value", "15");

        // Select Month of Birth: May
        cy.get(
            FlightSearchPage.elements.passengerBirthMonth
        )
            .find('button[role="combobox"]')
            .should("be.visible")
            .click();

        cy.contains("May", { timeout: 10000 })
            .should("be.visible")
            .click();

        // Verify the selected month
        cy.get(
            FlightSearchPage.elements.passengerBirthMonth
        )
            .should("contain.text", "May");


        // Fill Date of Birth - Year
        cy.get(FlightSearchPage.elements.passengerBirthYear)
            .should("be.visible")
            .clear()
            .type("1995")
            .should("have.value", "1995");

        // Open Nationality dropdown
        cy.get('[role="combobox"]')
            .filter(':visible')
            .filter((index, element) => {
                return element.innerText.trim() === 'Select';
            })
            .should('have.length.greaterThan', 0)
            .first()
            .click();

        // Search for Indonesia in the Nationality dropdown
        cy.get('input[placeholder="Search"]')
            .should('be.visible')
            .and('be.enabled')
            .clear()
            .type('Indonesia');

        // Select Indonesia from the Nationality dropdown
        cy.contains("span", /^Indonesia$/)
            .should("be.visible")
            .click();

        // Verify Nationality is selected
        cy.get('[role="combobox"]')
            .filter(":visible")
            .should("contain.text", "Indonesia");

        //Input passport
        cy.get('[data-testid="flight.forms.i0.units.i0.passportNumber"]')
            .should("be.visible")
            .clear()
            .type("A12345678")
            .should("have.value", "A12345678");

        // Select Country/Region of Issue
        cy.contains("legend", "Country/region of issue")
            .parent()
            .parent()
            .find('[role="combobox"]')
            .click();

        cy.get('input[placeholder="Search"]')
            .should("be.visible")
            .clear()
            .type("Indonesia");

        cy.contains("span", /^Indonesia$/)
            .should("be.visible")
            .click();

        // Input Passport Expiry Date - Day
        cy.get('[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]')
            .should("be.visible")
            .clear()
            .type("25")
            .should("have.value", "25");

        // Select Passport Expiry Month
        cy.get(FlightSearchPage.elements.passportExpiryMonth)
            .should("be.visible")
            .click();

        cy.contains("span", /^May$/)
            .should("be.visible")
            .click();

        // Verify selected month
        cy.get(FlightSearchPage.elements.passportExpiryMonth)
            .should("contain.text", "May");

        // Passport Expiry Year
        cy.get(FlightSearchPage.elements.passportExpiryYear)
            .should("be.visible")
            .clear()
            .type("2030")
            .should("have.value", "2030");
        
        cy.contains("Passport expiry date must be at least 6 months from date of travel")
            .should("not.exist");

        // Save total price from Passenger Details page
        cy.get(FlightSearchPage.elements.totalPrice)
        .invoke("text")
        .then((text) => {
            cy.wrap(text.trim()).as("passengerDetailsTotalPrice");
        });

            //Travel protection option
        cy.get(FlightSearchPage.elements.travelProtectionNo)
            .should("be.visible")
            .click();

        cy.get('[data-testid="radio-button-option-no"]')
            .should("have.attr", "aria-checked", "true");

        //check agreement
        cy.get(FlightSearchPage.elements.paymentAgreementCheckbox)
            .should("be.visible")
            .click();

        cy.get('input[type="checkbox"]')
            .should("be.checked");

        // Click Continue to Payment
        cy.get(FlightSearchPage.elements.continueToPaymentButton)
            .should("be.visible")
            .and("be.enabled")
            .click();

        // Handle booking upsell popup
        cy.contains("span", /^No, thanks$/)
            .should("be.visible")
            .click();

        cy.contains("span", /^No, thanks$/)
            .should("not.exist");

        
        // Verify Payment Method page
        cy.get(FlightSearchPage.elements.paymentMethodTitle)
            .should("be.visible")
            .and("contain.text", "Payment method");

        // Verify passenger name
        cy.get(FlightSearchPage.elements.passengerDetailsName)
            .should("be.visible")
            .and("contain.text", "Felia Automation");

        // Verify passport number
        cy.get(FlightSearchPage.elements.passengerPassportNumber)
            .should("contain.text", "Passport: A12345678");

        // Verify departure time matches the selected flight
        cy.get("@selectedDepartureTime").then((expectedDepartureTime) => {
            cy.get(FlightSearchPage.elements.flightTimeSummary)
                .should("be.visible")
                .and("contain.text", expectedDepartureTime);
        });

        // Verify arrival time matches the selected flight
        cy.get("@selectedArrivalTime").then((expectedArrivalTime) => {
            cy.get(FlightSearchPage.elements.flightTimeSummary)
                .should("be.visible")
                .and("contain.text", expectedArrivalTime);
        });

        // Verify total price matches Passenger Details page
        cy.get("@passengerDetailsTotalPrice").then((expectedPrice) => {
        cy.get(FlightSearchPage.elements.totalPrice)
            .should("be.visible")
            .invoke("text")
            .then((actualPrice) => {
            expect(actualPrice.trim()).to.equal(expectedPrice);
            });
        });
       













    });






});
