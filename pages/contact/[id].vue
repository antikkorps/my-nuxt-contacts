<script setup lang="ts">
import { ref, onMounted } from "vue";
import { contactService } from "~/services/";
import type { Contact } from "~/server/utils/types";
import { useRoute } from "vue-router";

const route = useRoute();
const contact = ref<Contact | null>(null);

onMounted(async () => {
  let id = route.params.id;
  if (Array.isArray(id)) {
    id = id[0];
  }
  const response = await contactService.getUserContactById(id);
  if (response.status === 200) {
    contact.value = response.body.contact;
  }
});
</script>

<template>
  <div>
    <h1>This is detail page of the contact {{ route.params.id }}</h1>
    <div v-if="contact">
      <p>{{ contact.firstName }}</p>
      <p>{{ contact.lastName }}</p>
      <p>{{ contact.email }}</p>
      <p>{{ contact.phone }}</p>
    </div>
  </div>
</template>
