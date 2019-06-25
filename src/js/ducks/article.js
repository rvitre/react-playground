import cookie from "react-cookies";
import { isArray } from "util";

//-- contants
export const ADD_ARTICLE = "ADD_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const DATA_REQUESTED = "DATA_REQUESTED";
export const DATA_LOADED = "DATA_LOADED";

//-- action creators
export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload };
}
export function deleteArticle(payload) {
    return { type: DELETE_ARTICLE, payload };
}
export function getData() {
    return { type: DATA_REQUESTED };
}

//-- Reducer
const savedArticles = cookie.load("savedArticles");
const initialState = {
    articles: [],
    savedArticles: isArray(savedArticles) ? savedArticles : [],
    remoteArticles: [],
    saveArticleOk: false,
    unsaveArticleOk: false
};

function reducer(state = initialState, action) {
    if (action.type === ADD_ARTICLE) {
        return {
            ...state,
            articles: state.articles.concat(action.payload)
        };
    }
    if (action.type === DELETE_ARTICLE) {
        return {
            ...state,
            /*articles: [
              ...state.articles.slice(0, action.payload),
              ...state.articles.slice(action.payload + 1)]*/
            articles: [
                ...state.articles.filter(
                    article => article.id !== action.payload
                )
            ]
        };
    }
    if (action.type === DATA_LOADED) {
        return {
            ...state,
            remoteArticles: state.remoteArticles.concat(action.payload)
        };
    }

    return state;
}

export default reducer;
