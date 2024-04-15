<script setup lang="ts">
import { contactService } from "~/services/";

const props = defineProps({
  id: String,
});

const emit = defineEmits(["delete"]);

const handleDeleteContact = async () => {
  if (!props.id) {
    console.error("ID du contact non défini");
    return;
  }
  const deleteSuccess = await contactService.deleteContact(props.id);
  if (deleteSuccess) {
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
    <button class="deleteButton btn btn-warning" @click="handleDeleteContact">
      Supprimer
    </button>
  </div>
</template>
