<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });
</script>

<template>
  <div class="mx-auto flex justify-center sm:w-1/2">
    <ModifyProfileForm />
  </div>
</template>
