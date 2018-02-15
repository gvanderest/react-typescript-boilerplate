import * as React from "react";
import { IDuck } from "../ducks/ducks";
import { IReduxStore } from "../settings";

interface IProps {
    actions: {
        ducks: {
            createDuck(duck: IDuck): void;
            removeDuck(duckId: string): void;
        };
        router: {
            push(url: string): void;
        };
    };
    store: IReduxStore;
    text: string;
}

interface IState {
    count: number;
    tickIntervalId: number;
}

export default class Example extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            count: 0,
            tickIntervalId: 0,
        };
    }
    public componentDidMount(): void {
        const ONE_SECOND: number = 1000;
        this.setState({
            tickIntervalId: window.setInterval(this.tick.bind(this), ONE_SECOND),
        });
    }
    public componentWillUnmount(): void {
        window.clearInterval(this.state.tickIntervalId);
    }
    public render(): JSX.Element {
        const { text } = this.props;
        const { count } = this.state;

        const ducks = this.props.store.ducks.byId;
        const duckCount = Object.keys(ducks).length;

        return (
            <div>
                <h1>Example Application</h1>
                <h2>Props and State: { text } - { count }</h2>
                <p>
                    <button type="button" onClick={ this.addDuck.bind(this) }>Add a Duck</button>
                    <button type="button" onClick={ this.redirectToExample.bind(this) }>Use Router Push</button>
                </p>
                <h2>Duck Information</h2>
                { duckCount === 0 ? (
                    <p>There are currently no ducks to display.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Object.keys(ducks).map((duckId: string): JSX.Element => {
                                const duck = ducks[duckId];

                                return (
                                    <tr key={ duck.id }>
                                        <td>{ duck.id }</td>
                                        <td>{ duck.name }</td>
                                        <td>
                                            <button type="button" onClick={ this.removeDuck.bind(this, duck) }>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) }
                        </tbody>
                    </table>
                ) }
                <h2>Redux Store</h2>
                <pre className="code">{ JSON.stringify(this.props.store, undefined, "    ") }</pre>
            </div>
        );
    }
    protected addDuck(): void {
        this.props.actions.ducks.createDuck({
            id: String(Math.random()),
            name: "Quackers",
        });
    }
    protected redirectToExample(): void {
        this.props.actions.router.push("/example/");
    }
    protected removeDuck(duck: IDuck): void {
        this.props.actions.ducks.removeDuck(duck.id);
    }
    protected tick(): void {
        const { count } = this.state;

        this.setState({
            count: count + 1,
        });
    }
}
