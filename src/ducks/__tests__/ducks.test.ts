import reducer, { createDuck } from "../ducks";

describe("example", () => {
    it("should test", () => {
        const store = {
            byId: {},
        };
        const before = {
            id: "123",
            name: "Hello Duck",
        };
        const reduced = reducer(store, createDuck(before));
        expect(reduced).toEqual({
            byId: {
                123: {
                    id: "123",
                    name: "Hello Duck",
                },
            },
        });
    });
});
