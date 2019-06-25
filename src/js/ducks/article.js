import cookie from "react-cookies";
import { isArray } from "util";

//-- contants
export const ADD_ARTICLE = "ADD_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const SAVE_ARTICLE = "SAVE_ARTICLE";
export const UNSAVE_ARTICLE = "UNSAVE_ARTICLE";
export const SAVE_ARTICLE_OK = "SAVE_ARTICLE_OK";
export const UNSAVE_ARTICLE_OK = "UNSAVE_ARTICLE_OK";
export const DATA_REQUESTED = "DATA_REQUESTED";
export const DATA_LOADED = "DATA_LOADED";

//-- action creators
export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload };
}
export function deleteArticle(payload) {
    return { type: DELETE_ARTICLE, payload };
}
export function saveArticle(payload) {
    return { type: SAVE_ARTICLE, payload };
}
export function unsaveArticle(payload) {
    return { type: UNSAVE_ARTICLE, payload };
}
export function saveArticleOk(payload) {
    return { type: SAVE_ARTICLE_OK, payload };
}
export function unsaveArticleOk(payload) {
    return { type: UNSAVE_ARTICLE_OK, payload };
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
    if (action.type === SAVE_ARTICLE) {
        let isDuplicate = state.savedArticles.some(
            article => article.id === action.payload.id
        );

        if (!isDuplicate) {
            return {
                ...state,
                savedArticles: state.savedArticles.concat(action.payload),
                saveArticleOk: true
            };
        } else {
            return state;
        }
    }
    if (action.type === UNSAVE_ARTICLE) {
        return {
            ...state,
            /*articles: [
            ...state.articles.slice(0, action.payload),
            ...state.articles.slice(action.payload + 1)]*/
            savedArticles: [
                ...state.savedArticles.filter(
                    article => article.id !== action.payload
                )
            ],
            unsaveArticleOk: true
        };
    }
    if (action.type === SAVE_ARTICLE_OK) {
        cookie.save("savedArticles", state.savedArticles);
    }
    if (action.type === UNSAVE_ARTICLE_OK) {
        cookie.save("savedArticles", state.savedArticles);
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
