<script setup lang="ts">
import { binaryToDecimal } from "@/Utils/Utils";
import { IBinaryResult } from "@/Utils/Interfaces";
import FormGroup from "@/components/FormGroup.vue";
import IconTriangleExclamation from "@/components/IconTriangleExclamation.vue";
import { useBinary } from "@/composables/useBinary";
import { useDecimal } from "@/composables/useDecimal";

interface IBinaryInputProps {
  label?: string;
  placeholder?: string;
  maxLength?: number;
}

const props = withDefaults(defineProps<IBinaryInputProps>(), {
  label: "Binary Number",
  placeholder: "Enter a binary number",
  maxLength: 40,
});

const {
  binaryNumber,
  isBinaryValid,
  invalidBinaryNumberMessage,
  inputBinaryClass,
  maxCharacterCounter,
} = useBinary(props.maxLength);

const { decimalNumber } = useDecimal();

const emit = defineEmits<{
  (e: "onBinaryEntered", value: IBinaryResult): void;
}>();

const emitConvertBinaryResult = function (binaryResult: IBinaryResult): void {
  emit("onBinaryEntered", binaryResult);
};

const handleEnterBinary = function (binaryNumber: string) {
  const binaryResult: IBinaryResult = {
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
  emitConvertBinaryResult(binaryResult);
};
</script>

<template>
  <FormGroup>
    <template v-slot:input-label>
      <label data-testid="label-input" for="input-field">{{
        props.label
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
        :maxlength="props.maxLength"
        v-on:keyup="handleEnterBinary(binaryNumber)"
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
