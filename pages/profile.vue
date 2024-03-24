<script setup lang="ts">
import { contactService } from "~/services";

definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });

const { session, user } = useAuth();
const favoriteCount = ref(0);
const contactsCount = ref(0);
const notesCount = ref(0);

onMounted(async () => {
  const data = await contactService.getCounts();
  favoriteCount.value = data.body.favoritesCount;
  contactsCount.value = data.body.contactsCount;
  notesCount.value = data.body.notesCount;
});
</script>
<template>
  <div class="pt-4">
    <div
      class="card relative top-20 mx-auto flex w-full justify-center bg-base-100 shadow-xl sm:w-1/2"
    >
      <div class="card-body">
        <NuxtImg
          :src="session?.user?.avatar"
          class="relative -top-20 mx-auto h-52 w-52 justify-center rounded-full shadow-2xl"
        />

        <h2 class="card-title -mt-10 justify-center">
          {{ user?.firstName }} {{ user?.lastName }}
        </h2>
        <p class="mb-4 text-center">Bienvenue sur le site myContact</p>
        <p class="mb-4 text-center">
          Votre Status est :
          {{
            user && user.role === "user" ? "Utilisateur" : "Admininistrateur"
          }}
        </p>
        <div class="mt-20 grid grid-cols-3 text-center md:mt-0">
          <div>
            <p class="text-xl font-bold">{{ contactsCount }}</p>
            <p class="statsTitle">Contacts</p>
          </div>
          <div>
            <p class="text-xl font-bold">{{ favoriteCount }}</p>
            <p class="statsTitle">Favoris</p>
          </div>
          <div>
            <p class="text-xl font-bold">{{ notesCount }}</p>
            <p class="statsTitle">Notes</p>
          </div>
        </div>
        <div class="card-actions my-10 justify-center sm:justify-end">
          <button class="btn btn-primary">Modifier mon profil</button>
          <button class="btn btn-warning">
            <NuxtLink to="/addcontact">Ajouter un contact</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
