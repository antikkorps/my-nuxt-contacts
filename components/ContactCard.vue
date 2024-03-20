<script setup lang="ts">
const props = defineProps({
  contact: Object,
});

const contact = ref(props.contact);
const emit = defineEmits(["toggle-favorite"]);

const toggleFavorite = () => {
  if (contact.value) {
    contact.value.isFavorite = !contact.value?.isFavorite;
    emit("toggle-favorite", {
      id: props.contact?.id,
      isFavorite: contact.value?.isFavorite,
    });
  }
};
</script>

<template>
  <div
    class="card card-side bg-base-100 shadow-xl flex-col md:flex-row rounded-none sm:rounded-l-lg"
  >
    <figure class="md:w-1/6">
      <img
        v-if="contact?.image"
        :src="contact?.image"
        alt="Image of contact"
        class="w-full md:h-full object-cover overflow-hidden"
      />
      <img
        v-else
        src="https://placehold.co/150x200/png"
        alt="image of contact missing"
        class="w-full md:h-full object-cover overflow-hidden"
      />
    </figure>
    <div class="card-body">
      <div class="flex flex-row justify-between">
        <h2 class="card-title">
          {{ contact?.firstName }} {{ contact?.lastName }}
        </h2>
        <StarredToFavorite
          :id="contact?.id"
          :isFavorite="contact?.isFavorite"
          @toggle-favorite="toggleFavorite"
        />
      </div>
      <div>
        <p>email : {{ contact?.email }}</p>
        <p v-if="contact?.notes">Note sur le contact : {{ contact?.notes }}</p>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-primary">Ouvrir</button>
        <button class="btn btn-primary">Supprimer</button>
      </div>
    </div>
  </div>
</template>
