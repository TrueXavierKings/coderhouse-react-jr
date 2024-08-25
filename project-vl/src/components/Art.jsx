import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ItemCategory } from "./Constants";

const Art = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageSources, setImageSources] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(
          "https://66abecd1f009b9d5c730b5d1.mockapi.io/vl_api/v1/art"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArtworks(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      const sources = {};
      for (const artwork of artworks) {
        try {
          const image = await import(`../assets/images/art/${artwork.id}.jpg`);
          sources[artwork.id] = image.default;
        } catch (error) {
          console.error('Error loading image', error);
          sources[artwork.id] = '../assets/images/no-pic.png';
        }
      }
      setImageSources(sources);
    };

    if (artworks.length) {
      loadImages();
    }
  }, [artworks]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCardClick = (id) => {
    navigate(`/item/${ItemCategory.ART}/${id}`);
  };

  return (
    <div className="container">
      <h1>Art</h1>
      <div className="row">
        {artworks.map((art) => (
          <div key={art.id} className="col-md-4 mb-4">
            <Card
              onClick={() => handleCardClick(art.id)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                variant="top"
                src={imageSources[art.id]}
                alt={art.name}
              />
              <Card.Body>
                <Card.Title>{art.name}</Card.Title>
                <Card.Text>${art.price.toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Art;
