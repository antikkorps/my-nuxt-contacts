<script setup lang="ts">
import { userService, imageService } from "~/services";
import type { User } from "~/server/utils/types";

definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });

const { session, user } = useAuth();
const imagePreview = ref<string | null>(null);
const updatedContact = computed(() => {
  if (!user.value?.id || !user.value.role || !user.value?.email) {
    throw new Error("User id, role or email is not defined");
  }

  return {
    id: user.value.id,
    role: user.value?.role,
    avatar: imagePreview.value || "",
    firstName: user.value?.firstName,
    lastName: user.value?.lastName,
    email: user.value.email,
    password: "",
  };
});
const changePassword = ref(false);
const oldPassword = ref("");
const newPassword = ref("");
const passwordErrors = ref({
  minLength: "Le mot de passe doit contenir au moins 8 caractères",
  upperCase: "Le mot de passe doit contenir au moins une majuscule",
  specialChar: "Le mot de passe doit contenir au moins un caractère spécial",
});
const passwordTouched = ref(false);
const confirmPassword = ref("");
const passwordsMatch = ref(true);

const onFileChange = async (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  let file: File | null = null;

  if (inputElement && inputElement.files && inputElement.files.length > 0) {
    file = inputElement.files[0];
  }

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    try {
      const imageUrl = await imageService.uploadImageInFilestack(file);
      if (imageUrl && imageUrl !== "" && user.value) {
        user.value.avatar = imageUrl;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
};

const checkPassword = () => {
  passwordTouched.value = true;

  const hasUpperCase = /[A-Z]/.test(newPassword.value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword.value);
  const hasMinLength = newPassword.value.length >= 8;

  if (hasMinLength) {
    passwordErrors.value.minLength = "";
  } else {
    passwordErrors.value.minLength =
      "Le mot de passe doit contenir au moins 8 caractères";
  }

  if (hasUpperCase) {
    passwordErrors.value.upperCase = "";
  } else {
    passwordErrors.value.upperCase =
      "Le mot de passe doit contenir au moins une majuscule";
  }

  if (hasSpecialChar) {
    passwordErrors.value.specialChar = "";
  } else {
    passwordErrors.value.specialChar =
      "Le mot de passe doit contenir au moins un caractère spécial";
  }

  if (newPassword.value === "") {
    passwordErrors.value.minLength = "";
    passwordErrors.value.upperCase = "";
    passwordErrors.value.specialChar = "";
  }
};

const passwordIsValid = computed(() => {
  return Object.values(passwordErrors.value).every((error) => error === "");
});

const reinitValuesOnUnchecked = () => {
  if (!changePassword.value) {
    newPassword.value = "";
    passwordTouched.value = false;
    confirmPassword.value = "";
  }
};

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    console.log("Les mots de passe ne correspondent pas");
    passwordsMatch.value = false;
    setTimeout(() => {
      passwordsMatch.value = true;
    }, 3000);

    return;
  }
  passwordsMatch.value = true;
  updatedContact.value.password = newPassword.value;
  try {
    await userService.modifyUser(updatedContact.value);
    console.log("success");
    console.log(updatedContact.value);
  } catch (error) {
    console.log("error", error);
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="PageTitle">
      Hello {{ session?.user?.firstName }}, <br />
      Que souhaites-tu modifier sur ton profil ?
    </h1>
    <div class="my-4">
      <form
        class="mx-auto flex flex-col justify-center"
        @submit.prevent="handleSubmit"
      >
        <div class="mx-auto mb-10 flex flex-col justify-around">
          <img
            :src="imagePreview || user?.avatar"
            alt="contact image"
            class="mx-auto h-20 w-20 rounded-full"
          />

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Image de profil</span>
            </div>
            <input
              @change="onFileChange"
              type="file"
              class="file-input file-input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <label class="form-control mx-auto w-full max-w-xs">
          <div class="label">
            <span class="label-text">Prénom</span>
          </div>
          <input
            type="text"
            placeholder="Votre nom"
            class="input input-bordered mx-auto w-full max-w-xs"
            v-model="updatedContact.firstName"
          />
        </label>

        <label class="form-control mx-auto w-full max-w-xs">
          <div class="label">
            <span class="label-text">Nom</span>
          </div>
          <input
            type="text"
            placeholder="Votre prénom"
            class="input input-bordered mx-auto w-full max-w-xs"
            v-model="updatedContact.lastName"
          />
        </label>

        <label class="form-control mx-auto w-full max-w-xs">
          <div class="label">
            <span class="label-text">Email</span>
          </div>
          <input
            type="email"
            placeholder="Votre email"
            class="input input-bordered mx-auto w-full max-w-xs"
            v-model="updatedContact.email"
          />
        </label>
        <div class="form-control mx-auto my-5 w-full max-w-xs">
          <label class="label cursor-pointer">
            <span class="label-text">Modifier le mots de passe ?</span>
            <input
              type="checkbox"
              v-model="changePassword"
              @change="reinitValuesOnUnchecked"
              class="checkbox"
            />
          </label>
        </div>
        <div v-if="changePassword">
          <label class="form-control mx-auto w-full max-w-xs">
            <div class="label">
              <span class="label-text">Ancien Mot de passe</span>
            </div>
            <input
              type="password"
              placeholder="Votre mot de passe"
              class="input input-bordered mx-auto w-full max-w-xs"
              v-model="oldPassword"
            />
          </label>

          <label class="form-control mx-auto w-full max-w-xs">
            <div class="label">
              <span class="label-text">Nouveau Mot de passe</span>
            </div>
            <input
              type="password"
              placeholder="Votre mot de passe"
              class="input input-bordered mx-auto w-full max-w-xs"
              v-model="newPassword"
              @input="checkPassword"
            />
            <div class="flex flex-col">
              <span
                class="label-text-alt"
                v-for="(error, key) in passwordErrors"
                :key="key"
                v-if="passwordTouched"
              >
                {{ error }}
              </span>
            </div>
          </label>

          <label class="form-control mx-auto w-full max-w-xs">
            <div class="label">
              <span class="label-text">Répéter le mot de passe</span>
            </div>
            <input
              type="password"
              placeholder="Répetez votre mot de passe"
              class="input input-bordered mx-auto w-full max-w-xs"
              v-model="confirmPassword"
            />
          </label>
        </div>

        <button type="submit" class="btn btn-primary my-4 sm:mx-auto sm:w-1/2">
          Sauvegarder
        </button>
      </form>
      <div role="alert" class="alert alert-error" v-if="!passwordsMatch">
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
        <span>Les mots de passe ne correspondent pas</span>
      </div>
    </div>
  </div>
</template>
