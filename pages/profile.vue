<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } })

const { session, user } = useAuth()
const favoriteCount = ref(0)

onMounted(async () => {
  const response = await fetch("/api/v1/contacts/favorites-count")
  const data = await response.json()
  favoriteCount.value = data.body.count
})
</script>
<template>
  <div class="pt-4">
    <div
      class="card w-full sm:w-1/2 flex justify-center mx-auto bg-base-100 shadow-xl relative top-20"
    >
      <div class="card-body">
        <NuxtImg
          :src="session?.user?.avatar"
          class="w-52 h-52 rounded-full justify-center mx-auto relative -top-20"
        />

        <h2 class="card-title justify-center -mt-10">
          {{ user?.firstName }} {{ user?.lastName }}
        </h2>
        <p class="text-center mb-4">Bienvenue sur le site myContact</p>
        <p class="text-center mb-4">
          Votre Status est :
          {{ user && user.role === "user" ? "Utilisateur" : "Admininistrateur" }}
        </p>
        <div class="grid grid-cols-3 text-center mt-20 md:mt-0">
          <div>
            <p class="font-bold text-xl">22</p>
            <p class="text-gray-400">Contacts</p>
          </div>
          <div>
            <p class="font-bold text-xl">{{ favoriteCount }}</p>
            <p class="text-gray-400">Favoris</p>
          </div>
          <div>
            <p class="font-bold text-xl">89</p>
            <p class="text-gray-400">Notes</p>
          </div>
        </div>
        <div class="card-actions justify-center sm:justify-end my-10">
          <button class="btn btn-primary">Modifier mon profil</button>
          <button class="btn btn-warning">
            <NuxtLink to="/addcontact">Ajouter un contact</NuxtLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
