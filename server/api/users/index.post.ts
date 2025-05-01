import { createUser } from "~~/server/controllers/user";

export default defineEventHandler(async (event) => {
  const user = await readBody(event)
  return createUser(event, user)
})
