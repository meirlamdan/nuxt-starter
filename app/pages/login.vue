<script setup lang="ts">
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
const toast = useToast()

const model = ref({
  email: '',
  password: ''
})

const isPending = ref(false)
const auth = async () => {
  isPending.value = true
  try {
    const data = await $fetch('/api/users/auth', {
      method: 'post',
      body: model.value,
    })
    if (data === 'success') {
      await fetch()
      toast.add({ title: 'Success', color: 'success' })
      const to = user.value?.role === 'admin' || user.value?.role === 'superadmin' ? '/dashboard' : '/'
      navigateTo(to)
    }
  } catch (error) {
    console.log(error)
    toast.add({ title: error instanceof Error && error.message.endsWith('Invalid credentials') ? 'Invalid credentials' : 'Something went wrong', color: 'error' })
  } finally {
    isPending.value = false
  }
}
</script>

<template>
  <div class="mt-40">
    <form @submit.prevent="auth">
      <div class="w-56 mx-auto text-center">
        <UInput placeholder="email" icon="i-heroicons-envelope" v-model="model.email" required></UInput>
        <UInput class="mt-2" placeholder="password" icon="i-heroicons-lock-closed" v-model="model.password" required>
        </UInput>
        <UButton class="mt-4" variant="outline" type="submit" :loading="isPending">Submit</UButton>
      </div>
    </form>
  </div>
</template>

<style lang="css" scoped></style>
