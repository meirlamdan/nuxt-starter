import { getUserByEmail, createUser } from "~~/server/controllers/user";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    const userByEmail = await getUserByEmail(user.email)
    if (userByEmail) {
      await setUserSession(event, {
        user: {
          id: userByEmail.id,
          email: userByEmail.email,
          firstName: userByEmail.firstName,
          lastName: userByEmail.lastName,
          role: userByEmail.role
        }
      })
      return sendRedirect(event, userByEmail.role === 'user' ? '/' : '/dashboard')
    } else {
      user.firstName = user.given_name || user
      user.lastName = user.family_name
      await createUser(event, user, true)
      return sendRedirect(event, '/')
    }
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})