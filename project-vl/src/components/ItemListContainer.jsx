import React from "react";
import { useParams } from "react-router-dom";
import Videos from "./Videos";
import Art from "./Art";
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const { id } = useParams();
  return (
    <div className="full-width-space">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-1 side-area"></div>
          <div className="col-10 content-area">
            {id === "videos" && <Videos />}
            {id === "art" && <Art />}
            {id === "merchandising" && <>Nothing here yet!</>}
            {!id && (
              <>
                <Videos />
                <Art />
              </>
            )}
          </div>
          <div className="col-1 side-area"></div>
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer;
