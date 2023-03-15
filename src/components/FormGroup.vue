<script setup lang="ts"></script>

<template>
  <div class="form-group">
    <slot name="input-label"></slot>
    <div class="input-group">
      <slot name="input-group"></slot>
    </div>
    <div class="input-helper">
      <slot name="form-input-helper"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-group {
  position: relative;
}

.input-helper {
  display: flex;
  justify-content: space-between;
}
</style>
