<script setup lang="ts">
import { ref, onMounted } from "vue";
import { contactService } from "~/services/";
import type { Contact } from "~/server/utils/types";
import { useRoute, useRouter } from "vue-router";

definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });

const emit = defineEmits(["delete"]);
const router = useRouter();
const route = useRoute();
const contact = ref<Contact | null>(null);
const qrData = "https://fliqr.codes";

const handleDeleteContact = () => {
  if (contact.value) {
    emit("delete", contact.value.id);
    router.push("/mycontacts");
  }
};

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
  <div class="h-screen pt-4">
    <div class="mx-auto mb-10 mt-6 pl-4 sm:w-1/3">
      <nuxt-link to="/mycontacts" class="flex align-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        <span class="ml-2">Retour à la liste</span>
      </nuxt-link>
    </div>
    <div
      class="card relative top-10 mx-auto flex w-full justify-center bg-base-100 shadow-xl sm:w-1/3"
    >
      <div class="card-body">
        <NuxtImg
          v-if="contact?.image"
          :src="contact?.image"
          class="relative -top-20 mx-auto h-52 w-52 justify-center rounded-full object-cover shadow-2xl"
        />

        <h2 class="card-title -mt-10 justify-center">
          {{ contact?.firstName }} {{ contact?.lastName }}
          <span v-if="contact?.isFavorite">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-8 w-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </span>
        </h2>
        <div class="mt-20 flex flex-col justify-evenly md:mt-0">
          <div class="flex flex-col rounded-lg sm:flex-row sm:justify-evenly">
            <div v-if="contact?.jobTitle" class="my-3 grid grid-cols-1">
              <p class="text-xl font-bold">Profession</p>
              <p class="text-xl">{{ contact?.jobTitle }}</p>
            </div>
            <div v-if="contact?.company" class="my-3 grid grid-cols-1">
              <p class="text-xl font-bold">Entreprise</p>
              <p class="text-xl">{{ contact?.company }}</p>
            </div>
          </div>

          <div v-if="contact?.email" class="mb-3 grid grid-cols-1">
            <p class="text-xl font-bold">Email</p>
            <div class="flex justify-center">
              <p class="text-xl">{{ contact?.email }}</p>
              <CopyToClipboard :text="contact?.email" />
            </div>
          </div>

          <div v-if="contact?.phone" class="my-3 grid grid-cols-1">
            <p class="text-xl font-bold">Téléphone</p>
            <p class="text-xl">{{ contact?.phone }}</p>
          </div>
          <div v-if="contact?.mobile" class="my-3 grid grid-cols-1">
            <p class="text-xl font-bold">Mobile</p>
            <p class="text-xl">{{ contact?.mobile }}</p>
          </div>
          <div v-if="contact?.linkedin" class="my-3 grid grid-cols-1">
            <p class="text-xl font-bold">linkedIn</p>
            <p class="text-xl">{{ contact?.linkedin }}</p>
          </div>
          <div v-if="contact?.facebook" class="my-3 grid grid-cols-1">
            <p class="text-xl font-bold">Facebook</p>
            <p class="text-xl">{{ contact?.facebook }}</p>
          </div>
          <div v-if="contact?.instagram" class="my-3 grid grid-cols-1">
            <p class="text-xl font-bold">Instagram</p>
            <p class="text-xl">{{ contact?.instagram }}</p>
          </div>
          <div v-if="contact?.twitter" class="my-3 grid grid-cols-1">
            <p class="text-xl font-bold">Twitter</p>
            <p class="text-xl">{{ contact?.twitter }}</p>
          </div>
          <div v-if="contact?.github" class="my-3 grid grid-cols-1">
            <p class="text-xl font-bold">Github</p>
            <p class="text-xl">{{ contact?.github }}</p>
          </div>
          <div v-if="contact?.notes" class="my-3 grid grid-cols-1">
            <p class="text-xl font-bold">Notes</p>
            <p class="text-xl">{{ contact?.notes }}</p>
          </div>
        </div>
        <div class="card-actions my-10 justify-center sm:justify-end">
          <nuxt-link :to="`/contact/modify-${contact?.id}`">
            <button class="btn btn-primary">Modifier mon contact</button>
          </nuxt-link>
          <DeleteContactBtn @click="handleDeleteContact" :id="contact?.id" />
        </div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>
