<script setup lang="ts">
const { session } = useAuth()
const userInitials = session.value?.user?.name?.split("").slice(0, 2).join("")
</script>
<template>
  <div class="avatar">
    <div
      class="w-10 mx-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
    >
      <NuxtImg v-if="session?.user?.image" :src="session.user.image" />
      <div
        v-else
        class="flex items-center justify-center h-full text-white bg-primary rounded-full"
      >
        {{ userInitials }}
      </div>
    </div>
  </div>
</template>
