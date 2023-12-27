import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./Page/Home"));
const Mongo = lazy(() => import("./Page/Mongo"));
const Firebase = lazy(() => import("./Page/Firebase"));
const Authentication = lazy(() => import("./Page/Authentication"));
const EmailTemplate = lazy(() => import("./Page/EmailTemplate"));

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/firebase" element={<Firebase />} />
          <Route path="/mongo" element={<Mongo />} />
          <Route path="/mongo/email-template" element={<EmailTemplate />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
