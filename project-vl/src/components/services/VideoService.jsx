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

export const mapVideoToGenericItem = (video) => {
  return {
    id: video.id,
    title: video.songName,
    secondTitle: video.albumName,
    description: video.description,
    secondDescription: "Release Date: " + video.releaseDate,
    price: video.price,
    mediaLink: video.youtubeLink,
  };
};
