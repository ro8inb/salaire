<script setup lang="ts">
import { useSalesStore } from '@/stores/sales';
import { FwbHeading, FwbButton, FwbCard } from 'flowbite-vue'
import FormInformationsView from './../views/FormInformationsView.vue'
import FormPaymentView from './../views/FormPaymentView.vue'
import ResultView from './ResultView.vue'
import { evaluate } from './../apiCalls/evaluate'
import { ref, watch } from 'vue'

const salesStore = useSalesStore();

const submitted = ref(false)
const validatedInfos = ref(false)
const validatedPayment = ref(false)

const submitForm = async () => {
  submitted.value = true;
}

watch([validatedPayment, validatedInfos], async ([newValidatedPayment, newValidatedInfos]) => {
  if (newValidatedPayment === true && newValidatedInfos == true) {
    await evaluate(Number(salesStore.stateSales.amount));
    validatedPayment.value = false
    validatedInfos.value = false
  }
  submitted.value = false;
})
</script>

<template>
  <div class="w-full p-5">
    <fwb-heading tag="h2">Bienvenue sur notre simulateur de revenus pour micro-entrepreneur</fwb-heading>
    <div class="lg:w-5/6 w-full mt-3">
      <p>
        Vous êtes un micro-entrepreneur, vous vous apprêtez à commencer une mission et vous souhaitez connaître le
        montant
        de vos cotisations et contributions, le montant
        de votre impôt sur le revenu et votre revenu après impôts et cotisations ? <br>Vous êtes au bon endroit !
      </p>
    </div>
  </div>
  <div class="flex container">
    <div class="w-full p-5">
      <fwb-heading tag="h4">Votre chiffre d'affaire</fwb-heading>
      <form-payment-view :submitted="submitted" @form-validated="validatedPayment = true"
        @form-errors="validatedPayment = false"></form-payment-view>
      <div class="w-full justify-center flex mt-5">
        <fwb-button @click="submitForm" class="m-auto" type="submit" size="xl" color="blue" outline>
          Calculer
        </fwb-button>
      </div>
      <fwb-card href="#" class="min-w-full mt-5 h-[50%]">
        <result-view></result-view>
      </fwb-card>
    </div>
    <div class="w-full p-5">
      <fwb-heading tag="h4">Informations supplémentaires</fwb-heading>
      <form-informations-view :submitted="submitted" @form-validated="validatedInfos = true"
        @form-errors="validatedInfos = false"></form-informations-view>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1024px) {
  .container {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>