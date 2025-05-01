import { eq } from 'drizzle-orm';
import { usersTable } from '~~/server/db/schema';

export const getUsers = async ({ page, perPage, filters }: { page: number, perPage: number, filters: any }) => {
  const users = () => useDb().query.usersTable.findMany(
    {
      limit: perPage,
      offset: (page - 1) * perPage,
      columns: {
        password: false
      },
      where: (u, { like, or }) => {
        if (filters.search) {
          const orArr: any[] = []
          filters.search.trim().split(' ').forEach((word: string) => {
            orArr.push(like(u.firstName, `%${word}%`))
            orArr.push(like(u.lastName, `%${word}%`))
            orArr.push(like(u.email, `%${word}%`))
          })
          return or(...orArr)
        }
      }
    }
  )

  const [rows, count] = await Promise.all([users(), useDb().$count(usersTable)])
  return { rows, count }
}

export const getUser = async (id: string) => {
  const [user] = await useDb().select().from(usersTable).where(eq(usersTable.id, id))
  return user
}

export const getUserByEmail = async (email: string) => {
  const [user] = await useDb().select().from(usersTable).where(eq(usersTable.email, email))
  return user
}

export const createUser = async (event: any, user: typeof usersTable.$inferInsert, isByGoogle = false) => {
  if (!isByGoogle && !user.password) {
    throw createError({ statusCode: 400, statusMessage: 'Password is required' })
  }
  user.password = isByGoogle ? '' : await hashPassword(user.password as string)
  const [createdUser] = await useDb().insert(usersTable).values(user).returning()
  await setUserSession(event, {
    user: {
      id: createdUser.id,
      email: createdUser.email,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      role: 'user' // TODO: if admin create user, then role can be admin 
    }
  })
  return 'success'
}

export const updateUser = async (id: string, user: Partial<typeof usersTable.$inferSelect>) => {
  const updatedUser = useDb().update(usersTable).set(user).where(eq(usersTable.id, id)).returning()
  return updatedUser
}


export const deleteUser = async (id: string) => {
  const deletedUser = useDb().delete(usersTable).where(eq(usersTable.id, id)).returning()
  return deletedUser
}

export const authUser = async (event: any, email: string, password: string) => {
  const user = await getUserByEmail(email)
  if (!user || !user.password) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  }
  const isValid = await verifyPassword(user.password, password)
  if (!isValid) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }
  })
  return 'success'
}
