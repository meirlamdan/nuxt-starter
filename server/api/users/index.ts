import { getUsers } from "~~/server/controllers/user";

export default defineEventHandler(async (event) => {
  await isSuperAdmin(event)
  let { page = 1, perPage = 20, filters = '{}' } = getQuery(event)
  filters = JSON.parse(filters as string)
  return getUsers({ page: Number(page), perPage: Number(perPage), filters })
})
