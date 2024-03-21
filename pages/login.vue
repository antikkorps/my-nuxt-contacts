<script setup lang="ts">
definePageMeta({
  middleware: "guest-only",
  auth: { authenticatedRedirectTo: "/profile" },
  layout: "connexion",
});
</script>
<template>
  <LoginForm />
</template>
