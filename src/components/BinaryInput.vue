<script setup lang="ts">
import { computed, ref } from "vue";
import { isBinary } from "@/Utils/Utils";

const props = defineProps({
  binaryLabel: {
    type: String,
    default: "Binary Number",
  },
  placeholder: {
    type: String,
    default: "Enter the binary number to convert",
  },
  maxlength: {
    type: Number,
    default: 20,
  },
});
const binaryNumber = ref("");
const errorMessage = computed(() => {
  return binaryNumber.value.length && !isBinary(binaryNumber.value)
    ? "Invalid binary number entered"
    : "";
});
const invalidValueClass = computed(() => {
  return binaryNumber.value.length && !isBinary(binaryNumber.value)
    ? "invalid-value"
    : "";
});
const maxCharacterCounter = computed(() => {
  return `${binaryNumber.value.length}/${props.maxlength}`;
});
</script>

<template>
  <div>
    <label data-testid="label-binary" for="input-binary">{{
      props.binaryLabel
    }}</label>
    <div>
      <i
        v-if="errorMessage"
        data-testid="icon-error"
        class="fa-solid fa-triangle-exclamation"
      ></i>
      <input
        id="input-binary"
        data-testid="input-binary"
        type="text"
        :class="invalidValueClass"
        v-model="binaryNumber"
        :placeholder="props.placeholder"
        :maxlength="props.maxlength"
      />
    </div>
    <p data-testid="error-message">{{ errorMessage }}</p>
    <p data-testid="character-counter">{{ maxCharacterCounter }}</p>
  </div>
</template>

<style scoped>
.invalid-value {
  border: 2px solid red;
  outline-color: red;
}
</style>
