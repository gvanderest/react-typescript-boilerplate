import "./styles/styles.styl";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { IDuck } from "./ducks/ducks";
import { connect, history, store } from "./redux";
import { IReduxStore } from "./settings";

const exodusLogo = require("./images/exodus-logo.png");

interface IProps {
    actions: {
        ducks: {
            createDuck(duck: IDuck): void;
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

class Example extends React.Component<IProps, IState> {
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

        return (
            <div>
                <p>Example Application: { text } - { count }</p>
                <p><button type="button" onClick={ this.addDuck.bind(this) }>Add a Duck</button></p>
                <p><button type="button" onClick={ this.redirectToExample.bind(this) }>Use Router Push</button></p>
                <p>Redux Store:</p>
                <pre className="store-json">{ JSON.stringify(this.props.store, undefined, "    ") }</pre>
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
    protected tick(): void {
        const { count } = this.state;

        this.setState({
            count: count + 1,
        });
    }
}

const ConnectedExample = connect(Example);

const LOGO_WIDTH = 400;
const LOGO_HEIGHT = 41;

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <div>
                <p><img src={ exodusLogo } width={ LOGO_WIDTH } height={ LOGO_HEIGHT } /></p>
                <p><Link to="/">Index</Link> - <Link to="/example">Example</Link></p>
                <Route exact path="/" render={ (): JSX.Element => (<ConnectedExample text="Hello World!" />) } />
                <Route exact path="/example" render={ (): JSX.Element => (<div>Example Content</div>) } />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById("application"),
);
