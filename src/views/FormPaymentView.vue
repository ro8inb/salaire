<script setup lang="ts">
import { useInformationsStore } from '@/stores/informations';
import { FwbInput } from 'flowbite-vue'
import RadioGroup from './../components/RadioGroup.vue'
import { watch } from 'vue'
import { storeToRefs } from 'pinia';
import { useSalesStore } from '@/stores/sales';

const salesStore = useSalesStore();
const informationsStore = useInformationsStore();

const emit = defineEmits(['form-validated', 'form-errors'])

const props = defineProps<{
    submitted: boolean
}>()

const { errorsSales,
    stateSales } =
    storeToRefs(salesStore);
const { errors,
    state } =
    storeToRefs(informationsStore);
watch(
    () => props.submitted,
    async () => {
        if (props.submitted === true) {
            await salesStore.submit();
            if (Object.keys(salesStore.errorsSales).length === 0) {
                emit('form-validated');
            } else {
                emit('form-errors');
            }
        }
    }
)

</script>

<template>
    <radio-group label="" :values="{ first: 'an', second: 'mois' }" :labels="{ first: 'Annuel', second: 'Mensuel' }"
        name="radio-payment-period" v-model="state.paymentPeriod"></radio-group>
    <span>{{ errors.paymentPeriod }}</span>
    <fwb-input v-model="stateSales.amount" class="w-full" placeholder="Entrez votre chiffre d'affaire" />
    <span>{{ errorsSales.amount }}</span>
</template>
