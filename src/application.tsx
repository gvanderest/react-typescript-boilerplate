import "./styles/styles.styl";

import * as React from "react";
import * as ReactDOM from "react-dom";

const exodusLogo: string = require("./images/exodus-logo.png");

interface IProps {
    text: string;
}

interface IState {
    count: number;
    tickIntervalId: number | undefined;
}

class Example extends React.PureComponent<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            count: 0,
            tickIntervalId: undefined,
        };
    }
    public componentDidMount(): void {
        const ONE_SECOND: number = 1000;
        this.setState({
            tickIntervalId: setInterval(this.tick.bind(this), ONE_SECOND),
        });
    }
    public componentWillUnmount(): void {
        clearInterval(this.state.tickIntervalId);
    }
    public render(): JSX.Element {
        const { text } = this.props;
        const { count } = this.state;

        return (
            <div>
                <p><img src={ exodusLogo } /></p>
                <h1>Example Application: { text } - { count }</h1>
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

ReactDOM.render(<Example text="Hello World" />, document.getElementById("application"));
