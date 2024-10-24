import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { PriceProvider } from "./Context/PriceContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/new">
      <AuthProvider>
        <Provider store={store}>
          <PriceProvider>
            <App />
          </PriceProvider>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
