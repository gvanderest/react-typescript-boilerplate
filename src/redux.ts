import { connect as reduxConnect } from "react-redux";
import { push, routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, bindActionCreators, combineReducers, compose, createStore, Dispatch, Store } from "redux";
import thunk from "redux-thunk";
import { historyCreationFunction, IReduxStore, reduxActions, reduxReducers } from "./settings";

export let history = historyCreationFunction();

export interface IWindowWithDevTools extends Window {
    __REDUX_DEVTOOLS_EXTENSION__(): () => {};
}

const reduxWindow = window as IWindowWithDevTools;
const reduxDevtools = reduxWindow.__REDUX_DEVTOOLS_EXTENSION__ && reduxWindow.__REDUX_DEVTOOLS_EXTENSION__();

export const store: Store<{}> = createStore(
    combineReducers({
        ...reduxReducers,
        router: routerReducer,
    }),
    {},
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
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
    const boundActionCreators: { [key: string]: {} } = {
        ...reduxActions,
        router: {
            push,
        },
    };

    for (const name in boundActionCreators) {
        if (!name) {
            continue;
        }
        boundActionCreators[name] = bindActionCreators(boundActionCreators[name], dispatch);
    }

    return {
        actions: boundActionCreators as typeof reduxActions,
    };
}

export const connect = reduxConnect<IStore, { actions: typeof reduxActions }>(
    mapStateToProps, mapDispatchToProps);
