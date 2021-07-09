import {
    SAVE_COMMENT,
    GET_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT

} from '../_actions/types';

export default function comment (state = {}, action) {
    switch (action.type) {
        case GET_COMMENT:
            return { ...state, commentList: action.payload }
            break;
        case SAVE_COMMENT:
            return { ...state, commentList: action.payload }
            break;
        case DELETE_COMMENT:
            return { ...state, commentList: action.payload }
            break;
        case UPDATE_COMMENT:
            return { ...state, commentList: action.payload }
            break;
        default:
            return state;
    }
}
