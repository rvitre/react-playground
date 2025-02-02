import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import rootStore from "./js/store/";
import App from "./js/components/App.js";
import Loading from "./js/components/Loading.js";

// if you're in create-react-app import the files as:
// import store from "./js/store/index";
// import App from "./js/components/App.jsx";

render(
    <Provider store={rootStore.store}>
        <PersistGate loading={<Loading/>} persistor={rootStore.persistor}>
            <App />
        </PersistGate>
    </Provider>,
    // The target element might be either root or app,
    // depending on your development environment
    // document.getElementById("app")
    document.getElementById("root")
);
