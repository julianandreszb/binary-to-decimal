import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import DecimalInput from "../DecimalInput.vue";

describe("DecimalInput", () => {
  it("should display a label based on the decimalLabel property", function () {
    const wrapper = mount(DecimalInput, { props: { decimalLabel: "Title" } });
    expect(wrapper.find('[data-testid="label-input"]').text()).toBe("Title");
  });
  it("should display a default label if decimalLabel property is not provided", function () {
    const wrapper = mount(DecimalInput);
    expect(wrapper.find('[data-testid="label-input"]').text()).toBe(
      "Decimal Number"
    );
  });
  it("should have the readonly attribute", function () {
    const wrapper = mount(DecimalInput);
    expect(
      wrapper.find('[data-testid="input-decimal"]').attributes("readonly")
    ).not.toBeUndefined();
  });
});
