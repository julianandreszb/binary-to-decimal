<script setup lang="ts">
import FormGroup from "@/components/FormGroup.vue";
import { computed, ref } from "vue";

interface Props {
  decimalNumber: number;
  decimalLabel?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  decimalLabel: "Decimal Number",
});

//const decimalNumber = ref<number>(props.decimalNumber);
const decimalNumber = computed<number>(() => props.decimalNumber);
</script>

<template>
  <FormGroup>
    <template v-slot:input-label>
      <label data-testid="label-input" for="input-field">{{
        props.decimalLabel
      }}</label>
    </template>
    <template v-slot:input-group>
      <input
        v-model="decimalNumber"
        id="input-decimal"
        data-testid="input-decimal"
        type="text"
        class="input-decimal"
        :placeholder="props.placeholder"
        readonly="readonly"
      />
    </template>
  </FormGroup>
</template>

<style lang="scss">
@import "./../assets/main";
@import "./../assets/variables";

.input-group {
  .input-decimal {
    @extend .input;
    background-color: $read-only;
  }
}
</style>
