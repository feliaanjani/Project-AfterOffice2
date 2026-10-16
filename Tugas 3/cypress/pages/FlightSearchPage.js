
class FlightSearchPage {
  elements = {
    //Search Flight Page
    flightsTab: '#travel-search-navigation-tab-2',
    originInput: '[data-selenium="flight-origin-search-input"]',
    originJakarta: 'li[data-element-name="flight-origin-search-result"][data-element-object-id="CGK"]',
    destinationInput: '[data-selenium="flight-destination-search-input"]',
    destinationSingapore: '[data-element-name="flight-destination-search-result"][data-element-object-id="SIN"]',
    departureDate: '[data-selenium="flight-date-selector"]',
    passengerSelector:'div[data-component="flight-search-occupancy"]',
    passengerDropdownArrow: '[data-selenium="arrow-down-icon"]',
    adultPassengerCount:'[data-component="flight-occupancy-adult-number"]',
    economyCabin: 'button[data-element-name="flight-cabin-class"][data-element-object-id="economy"]',
    searchButton:'[data-component="flight-search-button"]',

    //Flight Result Page
    airlinesFilterHeader: '[data-testid="filterHeaderTestingId"][id="Airlines"]',
    showAllAirlines: '[label^="Show all"]',

    // Malaysia Airlines Filter
    malaysiaAirlinesLabel: 'p',
    malaysiaAirlinesOption: '[data-testid="flight-filter-item-airline"][data-element-value="MH"]',

    //Open Flight Details & Select Flight
    departureTime: '[data-testid="departure-time"]',
    airlineLogo: 'img[data-testid="airline-logo"]',
    expandEarliestFlight:'button[aria-label*="Expand flight details"]',
    departureTime: '[data-testid="departure-time"]',
    arrivalTime: '[data-testid="arrival-time"]',
    selectFlightButton: '[data-testid="flight-detail-select-button"]',

    // Contact Details 
    contactDetailsTitle: 'h3',
    firstNameInput: '[data-testid="contact.contactFirstName"]',
    lastNameInput: '[data-testid="contact.contactLastName"]',
    emailInput: '[data-testid="contact.contactEmail"]',
    mobilePhoneInput:
    '[data-testid="contact.contactPhoneNumber-PhoneNumberDataTestId"]',

    // Passenger Details
    passengerFemale: 'input[type="radio"][aria-label="Female"]',
    passengerFirstName: '[data-testid="flight.forms.i0.units.i0.passengerFirstName"]',
    passengerLastName: '[data-testid="flight.forms.i0.units.i0.passengerLastName"]',
    passengerBirthDay: '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-DateInputDataTestId"]',
    passengerBirthMonth: '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-MonthInputDataTestId"]',
    passengerBirthYear: '[data-testid="flight.forms.i0.units.i0.passengerDateOfBirth-YearInputDataTestId"]',
    nationalityDropdown:'button[role="combobox"]',

    passportNumber: '[data-testid="flight.forms.i0.units.i0.passportNumber"]',
    countryRegionOfIssue: 'button[aria-labelledby="cf4f726cfd3858"][role="combobox"]',
    passportExpiryDay: '[data-testid="flight.forms.i0.units.i0.passportExpiryDate-DateInputDataTestId"]',
    passportExpiryMonth:'[data-testid="flight.forms.i0.units.i0.passportExpiryDate-MonthInputDataTestId"]',
    passportExpiryYear:'[data-testid="flight.forms.i0.units.i0.passportExpiryDate-YearInputDataTestId"]',


    travelProtectionNo: '[data-testid="radio-button-option-no"] > .a07fe-p-16',
    paymentAgreementCheckbox: '.a07fe-py-8 > .a07fe-fill-generic-base-default',
    continueToPaymentButton: '[data-testid="continue-to-payment-button"]',

    //Popup
    noThanksButton: 'span',

    // Payment page
    paymentMethodTitle: '[data-testid="payment-method-title"]',

    // Contact details recap
    contactDetailsName: '[data-component="contact-details"] [data-component="name-container-name"]',
    contactDetailsEmail: '[data-component="contact-details"] [data-wl-no-leak-test="true"]',

    // Passenger details recap
    passengerDetailsName: '[data-component="passenger-summary-list"] [data-component="name-container-name"]',
    passengerPassportNumber: '[data-component="passenger-summary-list"] [data-component="name-container-detail"]',

    // Departure and Arrival Time
    flightTimeSummary: '[style="display: initial;"] > .umLtf',

    // Total Price
    totalPrice: '[data-component="breakdownlist-2"]',







        


  };
}

export default new FlightSearchPage();
