import { getItems } from "~~/server/controllers/item"

export default defineEventHandler(async (event) => {
  return getItems()
})
