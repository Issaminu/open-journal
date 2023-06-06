This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Local deployement

Follow these steps to run this app locally:

1. Clone the repo with `git clone https://github.com/Issaminu/projet-web.git`
2. An `.env` file is already provided, with `DATABASE_URL` linking to a a Postgres database hosted on [Vercel Postgres](https://vercel.com/storage/postgres).
   > Note: To use you own Postgres database, change the `DATABASE_URL` variable in the `.env` file. Make sure to use make sure to run `npx prisma migrate dev` and `npx prisma db seed` afterwards.
3. Run `npm install` to install the application's dependencies.
4. Run `npm run dev` to start your local server.
5. Visit http://localhost:3000 to use the application locally.
