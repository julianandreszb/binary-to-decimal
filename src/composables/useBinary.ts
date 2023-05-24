import { computed, ref } from "vue";
import type { Ref } from "vue";
import { isBinary } from "@/Utils/Utils";

export const useBinary = (binaryMaxLength: number = 0) => {
  const binaryNumber: Ref<string> = ref("0");

  const isBinaryValid = computed<boolean>((): boolean => {
    return isBinary(binaryNumber.value);
  });

  const invalidBinaryNumberMessage = computed<string>(() => {
    return isBinaryValid.value ? "" : "Invalid binary number";
  });

  const inputBinaryClass = computed<string>(() => {
    return isBinaryValid.value ? "" : "invalid-input";
  });

  const maxCharacterCounter = computed<string>(() => {
    return `${binaryNumber.value.toString().length}/${binaryMaxLength}`;
  });

  return {
    binaryNumber,
    isBinaryValid,
    invalidBinaryNumberMessage,
    inputBinaryClass,
    maxCharacterCounter,
  };
};
