<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

useHead({
  title: 'Dashboard Users'
})

const page = ref(1)
const perPage = ref(20)
const filters = ref({ search: '' })

const query = computed(() => ({
  page: page.value,
  perPage: perPage.value,
  filters: filters.value
}))

const { data, status, error, refresh } = await useFetch('/api/users', {
  query
})

const columns = [
  { accessorKey: 'createdAt', header: 'Created At' },
  { accessorKey: 'firstName', header: 'First Name' },
  { accessorKey: 'lastName', header: 'Last Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role', id: 'role' },
  { accessorKey: 'updatedAt', header: 'Updated At' },
  { id: 'actions' }
]

function getDropdownActions(user: any): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'Copy user Id',
        icon: 'i-lucide-copy',
        onSelect: () => {
          navigator.clipboard.writeText(user.id.toString())
          useToast().add({
            title: 'User ID copied to clipboard!',
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      }
    ],
    [
      {
        label: 'Edit',
        icon: 'i-lucide-edit'
      },
      {
        label: 'Delete',
        icon: 'i-lucide-trash',
        color: 'error'
      }
    ]
  ]
}
</script>

<template>
  <div>
    <UCard>
      <template #header>
        <div class="font-medium">Users</div>
        <div class="text-end">
          <UInput v-model="filters.search" placeholder="search..." />
        </div>
      </template>
      <UTable :data="data?.rows" :columns="columns" :loading="status === 'pending'">
        <template #role-cell="{ row }">
          <UBadge class='capitalize' variant='subtle'
            :color="row.getValue('role') === 'superadmin' ? 'success' : row.getValue('role') === 'admin' ? 'info' : 'neutral'">
            {{ row.getValue('role') }}</UBadge>
        </template>
        <template #actions-cell="{ row }">
          <UDropdownMenu :items="getDropdownActions(row.original)">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </template>
      </UTable>
      <template #footer>
        <div class="flex justify-between">
          <UPagination v-model:page="page" :items-per-page="perPage" :total="data?.count" />
          <div v-if="data" class="text-sm text-gray-500">{{ perPage * (page - 1) + 1 }} - {{ perPage * page >
            data?.count ?
            data?.count : perPage *
            page }} of
            {{ data?.count }}
          </div>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style lang="css" scoped></style>
