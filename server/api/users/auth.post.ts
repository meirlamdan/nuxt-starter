import { authUser } from "~~/server/controllers/user";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  return authUser(event, email, password)
})
