<script setup lang="ts">

</script>

<template>
  <div class="bg-black h-screen flex">
    <!--sidebar-->
    <div class="bg-zinc-900 w-[516px] p-12 flex flex-col justify-center">
      <AppLogo />
      <h1 class="text-white font-bold text-lg mt-8">Sign up for a free account</h1>
      <p class="text-zinc-300 text-sm mt-0.5">Already registered?
        <span class="font-bold text-[#FFAC00] underline">Login</span>
        to your account</p>
      <div class="mt-8">
        <label for="email" class="text-zinc-300 text-sm font-normal block mb-0.5">Email Address</label>
        <input id="email" type="email" placeholder="you@example.com" class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white text-sm px-4 py-2 placeholder:text-zinc-500"/>
      </div>
      <div class="mt-6">
        <label for="password" class="text-zinc-300 text-sm font-normal block mb-0.5">Password</label>
        <input id="password" type="password" placeholder="********" class="block w-full bg-[#27272A] border border-[#3F3F46] rounded text-white text-sm px-4 py-2 placeholder:text-zinc-500"/>
      </div>
      <!--signup button-->
      <div>
        <button class="w-full flex items-center justify-center space-x-2 mt-4 bg-[#FFAC00] rounded-full px-4 py-2 text-sm font-bold">
          <span>Sign Up </span>
          <ArrowRight />
        </button>
      </div>
      <!--/signup button-->
    </div>
    <!--/sidebar-->
    <!--introduction-->
    <div></div>
    <!--/introduction-->
  </div>
</template>