<script setup lang="ts">
import { useInformationsStore } from '@/stores/informations';
import DatePicker from './../components/DatePicker.vue'
import { useDepartmentsStore } from '@/stores/departments';
import { FwbInput, FwbSelect } from 'flowbite-vue'
import RadioGroup from './../components/RadioGroup.vue'
import { watch } from 'vue'
import { storeToRefs } from 'pinia';

const emit = defineEmits(['form-validated', 'form-errors'])
const informationsStore = useInformationsStore();

const props = defineProps<{
    submitted: boolean
}>()

watch(
    () => props.submitted,
    () => {
        if (props.submitted === true) {
            informationsStore.submit()
            if (Object.keys(informationsStore.errors).length === 0) {
                emit('form-validated');
            } else {
                emit('form-errors');
            }
        }
    }
)

const departmentsStore = useDepartmentsStore();

const activityTypes = [
    { value: 'libérale', name: 'Libérale' },
    { value: 'commerciale', name: 'Commerciale' },
    { value: 'artisanale', name: 'Artisanale' },
]
const taxCalculationMethods = [
    { value: 'taux neutre', name: 'Taux neutre' },
    { value: 'taux personnalisé', name: 'Taux personnalisé' },
    { value: 'barème standard', name: 'Barème standard' }
]
const activityDepartments = departmentsStore.list;

const { errors,
    state } =
    storeToRefs(informationsStore);

informationsStore.$subscribe((mutation, state) => {
    if (state.state.taxCalculationMethod !== 'taux personnalisé') {
        informationsStore.state.withHoldingTaxRate = '';
    }
    if (state.state.activityType === 'libérale') {
        informationsStore.state.activityTypeMain = 'vente';
    }
})

</script>

<template>

    <fwb-select :options="activityTypes" label="Sélectionner un type d'activité" class="w-full mb-3 mt-3"
        placeholder="Sélectionner" v-model="state.activityType" />
    <span>{{ errors.activityType }}</span>

    <template v-if="state.activityType !== 'libérale' && state.activityType !== ''">
        <radio-group label="Type d'activité principale" :values="{ first: 'vente', second: 'service' }"
            :labels="{ first: 'Vente de biens, restauration ou hébergement', second: 'Prestation de service ' }"
            name="radio-activity-type-main" v-model="state.activityTypeMain"></radio-group>
        <span>{{ errors.activityTypeMain }}</span>
    </template>

    <radio-group label="Activité réglementée" :values="{ first: 'oui', second: 'non' }"
        :labels="{ first: 'Oui', second: 'Non' }" name="radio-activity-type-regulated"
        v-model="state.activityTypeRegulated"></radio-group>
    <span>{{ errors.activityTypeRegulated }}</span>

    <div class="w-full flex gap-6 container">
        <div class="w-full">
            <fwb-select :options="activityDepartments" label="Sélectionner le département" class=" mb-3"
                placeholder="Sélectionner" v-model="state.activityDepartment" />
            <span>{{ errors.activityDepartment }}</span>
        </div>
        <div class="w-full">
            <date-picker label=" Date de création de l'entreprise" v-model="state.activityCreationDate"></date-picker>
            <span>{{ errors.activityCreationDate }}</span>
        </div>
    </div>

    <radio-group label="Revenus mixtes" :values="{ first: 'oui', second: 'non' }"
        :labels="{ first: 'Oui', second: 'Non' }" name="radio-mixed-revenues"
        v-model="state.mixedRevenues"></radio-group>
    <span>{{ errors.mixedRevenues }}</span>

    <radio-group label="Bénéficiaire de l'ACRE" :values="{ first: 'oui', second: 'non' }"
        :labels="{ first: 'Oui', second: 'Non' }" name="radio-acre" v-model="state.activityExemption"></radio-group>
    <span>{{ errors.activityExemption }}</span>

    <radio-group label="Versement impôt libératoire" :values="{ first: 'oui', second: 'non' }"
        :labels="{ first: 'Oui', second: 'Non' }" name="radio-tax-payment-in-full"
        v-model="state.taxPaymentInFull"></radio-group>
    <span>{{ errors.taxPaymentInFull }}</span>


    <fwb-select :options="taxCalculationMethods" label="Méthode de calcul" class="w-full mb-3"
        placeholder="Sélectionner" v-model="state.taxCalculationMethod" />
    <span>{{ errors.taxCalculationMethod }}</span>

    <template v-if="state.taxCalculationMethod === 'taux personnalisé'">
        <fwb-input v-model="state.withHoldingTaxRate"
            label="Quel est votre taux de prélèvement à la source ?"></fwb-input>
        <span>{{ errors.withHoldingTaxRate }}</span>
    </template>
</template>
