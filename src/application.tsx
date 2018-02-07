import "./styles/styles.styl";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IDuck } from "./ducks/ducks";
import { connect, store } from "./redux";
import { IReduxStore } from "./settings";

const exodusLogo: string = require("./images/exodus-logo.png");

interface IProps {
    actions: {
        ducks: {
            createDuck(duck: IDuck): void;
        };
    };
    store: IReduxStore;
    text: string;
}

interface IState {
    count: number;
    tickIntervalId: number;
}

class Example extends React.PureComponent<IProps, IState> {
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
        this.props.actions.ducks.createDuck({
            id: String(Math.random()),
            name: "Quackers",
        });
    }
    public componentWillUnmount(): void {
        window.clearInterval(this.state.tickIntervalId);
    }
    public render(): JSX.Element {
        const { text } = this.props;
        const { count } = this.state;

        return (
            <div>
                <p><img src={ exodusLogo } /></p>
                <p>Example Application: { text } - { count }</p>
                <p>Redux Store:</p>
                <pre className="store-json">{ JSON.stringify(this.props.store, undefined, "    ") }</pre>
            </div>
        );
    }
    protected tick(): void {
        const { count } = this.state;

        this.setState({
            count: count + 1,
        });
    }
}

const ConnectedExample = connect(Example);

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedExample text="Hello World" />
    </Provider>,
    document.getElementById("application"),
);
