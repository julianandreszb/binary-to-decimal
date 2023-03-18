import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
// @ts-ignore
import DecimalInput from "../DecimalInput.vue";

describe("DecimalInput", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(DecimalInput, {
      props: { decimalLabel: "Title", decimalNumber: 0 },
    });
  });

  it("should display a label based on the decimalLabel property", function () {
    expect(wrapper.find('[data-testid="label-input"]').text()).toBe("Title");
  });
  it("should display a default label if decimalLabel property is not provided", function () {
    wrapper = mount(DecimalInput, {
      props: { decimalNumber: 0 },
    });
    expect(wrapper.find('[data-testid="label-input"]').text()).toBe(
      "Decimal Number"
    );
  });
  it("should have the readonly attribute", function () {
    expect(
      wrapper.find('[data-testid="input-decimal"]').attributes("readonly")
    ).not.toBeUndefined();
  });
  it("should display an input value based on the decimalNumber property", function () {
    const decimalNumber = 123456789;
    wrapper = mount(DecimalInput, {
      props: { decimalNumber },
    });
    expect(wrapper.vm.decimalNumber).toBe(decimalNumber);
  });
});
