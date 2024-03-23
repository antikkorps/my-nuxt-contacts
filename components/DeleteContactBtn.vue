<script setup lang="ts">
const props = defineProps({
  id: String,
});

const emit = defineEmits(["delete"]);

const handleDeleteContact = async () => {
  const response = await fetch(
    `http://localhost:3000/api/v1/contacts/${props.id}`,
    {
      method: "DELETE",
    },
  );
  if (response.ok) {
    console.log("Contact deleted");
    emit("delete", {
      success: true,
      message: "Contact supprimé",
      id: props.id,
    });
  } else {
    console.error("Error deleting contact");
    emit("delete", {
      success: false,
      message: "Erreur lors de la suppression du contact",
    });
  }
};
</script>

<template>
  <div>
    <button class="btn btn-primary" @click="handleDeleteContact">
      Supprimer
    </button>
  </div>
</template>
