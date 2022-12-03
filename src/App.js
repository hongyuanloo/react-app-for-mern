import "./App.css";
import { ShowsList } from "./components/showsList";
import { Route, Routes } from "react-router-dom";
import { UpdateComedians } from "./components/updateComedians";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<ShowsList setShow={setShow} />} />
      <Route path="/comedians" element={<UpdateComedians show={show} />} />

      {/* <div className="App">
        <ShowsList />
      </div> */}
    </Routes>
  );
}

export default App;
