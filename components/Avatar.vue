<script setup lang="ts">
const { session } = useAuth();

const firstNameInitialOfUser = session.value?.user?.firstName
  ? session.value.user.firstName.charAt(0)
  : "N";
const lastNameInitialOfUser = session.value?.user?.lastName
  ? session.value.user.lastName.charAt(0)
  : "N";
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
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg> -->
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
