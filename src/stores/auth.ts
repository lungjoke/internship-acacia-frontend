import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProfile } from '../services/auth.service';

export const useAuthStore = defineStore('auth', () => {
  const profile: any = ref(null);

  async function getUserProfile() {
    const response = await getProfile();
    profile.value = response.data;
  }

  return { profile, getUserProfile };
});
