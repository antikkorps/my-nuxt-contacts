<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })
</script>
<template>
  <div>
    <h1 class="PageTitle">This is the profile page of the current user</h1>
  </div>
</template>
