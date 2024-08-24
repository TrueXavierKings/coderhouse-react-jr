import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { ItemCategory } from "./Constants";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSources, setImageSources] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://66abecd1f009b9d5c730b5d1.mockapi.io/vl_api/v1/videos"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVideos(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const sources = {};
      for (const video of videos) {
        try {
          const image = await import(`../assets/images/videos/${video.id}.jpg`);
          sources[video.id] = image.default;
        } catch (error) {
          console.error('Error loading image', error);
          sources[video.id] = '../assets/images/no-pic.png';
        }
      }
      setImageSources(sources);
    };

    if (videos.length) {
      loadImages();
    }
  }, [videos]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCardClick = (id) => {
    navigate(`/item/${ItemCategory.VIDEO}/${id}`);
  };

  return (
    <div className="container">
      <h1>Videos</h1>
      <div className="row">
        {videos.map((video) => (
          <div key={video.id} className="col-md-4 mb-4">
            <Card
              onClick={() => handleCardClick(video.id)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                variant="top"
                src={imageSources[video.id]}
                alt={video.songName}
              />
              <Card.Body>
                <Card.Title>{video.songName}</Card.Title>
                <Card.Text>{video.albumName}</Card.Text>
                <Card.Text>{video.price}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
