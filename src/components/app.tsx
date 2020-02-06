import { h } from "preact";
import { Route, Router, RouterOnChangeArgs } from "preact-router";

import { ProvideAuth } from "../hooks/useAuth"
import History from "../routes/history";
import Home from "../routes/home";
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
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} />
                <Route path="/history/" component={History} />
            </Router>
        </div>
        </ProvideAuth>
    );
};

export default App;
