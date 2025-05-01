import { getUser } from "~~/server/controllers/user"

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const session = await requireUserSession(event)
  if (session.user?.id !== id && session.user?.role !== 'superadmin') throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  return getUser(id)
})