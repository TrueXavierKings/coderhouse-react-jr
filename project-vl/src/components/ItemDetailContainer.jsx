import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { fetchVideoById, mapVideoToGenericItem } from "./services/VideoService";
import { fetchArtById, mapArtToGenericItem } from "./services/ArtService";
import { ItemCategory } from "./Constants";
import "./ItemListContainer.css";

const ItemDetailContainer = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [imageSources, setImageSources] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("entered detail container")
    const loadItem = async () => {
      try {
        let fetchedItem = {};
        let genericItem = {};
        if(ItemCategory.VIDEO == category) {
          console.log("get videos");
          fetchedItem = await fetchVideoById(id);
          genericItem = mapVideoToGenericItem(fetchedItem);
        } else if (ItemCategory.ART == category) {
          console.log("get art");
          fetchedItem = await fetchArtById(id);
          genericItem = mapArtToGenericItem(fetchedItem);
        }
        setItem(genericItem);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  useEffect(() => {
    const loadImages = async () => {
      const sources = {};
      try {
        const image = await import(`../assets/images/${category}/${item.id}.jpg`);
        sources[item.id] = image.default;
      } catch (error) {
        console.error("Error loading image", error);
        sources[item.id] = "../assets/images/no-pic.png";
      }
      setImageSources(sources);
    };

    if (item) {
      loadImages();
    }
  }, [item]);

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
                src={imageSources[item.id]}
                alt={item.title}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.secondTitle}</Card.Text>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>{item.secondDescription}</Card.Text>
                {item.thirdDescription && <Card.Text>{item.thirdDescription}</Card.Text>}
                <Card.Text>{item.price}</Card.Text>
                <iframe
                  width="560"
                  height="315"
                  src={item.mediaLink}
                  title={item.title}
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
