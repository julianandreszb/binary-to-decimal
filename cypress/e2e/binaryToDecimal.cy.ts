// https://docs.cypress.io/api/introduction/api.html

import { decimalToBinary, generateRandomDecimal } from "../../src/Utils/Utils";

describe("Binary to decimal test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Binary To Decimal");
    const randomDecimalNumber = generateRandomDecimal(1111111111111111);
    const binaryNumber = decimalToBinary(randomDecimalNumber);
    cy.get('[data-testid="input-binary"]').type(binaryNumber);
    cy.get('[data-testid="input-decimal"]').should(
      "have.value",
      randomDecimalNumber
    );
  });
});
