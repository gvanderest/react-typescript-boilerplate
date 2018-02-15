import "./styles/styles.styl";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import Example from "./components/Example";
import { connect, history, store } from "./redux";

const exodusLogo = require("./images/exodus-logo.png");

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
