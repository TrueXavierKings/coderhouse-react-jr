import { ItemCategory } from "../Constants";

const videoImages = import.meta.glob('/src/assets/images/art/*.jpg');

export const fetchArtById = async (id) => {
  try {
    const response = await fetch(
      `https://66abecd1f009b9d5c730b5d1.mockapi.io/vl_api/v1/art?id=${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const mapArtToGenericItem = async (art) => {
  let imagePath = '/src/assets/images/no-pic.png';

  const imageImport = videoImages[`/src/assets/images/art/${art.id}.jpg`];
  if (imageImport) {
    const imageModule = await imageImport();
    imagePath = imageModule.default;
  }

  return {
    id: art.id,
    title: art.name,
    subtitle: art.bandName,
    imagePath: imagePath,
    description: art.description,
    secondDescription:
      "Birthday: " + art.birthday + ", Nationality: " + art.nationality,
    thirdDescription: "Weight: " + art.weight + ", Height: " + art.height,
    price: art.price,
    mediaLink: art.youtubeLink,
    category: ItemCategory.ART
  };
};
