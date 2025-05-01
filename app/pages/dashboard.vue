<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['only-admin'],
  title: 'Dashboard',
  redirect: '/dashboard/users'
})

</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style scoped></style>
