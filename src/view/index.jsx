import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from '../serviceWorker'
import stores from '@model/store'
import routes from '@model/router'
import { Provider } from 'mobx-react'

import {
    BrowserRouter as Router, Route, Switch,
} from 'react-router-dom'
import Rocket from '@components/Rocket'
import Header from '@components/Header'

ReactDOM.render(
    <Provider {...stores}>
        <Router>
            <Header></Header>
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
        </Router>
        <Rocket></Rocket>
    </Provider>,
    document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
