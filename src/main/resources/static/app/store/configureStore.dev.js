import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {createLogger} from "redux-logger";
import rootReducer from "../reducer";
import DevTools from "../DevTools";

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk, createLogger()),
            DevTools.instrument()
        )
    );

    if (module.hot) {
        module.hot.accept("../reducer", () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
};

export default configureStore;