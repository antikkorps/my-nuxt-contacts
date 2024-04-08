<script setup lang="ts">
import { userService } from "~/services";
const { signIn, session, status, cookies, getProviders } = useAuth();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    await userService.register(email.value, password.value);
    await signIn("credentials", {
      email: email.value,
      password: password.value,
      redirect: true,
      callbackUrl: window.location.origin,
    });
    console.log("user registration successful", email.value, password.value);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Inscrivez-vous maintenant!</h1>
        <p class="py-6">
          Pour accéder à myContact, créez un compte maintenant et profitez
          d'avoir tous vos contacts au même endroit.
        </p>
      </div>
      <div class="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
        <form class="card-body" @submit.prevent="handleSubmit">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Mot de passe</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Mot de passe"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirmer le mot de passe</span>
            </label>
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
