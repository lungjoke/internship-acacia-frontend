<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';
onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <hr />

  <RouterView />
</template>
