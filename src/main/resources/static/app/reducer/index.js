import {combineReducers} from "redux";

const errorMessage = (state = {}, action) => {
    return state;
};

const rootReducer = combineReducers({
    errorMessage
});

export default rootReducer;