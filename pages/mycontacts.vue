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

  const sortedContacts = contacts.value.slice().sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toUpperCase();
    const nameB = `${b.firstName} ${b.lastName}`.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names could be equal
    return 0;
  });

  contacts.value = sortedContacts;
});
</script>
<template>
  <div>
    <h1 class="PageTitle">My Contacts</h1>
    <div class="mx-auto px-4 sm:w-1/2">
      <p class="py-4 text-3xl font-bold">
        Hello {{ session?.user?.firstName }} ! 🥳
      </p>
    </div>
    <div class="mx-auto px-4 sm:w-1/2">
      <p>Here are your contacts</p>
      <div class="w-full">
        <p>{{ session?.user }}</p>
      </div>

      <button class="btn btn-primary">
        <NuxtLink to="/mycontacts/add">Ajouter un contact</NuxtLink>
      </button>
      <NuxtPage />

      <SearchContact class="mx-auto my-4 flex justify-center sm:w-1/2" />

      <div class="sm:w-full">
        <ContactCard
          v-for="contact in contacts"
          :key="contact.id"
          :contact="contact"
          class="my-10"
        />
      </div>
    </div>
  </div>
</template>
