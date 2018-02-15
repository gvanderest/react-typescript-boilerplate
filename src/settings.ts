import * as history from "history";
import { Reducer } from "redux";

/**
 * ROUTER HISTORY
 * Which form of history to use for the router, out of the box supports:
 * - "createBrowserHistory" to use slashes in the URL
 * - "createHashHistory" to use the hash symbol separator
 *
 * See: https://www.npmjs.com/package/history for more examples.
 */
export const historyCreationFunction = history.createHashHistory;

/**
 * REDUX
 * Mapping of the redux reducers and their names.
 */

// Reducers
import ducksReducer, { ducksActions as ducks, IState as IDucksState } from "./ducks/ducks";

export const reduxReducers: { [key: string]: Reducer<{}> } = {
    ducks: ducksReducer,
};

// Action Creators
export const reduxActions: { [key: string]: {} } = {
    ducks,
};

// Store Interface
export interface IReduxStore {
    ducks: IDucksState;
    [key: string]: {};
}

export interface IReduxProps {
    actions: typeof reduxActions;
    store: IReduxStore;
    [key: string]: {};
}
