import {service} from "../asset/utils"
import * as types from "./consts";

const requestMusicList = () => {
    return {
        type: types.REQUEST_MUSIC_LIST
    };
};

const requestMusicListSuccess = (list) => {
    return {
        type: types.REQUEST_MUSIC_LIST_SUCCESS,
        list
    };
};

const requestMusicListFailure = (error) => {
    return {
        type: types.REQUEST_MUSIC_LIST_FAILURE,
        error
    };
};

export const getMusicList = () => {
    return (dispatch) => {
        dispatch(requestMusicList());
        return service("/rest/music/list")
            .then((data) => {
                dispatch(requestMusicListSuccess(data))
            })
            .catch(error => {
                dispatch(requestMusicListFailure(error));
            });
    };
};