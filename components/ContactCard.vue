<script setup lang="ts">
const isFavorite = ref(false)
const isPinging = ref(false)

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  if (isFavorite.value) {
    isPinging.value = true
    setTimeout(() => {
      isPinging.value = false
    }, 650)
  }
}
</script>

<template>
  <div class="card card-side bg-base-100 shadow-xl">
    <figure>
      <img
        src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
        alt="Movie"
      />
    </figure>
    <div class="card-body">
      <div class="flex flex-row justify-between">
        <h2 class="card-title">Peter Parker</h2>
        <StarredToFavorite />
      </div>

      <p>One of my good friends</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Ouvrir</button>
        <button class="btn btn-primary">Supprimer</button>
      </div>
    </div>
  </div>
</template>
