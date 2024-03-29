<script setup lang="ts">
import { contactService } from "~/services/index";
import type { Contact } from "~/server/utils/types";

const selectedSocialFields = ref({
  linkedin: false,
  facebook: false,
  instagram: false,
  twitter: false,
  github: false,
});

const newContact = ref<Partial<Contact>>({
  firstName: "",
  lastName: "",
  image: "",
  email: "",
  phone: "",
  mobile: "",
  linkedin: "",
  facebook: "",
  instagram: "",
  twitter: "",
  jobTitle: "",
  company: "",
  notes: "",
  isFavorite: false,
});

const handleSubmit = async () => {
  console.log("submit");
};
</script>
<template>
  <div>
    <h1 class="PageTitle">Add a contact</h1>
    <div class="mb-20 flex w-full justify-center">
      <form action="" class="flex w-full flex-col">
        <div class="flex flex-col justify-around sm:flex-row">
          <label class="form-control mx-1 w-full max-w-xs flex-grow">
            <div class="label">
              <span class="label-text">Firstname</span>
            </div>
            <input
              v-model="newContact.firstName"
              type="text"
              placeholder="eg. John"
              class="input input-bordered w-full max-w-xs"
            />
          </label>

          <label class="form-control mx-1 w-full max-w-xs">
            <div class="label">
              <span class="label-text">Lastname</span>
            </div>
            <input
              v-model="newContact.lastName"
              type="text"
              placeholder="eg. Doe"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div class="mx-auto flex w-full flex-col justify-center">
          <label class="form-control mx-1 w-full max-w-xs">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              v-model="newContact.email"
              type="email"
              placeholder="eg. me@example.com"
              class="input input-bordered w-full max-w-xs"
            />
          </label>

          <div
            class="form-control flex w-full justify-center sm:w-1/2 sm:justify-around"
          >
            <label class="label cursor-pointer">
              <span class="label-text">Ajouter aux favoris</span>
              <input
                v-model="newContact.isFavorite"
                type="checkbox"
                class="toggle toggle-primary"
              />
            </label>
          </div>
        </div>

        <div class="flex flex-col justify-around sm:flex-row">
          <label class="form-control mx-1 w-full max-w-xs">
            <div class="label">
              <span class="label-text">Téléphone Fixe</span>
            </div>
            <input
              v-model="newContact.phone"
              type="phone"
              placeholder="00 00 00 00 00"
              class="input input-bordered w-full max-w-xs"
            />
          </label>

          <label class="form-control mx-1 w-full max-w-xs">
            <div class="label">
              <span class="label-text">Téléphone Mobile</span>
            </div>
            <input
              v-model="newContact.mobile"
              type="phone"
              placeholder="00 00 00 00 00"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div class="flex flex-col justify-around sm:flex-row">
          <label class="form-control mx-1 w-full max-w-xs flex-grow">
            <div class="label">
              <span class="label-text">Profession</span>
            </div>
            <input
              v-model="newContact.jobTitle"
              type="text"
              placeholder="employé en tant que..."
              class="input input-bordered w-full max-w-xs"
            />
          </label>

          <label class="form-control mx-1 w-full max-w-xs">
            <div class="label">
              <span class="label-text">Entreprise</span>
            </div>
            <input
              v-model="newContact.company"
              type="text"
              placeholder="eg. son entreprise"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div class="form-control mx-auto mt-3 flex w-1/2 justify-center">
          <h3>Ajouter réseaux sociaux</h3>
          <label class="label cursor-pointer">
            <span class="label-text">LinkedIn</span>
            <input
              type="checkbox"
              class="toggle"
              v-model="selectedSocialFields.linkedin"
            />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Facebook</span>
            <input
              type="checkbox"
              class="toggle"
              v-model="selectedSocialFields.facebook"
            />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Instagram</span>
            <input
              type="checkbox"
              class="toggle"
              v-model="selectedSocialFields.instagram"
            />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Twitter / X</span>
            <input
              type="checkbox"
              class="toggle"
              v-model="selectedSocialFields.twitter"
            />
          </label>
          <label class="label cursor-pointer">
            <span class="label-text">Github</span>
            <input
              type="checkbox"
              class="toggle"
              v-model="selectedSocialFields.github"
            />
          </label>
        </div>

        <div class="my-4">
          <label
            v-if="selectedSocialFields.linkedin"
            class="input input-bordered my-3 flex items-center gap-2"
          >
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
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <input
              v-model="newContact.linkedin"
              type="text"
              class="grow"
              placeholder="LinkedIn"
            />
          </label>

          <label
            v-if="selectedSocialFields.facebook"
            class="input input-bordered my-3 flex items-center gap-2"
          >
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
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <input
              v-model="newContact.facebook"
              type="text"
              class="grow"
              placeholder="Facebook"
            />
          </label>

          <label
            v-if="selectedSocialFields.instagram"
            class="input input-bordered my-3 flex items-center gap-2"
          >
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
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <input
              v-model="newContact.instagram"
              type="text"
              class="grow"
              placeholder="Instagram"
            />
          </label>

          <label
            v-if="selectedSocialFields.twitter"
            class="input input-bordered my-3 flex items-center gap-2"
          >
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
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <input
              v-model="newContact.twitter"
              type="text"
              class="grow"
              placeholder="Twitter / X"
            />
          </label>

          <label
            v-if="selectedSocialFields.github"
            class="input input-bordered my-3 flex items-center gap-2"
          >
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
                d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
              />
            </svg>

            <input
              v-model="newContact.github"
              type="text"
              class="grow"
              placeholder="Github"
            />
          </label>
        </div>

        <div class="mx-auto flex w-full flex-col justify-center">
          <label class="form-control">
            <div class="label">
              <span class="label-text">Ajouter une note</span>
            </div>
            <textarea
              v-model="newContact.notes as string"
              class="textarea textarea-bordered h-24"
              placeholder="A very important note about this contact..."
            ></textarea>
          </label>
        </div>

        <div
          class="my-6 flex flex-wrap items-start justify-center sm:justify-end"
        >
          <button class="btn btn-primary mx-1" @click="handleSubmit">
            Sauvegarder
          </button>
          <button class="btn btn-outline btn-error mx-1">
            <NuxtLink to="/mycontacts">Annuler</NuxtLink>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
