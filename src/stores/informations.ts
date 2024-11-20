import { defineStore } from 'pinia';
import { useForm } from 'vee-validate';
import * as Yup from 'yup';
import { ref, watch } from 'vue'

let schema = Yup.object({
  activityType: Yup.string().required('Le type d\'activité est obligatoire'),
  activityTypeMain: Yup.string().required('Le type d\'activité principal est obligatoire'),
  activityTypeRegulated: Yup.string().required('Le type d\'activité réglementée est obligatoire'),
  activityDepartment: Yup.string().required('Le département est obligatoire'),
  activityCreationDate: Yup.string().required('La date de création de l\'entreprise est obligatoire'),
  mixedRevenues: Yup.string().required('Le revenus mixtes est obligatoire'),
  activityExemption: Yup.string().required('Le bénéficiaire de l\'ACRE est obligatoire'),
  taxPaymentInFull: Yup.string().required('Le versement impôt libératoire est obligatoire'),
  taxCalculationMethod: Yup.string().required('La méthode de calcul est obligatoire'),
  paymentPeriod: Yup.string().required('Le période de paiement est obligatoire')
});

schema = schema.shape({
  withHoldingTaxRate: Yup.string().test(
    "required-if-custom-rate",
    "Le taux de prélèvement à la source est obligatoire",
    function (value) {
      const { taxCalculationMethod } = this.parent;
      return taxCalculationMethod !== "taux personnalisé" || (value !== undefined && value !== "");
    }
  )
});

export const useInformationsStore = defineStore('informations', () => {
  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: schema,
  });

  const [activityType, activityTypeProps] = defineField('activityType');
  const [activityTypeMain, activityTypeMainProps] = defineField('activityTypeMain');
  const [activityTypeRegulated, activityTypeRegulatedProps] = defineField('activityTypeRegulated');
  const [activityDepartment, activityDepartmentProps] = defineField('activityDepartment');
  const [activityCreationDate, activityCreationDateProps] = defineField('activityCreationDate');
  const [mixedRevenues, mixedRevenuesProps] = defineField('mixedRevenues');
  const [activityExemption, activityExemptionProps] = defineField('activityExemption');
  const [taxPaymentInFull, taxPaymentInFullProps] = defineField('taxPaymentInFull');
  const [taxCalculationMethod, taxCalculationMethodProps] = defineField('taxCalculationMethod');
  const [withHoldingTaxRate, withHoldingTaxRateProps] = defineField('withHoldingTaxRate');
  const [paymentPeriod, paymentPeriodProps] = defineField('paymentPeriod');
  const [activityLegalCategory, activityLegalCategoryProps] = defineField('activityLegalCategory');
  const [selfEmployed, selfEmployedProps] = defineField('selfEmployed');

  const submit = handleSubmit((values) => {
  });

  const state = ref({
    activityType: "",
    activityTypeMain: '' as string,
    activityTypeRegulated: '' as string,
    activityDepartment: '' as string,
    activityCreationDate: '' as string,
    mixedRevenues: '' as string,
    activityExemption: '' as string,
    taxPaymentInFull: '' as string,
    taxCalculationMethod: '' as string,
    withHoldingTaxRate: '' as string,
    paymentPeriod: '' as string,
    activityLegalCategory: '' as string,
    selfEmployed: '' as string
  });

  watch(
    [state.value],
    (newValues) => {
      activityType.value = newValues[0].activityType
      activityTypeMain.value = newValues[0].activityTypeMain
      activityTypeRegulated.value = newValues[0].activityTypeRegulated
      activityDepartment.value = newValues[0].activityDepartment
      activityCreationDate.value = newValues[0].activityCreationDate
      mixedRevenues.value = newValues[0].mixedRevenues
      activityExemption.value = newValues[0].activityExemption
      taxPaymentInFull.value = newValues[0].taxPaymentInFull
      taxCalculationMethod.value = newValues[0].taxCalculationMethod
      withHoldingTaxRate.value = newValues[0].withHoldingTaxRate
      paymentPeriod.value = newValues[0].paymentPeriod
      activityLegalCategory.value = newValues[0].activityLegalCategory
      selfEmployed.value = newValues[0].selfEmployed
    },
    { deep: true }
  );

  return {
    errors,
    submit,
    state
  }
}, {
  persist: true
});
