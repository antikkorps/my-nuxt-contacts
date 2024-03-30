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
    console.log("valeur du contact", contact.value);
  }
});
</script>

<template>
  <div class="pt-4">
    <div
      class="card relative top-20 mx-auto flex w-full justify-center bg-base-100 shadow-xl sm:w-1/2"
    >
      <div class="card-body">
        <NuxtImg
          v-if="contact?.image"
          :src="contact?.image"
          class="relative -top-20 mx-auto h-52 w-52 justify-center rounded-full object-cover shadow-2xl"
        />

        <h2 class="card-title -mt-10 justify-center">
          {{ contact?.firstName }} {{ contact?.lastName }}
          <span v-if="contact?.isFavorite">⭐</span>
        </h2>
        <div class="mt-20 flex flex-col justify-center text-center md:mt-0">
          <div v-if="contact?.email" class="flex">
            <p class="text-xl font-bold">Email</p>
            <p class="text-xl">{{ contact?.email }}</p>
          </div>
          <div v-if="contact?.jobTitle" class="flex">
            <p class="text-xl font-bold">Profession</p>
            <p class="text-xl">{{ contact?.jobTitle }}</p>
          </div>
          <div v-if="contact?.company" class="flex">
            <p class="text-xl font-bold">Entreprise</p>
            <p class="text-xl">{{ contact?.company }}</p>
          </div>
          <div v-if="contact?.phone" class="flex">
            <p class="text-xl font-bold">Téléphone</p>
            <p class="text-xl">{{ contact?.phone }}</p>
          </div>
          <div v-if="contact?.mobile" class="flex">
            <p class="text-xl font-bold">Mobile</p>
            <p class="text-xl">{{ contact?.mobile }}</p>
          </div>
          <div v-if="contact?.linkedin" class="flex">
            <p class="text-xl font-bold">linkedIn</p>
            <p class="text-xl">{{ contact?.linkedin }}</p>
          </div>
          <div v-if="contact?.facebook" class="flex">
            <p class="text-xl font-bold">Facebook</p>
            <p class="text-xl">{{ contact?.facebook }}</p>
          </div>
          <div v-if="contact?.instagram" class="flex">
            <p class="text-xl font-bold">Instagram</p>
            <p class="text-xl">{{ contact?.instagram }}</p>
          </div>
          <div v-if="contact?.twitter" class="flex">
            <p class="text-xl font-bold">Twitter</p>
            <p class="text-xl">{{ contact?.twitter }}</p>
          </div>
          <div v-if="contact?.github" class="flex">
            <p class="text-xl font-bold">Github</p>
            <p class="text-xl">{{ contact?.github }}</p>
          </div>
          <div v-if="contact?.notes" class="flex">
            <p class="text-xl font-bold">Notes</p>
            <p class="text-xl">{{ contact?.notes }}</p>
          </div>
        </div>
        <div class="card-actions my-10 justify-center sm:justify-end">
          <button class="btn btn-primary">Modifier mon contact</button>
          <button class="btn btn-warning">
            <NuxtLink to="#">Supprimer mon contact</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
