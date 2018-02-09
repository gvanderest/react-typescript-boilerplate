import createHistory from "history/createBrowserHistory";
import { connect as reduxConnect } from "react-redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, bindActionCreators, combineReducers, compose, createStore, Dispatch, Store } from "redux";
import thunk from "redux-thunk";
import { IReduxStore, reduxActions, reduxReducers } from "./settings";

export const history = createHistory();

export interface IWindowWithDevTools extends Window {
    __REDUX_DEVTOOLS_EXTENSION__(): () => {};
}

const reduxWindow = window as IWindowWithDevTools;
const reduxDevtools = reduxWindow.__REDUX_DEVTOOLS_EXTENSION__ && reduxWindow.__REDUX_DEVTOOLS_EXTENSION__();

export const store: Store<{}> = createStore(
    combineReducers({
        ...reduxReducers,
        routing: routerReducer,
    }),
    compose(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
        ),
        reduxDevtools,
    ),
);

export interface IStore {
    store: IReduxStore;
}

function mapStateToProps(state: IReduxStore): IStore {
    return {
        store: state,
    };
}

function mapDispatchToProps(dispatch: Dispatch<IStore>): { actions: typeof reduxActions } {
    const boundActionCreators: { [key: string]: {} } = { ...reduxActions };

    for (const name in reduxActions) {
        if (!name) {
            continue;
        }
        boundActionCreators[name] = bindActionCreators(reduxActions[name], dispatch);
    }

    return {
        actions: boundActionCreators as typeof reduxActions,
    };
}

export const connect = reduxConnect<IStore, { actions: typeof reduxActions }>(
    mapStateToProps, mapDispatchToProps);
