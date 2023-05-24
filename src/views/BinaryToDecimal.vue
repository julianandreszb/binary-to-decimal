<script setup lang="ts">
import { IBinaryResult } from "@/Utils/Interfaces";
import BinaryInput from "@/components/BinaryInput.vue";
import DecimalInput from "@/components/DecimalInput.vue";
import { ref } from "vue";
const decimalNumber = ref<number>(0);

function updateDecimalNumber(result: IBinaryResult): void {
  decimalNumber.value = result.decimalNumber;
}
</script>

<template>
  <BinaryInput
    :maxLength="40"
    @on-binary-entered="updateDecimalNumber"
  ></BinaryInput>
  <DecimalInput :decimal-number="decimalNumber"></DecimalInput>
</template>

<style scoped lang="scss"></style>
