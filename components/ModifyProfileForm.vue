<script setup lang="ts">
import { userService } from "~/services";
import type { User } from "~/server/utils/types";
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });

const { session, user } = useAuth();
const updatedContact = ref<User>({
  firstName: user.value?.firstName,
  lastName: user.value?.lastName,
  email: user.value?.email,
  password: "",
});

const handleSubmit = async () => {
  try {
    await userService.modifyUser(updatedContact.value);
    console.log("success");
    console.log(updatedContact.value);
  } catch (error) {
    console.log("error", error);
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="PageTitle">
      Hello {{ session?.user?.firstName }}, Que souhaites-tu modifier ?
    </h1>
    <div class="my-4">
      <form
        class="mx-auto flex flex-col justify-center"
        @submit.prevent="handleSubmit"
      >
        <label class="form-control mx-auto w-full max-w-xs">
          <div class="label">
            <span class="label-text">Prénom</span>
          </div>
          <input
            type="text"
            placeholder="Votre nom"
            class="input input-bordered mx-auto w-full max-w-xs"
            v-model="updatedContact.firstName"
          />
        </label>

        <label class="form-control mx-auto w-full max-w-xs">
          <div class="label">
            <span class="label-text">Nom</span>
          </div>
          <input
            type="text"
            placeholder="Votre prénom"
            class="input input-bordered mx-auto w-full max-w-xs"
            v-model="updatedContact.lastName"
          />
        </label>

        <label class="form-control mx-auto w-full max-w-xs">
          <div class="label">
            <span class="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Votre email"
            class="input input-bordered mx-auto w-full max-w-xs"
            v-model="updatedContact.email"
          />
        </label>

        <button type="submit" class="btn btn-primary my-4 sm:mx-auto sm:w-1/2">
          Sauvegarder
        </button>
      </form>
    </div>
  </div>
</template>
