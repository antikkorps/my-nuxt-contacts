<script setup lang="ts">
const { signOut, session } = useAuth();

const links = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "My Contacts", url: "/mycontacts" },
];
const handleSignout = async () => {
  try {
    await signOut();
    console.log("Sign out successfully!");
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="text-sm font-medium text-white">Logo</div>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NuxtLink
                v-for="link in links"
                :key="link.name"
                :href="link.url"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >{{ link.name }}</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <ToggleTheme class="mx-1" />
          <Avatar v-if="session" class="hidden md:block" />
          <div v-if="!session" class="btn btn-primary mx-2 flex justify-end">
            <NuxtLink href="/login">Login</NuxtLink>
          </div>
          <div
            v-if="session"
            @click="handleSignout"
            class="btn btn-primary mx-2 flex justify-end"
            id="logout"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
