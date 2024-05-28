import App from './App';
import reportWebVitals from './reportWebVitals';
import {AppRegistry} from "react-native";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./redux/reducers/reducers";
import thunk from "redux-thunk";
import {useEffect} from "react";
import {currentUser} from "./BLL/CurrentUserProps";


const RegisterApp = () => {
    const store = createStore(reducers, applyMiddleware(thunk));

    useEffect(() => {
        currentUser.setToken();
    }, []);

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

AppRegistry.registerComponent("App", () => RegisterApp);

AppRegistry.runApplication("App", {
    rootTag: document.getElementById("root")
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
