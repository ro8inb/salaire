<script setup lang="ts">
import { useResponsesStore } from '@/stores/responses';
import formatPrice from './../utils/utils';
import { FwbP, FwbBadge } from 'flowbite-vue';

const responsesStore = useResponsesStore();

</script>

<template>
  <div class="p-5 w-full">
    <fwb-p class="m-2 text-center">
      Cotisations et contributions
    </fwb-p>
    <div class="flex justify-center">
      <fwb-badge type="yellow" size="sm">{{ formatPrice(responsesStore.taxAmount) }}</fwb-badge>
    </div>
    <fwb-p class="m-2 text-center">
      Revenu après cotisations
    </fwb-p>
    <div class="flex justify-center">
      <fwb-badge type="green" size="sm">{{ formatPrice(responsesStore.incomeAfterTax) }}</fwb-badge>
    </div>
    <fwb-p class="m-2 text-center">
      Montant de l'impôt sur le revenu
    </fwb-p>
    <div class="flex justify-center">
      <fwb-badge type="yellow" size="sm">{{ formatPrice(responsesStore.personnalTaxAmount) }}</fwb-badge>
    </div>
    <fwb-p class="m-2 text-center">
      Revenu après impôts et cotisations
    </fwb-p>
    <div class="flex justify-center">
      <fwb-badge type="green" size="sm">{{ formatPrice(responsesStore.incomeAfterPersonnalTax) }}</fwb-badge>
    </div>
  </div>
</template>
