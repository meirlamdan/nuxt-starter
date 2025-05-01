declare module '#auth-utils' {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin" | "superadmin";
  }

  interface UserSession {
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export { }