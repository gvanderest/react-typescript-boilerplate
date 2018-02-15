import { AnyAction } from "redux";

export const CREATE_DUCK: string = "CREATE_DUCK";
export const REMOVE_DUCK: string = "REMOVE_DUCK";

export interface IState {
    byId: {
        [key: string]: IDuck;
    };
}

export interface IDuck {
    id: string;
    name: string;
}

const initialState: IState = {
    byId: {},
};

interface IHandleCreateAction extends AnyAction {
    duck: IDuck;
}

interface IHandleRemoveAction extends AnyAction {
    duck: IDuck;
}

export function createDuck(duck: IDuck): AnyAction {
    return {
        duck,
        type: CREATE_DUCK,
    };
}

export function removeDuck(duckId: string): AnyAction {
    return {
        duckId,
        type: REMOVE_DUCK,
    };
}

function reduceCreateDuck(state: IState, action: IHandleCreateAction): IState {
    const { duck } = action;

    return {
        ...state,
        byId: {
            ...state.byId,
            [duck.id]: { ...duck },
        },
    };
}

function reduceRemoveDuck(state: IState, action: IHandleRemoveAction): IState {
    const { duckId } = action;

    const byId: { [key: string]: IDuck } = { ...state.byId };
    delete byId[duckId];

    return {
        ...state,
        byId,
    };
}

export const ducksActions = {
    createDuck,
    removeDuck,
};

export default function ducksReducer(state: IState, action: AnyAction): IState {
    if (!state) {
        return initialState;
    }
    switch (action.type) {
        case CREATE_DUCK:
            return reduceCreateDuck(state, action as IHandleCreateAction);
        case REMOVE_DUCK:
            return reduceRemoveDuck(state, action as IHandleRemoveAction);
        default:
            return state;
    }
}
