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
  <div class="w-56 mx-auto text-center mt-32">
    <form @submit.prevent="auth">
      <div>
        <UInput placeholder="email" icon="i-heroicons-envelope" v-model="model.email" required></UInput>
        <UInput class="mt-2" placeholder="password" icon="i-heroicons-lock-closed" v-model="model.password" required>
        </UInput>
        <UButton class="mt-2" variant="outline" type="submit"  size="sm" :loading="isPending">Submit</UButton>
      </div>
    </form>
    <UButton class="mt-14" variant="subtle" :to="'/api/users/auth-google'" external color="neutral" label="Login with Google" icon="i-logos-google-icon"  block/>
  </div>
</template>

<style lang="css" scoped></style>
