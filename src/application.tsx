import * as React from "react";
import * as ReactDOM from "react-dom";

interface IProps {
    text: string;
}

class Example extends React.Component<IProps> {
    public render(): JSX.Element {
        const { text } = this.props;

        return <h1>Example Application: { text }</h1>;
    }
}

ReactDOM.render(<Example text="Hello World" />, document.getElementById("application"));
