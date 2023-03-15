<script setup lang="ts">
import { computed, ref } from "vue";
import type { Ref } from "vue";
import { isBinary, binaryToDecimal } from "@/Utils/Utils";
import { BinaryResult } from "@/Utils/Interfaces";
import FormGroup from "@/components/FormGroup.vue";
import IconTriangleExclamation from "@/components/IconTriangleExclamation.vue";

const emit = defineEmits<{
  (e: "onBinaryEntered", value: BinaryResult): void;
}>();

interface Props {
  binaryLabel?: string;
  placeholder?: string;
  maxlength?: number;
}

const props = withDefaults(defineProps<Props>(), {
  binaryLabel: "Binary Number",
  placeholder: "Enter a binary number",
  maxlength: 20,
});
const binaryNumber: Ref<string> = ref("");
const isBinaryValid = computed<boolean>((): boolean => {
  return !binaryNumber.value.length ? true : isBinary(binaryNumber.value);
});
const errorMessage = computed<string>(() => {
  return isBinaryValid.value ? "" : "Invalid binary number";
});
const inputBinaryClass = computed<string>(() => {
  return isBinaryValid.value ? "" : "invalid-input";
});
const maxCharacterCounter = computed<string>(() => {
  return `${binaryNumber.value.length}/${props.maxlength}`;
});

const emitBinaryNumber = function (binaryNumber: string): void {
  const isBinaryNumber = isBinaryValid.value;
  let decimalNumber = isBinaryNumber ? binaryToDecimal(binaryNumber) : 0;

  emit("onBinaryEntered", {
    decimalNumber,
    isValid: isBinaryNumber,
    message: errorMessage.value,
  });
};
</script>

<template>
  <FormGroup>
    <template v-slot:input-label>
      <label data-testid="label-input" for="input-field">{{
        props.binaryLabel
      }}</label>
    </template>
    <template v-slot:input-group>
      <IconTriangleExclamation v-if="!isBinaryValid"></IconTriangleExclamation>
      <input
        id="input-binary"
        data-testid="input-binary"
        type="text"
        class="input-binary"
        :class="inputBinaryClass"
        v-model="binaryNumber"
        :placeholder="props.placeholder"
        :maxlength="props.maxlength"
        v-on:keyup="emitBinaryNumber(binaryNumber)"
      />
    </template>
    <template v-slot:form-input-helper>
      <span class="binary-error-message" data-testid="error-message">
        {{ errorMessage }}
      </span>
      <span class="binary-character-counter" data-testid="character-counter">
        {{ maxCharacterCounter }}
      </span>
    </template>
  </FormGroup>
</template>

<style lang="scss">
@import "./../assets/main";
@import "./../assets/variables";

.input-group {
  .input-binary {
    @extend .input;
    color: $primary-color;
    border-color: $primary-color;

    &:focus,
    &:active {
      border-color: #004ab7;
      outline-color: #004ab7;
    }
  }
  .input-decimal {
    @extend .input;
    background-color: $read-only;
  }
  .invalid-input {
    color: $error-color;
    border-color: $error-color;
    &:focus,
    &:active {
      border-color: $error-color;
      outline-color: $error-color;
    }
  }
}

.input-helper {
  .binary-error-message {
    color: $error-color;
  }
}
</style>
