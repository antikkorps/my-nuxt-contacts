<script setup lang="ts">
const { session } = useAuth();
const route = useRoute();

interface Button {
  id: string;
  isActive: boolean;
  svgPath: string;
  href: string;
}

const mobileNavLinks = ref<Button[]>([
  {
    id: "addContact",
    isActive: false,
    svgPath:
      "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z",
    href: "/addcontact",
  },
  {
    id: "myProfile",
    isActive: false,
    svgPath:
      "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
    href: "/profile",
  },
  {
    id: "allContacts",
    isActive: false,
    svgPath:
      "M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z",
    href: "/mycontacts",
  },
]);

const isActive = ref(false);
const handleIsActive = (clickedButton: Button) => {
  mobileNavLinks.value.forEach((button) => {
    button.isActive = false;
  });
  clickedButton.isActive = true;
};

onMounted(() => {
  const currentPath = route.path;
  mobileNavLinks.value.forEach((button) => {
    button.isActive = button.href === currentPath;
  });
});
</script>
<template>
  <ClientOnly>
    <div class="block sm:hidden">
      <div class="btm-nav">
        <NuxtLink
          @click="handleIsActive(mobileNavLinks[0])"
          :class="{ active: mobileNavLinks[0].isActive }"
          class="text-primary"
          activeClass="text-accent"
          :to="mobileNavLinks[0].href"
        >
          <svg
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
              :d="mobileNavLinks[0].svgPath"
            />
          </svg>
        </NuxtLink>

        <NuxtLink
          @click="handleIsActive(mobileNavLinks[1])"
          :class="{ active: mobileNavLinks[1].isActive }"
          class="text-primary"
          activeClass="text-accent"
          :to="mobileNavLinks[1].href"
        >
          <Avatar
            v-if="session && mobileNavLinks[1].id === 'myProfile'"
            class="w-12 items-center"
          />
          <svg
            v-else
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
              :d="mobileNavLinks[1].svgPath"
            />
          </svg>
        </NuxtLink>

        <NuxtLink
          @click="handleIsActive(mobileNavLinks[2])"
          :class="{ active: mobileNavLinks[2].isActive }"
          class="text-primary"
          activeClass="text-accent"
          :to="mobileNavLinks[2].href"
        >
          <svg
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
              :d="mobileNavLinks[2].svgPath"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </ClientOnly>
</template>
