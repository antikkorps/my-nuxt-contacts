<script setup lang="ts">
import MobileNavLinks from "./MobileNavLinks.vue";

import type { Button } from "~/server/utils/types";

const { session } = useAuth();

const mobileNavLinks = ref<Button[]>([]);

const isActive = ref(false);
const handleIsActive = (clickedButton: Button) => {
  mobileNavLinks.value.forEach((button) => {
    button.isActive = false;
  });
  clickedButton.isActive = true;
};
</script>
<template>
  <div class="block sm:hidden">
    <div class="btm-nav">
      <!-- <MobileNavLinks
        v-for="link in mobileNavLinks"
        :key="link.id"
        :mobileNavLink="link"
        @click="handleIsActive(link)"
        :class="{ active: link.isActive }"
        class="text-primary"
        activeClass="text-accent"
        :to="link.href"
      /> -->
      <MobileNavLinks @click="handleIsActive" />
    </div>
  </div>
</template>
