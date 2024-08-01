import React from "react";
import './ItemListContainer.css';

const ItemListContainer = (props) => {
  return (
    <div className="full-width-space">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-1 side-area"></div>
          <div className="col-10 content-area">{props.innerText}</div>
          <div className="col-1 side-area"></div>
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer;
