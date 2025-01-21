import { Client } from "@gradio/client";

export const connectToGradio = async (imageBlob) => {
  try {
    const client = await Client.connect("theodinproject/skin_cancer_model_resnet50v2"); // Replace with your actual app ID
    const result = await client.predict("/predict", { image: imageBlob });
    console.log("Image Blob:", imageBlob);
    console.log("API Response:", result.data);

    return result.data; // Ensure this returns the correct data format
  } catch (error) {
    console.error("Error connecting to Gradio API:", error);
    return { Error: "Failed to get a response from the server." };
  }
};
