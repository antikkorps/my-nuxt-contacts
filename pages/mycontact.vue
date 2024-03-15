<script setup lang="ts">
const { data } = await useFetch("/api/v1/hello")
</script>
<template>
  <div>
    <h1>My Contacts</h1>
    <p>Here are your contacts</p>

    <pre>{{ data }}</pre>

    <!-- <div v-if="data">
      <ul>
        <li v-for="contact in data.contacts" :key="contact.id">
          {{ contact.name }}
        </li>
      </ul> -->
  </div>
</template>
