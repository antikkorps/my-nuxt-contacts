<script setup lang="ts">
import { ref } from "vue"
const links = [
  { name: "Home", url: "#" },
  { name: "About", url: "#" },
  { name: "My Contacts", url: "#" },
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const mobileMenuOpen = ref(false)
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
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Home</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >About</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >My Contacts</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
