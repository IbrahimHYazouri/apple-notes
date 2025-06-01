<script setup>
  	definePageMeta({
		middleware: ['auth']
	});

  	const notes = ref([]);
  	const todaysNotes = computed(() => {
  		return notes.value.filter((note) => {
	  		const noteDate = new Date(note.updatedAt);
	  		return noteDate.toDateString() === (new Date()).toDateString();
  		});
  	});
  	const yesterdaysNotes = computed(() => {
  		const yesterday = new Date();
  		yesterday.setDate(yesterday.getDate() - 1);

  		return notes.value.filter((note) => {
    		const noteDate = new Date(note.updatedAt);
    		return noteDate.toDateString() === yesterday.toDateString();
  		});
	});
	const earlierNotes = computed(() => {
  		const yesterday = new Date();
  		yesterday.setDate(yesterday.getDate() - 1);

  		return notes.value.filter((note) => {
    		const noteDate = new Date(note.updatedAt);
    		return noteDate < yesterday && noteDate.toDateString() !== yesterday.toDateString();
  		});
	});
	const updatedNote = ref("");
  	const selectedNote = ref({});

	onMounted(async () => {
		notes.value = await $fetch('/api/notes');

		if (notes.value.length > 0) {
			selectedNote.value = notes.value[0];			
		}

		updatedNote.value = selectedNote.value.text;
	});

	const debouncedFn = useDebounceFn(async () => {
		await updateNote();
	}, 2000)

	async function updateNote() {
		try {
			await $fetch(`/api/notes/${selectedNote.value.id}`, 
			{
				method: 'PATCH',
				body: {
					updatedNote: updatedNote.value
				}
			})
		} catch(error) {
			console.log(error)
		}
	}
</script>

<template>
  <div class="bg-zinc-900 h-screen flex">
    <!--sidebar-->
    <section class="bg-black w-[338px] p-8">
      <AppLogo />

      <div class="ml-2">
      	<!--today-container-->
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Today</p>
        <div class="ml-2 space-y-2">
        	<NoteCard 
        		v-for="note in todaysNotes"
        		:note="note"
        		:class="{'bg-[#A1842C]': note.id === selectedNote.id, 'hover:bg-[#A1842C]/50': note.id !== selectedNote.id}"
	      		@click="selectedNote = note"
        	/>
        </div>
      </div>
      <!--/today-container-->

      <!--yesterday-container-->
      <div class="ml-2">
      	 <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Yesterday</p>
      	<div class="ml-2 space-y-2">
        	<NoteCard 
        		v-for="note in yesterdaysNotes"
        		:note="note"
        		:class="{'bg-[#A1842C]': note.id === selectedNote.id, 'hover:bg-[#A1842C]/50': note.id !== selectedNote.id}"
	      		@click="selectedNote = note"
        	/>
        </div>
      </div>
      <!--/yesterday-container-->

      <!--everything-container-->
      <div class="ml-2">
      	 <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Earlier</p>
      	<div class="ml-2 space-y-2">
        	<NoteCard 
        		v-for="note in earlierNotes"
        		:note="note"
        		:class="{'bg-[#A1842C]': note.id === selectedNote.id, 'hover:bg-[#A1842C]/50': note.id !== selectedNote.id}"
	      		@click="selectedNote = note"
        	/>
        </div>
      </div>
      <!--/yesterday-container-->
    </section>
    <!--/sidebar-->

    <!--note-container-->
    <div class="w-full p-8 flex flex-col">
    	<!--header-->
    	<header class="flex justify-between">
    		<button class="text-xs text-[#C2C2C5] font-bold inline-flex space-x-2 cursor-pointer hover:text-white transition-colors duration-200">
    			<PencilIcon /> 
    			<span>Create Note</span>
    		</button>
    		<button class="cursor-pointer"><TrashIcon class="text-zinc-700 hover:text-white transition-colors duration-200" /></button>
    	</header>
    	<!--/header-->

    	<!--note-text-->
    	<section class="max-w-[437px] w-full flex-grow mx-auto flex flex-col">
    		<p class="text-[#929292] font-playfair mt-4">
    			{{ new Date(selectedNote.updatedAt).toDateString() }}
    		</p>
    		<textarea 
    			name="note"
    			id="note"
    			v-model="updatedNote"
    			class="text-[#D4D4D4] bg-transparent font-playfair my-4 resize-none flex-grow focus:outline-none"
    			@input="debouncedFn"
    		></textarea>
    	</section>
    	<!--/note-text-->

    </div>
    <!--/note-container-->
  </div>
</template>
