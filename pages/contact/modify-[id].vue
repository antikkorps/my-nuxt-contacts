<script setup lang="ts">
import { useRoute } from "vue-router";
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });
// get the user id from the route parameter
const route = useRoute();
let id = route.params.id;
</script>

<template>
  <div>
    <ModifyContactForm />
  </div>
</template>
