<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })
const { session, user } = useAuth()
const { data } = await useFetch("/api/v1/hello")
</script>
<template>
  <div>
    <h1 class="PageTitle">My Contacts</h1>
    <div class="px-4 sm:w mx-auto">
      <p class="text-xl font-bold py-4">Hello {{ session?.user?.firstName }} ! 🥳</p>
    </div>
    <div class="px-4 sm:w-1/2 mx-auto">
      <p>Here are your contacts</p>
      <div class="w-full">
        <pre>{{ data }}</pre>
        <p>{{ session?.user }}</p>
      </div>

      <!-- <div v-if="data">
  <ul>
    <li v-for="contact in data.contacts" :key="contact.id">
      {{ contact.name }}
    </li>
  </ul> -->
      <SearchContact class="flex justify-center mx-auto sm:w-1/2 my-4" />

      <div class="sm:w-1/2">
        <ContactCard />
      </div>
    </div>
  </div>
</template>
