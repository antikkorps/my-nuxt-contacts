<script setup lang="ts">
definePageMeta({ middleware: "auth", auth: { guestRedirectTo: "/login" } });

const { session, user } = useAuth();
</script>
<template>
  <div class="flex flex-col">
    <h1 class="PageTitle">
      Hello {{ user?.firstName }}, Que souhaites-tu modifier ?
    </h1>
    <div class="my-4">
      <form class="flex flex-col">
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          :value="user?.firstName"
        />
        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          :value="user?.lastName"
        />
        <label for="email">Email</label>
        <input type="email" id="email" name="email" :value="user?.email" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
