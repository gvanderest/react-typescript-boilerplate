import { connect as reduxConnect } from "react-redux";
import { applyMiddleware, bindActionCreators, combineReducers, createStore, Dispatch, Store } from "redux";
import thunk from "redux-thunk";
import { IReduxStore, reduxActions, reduxReducers } from "./settings";

export const store: Store<{}> = createStore(
    combineReducers(reduxReducers),
    applyMiddleware(thunk),
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
