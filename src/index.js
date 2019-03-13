import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";

//firebaseAuthIsReady makes sure the application does NOT load
//before firebase authentication is ready.
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
  serviceWorker.unregister();
});
