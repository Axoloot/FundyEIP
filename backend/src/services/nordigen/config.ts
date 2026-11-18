export default {
  CLIENT_ID: process.env.NORDIGEN_CLIENT_ID as string,
  CLIENT_SECRET: process.env.NORDIGEN_CLIENT_SECRET as string,
  AUTH_REDIRECT_URL: process.env.NORDIGEN_REDIRECT_URL ?? 'http://localhost:3000/callback',
}
