<script setup lang="ts">
import BinaryInput from "@/components/BinaryInput.vue";
import { BinaryResult } from "@/Utils/Interfaces";
import DecimalInput from "@/components/DecimalInput.vue";
import { ref } from "vue";
const decimalNumber = ref<number>(0);

function printDecimal(result: BinaryResult): void {
  decimalNumber.value = result.decimalNumber;
}
</script>

<template>
  <main>
    <h1>Binary To Decimal</h1>
    <BinaryInput @on-binary-entered="printDecimal"></BinaryInput>
    <DecimalInput :decimal-number="decimalNumber"></DecimalInput>
  </main>
</template>

<style lang="scss"></style>
