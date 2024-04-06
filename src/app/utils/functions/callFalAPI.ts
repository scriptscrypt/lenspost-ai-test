import axios from "axios";
import { extractPathAddDesign } from "./extractPathFromURL";

const fnFalAPI = async (message: string) => {
  const falApiKey =
    `${process.env["FAL_API_KEY"]}` || process.env["FAL_API_KEY"];

  const response = await axios.post(
    "https://fal.run/fal-ai/fast-sdxl",
    {
      prompt: message,
    },
    {
      headers: {
        Authorization: `Key ${falApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Use the image URL from the API response
  const imageUrl =
    response?.data?.images[0]?.url ||
    "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/2639523a-690b-47af-16ab-ca07697fd000/original";

  console.log("THE API RES IS :", response?.data);

  const slugImageURLForShare = extractPathAddDesign(
    response?.data?.images[0]?.url || ""
  );

  return {
    imageUrl,
    slugImageURLForShare,
  };
};

export default fnFalAPI;
