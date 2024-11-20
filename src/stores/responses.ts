import { defineStore } from 'pinia'

export const useResponsesStore = defineStore('responses', {
  state: () => {
    return {
      taxAmount: 0,
      personnalTaxAmount: 0,
      incomeAfterTax: 0,
      incomeAfterPersonnalTax: 0
    }
  }
})