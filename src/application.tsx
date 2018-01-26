import "./styles/styles.styl";

import * as React from "react";
import * as ReactDOM from "react-dom";

const exodusLogo = require("./images/exodus-logo.png");

interface IProps {
    text: string;
}

class Example extends React.Component<IProps> {
    public render(): JSX.Element {
        const { text } = this.props;

        return (
            <div>
                <img src={ exodusLogo } />
                <h1>Example Application: { text }</h1>
            </div>
        );
    }
}

ReactDOM.render(<Example text="Hello World" />, document.getElementById("application"));
