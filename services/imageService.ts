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
