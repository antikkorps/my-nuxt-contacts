<script setup lang="ts">
const { signIn, session, status, cookies, getProviders } = useAuth();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    await signIn("credentials", {
      redirect: true,
      email: email.value,
      password: password.value,
      callbackUrl: "/mycontacts",
    });
    console.log("success");
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Connectez-vous maintenant!</h1>
        <p class="py-6">
          Pour accéder à l'ensemble de vos contacts, connectez-vous maintenant
          et profitez de les avoir tous au même endroit.
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
            <label class="label">
              <a href="#" class="link-hover link label-text-alt"
                >Mot de passe oublié ?</a
              >
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
