<script setup lang="ts">
import { useRoute } from "vue-router";
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });
const route = useRoute();
const props = defineProps({
  id: String,
});
let id = route.params.id;
</script>

<template>
  <div class="mx-auto flex justify-center sm:w-1/2">
    <h1>{{ id }}</h1>
    <ModifyContactForm :id="id" />
  </div>
</template>
