import axios from 'axios';
import {
    SAVE_COMMENT,
    GET_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT
} from './types';

export function getComment(dataToSubmit) {

    const request = axios.post('/api/comment/getComments', dataToSubmit)
        .then(response => response.data )
    
    return {
        type: GET_COMMENT,
        payload: request
    }
}

export function saveComment(dataToSubmit) {

    const request = axios.post('/api/comment/saveComment', dataToSubmit)
        .then(response => response.data )

    return {
        type: SAVE_COMMENT,
        payload: request
    }
}

export function deleteComment(dataToSubmit) {

    const request = axios.post('/api/comment/deleteComment', dataToSubmit)
        .then(response => response.data )

    return {
        type: DELETE_COMMENT,
        payload: request
    }
}

export function updateComment(dataToSubmit) {
    console.log('hahahaho')
    const request = axios.post('/api/comment/updateComment', dataToSubmit)
        .then(response => response.data )

    return {
        type: UPDATE_COMMENT,
        payload: request
    }
}
