import {combineReducers} from "redux";
import * as types from "../action/consts";

const MusicList = (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_MUSIC_LIST:
            return {
                isLoading: true,
                list: []
            };
        case types.REQUEST_MUSIC_LIST_SUCCESS:
            return {
                isLoading: false,
                list: action.list
            };
        case types.REQUEST_MUSIC_LIST_FAILURE:
            return {
                isLoading: false,
                list: [],
                error: action.error
            };
        default :
            return state;
    }
};

export default combineReducers({
    MusicList
});