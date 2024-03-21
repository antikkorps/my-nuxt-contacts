<script setup lang="ts">
const { session } = useAuth();
const firstNameInitialOfUser = session.value?.user?.firstName?.charAt(0);
const lastNameInitialOfUser = session.value?.user?.lastName?.charAt(0);
const userInitials = `${firstNameInitialOfUser}${lastNameInitialOfUser}`;

let imageLoaded = false;
const key = ref(0);

const handleLoad = () => {
  imageLoaded = true;
};

const updateAvatarOnclick = () => {
  key.value++;
};
</script>
<template>
  <NuxtLink :key="key" href="/profile" @click="updateAvatarOnclick">
    <div class="avatar">
      <div
        class="mx-2 w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100"
      >
        <NuxtImg
          v-if="session?.user?.avatar"
          :src="session.user.avatar"
          @load="handleLoad"
        />
        <div
          v-else
          class="btn-primary flex h-full items-center justify-center rounded-full bg-primary font-bold"
        >
          {{ userInitials }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
