import cookie from "react-cookies";
import { isArray } from "util";
import { getPosts } from "../apis/posts";

//-- contants
export const ADD_ARTICLE = "ADD_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const POSTS_REQUESTED = "POSTS_REQUESTED";
export const POSTS_LOADED = "POSTS_LOADED";
export const API_ERRORED = "API_ERRORED";

//-- action creators
export function addArticle(payload) {
    return { type: ADD_ARTICLE, payload };
}
export function deleteArticle(payload) {
    return { type: DELETE_ARTICLE, payload };
}
export function postsRequested() {
    return { type: POSTS_REQUESTED };
}
export function postsLoaded(payload) {
    return { type: POSTS_LOADED, payload };
}
export function apiError(payload) {
    return { type: API_ERRORED, payload };
}

//-- Reducer
const savedArticles = cookie.load("savedArticles");
const initialState = {
    articles: [],
    savedArticles: isArray(savedArticles) ? savedArticles : [],
    remoteArticles: [],
    postsLoading: false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLE:
            return {
                ...state,
                articles: state.articles.concat(action.payload)
            };
        case DELETE_ARTICLE:
            return {
                ...state,
                articles: [
                    ...state.articles.filter(
                        article => article.id !== action.payload
                    )
                ]
            };
        case POSTS_REQUESTED:
            return {
                ...state,
                postsLoading: true
            };
        case POSTS_LOADED:
            return {
                ...state,
                remoteArticles: state.remoteArticles.concat(action.payload),
                postsLoading: false
            };
        default:
            return state;
    }
}

export function requestPosts() {
    return async function(dispatch) {
        dispatch({ type: POSTS_REQUESTED });
        try {
            const posts = await getPosts();
            return dispatch(postsLoaded(posts));
        } catch (error) {
            return dispatch(apiError(error));
        }
    };
}

export default reducer;
