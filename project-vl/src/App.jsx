import { useState } from "react";
import "./App.css";
import CustomNavbar from "./components/NavBar.jsx";
import ItemListContainer from './components/ItemListContainer.jsx'; 

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CustomNavbar />
      <ItemListContainer />
    </div>
  );
}

export default App;
