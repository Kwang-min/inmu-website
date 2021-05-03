import axios from 'axios';
import {
    SAVE_COMMENT,
    GET_COMMENT
} from './types';

export function getComment(dataToSubmit) {

    const request = axios.post('/api/comment/getComments', dataToSubmit)
        .then(response => response.data )
    console.log('hahaha',request)
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
