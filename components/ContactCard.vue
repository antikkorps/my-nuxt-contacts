<script setup lang="ts">
import type { DeleteEvent } from "~/server/utils/types";

const props = defineProps({
  contact: Object,
});

const contact = ref(props.contact);
const showCard = ref(true);

const emit = defineEmits(["toggle-favorite", "delete"]);

const toggleFavorite = () => {
  if (contact.value) {
    contact.value.isFavorite = !contact.value?.isFavorite;
    emit("toggle-favorite", {
      id: props.contact?.id,
      isFavorite: contact.value?.isFavorite,
    });
  }
};

const handleDelete = (event: DeleteEvent) => {
  showCard.value = false;
  setTimeout(() => {
    emit("delete", event);
  }, 1000);
};
</script>

<template>
  <transition name="slide-right">
    <div
      class="card card-side flex-col rounded-none bg-base-100 shadow-xl sm:rounded-l-lg md:flex-row"
      v-show="showCard"
    >
      <figure class="md:w-1/6">
        <img
          v-if="contact?.image"
          :src="contact?.image"
          alt="Image of contact"
          class="w-full overflow-hidden object-cover md:h-full"
        />
        <img
          v-else
          src="https://placehold.co/150x200/png"
          alt="image of contact missing"
          class="w-full overflow-hidden object-cover md:h-full"
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
          <div class="flex-start flex items-center">
            <p>
              <span class="font-bold">email : </span>
              <a :href="`mailto:${contact?.email}`" target="_blank">{{
                contact?.email
              }}</a>
            </p>
            <div class="flex items-center">
              <CopyToClipboard :text="contact?.email" />
            </div>
          </div>
          <p v-if="contact?.notes">
            <span class="font-bold">Note sur le contact : </span>
            {{ contact?.notes }}
          </p>
        </div>

        <div class="card-actions justify-end">
          <div class="btn btn-primary">
            <NuxtLink :to="`/contact/${contact?.id}`">Ouvrir</NuxtLink>
          </div>
          <DeleteContactBtn @delete="handleDelete" :id="contact?.id" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.9s;
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
