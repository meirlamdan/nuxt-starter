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
  <div class="w-56 mx-auto text-center mt-32">
    <form @submit.prevent="signUp" class="">
      <div class="space-y-2">
        <UInput placeholder="first name" icon="i-heroicons-user" v-model="model.firstName"></UInput>
        <UInput placeholder="last name" icon="i-heroicons-user" v-model="model.lastName"></UInput>
        <UInput placeholder="email" icon="i-heroicons-envelope" v-model="model.email"></UInput>
        <UInput placeholder="password" icon="i-heroicons-lock-closed" v-model="model.password"></UInput>
      </div>
      <UButton class="mt-2" variant="outline" type="submit" size="sm" :leading="isPending">Submit</UButton>
    </form>
    <UButton class="mt-14" variant="subtle" :to="'/api/users/auth-google'" external color="neutral" label="signup with Google" icon="i-logos-google-icon"  block/>
  </div>
</template>

<style lang="css" scoped></style>
