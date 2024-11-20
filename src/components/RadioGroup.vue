<script setup lang="ts">
import { FwbRadio, FwbP } from 'flowbite-vue';
import { watch, ref } from 'vue';


const props = defineProps<{
    label: string,
    values: { first: string, second: string },
    labels: { first: string, second: string },
    name: string,
    modelValue: string
}>()
const emit = defineEmits(['update:modelValue']);
const selectedValue = ref(props.modelValue)

watch(selectedValue, (newValue) => {
    emit('update:modelValue', newValue);
});
</script>

<template>
    <fwb-p class="mb-1">
        {{ label }}
    </fwb-p>
    <div class="container gap-6 flex mb-3">
        <div class="w-full flex items-center p-2 py-1 border border-gray-200 rounded dark:border-gray-700">
            <fwb-radio v-model="selectedValue" :label="labels.first" :name="name" :value="values.first" />
        </div>
        <div class="w-full flex items-center p-2 py-1 border border-gray-200 rounded dark:border-gray-700">
            <fwb-radio v-model="selectedValue" :label="labels.second" :name="name" :value="values.second" />
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