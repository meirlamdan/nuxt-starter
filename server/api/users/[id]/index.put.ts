import { updateUser } from "~~/server/controllers/user";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  const { user } = await requireUserSession(event)
  if (user?.id !== id && user?.role !== 'superadmin') throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const body = await readBody(event)
  return updateUser(id, body)
})
