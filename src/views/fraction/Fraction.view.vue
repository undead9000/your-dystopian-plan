<template>
    {{ fraction.name }}
</template>

<script setup lang="ts">
    const props = defineProps({
        fraction: Object
    })
</script>