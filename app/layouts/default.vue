<script setup lang="ts">
const { user, clear } = useUserSession()
const items = [
  {
    label: 'Home',
    to: '/',
    icon: 'i-heroicons-home'
  },
  {
    label: 'Second',
    to: '/second',
    icon: 'i-heroicons-user'
  }
]

const dashboard = {
  label: 'Dashboard',
  to: '/dashboard',
  icon: 'carbon:dashboard',
  class: 'ms-20'
}


const links = computed(() => {
  if (user.value?.role === 'admin' || user.value?.role === 'superadmin') {
    return [...items, dashboard]
  }else {
    return items
  }
})


</script>

<template>
  <div>
    <div>
      <nav class="flex gap-4 justify-between my-10 px-10">
        <UNavigationMenu :items="links" variant="link" />
        <div>
          <div v-if="user" class="flex gap-2">
            <div> {{ user.firstName }} {{ user.email }}</div>
            <UButton @click="clear" variant="outline" color="neutral" size="xs">Logout</UButton>
          </div>
          <div v-else>
            <UButton to="/signup" variant="outline" size="xs">Sign Up</UButton>
            <UButton class="ms-1.5" to="/login" variant="outline" color="neutral" size="xs">Login</UButton>
          </div>
        </div>
      </nav>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
