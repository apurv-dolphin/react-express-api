import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Mongo from "./Page/Mongo";
import Firebase from "./Page/Firebase";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/firebase" element={<Firebase />} />
        <Route path="/mongo" element={<Mongo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
