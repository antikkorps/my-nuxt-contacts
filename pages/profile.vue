<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

const { session, user } = useAuth()
</script>
<template>
  <div class="pt-4">
    <div class="card w-full sm:w-1/2 flex justify-center mx-auto bg-base-100 shadow-xl">
      <div class="card-body">
        <NuxtImg
          :src="session?.user?.avatar"
          class="w-52 h-52 rounded-full justify-center mx-auto"
        />

        <h2 class="card-title justify-center mt-2">
          {{ user?.firstName }} {{ user?.lastName }}
        </h2>
        <p class="text-center">If a dog chews shoes whose shoes does he choose?</p>
        <div class="grid grid-cols-3 text-center mt-20 md:mt-0">
          <div>
            <p class="font-bold text-xl">22</p>
            <p class="text-gray-400">Contacts</p>
          </div>
          <div>
            <p class="font-bold text-xl">10</p>
            <p class="text-gray-400">Favoris</p>
          </div>
          <div>
            <p class="font-bold text-xl">89</p>
            <p class="text-gray-400">Commentaires</p>
          </div>
        </div>
        <div class="card-actions justify-end my-10">
          <button class="btn btn-primary">Modifier mon profil</button>
          <button class="btn btn-warning">
            <NuxtLink to="/addcontact">Ajouter un contact</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
