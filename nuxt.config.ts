// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@hebilicious/authjs-nuxt",
    "@nuxt/image"
  ],
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
  },
  runtimeConfig: {
    authJs: {
      secret: process.env.NUXT_NEXTAUTH_SECRET,
    },
    public: {
      authJs: {
        baseUrl: process.env.NUXT_NEXTAUTH_URL, // The URL of your deployed app (used for origin Check in production)
        verifyClientOnEveryRequest: true, // whether to hit the /auth/session endpoint on every client request
        authenticatedRedirectTo: "/",
      },
    },
  },
})