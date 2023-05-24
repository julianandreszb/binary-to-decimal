import { ref } from "vue";
import type { Ref } from "vue";

export const useDecimal = () => {
  const decimalNumber: Ref<number> = ref(0);
  return { decimalNumber };
};
