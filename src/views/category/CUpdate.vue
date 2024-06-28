<script setup lang="ts">
import { updateCategory } from '@/services/category.service';
import { findOneCategory } from '@/services/category.service';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const state = reactive({
  category: {} as any,
});

onMounted(() => {
  state.category.id = +route.params.id;
  findById(state.category.id);
});

const findById = async (id: number) => {
  const response = await findOneCategory(id);
  // console.log(response.data);
  state.category.name = response.data.name;
  state.category.id = response.data.id;
};

const onSubmit = async () => {
  const response = await updateCategory(state.category.id, state.category);
  if (response.status == 200) {
    toast.success('แก้ไขข้อมูลสำเร็จ');
    router.replace({ name: 'c-index' });
  }
};
</script>

<template>
  <div class="mt-4">
    <h2 class="text-4xl font-bold dark:text-white">แก้ไขข้อมูล ID: {{ state.category.id }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            for="first_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >ประเภทสินค้า</label
          >
          <input
            type="text"
            v-model="state.category.name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        บันทึก
      </button>
    </form>
  </div>
</template>
