<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })
const { data } = await useFetch("/api/v1/hello")
</script>
<template>
  <div>
    <h1 class="PageTitle">My Contacts</h1>
    <div class="px-4 sm:w-1/2 mx-auto">
      <p>Here are your contacts</p>

      <pre>{{ data }}</pre>

      <!-- <div v-if="data">
  <ul>
    <li v-for="contact in data.contacts" :key="contact.id">
      {{ contact.name }}
    </li>
  </ul> -->
    </div>
  </div>
</template>
