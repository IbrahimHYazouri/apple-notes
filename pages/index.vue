<script setup>
  	definePageMeta({
		middleware: ['auth']
	})
</script>

<template>
  <div class="bg-zinc-900 h-screen flex">
    <!--sidebar-->
    <section class="bg-black w-[338px] p-8">
      <AppLogo />
      <!--today-container-->
      <div class="ml-2">
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Today</p>
        <!--note-title-card-->
      	<div class="p-3 bg-[#A1842C] rounded-lg">
      		<h3 class="text-sm font-bold text-[#F4F4F5]">Finished project...</h3>
      		<div class="text-xs leading-none">
      			<span class="text-[#F4F4F5] mr-4">Today</span>
      			<span class="text-[#D6D6D6]">Put the final touches...</span>
      		</div>
      	</div>
      	<!--/note-title-card-->
      	<div class="p-2">
      		<h3 class="text-sm font-bold text-[#F4F4F5]">Finished project...</h3>
      		<div class="text-xs leading-none">
      			<span class="text-[#F4F4F5] mr-4">Today</span>
      			<span class="text-[#C2C2C5]">Put the final touches...</span>
      		</div>
      	</div>
      </div>
      <!--/today-container-->
      <!--yesterday-container-->
      <div class="ml-2">
      	 <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Yesterday</p>
      	<div class="p-3 bg-[#A1842C] rounded-lg">
      		<h3 class="text-sm font-bold text-[#F4F4F5]">Finished project...</h3>
      		<div class="text-xs leading-none">
      			<span class="text-[#F4F4F5] mr-4">Yesterday</span>
      			<span class="text-[#D6D6D6]">Put the final touches...</span>
      		</div>
      	</div>
      </div>
      <!--/yesterday-container-->
    </section>
    <!--/sidebar-->
    <!--note-container-->
    <div class="w-full p-8">
    	<!--header-->
    	<header class="flex justify-between">
    		<button class="text-xs text-[#C2C2C5] font-bold inline-flex space-x-2 cursor-pointer hover:text-white transition-colors duration-200">
    			<PencilIcon /> 
    			<span>Create Note</span>
    		</button>
    		<button class="cursor-pointer"><TrashIcon class="text-zinc-700 hover:text-white transition-colors duration-200" /></button>
    	</header>
    	<!--/header-->

    	<!--note-content-->
    	<section class="max-w-[437px] mx-auto">
    		<p class="text-[#929292] font-playfair mt-4">November 22nd, 2024</p>
    		<p class="text-[#D4D4D4] font-playfair my-4">
    			Although a common set of hardware technologies (see Sections 1.4 and 1.5) is used
				in computers ranging from smart home appliances to cell phones to the largest
				supercomputers, these diff erent applications have diff erent design requirements
				and employ the core hardware technologies in diff erent ways. 
    		</p>
    		<p class="text-[#D4D4D4] font-playfair my-4">
    			Personal computers (PCs) are possibly the best known form of computing,
				which readers of this book have likely used extensively. Personal computers
				emphasize delivery of good performance to single users at low cost and usually
				execute third-party soft ware. Th is class of computing drove the evolution of many
				computing technologies, which is only about 35 years old!
    		</p>
    	</section>
    	<!--/note-content-->
    </div>
    <!--/note-container-->
  </div>
</template>
