import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import CustomNavbar from "./components/NavBar.jsx";
import ItemListContainer from './components/ItemListContainer.jsx'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<ItemListContainer innerText="Welcome Friends!"/>}/>
          <Route path="/clips" element={<ItemListContainer innerText="Welcome to clips"/>}/>
          <Route path="/art" element={<ItemListContainer innerText="Welcome to art"/>}/>
          <Route path="/merchandising" element={<ItemListContainer innerText="Welcome to merchandising"/>}/>
          <Route path="*" element={404}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
