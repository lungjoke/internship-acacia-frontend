<script setup lang="ts">
import { useSocket } from '@/composables/useSocket';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { profile } = storeToRefs(authStore);
console.log(profile);

const { ClientData } = useSocket();
</script>

<template>
  <div>
    <h1 v-if="profile">ยินดีต้อนรับคุณ {{ profile.name }}</h1>
    <p v-if="profile">{{ profile.email }} ตำแหน่ง : {{ profile.Profile.bio }}</p>
    {{ JSON.stringify(ClientData) }}
  </div>
</template>
