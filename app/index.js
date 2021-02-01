import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Nav from './components/Nav'
import { BrowserRouter as Router } from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'
import Loading from "./components/Loading";

// these are the paths that are called by Route. They still need to link to components, so they were defined separately here.
//
// Q: why did we do this and not a Link component?
// A: user only downloads the code they need to render the page they are on, and helps keep the entire webpage svelte and light.
// called dynamic import
// you are Promising to import the modules, so you are Routing the components to the promise of the import of the module
const Popular = React.lazy(()=> import("./components/Popular"))
const Battle = React.lazy(()=>  import("./components/Battle"))
const Results = React.lazy(()=> import("./components/Results"))

class App extends React.Component {
    // because class fields exist, we commented out props and attached them directly to the component. And event handlers are simply changed to arrow functions. No need to bind.

    // constructor(props) {
    //     super(props)
    //
    //     this.state = {
    //         theme: 'light',
    //         toggleTheme: () => {
    //             this.setState(({ theme }) => ({
    //                 theme: theme === 'light' ? 'dark' : 'light'
    //             }))
    //         }
    //     }
    // }

    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({theme}) => ({
                theme: theme === 'light' ? 'dark' : 'light'
            }))
        }
    //    toggle theme added to state, which is passed to the theme provider, so that it can be accessed from any page that consumes the theme
    }
    // render should not change state, just returns it
    render() {
        return (
            //Router allows us to tell react to find specific pages at specific paths
            // Wrapping all the components we want to render in ThemeProvider passes down the info and makes them available throughout the tree
            // giving them theme and the function to toggle theme
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            {/*renders the nav function. This is present on every path and therefore does not need a Route path. */}
                            <Nav />

                            {/* in combo with react.lazy, if the component modules are taking a while to load, React.Suspense will fall back on our Loading component, which was imported statically */}
                            <React.Suspense fallback={<Loading/>}>
                                {/*Switch specifies that the first page to match the path gets rendered. */}
                                <Switch>
                                    {/*use exact path to make sure that Popular doesn't render with everything that contains '/' */}
                                    <Route exact path='/' component={Popular} />
                                    <Route exact path='/battle' component={Battle} />
                                    <Route path='/battle/results' component={Results} />
                                    {/* not including a path specifier in Route means that the 404 page can be rendered all the time. However switch makes it so that you have to go through all previous pages first.*/}
                                    {/*if you make it through all the pages and none of them matched, then the 404 page is rendered*/}
                                    <Route render={()=><h1>404</h1>}/>
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

//renders all the react components to the app div in index.html
// only need to call ReactDom.render once, and feed it a componenet that has everything set up
ReactDOM.render(
    //render the react element App to
    <App />,
    document.getElementById('app')
)