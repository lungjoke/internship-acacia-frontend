<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { login } from '@/services/auth.service';
import { useToast } from 'vue-toast-notification';
import { useRouter } from 'vue-router';

const schema = toTypedSchema(
  yup.object({
    email: yup.string().required('อีเมลห้ามว่าง').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
    password: yup.string().required('รหัสผ่านห้ามว่าง').min(3, 'รหัสผ่านต้องมากกว่า 3 ตัวขึ้นไป'),
  }),
);

const toast = useToast();
const router = useRouter();

const { defineField, errors, meta, handleSubmit } = useForm({
  validationSchema: schema,
});
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await login(values.email, values.password);
    if (response.status == 200) {
      // console.log(response.data);
      localStorage.setItem('token', JSON.stringify(response.data));
      toast.success('เข้าสู่ระบบสำเร็จ');
      router.replace({ name: 'd-index-view' });
    }
  } catch (error: any) {
    // console.log(error.response.data.message);
    toast.error(error.response.data.message);
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form class="max-w-sm mx-auto w-72" @submit.prevent="onSubmit" novalidate>
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          v-model="email"
          v-bind="emailAttrs"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
        />
        <p v-if="errors.email && meta.touched" class="mt-2 text-sm text-red-600">
          {{ errors.email }}
        </p>
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          v-model="password"
          v-bind="passwordAttrs"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <p v-if="errors.password && meta.touched" class="mt-2 text-sm text-red-600">
          {{ errors.password }}
        </p>
      </div>
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Remember me</label
        >
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  </div>
</template>
