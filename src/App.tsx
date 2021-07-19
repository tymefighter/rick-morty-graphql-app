import client from "./client";
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route } from "react-router-dom"; 
import Nav from './Common/Nav';

import Characters from './character/Characters';
import Character from './character/Character';
import Locations from './location/Locations';
import Location from './location/Location';
import Episode from './episode/Episode';
import Episodes from './episode/Episodes';

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Nav 
                    nameToLink={[
                        {name: "Characters", link: "/characters"},
                        {name: "Locations", link: "/locations"},
                        {name: "Episodes", link: "/episodes"}
                    ]}
                />
                <Switch>
                    <Route path="/characters/:characterId">
                        <Character />
                    </Route>
                    <Route path="/characters">
                        <Characters />
                    </Route>
                    <Route path="/locations/:locationId">
                        <Location />
                    </Route>
                    <Route path="/locations">
                        <Locations />
                    </Route>
                    <Route path="/episodes/:episodeId">
                        <Episode />
                    </Route>
                    <Route path="/episodes">
                        <Episodes />
                    </Route>
                </Switch>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
