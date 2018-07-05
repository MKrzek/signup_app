import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Store from "./store";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Store>
    <App />
  </Store>,

  document.getElementById("root")
);
registerServiceWorker();
