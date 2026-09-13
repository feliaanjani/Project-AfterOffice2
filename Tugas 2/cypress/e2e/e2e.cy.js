const employeeId = Date.now().toString().slice(-8);
const employeeUsername = `feliaanjani${Date.now()}`;
describe("OrangeHRM UI E2E Test", () => {

    it("should login successfully as admin", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.wait(3000);

        cy.get('input[placeholder="Username"]')
            .type("Admin");

        cy.get('input[placeholder="Password"]')
            .type("admin123");

        cy.contains("button", "Login")
            .click();

        cy.url().should("include", "/dashboard");
        cy.contains("h6", "Dashboard").should("be.visible");

    });

    it("should not login with invalid password", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.get('input[placeholder="Username"]')
        .type("Admin");

        cy.get('input[placeholder="Password"]')
        .type("wrongpassword");

        cy.contains("button", "Login")
        .click();

        cy.contains("Invalid credentials")
        .should("be.visible");

        cy.url().should("include", "/auth/login");

    });

    it("should add a new employee successfully", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        // Login as Admin
        cy.get('input[placeholder="Username"]')
            .type("Admin");

        cy.get('input[placeholder="Password"]')
            .type("admin123");

        cy.contains("button", "Login")
            .click();

        // Open PIM
        cy.contains("span", "PIM")
            .click();

        // Click Add Employee
        cy.contains("a", "Add Employee")
            .click();

        // Fill employee data
        cy.get('input[placeholder="First Name"]')
            .type("Felia");

        cy.get('input[placeholder="Last Name"]')
            .type("Anjani");
        
        // Fill Employee Id
        cy.contains("label", "Employee Id")
            .closest(".oxd-input-group")
            .find("input")
            .clear()
            .type(employeeId);

        // Save employee
        cy.contains("button", "Save")
            .click();

       // Verify employee successfully added
        cy.url().should("include", "/pim/viewPersonalDetails");

    });

    it("should not add employee without first name", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        // Login as Admin
        cy.get('input[placeholder="Username"]')
            .type("Admin");

        cy.get('input[placeholder="Password"]')
            .type("admin123");

        cy.contains("button", "Login")
            .click();

        // Open PIM
        cy.contains("span", "PIM")
            .click();

        // Click Add Employee
        cy.contains("a", "Add Employee")
            .click();

        // Fill only Last Name
        cy.get('input[placeholder="Last Name"]')
            .type("Anjani");

        // Click Save
        cy.contains("button", "Save")
            .click();

        // Verify First Name validation message
        cy.contains("Required")
            .should("be.visible");

    });

    it("should create a new employee user successfully", () => {
        
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        
        // Login as Admin
        cy.get('input[placeholder="Username"]')
            .type("Admin");
        
        cy.get('input[placeholder="Password"]')
            .type("admin123");
        
        cy.contains("button", "Login")
            .click();
        
        // Open Admin
        cy.contains("span", "Admin")
            .click();
        
        // Click Add
        cy.contains("button", "Add")
            .click();
        
        // Select User Role
        cy.get(".oxd-select-text")
            .eq(0)
            .click();
        
        cy.get(".oxd-select-option")
            .contains("ESS")
            .click();
        
        // Select Employee Name
        cy.get('input[placeholder="Type for hints..."]')
            .type("Felia");
        
        cy.contains("Felia Anjani")
            .click();
        
        // Fill Username
        cy.contains("label", "Username")
            .closest(".oxd-input-group")
            .find("input")
            .type(employeeUsername);
        
        // Select Status
        cy.get(".oxd-select-text")
            .eq(1)
            .click();
        
        cy.get(".oxd-select-option")
            .contains("Enabled")
            .click();
        
        // Fill Password
        cy.contains("label", "Password")
            .closest(".oxd-input-group")
            .find("input")
            .type("Felia123!");
        
        // Confirm Password
        cy.contains("label", "Confirm Password")
            .closest(".oxd-input-group")
            .find("input")
            .type("Felia123!");
        
        // Save
        cy.contains("button", "Save")
            .click();

        // Verify success toast
        cy.get('#oxd-toaster_1 div.oxd-toast')
            .should("be.visible");

        // Go to User Management
        cy.contains("span", "User Management")
            .click();

        // Open Users
        cy.contains("a", "Users")
            .click();
        
        // Verify employee user has been created
        cy.contains(employeeUsername)
            .should("be.visible");
        
    });

    it("should not create employee user without username", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        // Login sebagai Admin
        cy.get('input[placeholder="Username"]')
            .type("Admin");

        cy.get('input[placeholder="Password"]')
            .type("admin123");

        cy.contains("button", "Login")
            .click();

        // Masuk ke Admin
        cy.contains("span", "Admin")
            .click();

        // Klik Add
        cy.contains("button", "Add")
            .click();

        // Pilih User Role = ESS
        cy.get(".oxd-select-text")
            .eq(0)
            .click();

        cy.get(".oxd-select-option")
            .contains("ESS")
            .click();

        // Isi Employee Name
        cy.get('input[placeholder="Type for hints..."]')
            .type("Felia Anjani");

        cy.contains("Felia Anjani")
            .click();

        // Pilih Status = Enabled
        cy.get(".oxd-select-text")
            .eq(1)
            .click();

        cy.get(".oxd-select-option")
            .contains("Enabled")
            .click();

        // Username sengaja dikosongkan

        // Isi Password
        cy.contains("label", "Password")
            .closest(".oxd-input-group")
            .find("input")
            .type("Felia@123");

        // Isi Confirm Password
        cy.contains("label", "Confirm Password")
            .closest(".oxd-input-group")
            .find("input")
            .type("Felia@123");

        // Save
        cy.contains("button", "Save")
            .click();

        // Verify validation message
        cy.contains("Required")
            .should("be.visible");

    });

    it("should add leave entitlement for employee", () => {
        // Login sebagai Admin
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        cy.get('input[placeholder="Username"]')
            .type("Admin");

        cy.get('input[placeholder="Password"]')
            .type("admin123");

        cy.contains("button", "Login")
            .click();

        // Masuk ke Leave
        cy.contains("span", "Leave")
            .click();

        // Buka dropdown Entitlements
        cy.contains("span", "Entitlements")
            .click();

        // Klik Add Entitlements
        cy.contains("a", "Add Entitlements")
            .click();
        
        // Employee Name
        cy.get('input[placeholder="Type for hints..."]')
            .type("Felia Anjani");

        cy.contains("Felia Anjani")
            .click();

        // Leave Type
        cy.get(".oxd-select-text")
            .eq(0)
            .click();

        cy.get(".oxd-select-option")
            .contains("CAN - Vacation")
            .click();

        //Pilih Leave Period
        cy.get(".oxd-select-text")
            .eq(1)
            .click();

        // cy.get(".oxd-select-option")
        //     .contains("2026-01-01 - 2026-31-12")
        //     .click();
        
        // Entitlement = 5 hari
        cy.get('input.oxd-input')
            .eq(1)
            .type("5");
        
        // Save
        cy.contains("button", "Save")
            .click();

        // Confirm
        cy.contains("button", "Confirm")
            .click();
                
        // Verify success toast
        cy.get("#oxd-toaster_1 .oxd-toast")
            .should("be.visible");

        // Verify entitlement was added for Felia 
        //cy.contains(".oxd-table-cell", "Felia") .parents(".oxd-table-row") .within(() => { 
        cy.contains("Added") .should("be.visible");
    });

    it("should request leave successfully as employee", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        // Login sebagai Employee
        cy.get('input[placeholder="Username"]')
            .type(employeeUsername);

        cy.get('input[placeholder="Password"]')
            .type("Felia123!");

        cy.contains("button", "Login")
            .click();

        // Masuk ke Leave
        cy.contains("span", "Leave")
            .click();

        // Klik Apply
        cy.contains("a", "Apply")
            .click();

        // Verify Apply Leave page is loaded
        cy.contains("h6", "Apply Leave", { timeout: 10000 })
            .should("be.visible");

        // Pilih Leave Type
        cy.get(".oxd-select-text", { timeout: 10000 })
            .eq(0)
            .should("be.visible")
            .click();

        cy.get(".oxd-select-option", { timeout: 10000 })
            .contains("CAN - Vacation")
            .click();

        // Tentukan tanggal H+2 dan H+3
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() + 2);

        const toDate = new Date();
        toDate.setDate(toDate.getDate() + 3);

        // From Date
        cy.get(".oxd-date-input-icon", { timeout: 10000 })
            .eq(0)
            .click();

        cy.get(".oxd-calendar-date-wrapper", { timeout: 10000 })
            .contains(".oxd-calendar-date", fromDate.getDate())
            .click();

        // To Date
        cy.get(".oxd-date-input-icon", { timeout: 10000 })
            .eq(1)
            .click();

        cy.get(".oxd-calendar-date-wrapper", { timeout: 10000 })
            .contains(".oxd-calendar-date", toDate.getDate())
            .click();

        // Tutup calendar
        cy.contains(".oxd-date-input-link", "Close", { timeout: 10000 })
            .click();

        // Tunggu Duration muncul setelah re-render
        cy.contains("label", "Duration", { timeout: 10000 })
            .should("be.visible");

        // Duration = Half Day - Morning
        cy.contains("label", "Duration", { timeout: 10000 })
            .closest(".oxd-input-group")
            .find(".oxd-select-text")
            .should("be.visible")
            .click();

        cy.get(".oxd-select-option", { timeout: 10000 })
            .contains("Half Day - Morning")
            .click();

        // Isi Comment
        cy.get("textarea.oxd-textarea", { timeout: 10000 })
            .should("be.visible")
            .type("Personal leave");

        // Apply
        cy.contains("button", "Apply", { timeout: 10000 })
            .should("be.visible")
            .click();

        // Verify request submitted successfully
        cy.get("#oxd-toaster_1 .oxd-toast", { timeout: 10000 })
            .should("be.visible");

        // Open My Leave
        cy.contains("a", "My Leave", { timeout: 10000 })
            .should("be.visible")
            .click();

        // Verify leave request is listed as Pending Approval
        cy.contains(".oxd-table-cell", "Pending Approval", { timeout: 10000 })
            .should("be.visible");

    });

    it("should not request leave without leave type", () => {

        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        // Login sebagai Employee
        cy.get('input[placeholder="Username"]')
            .type(employeeUsername);

        cy.get('input[placeholder="Password"]')
            .type("Felia123!");

        cy.contains("button", "Login")
            .click();

        // Masuk ke Leave
        cy.contains("span", "Leave")
            .click();

        // Klik Apply
        cy.contains("a", "Apply")
            .click();

        // Leave Type sengaja dikosongkan

        // From Date = H+2
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() + 2);

        cy.get(".oxd-date-input-icon")
            .eq(0)
            .click();

        cy.get(".oxd-calendar-date-wrapper")
            .contains(".oxd-calendar-date", fromDate.getDate())
            .click();

        cy.contains(".oxd-date-input-link", "Close")
            .click();

        // To Date = H+2
        cy.get(".oxd-date-input-icon")
            .eq(1)
            .click();

        cy.get(".oxd-calendar-date-wrapper")
            .contains(".oxd-calendar-date", fromDate.getDate())
            .click();

        cy.contains(".oxd-date-input-link", "Close")
            .click();

        // Duration = Half Day - Morning
        cy.contains("label", "Duration")
            .closest(".oxd-input-group")
            .find(".oxd-select-text")
            .click();

        cy.get(".oxd-select-option")
            .contains("Half Day - Morning")
            .click();

        // Apply
        cy.contains("button", "Apply")
            .click();

        // Verify validation message
        cy.contains("Required")
            .should("be.visible");
    });

    it("should approve employee leave successfully as admin", () => {

        cy.viewport(1440, 900);
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        // Login as Admin
        cy.get('input[placeholder="Username"]')
            .type("Admin");

        cy.get('input[placeholder="Password"]')
            .type("admin123");

        cy.contains("button", "Login")
            .click();

        // Open Leave
        cy.contains("span", "Leave")
            .click();

        // Open Leave List
        cy.contains("a", "Leave List")
            .click();
        
        // Find Felia's leave request and approve it
        cy.contains(".oxd-table-row", "Felia")
            .within(() => {

        // Intercept approval request
        cy.intercept(
            "PUT",
            "**/api/v2/leave/employees/leave-requests/**"
        ).as("approveLeave");

        // Approve Felia's leave
        cy.contains("button", "Approve")
            .click();

        // Verify approval API succeeded
        cy.wait("@approveLeave")
            .its("response.statusCode")
            .should("eq", 200);
    });

    });

    it('should verify employee leave is approved', () => {
        
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Login as employee
        cy.get('input[placeholder="Username"]')
            .type(employeeUsername);

        cy.get('input[placeholder="Password"]')
            .type("Felia123!");

        cy.contains("button", "Login")
            .click();

        // Open Leave menu
        cy.contains('Leave').click();

        // Open My Leave
        cy.contains('My Leave').click();

        // Verify My Leave page
        cy.url().should('include', '/leave/viewMyLeave');

        // Verify leave status is Scheduled
        cy.get('.oxd-table-body')
        .should('contain', 'Scheduled');
});

});