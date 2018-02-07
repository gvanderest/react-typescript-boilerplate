import { Reducer } from "redux";

/**
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
