export const getUserContacts = async () => {
  const response = await fetch("/api/v1/contacts/user-contacts");
  if (!response.ok) {
    console.error("Erreur de réseau :", response.status);
    return;
  }
  const data = await response.json();
  return data;
};

export const getCounts = async () => {
  const response = await fetch("/api/v1/contacts/get-counts");
  if (!response.ok) {
    console.error("Erreur de réseau :", response.status);
    return;
  }
  const data = await response.json();
  return data;
};

export const deleteContact = async (id: string) => {
  const response = await fetch(`/api/v1/contacts/${id}`, { method: "DELETE" });
  return response.ok;
};
