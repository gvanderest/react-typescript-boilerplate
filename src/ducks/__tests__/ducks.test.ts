import reducer, { DUCK_CREATED } from "../ducks";

describe("example", () => {
    it("should test", () => {
        const store = {
            byId: {},
        };
        const before = {
            id: 123,
            name: "Hello Duck",
        };
        const reduced = reducer(store, { type: DUCK_CREATED, duck: before });
        expect(reduced).toEqual({
            byId: {
                123: {
                    id: 123,
                    name: "Hello Duck",
                },
            },
        });
    });
});
