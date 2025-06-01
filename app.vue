<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
.font-playfair {
  font-family: 'Playfair', serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: 'wdth' 100;
}

* {
  font-family: 'Inter', serif;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #3f3f46;
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: content-box;
}
</style>
