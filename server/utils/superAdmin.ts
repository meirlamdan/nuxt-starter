import type { H3Event } from 'h3'

export async function isSuperAdmin(event: H3Event) {
  const { user } = await requireUserSession(event)
  if (user.role !== 'superadmin') {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}