<script setup lang="ts">
const isPinging = ref(false);

const props = defineProps({ isFavorite: Boolean, id: String });
let isFavorite = ref(props.isFavorite);

watchEffect(() => {
  isFavorite.value = props.isFavorite;
});

const emit = defineEmits(["toggle-favorite"]);

const handleToggleFavorite = async () => {
  isPinging.value = true;
  setTimeout(() => {
    isPinging.value = false;
  }, 650);
  emit("toggle-favorite");

  const data = {
    id: props.id,
    isFavorite: !isFavorite.value,
  };

  const response = await fetch("/api/v1/contacts/handle-contact-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  isFavorite.value = responseData?.body.isFavorite;
};
</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    id="star"
    class="h-6 w-6 cursor-pointer"
    :class="{
      'animate-ping': isPinging,
      'text-yellow-500': isFavorite,
      'fill-current': isFavorite,
    }"
    @click="handleToggleFavorite"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
</template>
