<script setup lang="ts">
const { signOut, session } = useAuth()

const links = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "My Contacts", url: "/mycontacts" },
]
const handleSignout = async () => {
  try {
    await signOut()
    console.log("Sign out successfully!")
  } catch (error) {
    console.log("error", error)
  }
}
</script>

<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="text-white text-sm font-medium">Logo</div>
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <NuxtLink
                v-for="link in links"
                :key="link.name"
                :href="link.url"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >{{ link.name }}</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <ToggleTheme class="mx-1" />
          <Avatar v-if="session" class="hidden md:block" />
          <button v-if="!session" class="flex justify-end btn btn-primary mx-2">
            <NuxtLink href="/login">Login</NuxtLink>
          </button>
          <button
            v-if="session"
            @click="handleSignout"
            class="flex justify-end btn btn-primary mx-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
