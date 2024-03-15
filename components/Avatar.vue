<script setup lang="ts">
const { session } = useAuth()
const firstNameInitialOfUser = session.value?.user?.firstName?.charAt(0)
const lastNameInitialOfUser = session.value?.user?.lastName?.charAt(0)
const userInitials = `${firstNameInitialOfUser}${lastNameInitialOfUser}`

let imageLoaded = false
const handleLoad = () => {
  imageLoaded = true
}
</script>
<template>
  <NuxtLink href="/profile">
    <div class="avatar">
      <div
        class="w-10 mx-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
      >
        <NuxtImg
          v-if="session?.user?.avatar"
          :src="session.user.avatar"
          @load="handleLoad"
        />
        <div
          v-else
          class="flex items-center justify-center h-full font-bold bg-primary rounded-full"
        >
          {{ userInitials }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
