<script setup lang="ts">
const items = [
  {
    label: 'users',
    to: '/dashboard/users',
    icon: 'i-heroicons-users'
  },
  {
    label: 'items',
    to: '/dashboard/items',
    icon: 'i-heroicons-cube',
  },
]
</script>

<template>
  <div class="flex">
    <div class="h-screen w-48 border-e border-gray-200 p-4">
      <div class="flex justify-center py-4">
        <!-- logo demo -->
        <UIcon class="text-3xl" name="i-logos-nuxt-icon" />
      </div>
      <UNavigationMenu :items="items" orientation="vertical" class="mt-10" />
    </div>
    <div class="flex-1">
      <div class="border-b border-gray-200 ps-4">
        <UNavigationMenu :items="[{
          label: 'Home',
          to: '/',
          icon: 'i-heroicons-home'
        }]" variant="link" />
      </div>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
