# Nuxt Starter

### A minimal starter for Nuxt 3

- [**Nuxt 3**](https://v3.nuxtjs.org/)
- [**Nuxt UI**](https://ui.nuxtjs.org/)
- [**Drizzle ORM**](https://orm.drizzle.team/)
- [**Nuxt Auth Utils**](https://github.com/atinux/nuxt-auth-utils)


Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Database
You can use any database supported by [Drizzle](https://orm.drizzle.team/). For keep it simple, we'll use [LibSQL](https://libsql.com/).

Create a database file called `.data/local.db`

Create a `.env` file and add the following:

```bash
DB_FILE_NAME=file:.data/local.db
```
Run the following commands:

```bash
npm run db:push
```
to seed the database with admin user

```bash
npm run dev
```
open the nuxt dev-tools and on the tab of 'Server Tasks' click on 'createSuperAdmin' and run it.
by default it will create an admin user with email `super@admin` and password `password` and role `superadmin`, but you can change it in the payload:

```bash
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@admin",
  "password": "password",
  "role": "admin"
}
```

## Auth

### login with email and password

### Login with Google

(You can use any auth provider supported by [Nuxt Auth Utils](https://github.com/atinux/nuxt-auth-utils).)

in the `.env` file add:

```bash
NUXT_OAUTH_GOOGLE_CLIENT_ID=
NUXT_OAUTH_GOOGLE_CLIENT_ID=
```

## Development
Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
