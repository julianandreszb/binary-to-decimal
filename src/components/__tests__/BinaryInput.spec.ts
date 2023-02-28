import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BinaryInput from "../BinaryInput.vue";

describe("BinaryInput", () => {
  it("should display a label based on the binaryLabel property", function () {
    const wrapper = mount(BinaryInput, { props: { binaryLabel: "Title" } });
    expect(wrapper.find('[data-testid="label-binary"]').text()).toBe("Title");
  });

  it("should display a default label if binaryLabel property is not provided", function () {
    const wrapper = mount(BinaryInput);
    expect(wrapper.find('[data-testid="label-binary"]').text()).toBe(
      "Binary Number"
    );
  });

  it("should contain a placeholder", function () {
    const wrapper = mount(BinaryInput, {
      props: { binaryLabel: "Title", placeholder: "This is a placeholder" },
    });
    expect(
      wrapper.find('[data-testid="input-binary"]').attributes("placeholder")
    ).toBe("This is a placeholder");
  });

  it("should display a default placeholder if placeholder property is not provided", function () {
    const wrapper = mount(BinaryInput);
    expect(
      wrapper.find('[data-testid="input-binary"]').attributes("placeholder")
    ).toBe("Enter the binary number to convert");
  });

  it("should contain the maxlength property based on maxlength property provided", function () {
    const wrapper = mount(BinaryInput, { props: { maxlength: 50 } });
    expect(
      wrapper.find('[data-testid="input-binary"]').attributes("maxlength")
    ).toBe("50");
  });

  it("should contain a maxlength property equals to 20 if maxlength property is not provided", function () {
    const wrapper = mount(BinaryInput);
    expect(
      wrapper.find('[data-testid="input-binary"]').attributes("maxlength")
    ).toBe("20");
  });

  it("should display a character number counter based on maxlength property", function () {
    const wrapper = mount(BinaryInput, { props: { maxlength: 50 } });
    expect(wrapper.find('[data-testid="character-counter"]').text()).toBe(
      "0/50"
    );
  });

  it("should display the character number counter based on the characters entered in the binary input", async function () {
    const wrapper = mount(BinaryInput, { props: { maxlength: 50 } });
    const inputBinary = wrapper.find('[data-testid="input-binary"]');
    const binaryNumber = "1010";
    await inputBinary.setValue(binaryNumber);
    expect(wrapper.find('[data-testid="character-counter"]').text()).toBe(
      `${binaryNumber.length}/50`
    );
  });

  it("should display an error message when any invalid character is entered", async function () {
    const wrapper = mount(BinaryInput);
    const inputBinary = wrapper.find('[data-testid="input-binary"]');
    const binaryNumber = "A1010"; // Error: Contains an A
    await inputBinary.setValue(binaryNumber);
    expect(wrapper.find('[data-testid="error-message"]').text()).toBe(
      "Invalid binary number entered"
    );
  });

  it("should display an error icon when any invalid character is entered", async function () {
    const wrapper = mount(BinaryInput);
    const inputBinary = wrapper.find('[data-testid="input-binary"]');
    const binaryNumber = "A1010"; // Error: Contains an A
    await inputBinary.setValue(binaryNumber);

    const iconError = wrapper.find('[data-testid="icon-error"]');
    expect(iconError.isVisible()).toBe(true);
  });

  it("should contain the invalid-value class if any invalid character is entered", async function () {
    const wrapper = mount(BinaryInput);
    const inputBinary = wrapper.find('[data-testid="input-binary"]');
    const binaryNumber = "A1010"; // Error: Contains an A
    await inputBinary.setValue(binaryNumber);

    expect(inputBinary.classes().includes("invalid-value")).toBe(true);
  });
});
