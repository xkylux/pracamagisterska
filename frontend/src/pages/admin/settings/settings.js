import axios from "axios"

 export const uploadFileRequest = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach(image => {
    formData.append("images", image);
  })
  const { data } = await axios.post("/api/produkty/admin/przeslij?productId=" + productId, formData);
  return data;
}

 export const uploadToCloudinary = (images, productId) => {
  const url = "https://api.cloudinary.com/v1_1/dnwmvwbre/image/upload";
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    formData.append("upload_preset", "ptvn20z3");
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        axios.post("/api/produkty/admin/przeslij?cloudinary=true&productId=" + productId, data);
      })
  }
}