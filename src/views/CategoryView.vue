<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue';
import { http } from '@/services/http.sevrice';
import { onMounted, ref } from 'vue';

const categories = ref<any>([]);
const getData = async () => {
  const response = await http.get('/v1/categories');
  categories.value = response.data;
};
onMounted(() => {
  getData();
});
</script>

<template>
  <SiteHeader />

  <div class="relative overflow-x-auto">
    <h1 class="text-center mr-28 font-bold text-3xl">ชื่อประเภทสินค้า</h1>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Number</th>
          <th scope="col" class="px-6 py-3 ml-900">Product category</th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 v-for= justify-center"
          v-for="item in categories"
          :key="item.id"
        >
          <td class="px-6 py-4 justify-center">{{ item.id }}</td>
          <td class="px-6 py-4 justify-center">{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
