export const getUserContacts = async () => {
  const response = await fetch("/api/v1/contacts/user-contacts");
  if (!response.ok) {
    console.log("Erreur de réseau :", response.status);
    return;
  }
  const data = await response.json();
  console.log("Données reçues :", data);
  return data;
};
