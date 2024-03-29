<script setup lang="ts">
import { contactService } from "~/services/index";
import type { Contact } from "~/server/utils/types";

const handleSubmit = async () => {
  console.log("submit");
};
</script>
<template>
  <div>
    <h1 class="PageTitle">Add a contact</h1>
    <div class="flex w-full justify-center">
      <form action="" class="flex w-full flex-col">
        <div class="mx-auto flex flex-col justify-around sm:flex-row">
          <label class="form-control mx-1 w-full max-w-xs">
            <div class="label">
              <span class="label-text">Firstname</span>
            </div>
            <input
              v-model="firstName"
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
              <input type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>
        </div>

        <div class="mx-auto flex flex-col justify-around sm:flex-row">
          <label class="form-control mx-1 w-full max-w-xs">
            <div class="label">
              <span class="label-text">Téléphone Fixe</span>
            </div>
            <input
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
              type="phone"
              placeholder="00 00 00 00 00"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div class="mx-auto flex w-full flex-col justify-center">
          <label class="form-control">
            <div class="label">
              <span class="label-text">Ajouter une note</span>
            </div>
            <textarea
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
