import * as api from '../api';
import { FETCH_ALL, COMMENT, FETCH_SINGLE_POST, UPDATE, FETCH_BY_SEARCH, CREATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

export const getSinglePost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchSinglePost(id);
    
        dispatch({type: FETCH_SINGLE_POST, payload: data});
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message);
    }
}


export const getPost = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(page);

        console.log('data', data)
    
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostBySearch(searchQuery);

        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })        
        const { data } = await api.createPost(post);
        dispatch({type: CREATE, payload: data})
        history.push(`/posts/${data._id}`)
    } catch (error) {
        console.log(error.message)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const {data} = await api.comment(value, id)
        dispatch({type: COMMENT, payload: data})

        return data.comments;
    } catch (error) {
        console.log(error)
    }
}