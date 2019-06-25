// src/js/store/index.js
import { createStore, applyMiddleware, compose } from "redux";
import {persistStore, persistReducer } from "redux-persist";
import rootReducer from "../ducks/index";
import { forbiddenWordsMiddleware } from "../middleware";
import createSagaMiddleware from "redux-saga";
import apiSaga from "../sagas/api-saga";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

const initialiseSagaMiddleware = createSagaMiddleware();

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const rootStore = (() => { 
    let store = createStore(
        persistedReducer,
        storeEnhancers( 
          applyMiddleware(forbiddenWordsMiddleware, initialiseSagaMiddleware)
        )
    );
    let persistor = persistStore(store);
    return { store, persistor };
  })() 

initialiseSagaMiddleware.run(apiSaga);

export default rootStore;



