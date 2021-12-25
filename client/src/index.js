import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import TemplateProvider from "./templates/template-provider";
import store, { persistor } from "./store";
import App from "./app";
import "./index.css";
import "./adapters/firebase.js"

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
      <TemplateProvider>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </TemplateProvider>
  </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
