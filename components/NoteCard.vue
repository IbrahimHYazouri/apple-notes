<script setup>
	defineProps({
		note: Object
	})
</script>

<template>
	<div 
  		class="p-3 rounded-lg cursor-pointer transition-colors duration-200"
    >
  		<h3 class="text-sm font-bold text-[#F4F4F5] truncate">
  			{{ note.text.substring(0, 50) }}
  		</h3>
  		<div class="text-xs leading-none truncate text-[#D6D6D6]">
  			<span class="text-[#F4F4F5] mr-4">
				{{
  					new Date(note.updatedAt).toDateString() ===new Date().toDateString()
	      					? 'Today' : new Date(note.updatedAt			).toLocaleDateString()
  				}}
  			</span>
  			<span class="text-[#D6D6D6] truncate">
  				{{ note.text.substring(50, 100) }}
  			</span>
  		</div>
  	</div>
</template>