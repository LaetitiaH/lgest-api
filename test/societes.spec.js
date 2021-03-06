//JEST TEST
const request = require("supertest");
const app = require("../app");


describe("Test the societe resource", () => {
    // Get all societe test
    test("It should response the GET method", done => {
        request(app)
            .get("/societes")
            .expect('Content-Type', /json/)
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    // Get one societe test
    test("It should response the GET method for one society", done => {
        request(app)
            .get("/societes/:id")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});


