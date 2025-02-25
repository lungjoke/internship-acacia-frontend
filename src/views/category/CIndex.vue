<script setup lang="ts">
import { findAllCategory, removeCategory } from '@/services/category.service';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const router = useRouter();
const toast = useToast();

const state = reactive({
  category: [] as any[],
  isLoading: true,
  errorMessage: '',
});

const getData = async () => {
  try {
    const response = await findAllCategory();
    // console.log(response.data);
    state.category = response.data;
  } catch (error) {
    // state.errorMessage = "ไม่สามารถดึงข้อมูลได้ เกิดข้อผิดพลาดจาก Server";
    state.errorMessage = JSON.stringify(error);
  } finally {
    state.isLoading = false;
  }
};

const onRemove = async (id: number) => {
  const isConfirm = window.confirm('แน่ใจว่าต้องการลบข้อมูลนี้');
  if (isConfirm) {
    const response = await removeCategory(id);
    if (response.status == 200) {
      toast.success(response.data.message, {
        dismissible: true,
        duration: 3000,
      });
      setTimeout(() => router.go(0), 1000); // reload page
    }
  }
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="mt-5">
    <div class="text-center" v-if="state.isLoading">
      <div role="status">
        <svg
          aria-hidden="true"
          class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div
      v-if="state.errorMessage"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">เกิดข้อผิดพลาด!</span> {{ state.errorMessage }}
    </div>

    <RouterLink
      :to="{ name: 'c-create' }"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      เพิ่มข้อมูล
    </RouterLink>

    <div class="relative mt-5 overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">ประเภทสินค้า</th>
            <th scope="col" class="px-6 py-3">เครื่องมือ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in state.category"
            :key="item.id"
            class="px-6 py-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ item.id }}</td>
            <td class="px-6 py-4">{{ item.name }}</td>
            <td class="px-6 py-4">
              <span>
                <RouterLink
                  :to="{ name: 'c-update', params: { id: item.id } }"
                  class="text-green-500"
                >
                  แก้ไข
                </RouterLink>

                <a href="#" @click.prevent="onRemove(item.id)" class="text-red-500"> ลบ </a>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
