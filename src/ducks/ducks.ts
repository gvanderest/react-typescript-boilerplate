import { AnyAction } from "redux";

export const DUCK_CREATED: string = "ducks/CREATED";

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

interface IHandleCreatedAction extends AnyAction {
    duck: IDuck;
}

export function createDuck(duck: IDuck): AnyAction {
    return {
        duck,
        type: DUCK_CREATED,
    };
}

function reduceDuckCreated(state: IState, action: IHandleCreatedAction): IState {
    const { duck } = action;

    return {
        ...state,
        byId: {
            ...state.byId,
            [duck.id]: { ...duck },
        },
    };
}

export const ducksActions = {
    createDuck,
};

export default function ducksReducer(state: IState, action: AnyAction): IState {
    if (!state) {
        return initialState;
    }
    switch (action.type) {
        case DUCK_CREATED:
            return reduceDuckCreated(state, action as IHandleCreatedAction);
        default:
            return state;
    }
}
