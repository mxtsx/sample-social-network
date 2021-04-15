import a from './App.module.css'
import Header from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import ProfileContainer from "./components/Profile/ProfileContainer"
import Users from "./components/Users/UsersContainer"
import Login from "./components/Login/LoginContainer"
import {HashRouter, Redirect, Route, Switch} from "react-router-dom"
import React, {PureComponent} from "react";
import {connect, Provider} from "react-redux";
import store, {AppStateType} from "./redux/reduxStore";
import {compose} from "redux";
import {getInitialized} from "./redux/appReducer";
import {withRouter} from "react-router";
import Preloader from "./components/common/Preloader/Preloader";
import {getIsInitialized} from "./redux/appSelectors";
import Chat from "./components/Chat/Chat";
import 'antd/dist/antd.css'
import Error404 from "./components/Error/Error404";
import {setError} from "./redux/errorReducer";

type PropsType = MapStateToPropsType & MapDispatchToPropsType
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    getInitialized: () => void,
    setError: (error: string | null) => void
}

class App extends PureComponent<PropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        if(promiseRejectionEvent) {
            console.error(promiseRejectionEvent)
            const error = promiseRejectionEvent.reason.message || promiseRejectionEvent.reason.response.data.message
            this.props.setError(error)
        }
    }
    componentDidMount() {
        this.props.getInitialized()
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    render() {
        if(!this.props.isInitialized) {
            return <Preloader />
        }
        return (
            <div className={a.appContent}>
                <Header/>
                <Sidebar/>
                <main className={a.main}>
                    <Switch>
                        <Route path={"/login"} render={() => <Login/>}/>
                        <Route path={"/profile/:userID?"} render={() => <ProfileContainer />}/>
                        <Route path={"/users"} render={() => <Users/>}/>
                        <Route path={"/chat"} render={() => <Chat />}/>
                        <Route exact path={"/"} render={() => <Redirect to={"/login"}/>}/>
                        <Route path={"*"} render={() => <Error404 />}/>
                    </Switch>
                </main>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isInitialized: getIsInitialized(state)
    }
}

let AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {getInitialized, setError}),
    withRouter)(App)

const SampleSocialNetworkApp: React.FC = React.memo(() => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
})

export default SampleSocialNetworkApp;
