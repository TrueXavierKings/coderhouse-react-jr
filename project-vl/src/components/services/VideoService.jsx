import { ItemCategory } from "../Constants";

const videoImages = import.meta.glob('/src/assets/images/videos/*.jpg');

export const fetchVideoById = async (id) => {
  try {
    const response = await fetch(
      `https://66abecd1f009b9d5c730b5d1.mockapi.io/vl_api/v1/videos?id=${id}`
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

export const mapVideoToGenericItem = async (video) => {
  let imagePath = '/src/assets/images/no-pic.png';

  const imageImport = videoImages[`/src/assets/images/videos/${video.id}.jpg`];
  if (imageImport) {
    const imageModule = await imageImport();
    imagePath = imageModule.default;
  }

  return {
    id: video.id,
    title: video.songName,
    subtitle: video.albumName,
    imagePath: imagePath,
    description: video.description,
    secondDescription: "Release Date: " + video.releaseDate,
    price: video.price,
    mediaLink: video.youtubeLink,
    category: ItemCategory.VIDEO
  };
};
