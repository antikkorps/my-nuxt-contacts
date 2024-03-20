<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });

import type { Contact } from "~/server/utils/types";
const { session, user } = useAuth();
// const { data } = await useFetch("/api/v1/contacts/user-contacts");

const contacts = ref<Contact[]>([]);

onMounted(async () => {
  const response = await fetch("/api/v1/contacts/user-contacts");
  const data = await response.json();
  contacts.value = data.body.contacts;
  console.log(contacts.value);
});
</script>
<template>
  <div>
    <h1 class="PageTitle">My Contacts</h1>
    <div class="px-4 sm:w-1/2 mx-auto">
      <p class="text-xl font-bold py-4">
        Hello {{ session?.user?.firstName }} ! 🥳
      </p>
    </div>
    <div class="px-4 sm:w-1/2 mx-auto">
      <p>Here are your contacts</p>
      <div class="w-full">
        <p>{{ session?.user }}</p>
      </div>

      <button class="btn btn-primary">
        <NuxtLink to="/mycontacts/add">Ajouter un contact</NuxtLink>
      </button>
      <NuxtPage />

      <SearchContact class="flex justify-center mx-auto sm:w-1/2 my-4" />

      <div class="flex sm:w-full">
        <ContactCard
          v-for="contact in contacts"
          :key="contact.id"
          :contact="contact"
        />
      </div>
    </div>
  </div>
</template>
