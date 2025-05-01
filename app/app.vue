<script setup lang="ts">
useHead({
  titleTemplate(titleChunk) {
    return titleChunk ? `${titleChunk} - Nuxt starter` : 'Nuxt starter'
  },
  // htmlAttrs: { dir: 'rtl' , lang: 'he'}
})
</script>

<template>
  <UApp :toaster="{
    position: 'top-center',
  }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
