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
  maxlength: 40,
});
const binaryNumber: Ref<string> = ref("0");
const decimalNumber: Ref<number> = ref(0);
const isBinaryValid = computed<boolean>((): boolean => {
  return isBinary(binaryNumber.value);
});
const invalidBinaryNumberMessage = computed<string>(() => {
  return isBinaryValid.value ? "" : "Invalid binary number";
});
const inputBinaryClass = computed<string>(() => {
  return isBinaryValid.value ? "" : "invalid-input";
});
const maxCharacterCounter = computed<string>(() => {
  return `${binaryNumber.value.toString().length}/${props.maxlength}`;
});

const createBinaryResult = function (binaryNumber: string): BinaryResult {
  const binaryResult: BinaryResult = {
    isValid: false,
    message: "",
    decimalNumber: 0,
  };

  if (isBinaryValid.value) {
    decimalNumber.value = binaryToDecimal(binaryNumber);
    binaryResult.isValid = true;
    binaryResult.decimalNumber = decimalNumber.value;
  } else {
    binaryResult.message = invalidBinaryNumberMessage.value;
  }

  return binaryResult;
};

const emitBinaryResult = function (binaryResult: BinaryResult): void {
  emit("onBinaryEntered", binaryResult);
};

const handleBinaryNumber = function (binaryNumber: string) {
  const binaryResult = createBinaryResult(binaryNumber);
  emitBinaryResult(binaryResult);
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
        v-on:keyup="handleBinaryNumber(binaryNumber)"
      />
    </template>
    <template v-slot:form-input-helper>
      <span class="binary-error-message" data-testid="error-message">
        {{ invalidBinaryNumberMessage }}
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
