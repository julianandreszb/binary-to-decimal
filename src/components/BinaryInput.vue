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
  return isBinary(binaryNumber.value) ? "" : "Invalid binary number entered";
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
    <input
      id="input-binary"
      data-testid="input-binary"
      type="text"
      v-model="binaryNumber"
      :placeholder="props.placeholder"
      :maxlength="props.maxlength"
    />
    <p data-testid="error-message">{{ errorMessage }}</p>
    <p data-testid="character-counter">{{ maxCharacterCounter }}</p>
  </div>
</template>

<style></style>
