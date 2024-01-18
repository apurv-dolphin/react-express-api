import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./router";
import i18n from "./translation";

const App = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <ToastContainer />
      <Router />
    </I18nextProvider>
  </BrowserRouter>
);

const AppWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);

export default AppWithSuspense;
