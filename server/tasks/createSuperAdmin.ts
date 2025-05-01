import { usersTable } from "../db/schema"

type Payload = { firstName?: string, lastName?: string, email?: string, password?: string }

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed database'
  },
  async run({ payload }: { payload: Payload }) {
    const superAdmin = {
      firstName: payload.firstName || 'super',
      lastName: payload.lastName || 'admin',
      email: payload.email || 'super@admin',
      password: await hashPassword(payload.password || 'password'),
      role: 'superadmin' as const
    }
    const user = await useDb().insert(usersTable).values(superAdmin).returning()
    return { result: user }
  }
})