<script setup lang="ts">
import { computed, ref } from "vue";
import type { Ref } from "vue";
import { isBinary, binaryToDecimal } from "@/Utils/Utils";
import { BinaryResult } from "@/Utils/Interfaces";

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
const errorMessage = computed<string>(() => {
  return binaryNumber.value.length && !isBinary(binaryNumber.value)
    ? "Invalid binary number"
    : "";
});
const invalidValueClass = computed<string>(() => {
  return binaryNumber.value.length && !isBinary(binaryNumber.value)
    ? "invalid-input"
    : "";
});
const maxCharacterCounter = computed<string>(() => {
  return `${binaryNumber.value.length}/${props.maxlength}`;
});

const emitBinaryNumber = function (binaryNumber: string): void {
  const isBinaryNumber = isBinary(binaryNumber);
  let decimalNumber = isBinaryNumber ? binaryToDecimal(binaryNumber) : 0;

  emit("onBinaryEntered", {
    decimalNumber,
    isValid: isBinaryNumber,
    message: errorMessage.value,
  });
};
</script>

<template>
  <div class="form-group">
    <label data-testid="label-binary" for="input-binary">{{
      props.binaryLabel
    }}</label>
    <div class="input-group">
      <i
        v-if="errorMessage"
        data-testid="icon-error"
        class="fa-solid fa-triangle-exclamation"
      ></i>
      <input
        id="input-binary"
        data-testid="input-binary"
        type="text"
        class="input-binary"
        :class="invalidValueClass"
        v-model="binaryNumber"
        :placeholder="props.placeholder"
        :maxlength="props.maxlength"
        v-on:keyup="emitBinaryNumber(binaryNumber)"
      />
    </div>
    <div class="input-helper">
      <span class="binary-error-message" data-testid="error-message">
        {{ errorMessage }}
      </span>
      <span class="binary-character-counter" data-testid="character-counter">{{
        maxCharacterCounter
      }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./../assets/variables";

.form-group {
  max-width: 30rem;
}

.input-group {
  position: relative;

  i {
    color: $error-color;
    position: absolute;
    left: 6px;
    top: 12px;
  }

  .input-binary {
    color: $primary-color;
    text-align: center;
    padding: 1rem;
    width: 100%;
    border: 2px solid $primary-color;
    outline-color: $primary-color;
    border-radius: 8px;

    :focus {
      border: 4px solid $primary-color;
    }
  }

  .invalid-input {
    color: $error-color;
    border: 2px solid $error-color;
    outline-color: $error-color;
  }
}

.input-helper {
  display: flex;
  justify-content: space-between;
  .binary-error-message {
    color: $error-color;
  }
}
</style>
