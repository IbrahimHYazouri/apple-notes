<script setup>
  	definePageMeta({
		middleware: ['auth']
	});

  	const notes = ref([]);
  	const todaysNotes = computed(() => {
  		return notes.value.filter((note) => {
	  		const noteDate = new Date(note.updatedAt);
	  		return noteDate.toDateString() === (new Date()).toDateString();
  		}).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
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
  	const noteContent = ref(null);

  	async function createNote() {
  		try {
  			const newNote = await $fetch('/api/notes', {
  				method: 'POST'
  			});

  			notes.value.unshift(newNote);
  			selectNote(newNote);
  		} catch(error) {
			console.log(error);
  		}
  	}

	onMounted(async () => {
		notes.value = await $fetch('/api/notes');
		notes.value.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

		if (notes.value.length > 0) {
			selectedNote.value = notes.value[0];			
		} else {
			await createNote();
			selectedNote.value = notes.value[0];
		}

		updatedNote.value = selectedNote.value.text;
		noteContent.value.focus();
	});

	function selectNote(note) {
		selectedNote.value = note;
		updatedNote.value = note.text;
		noteContent.value.focus();
	}

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

	async function deleteNote() {
		if (selectedNote.value.id === undefined) return;
		try {
			const deletedNote = await $fetch(`/api/notes/${selectedNote.value.id}`, 
			{
				method: 'DELETE'
			})

			notes.value = notes.value.filter((note) => {
				return note.id !== deletedNote.id
			});
			if (notes.value.length > 0) {
				selectedNote.value = notes.value[0];
				updatedNote.value = selectedNote.value.text;
			}
		} catch(error) {
			console.log(error);
		}
	}

	function logout() {
		const jwtCookie = useCookie('NoteNestJWT');
		jwtCookie.value = null;
		navigateTo('/login');
	}
</script>

<template>
  <div class="bg-zinc-900 h-screen flex">
    <!--sidebar-->
    <section class="bg-black w-[338px] p-8 flex flex-col overflow-y-auto h-screen custom-scroll">
      <div>
      	<AppLogo />
      </div>

      <div class="ml-2">
      	<!--today-container-->
        <p class="text-xs font-bold text-[#C2C2C5] mt-12 mb-4">Today</p>
        <div class="ml-2 space-y-2">
        	<NoteCard 
        		v-for="note in todaysNotes"
        		:note="note"
        		:class="{'bg-[#A1842C]': note.id === selectedNote.id, 'hover:bg-[#A1842C]/50': note.id !== selectedNote.id}"
	      		@click="selectNote(note)"
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
	      		@click="selectNote(note)"
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
	      		@click="selectNote(note)"
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
    			<span @click="createNote">Create Note</span>
    		</button>
    		<button 
    			@click="deleteNote" 
    			class="cursor-pointer text-white"
			>
    			<TrashIcon class="text-zinc-700 hover:text-white transition-colors duration-200" />
    		</button>
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
    			ref="noteContent"
    			v-model="updatedNote"
    			class="text-[#D4D4D4] bg-transparent font-playfair my-4 resize-none flex-grow focus:outline-none"
    			@input="() => {
    				debouncedFn();
    				selectedNote.text = updatedNote 
    			}"
    		></textarea>
    	</section>
    	<!--/note-text-->

    <button 
    	@click="logout"
    	class="text-zinc-400 text-sm font-bold absolute right-0 bottom-0 p-8 hover:text-white transition-colors duration-200"
    >Logout</button>
    </div>
    <!--/note-container-->
  </div>
</template>
