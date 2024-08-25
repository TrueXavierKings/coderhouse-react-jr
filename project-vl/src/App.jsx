import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import CustomNavbar from "./components/NavBar.jsx";
import ItemListContainer from './components/ItemListContainer.jsx'; 
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import { CartProvider } from "./components/CartContext.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <CartProvider>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<ItemListContainer innerText="Welcome Friends!" showFullCatalog={true}/>}/>
          <Route path="/category/:id" element={<ItemListContainer/>}/>
          <Route path="/item/:category/:id" element={<ItemDetailContainer/>}/>
          <Route path="/checkout" element={<Checkout />}/>
          <Route path="*" element={404}/>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
