<script setup lang="ts">
const value = ref(false)
useHead({
  title: 'Home Page'
})

</script>

<template>
  <div>
    <UContainer>
      <h1 class="text-5xl font-medium text-center">Home Page</h1>
      <div class="mt-16 text-2xl text-center text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Dignissimos, omnis tempore, vitae maxime autem assumenda voluptatibus ipsam nihil fugiat cum officiis, repellat
        fugit expedita iure nulla rem. Ullam, eum
        optio.</div>
      <div class="text-center mt-20 space-x-2">
        <UButton size="xl" label="button" @click="value = !value" />
        <UButton size="xl" variant="outline" label="button-outline" @click="value = !value" />
      </div>
      <div class="mt-20 flex flex-wrap gap-4">
        <UCard class="flex-1 bg-gradient-to-r from-green-50 to-green-200">
          <template #header>
            <div>Header of the first card</div>
          </template>
          <div class="p-4 text-lg">Content of the first card</div>
        </UCard>
        <UCard class="flex-1 bg-gradient-to-r from-green-50 to-green-200">
          <template #header>
            <div>Header of the second card</div>
          </template>
          <div class="p-4 text-lg">Content of the second card</div>
        </UCard>
        <UCard class="flex-1 bg-gradient-to-r from-green-50 to-green-200">
          <template #header>
            <div>Header of the third card</div>
          </template>
          <div class="p-4 text-lg">Content of the third card</div>
        </UCard>
      </div>

      <div class="my-20 text-center">
        <div class="text-lg font-medium mt-1">subscribe to our newsletter</div>
        <div class="flex justify-center gap-1">
          <UInput placeholder="email" icon="i-heroicons-envelope"></UInput>
          <UButton variant="outline" color="neutral">Submit</UButton>
        </div>
      </div>

    </UContainer>
  </div>
</template>

<style scoped></style>
