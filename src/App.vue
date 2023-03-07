<script setup lang="ts">
import BinaryInput from "@/components/BinaryInput.vue";
import { BinaryResult } from "@/Utils/Interfaces";

function printDecimal(result: BinaryResult): void {
  console.log(result);
}
</script>

<template>
  <BinaryInput @on-binary-entered="printDecimal"></BinaryInput>
</template>

<style></style>
