import { deleteUser } from "~~/server/controllers/user";

export default defineEventHandler(async (event) => {
  await isSuperAdmin(event)
  const { id } = getRouterParams(event)
  return deleteUser(id)
})