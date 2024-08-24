import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import CustomNavbar from "./components/NavBar.jsx";
import ItemListContainer from './components/ItemListContainer.jsx'; 
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<ItemListContainer innerText="Welcome Friends!" showFullCatalog={true}/>}/>
          <Route path="/category/:id" element={<ItemListContainer/>}/>
          <Route path="/item/:category/:id" element={<ItemDetailContainer/>}/>
          <Route path="*" element={404}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
