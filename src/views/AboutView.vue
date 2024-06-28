<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue';
import { reactive, ref } from 'vue';

const title = reactive({ message: 'hello vue 2' });
const myAlt = 'NestJS';
const myImg = 'http://via.placeholder.com/100';
const isLogin = ref(true);
const handleClick = () => {
  //alert('hello');
  isLogin.value = !isLogin.value;

  if (isLogin.value) {
    title.message = 'Hello vue 3';
  } else {
    title.message = 'Hello vue 2';
  }
};
</script>

<template>
  <SiteHeader />
  <div class="max-w-screen-xl p-4 mx-auto">
    <h1>{{ title.message.toUpperCase() }}</h1>
    <p v-if="isLogin">ยินดีต้อนรับ</p>
    <p>{{ new Date().toLocaleDateString() }}</p>
    <p>
      <img :src="myImg" :alt="myAlt" />
    </p>
    <p>
      <button @click="handleClick">click me</button>
    </p>
  </div>
</template>
