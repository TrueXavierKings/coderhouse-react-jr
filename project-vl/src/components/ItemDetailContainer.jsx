import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { fetchVideoById, mapVideoToGenericItem } from "./services/VideoService";
import { fetchArtById, mapArtToGenericItem } from "./services/ArtService";
import { ItemCategory } from "./Constants";
import ItemDetail from "./ItemDetail";
import "./ItemListContainer.css";

const ItemDetailContainer = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        let fetchedItem = {};
        let genericItem = {};
        if (ItemCategory.VIDEO == category) {
          fetchedItem = await fetchVideoById(id);
          genericItem = await mapVideoToGenericItem(fetchedItem);
        } else if (ItemCategory.ART == category) {
          fetchedItem = await fetchArtById(id);
          genericItem = await mapArtToGenericItem(fetchedItem);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="full-width-space">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-1 side-area"></div>
          <div className="col-10 content-area">
            <Card>
              {item.imagePath && (
                <Card.Img
                  variant="top"
                  src={item.imagePath}
                  alt={item.title}
                />
              )}
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.secondTitle}</Card.Text>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>{item.secondDescription}</Card.Text>
                {item.thirdDescription && (
                  <Card.Text>{item.thirdDescription}</Card.Text>
                )}
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
            <ItemDetail item={item} contents={item.contents} />
          </div>
          <div className="col-1 side-area"></div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;
