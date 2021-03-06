import { h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import { ProvideAuth } from "../hooks/useAuth"
import CameraRoute from "../routes/camera";
import History from "../routes/history";
import Profile from "../routes/profile";
import Header from "./header";

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

const App: preact.FunctionalComponent = () => {
    let currentUrl: string;
    const handleRoute = (e: RouterOnChangeArgs) => {
        currentUrl = e.url;
    };

    return (
        <ProvideAuth>
        <div id="app">
            <Header />
            <Router onChange={handleRoute}>
                <Route path="/camera/" component={CameraRoute} />
                <Route path="/history/" component={History} />
                <Route path="/" component={Profile} />
            </Router>
        </div>
        </ProvideAuth>
    );
};

export default App;
