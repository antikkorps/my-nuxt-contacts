export const addContact = async (contact: any) => {
  const response = await fetch("/api/v1/contacts/user-contacts-add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  return response.ok;
};

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

export const uploadImageInFilestack = async (file: File) => {
  const config = useRuntimeConfig();
  const api_key = config.public.fileStack.apiKey;

  const uploadUrl = `https://www.filestackapi.com/api/store/S3?key=${api_key}`;
  const formData = new FormData();
  formData.append("fileUpload", file);

  const response = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    const imageUrl = data.url;
    console.log("url image", imageUrl);
    return imageUrl;
  } else {
    console.error("Erreur de réseau :", response.status);
    return;
  }
};
