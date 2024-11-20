import { defineStore } from 'pinia'
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { ref, watch } from 'vue'

const schema = Yup.object({
  sales: Yup.string(),
  amount: Yup.number().typeError("Veuillez saisir un nombre valide").required("Vous devez rentrer un CA").min(1, "Votre CA doit être supérieur à zéro")
});

export const useSalesStore = defineStore('sales', () => {
  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: schema,
  });

  const [amount, amountProps] = defineField('amount');



  const submit = handleSubmit((values) => {

  });

  const state = ref({
    amount: '0'
  })

  watch(
    [state.value],
    (newValues) => {
      amount.value = newValues[0].amount

    },
    { deep: true }
  );
  return {
    'errorsSales': errors,
    submit,
    'stateSales': state
  }
})