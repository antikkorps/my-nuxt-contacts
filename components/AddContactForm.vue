<script setup lang="ts">
import { contactService, imageService } from "~/services/index";
import type { Contact, HttpError, ResponseValue } from "~/server/utils/types";

const router = useRouter();
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

const error = ref<string | null>(null);
const errorMessage: Ref<string | undefined> = ref("");
const isRequestSuccessful = ref(false);
const displayError = ref(false);
const response = ref<ResponseValue | null>(null);

const onFileChange = async (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  let file: File | null = null;

  if (inputElement && inputElement.files && inputElement.files.length > 0) {
    file = inputElement.files[0];
  }

  if (file) {
    try {
      const imageUrl = await imageService.uploadImageInFilestack(file);
      if (imageUrl && newContact.value) {
        newContact.value.image = imageUrl;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};

const handleSubmit = async () => {
  try {
    const response = await contactService.addContact(newContact.value);
    if (response.body && response.body.error) {
      throw new Error(response.body.error);
    }
    isRequestSuccessful.value = true;
    router.push(`/contact/${response.body.id}`);
  } catch (error) {
    const err = error as Error;
    isRequestSuccessful.value = false;
    errorMessage.value = err.message;
    displayError.value = true;
    setTimeout(() => {
      displayError.value = false;
    }, 3500);
  }
};
</script>
<template>
  <div>
    <h1 class="PageTitle">Add a contact</h1>
    <div class="mb-2 flex w-full justify-center">
      <form @submit.prevent="handleSubmit" class="flex w-full flex-col">
        <div class="flex flex-col justify-around sm:flex-row">
          <label class="form-control mx-1 w-full max-w-xs flex-grow">
            <div class="label">
              <span class="label-text">Firstname</span>
            </div>
            <input
              v-model="newContact.firstName"
              type="text"
              id="firstName"
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
              id="lastName"
              placeholder="eg. Doe"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div class="mx-auto flex w-full justify-center">
          <label class="form-control mx-1 w-full max-w-xs">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              v-model="newContact.email"
              type="email"
              id="email"
              placeholder="eg. me@example.com"
              class="input input-bordered w-full max-w-xs"
            />
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Image de contact</span>
            </div>
            <input
              @change="onFileChange"
              type="file"
              class="file-input file-input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div
          class="form-control mt-3 flex w-full justify-center sm:w-1/2 sm:justify-around"
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

        <div
          class="form-control mx-auto mt-10 flex w-full justify-center sm:w-1/2"
        >
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
          <transition name="slide-in">
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
          </transition>
          <transition name="slide-in">
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
          </transition>
          <transition name="slide-in">
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
          </transition>
          <transition name="slide-in">
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
          </transition>
          <transition name="slide-in">
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
          </transition>
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
          <button type="submit" class="btn btn-primary mx-1">
            Sauvegarder
          </button>
          <div class="btn btn-outline btn-error mx-1">
            <NuxtLink to="/mycontacts">Annuler</NuxtLink>
          </div>
        </div>
      </form>
    </div>
    <div role="alert" class="alert alert-error" v-if="displayError">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ error || errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.3s ease;
}
.slide-in-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-in-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
