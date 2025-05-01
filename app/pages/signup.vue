<script setup lang="ts">

const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

const model = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

const isPending = ref(false)
const signUp = async () => {
  isPending.value = true
  try {
    const data = await $fetch('/api/users', {
      method: 'post',
      body: model.value
    })
    if (data === 'success') {
      await fetch()
    }
  } catch (error) {
    console.log(error)
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <div class="mt-40">
    <form @submit.prevent="signUp" class="max-w-52 mx-auto text-center">
      <div class="space-y-2">
        <UInput placeholder="first name" icon="i-heroicons-user" v-model="model.firstName"></UInput>
        <UInput placeholder="last name" icon="i-heroicons-user" v-model="model.lastName"></UInput>
        <UInput placeholder="email" icon="i-heroicons-envelope" v-model="model.email"></UInput>
        <UInput placeholder="password" icon="i-heroicons-lock-closed" v-model="model.password"></UInput>
      </div>
      <UButton class="mt-4" type="submit" :leading="isPending">Submit</UButton>
    </form>
  </div>
</template>

<style lang="css" scoped></style>
