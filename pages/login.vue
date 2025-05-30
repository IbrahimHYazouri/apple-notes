<script setup>
  import Swal from 'sweetalert2';

  const form = ref({
    email: '',
    password: ''
  });

  async function submit() {
    try {
      const response = await $fetch('/api/login', {
          method: 'POST',
          body: form.value
      });

      const { isConfirmed } = await Swal.fire({
        title: 'Success!',
        text: 'Loged in successfully',
        icon: 'success',
        confirmButtonText: 'Close'
      });

      if (isConfirmed) {
        form.value = {
          email: '',
          password: ''
        }
        navigateTo('/')
      }
    } catch(error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?._data?.message,
        icon: 'error',
        confirmButtonText: 'Close'
      }) 
    }
  };
</script>

<template>
  <div class="bg-zinc-900 h-screen flex">
    <!--sidebar-->
    <div class="bg-black w-[516px] p-12 flex flex-col justify-center">
      <AppLogo />
      <h1 class="text-white font-bold text-lg mt-8">Login to your</h1>
      <p class="text-zinc-300 text-sm mt-0.5">Don't have an account?
        <nuxt-link to='/register' class="font-bold text-[#FFAC00] underline">Sing Up</nuxt-link>
        for one</p>
        <!--login-form-->
        <form @submit.prevent="submit">
            <div class="mt-8">
              <label for="email" class="text-zinc-300 text-sm font-normal block mb-0.5">Email Address</label>
              <input 
                id="email" type="email" 
                v-model="form.email" 
                placeholder="you@example.com" 
                class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white text-sm px-4 py-2 placeholder:text-zinc-500"
              />
            </div>
            <div class="mt-6">
              <label for="password" class="text-zinc-300 text-sm font-normal block mb-0.5">Password</label>
              <input id="password" type="password" v-model="form.password" placeholder="********" class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white text-sm px-4 py-2 placeholder:text-zinc-500"/>
            </div>
            <!--signup button-->
            <div>
              <button class="w-full flex items-center justify-center space-x-2 mt-4 bg-[#FFAC00] rounded-full px-4 py-2 text-sm font-bold cursor-pointer">
                <span>Login</span>
                <ArrowRight />
              </button>
            </div>
            <!--/signup button-->
        </form>
        <!--/login-form-->
    </div>
    <!--/sidebar-->
    <!--introduction-->
    <div></div>
    <!--/introduction-->
  </div>
</template>
