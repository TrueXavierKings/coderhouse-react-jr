import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./ItemListContainer.css";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [imageSources, setImageSources] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(
          `https://66abecd1f009b9d5c730b5d1.mockapi.io/vl_api/v1/videos?id=${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setVideo(data[0]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  useEffect(() => {
    const loadImages = async () => {
      const sources = {};
      try {
        const image = await import(`../assets/images/videos/${video.id}.jpg`);
        sources[video.id] = image.default;
      } catch (error) {
        console.error("Error loading image", error);
        sources[video.id] = "../assets/images/no-pic.png";
      }
      setImageSources(sources);
    };

    if (video) {
      loadImages();
    }
  }, [video]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="full-width-space">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-1 side-area"></div>
          <div className="col-10 content-area">
            <Card>
              <Card.Img
                variant="top"
                src={imageSources[video.id]}
                alt={video.songName}
              />
              <Card.Body>
                <Card.Title>{video.songName}</Card.Title>
                <Card.Text>{video.albumName}</Card.Text>
                <Card.Text>{video.description}</Card.Text>
                <Card.Text>{video.price}</Card.Text>
                <Card.Text>{video.releaseDate}</Card.Text>
                <iframe
                  width="560"
                  height="315"
                  src={video.youtubeLink}
                  title={video.songName}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Card.Body>
            </Card>
          </div>
          <div className="col-1 side-area"></div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
