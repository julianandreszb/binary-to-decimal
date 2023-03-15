<script setup lang="ts"></script>

<template>
  <i
    data-testid="icon-error"
    class="fa-solid fa-triangle-exclamation icon-error"
  ></i>
</template>

<style lang="scss">
@import "./../assets/variables";

.icon-error {
  color: $error-color;
  position: absolute;
  left: 6px;
  top: 12px;
}
</style>
